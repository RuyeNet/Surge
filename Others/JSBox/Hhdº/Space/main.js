var width = $device.info.screen.width
var height = $device.info.screen.height

//获取资源
var ground = $file.read("assets/Ground_PlanetHalf_mid.png").image,
  child_stand = $file.read("assets/AlienGreen_front.png").image,
  child_walk1_left = $file.read("assets/AlienGreen_walk1_left.png").image,
  child_walk1_right = $file.read("assets/AlienGreen_walk1_right.png").image,
  coin = $file.read("assets/Item_CoinGold.png").image,
  html = $file.read("scripts/html.txt").string,
  rock = [$file.read("assets/MeteorBrownBig1.png").image, $file.read("assets/MeteorBrownBig2.png").image, $file.read("assets/MeteorBrownBig3.png").image, $file.read("assets/MeteorBrownBig4.png").image]

//常量
const child_width = 64,
  child_height = 128,
  ground_height = 64,
  coin_size = 65,
  child_y = height - child_height - ground_height * 0.5,
  rock_size = coin_size * 1.3

//变量
let x = null,
  child = child_stand,
  last_location = null,
  last_towards = null,
  block = []

$ui.render({
  props: {
    bgcolor: $color("#004f82"),
    statusBarHidden: true,
    navBarHidden: true
  },
  views: [{
      type: "canvas",
      layout: $layout.fill,
      events: {
        draw: function(view, ctx) {
          //绘制已有的石头/金币
          for (var i = 0; i < block.length; i++) {
            var item = block[i]
            var size = (item[3] == "coin") ? coin_size : rock_size
            var image = (item[3] == "coin") ? coin : rock[item[4]]
            ctx.drawImage($rect(item[0], item[1], size, size), image)
          }
          //随机生成金币
          if (random(1, 50, 0) == 1) {
            var rx = random(0, width - coin_size, 1)
            var ry = 0 - coin_size
            var speed = random(3, 7, 1)
            var rect = $rect(rx, ry, coin_size, coin_size)
            ctx.drawImage(rect, coin)
            block.push([rx, ry, speed, "coin"])
          }
          //随机生成石头
          if (random(1, 70, 0) == 1) {
            var rx = random(0, width - rock_size, 1)
            var ry = 0 - rock_size
            if (random(1, 2, 0) == 2) {
              var speed = [random(-2, -1, 1), random(6, 10, 1)]
            } else var speed = [random(1, 2, 1), random(6, 10, 1)]
            var rect = $rect(rx, ry, rock_size, rock_size)
            var rock_image = random(0, 3, 0)
            ctx.drawImage(rect, rock[rock_image])
            block.push([rx, ry, speed, "rock", rock_image])
          }
          //绘制地板
          ctx.drawImage($rect(0, view.frame.height - ground_height * 0.5, width, ground_height), ground)
          //绘制小人
          ctx.drawImage($rect(x, child_y, child_width, child_height), child)
        }
      }
    },
    {
      type: "label",
      props: {
        text: "0",
        font: $font("bold", 40),
        textColor: $color("white")
      },
      layout: function(make, view) {
        make.top.inset(20)
        make.centerX.equalTo(view.super)
      }
    },
    {
      type: 'web',
      props: {
        id: 'web',
        html: html,
        showsProgress: false
      },
      layout: (make, view) => {
        make.top.left.inset(5)
        make.size.equalTo($size(80, 20))
      }
    },
    {
      type: "button",
      props: {
        title: "×",
        font: $font("bold", 30),
        titleColor: $color("white"),
        type: 0,
        bgcolor: $color("clear")
      },
      layout: function(make, view) {
        make.top.right.inset(5)
        make.size.equalTo(30)
      },
      events: {
        tapped: () => $app.close()
      }
    }
  ]
})

$motion.startUpdates({
  interval: 0.04,
  handler: function(data) {
    var medium = width / 2
    var rightSide = width - child_width
    if (height > width) {
      var range = data.attitude.roll
    } else var range = data.attitude.pitch
    if (range > 0) {
      x = (range - 0) * medium * 2 + medium
      child = child_walk1_right
    } else if (range == 0) {
      x = medium
      child = child_stand
    } else if (range < 0) {
      x = medium - (0 - range) * medium * 2
      child = child_walk1_left
    }
    if (x > rightSide) {
      x = rightSide
    } else if (x < 0) x = 0
  }
})

var timer = $timer.schedule({
  interval: 0.005,
  handler: function() {
    var lhx = x + child_width
    var lhy = child_y + child_height - 50
    var shy = child_y + 50
    for (var i = 0; i < block.length; i++) {
      var item = block[i]
      if (item[3] == "coin") {
        var size = coin_size
      } else var size = rock_size
      var lbx = item[0] + size
      var lby = item[1] + size
      //通过坐标判断小人是否与金币/石头碰撞
      if (lhx <= lbx && lhx >= item[0] && lhy <= lby && lhy >= item[1]) {
        if (item[3] == "coin") {
          lengthUp(i)
        } else gameOver()
      } else if (x <= lbx && x >= item[0] && shy <= lby && shy >= item[1]) {
        if (item[3] == "coin") {
          lengthUp(i)
        } else gameOver()
      } else if (item[1] >= height + size) {
        block.splice(i, 1) //若金币/石头移至底则删除
      } else {
        if (item[2][0] > 0) {
          var speed = [random(-2, -1, 1), item[2][1]]
        } else var speed = [random(1, 2, 1), item[2][1]]
        //撞墙反弹
        if (item[0] >= width - rock_size && item[3] == "rock") {
          block[i][2] = speed
        } else if (item[0] <= 0 && item[3] == "rock") {
          block[i][2] = speed
        }
        //移动
        if (item[3] == "coin") {
          item[1] = item[1] + item[2]
        } else {
          item[0] = item[0] + item[2][0]
          item[1] = item[1] + item[2][1]
        }
      }
    }
    $("canvas").runtimeValue().invoke("setNeedsDisplay")
  }
})

function lengthUp(index) {
  block.splice(index, 1)
  $("label").text = (parseInt($("label").text) + 10).toString()
  play("Coin_1")
}

function random(min, max, jud) {
  if (jud == 0) {
    return parseInt(Math.random() * max, 10) + 1
  } else return (Math.random() * (max - min) + min)
}

function play(sound_name) {
  $audio.play({
    path: "assets/" + sound_name + ".caf"
  })
}

function gameOver() {
  timer.invalidate()
  $motion.stopUpdates()
  $ui.alert({
    title: "游戏结束",
    actions: [{
        title: "退出",
        handler: function() {
          $app.close()
        }
      },
      {
        title: "取消"
      }
    ]
  })
}