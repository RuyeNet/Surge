/*
by Hhdº
欢迎关注Telegram频道:https://t.me/Flow_Script
*/

var y = $device.info.screen.height
var x = $device.info.screen.width
var jud = {
  "right": ["x", "+"],
  "bottom": ["y", "+"],
  "left": ["x", "-"],
  "top": ["y", "-"]
}

let head = [x / 2, 20]
let fortime = 1
let point = [
  [5, 20]
]
let towards = ["right"]
let block = []
let speed = 1

$ui.render({
  props: {
    statusBarHidden: true,
    navBarHidden: true
  },
  views: [{
      type: "canvas",
      layout: $layout.fill,
      events: {
        draw: function(view, ctx) {
          ctx.fillColor = $rgb(250, 201, 34)
          for (var i = 0; i < block.length; i++) {
            ctx.fillRect($rect(block[i][0], block[i][1], 30, 30))
          }
          if (random(350) == 1) {
            var rx = random(x - 30)
            var ry = random(y - 30)
            var rect = $rect(rx, ry, 30, 30)
            ctx.fillRect(rect)
            block.push([rx, ry])
          }
          ctx.setLineWidth(30)
          ctx.strokeColor = $color("black")
          ctx.moveToPoint(head[0], head[1])
          for (var i = 0; i < fortime; i++) {
            var coordinate = point[i]
            ctx.addLineToPoint(coordinate[0], coordinate[1])
          }
          ctx.strokePath()
        }
      }
    },
    {
      type: "button",
      props: {
        id: "top",
        title: "↓"
      },
      layout: function(make, view) {
        make.bottom.inset(10)
        make.left.inset(65)
        make.size.equalTo(55)
      },
      events: {
        tapped(sender) {
          if (towards[0] !== "top") {
            fortime++
            point.unshift([head[0], head[1]])
            towards.unshift("bottom")
          }
        }
      }
    },
    {
      type: "button",
      props: {
        id: "bottom",
        title: "↑"
      },
      layout: function(make, view) {
        make.bottom.equalTo($("top").top).offset(-50)
        make.left.equalTo($("top"))
        make.size.equalTo(55)
      },
      events: {
        tapped(sender) {
          if (towards[0] !== "bottom") {
            fortime++
            point.unshift([head[0], head[1]])
            towards.unshift("top")
          }
        }
      }
    },
    {
      type: "button",
      props: {
        id: "left",
        title: "←"
      },
      layout: function(make, view) {
        make.bottom.inset(60)
        make.left.equalTo(10)
        make.size.equalTo(55)
      },
      events: {
        tapped(sender) {
          if (towards[0] !== "right") {
            fortime++
            point.unshift([head[0], head[1]])
            towards.unshift("left")
          }
        }
      }
    },
    {
      type: "button",
      props: {
        id: "right",
        title: "→"
      },
      layout: function(make, view) {
        make.left.equalTo($("left").right).offset(55)
        make.bottom.equalTo($("left"))
        make.size.equalTo(55)
      },
      events: {
        tapped(sender) {
          if (towards[0] !== "left") {
            fortime++
            point.unshift([head[0], head[1]])
            towards.unshift("right")
          }
        }
      }
    },
    {
      type: "label",
      props: {
        text: "0",
        font: $font("bold", 50)
      },
      layout: function(make, view) {
        make.top.right.inset(10)
      }
    },
    {
      type: "button",
      props: {
        title: "×",
        font: $font("bold", 35),
        titleColor: $color("black"),
        type: 0,
        bgcolor: $color("clear")
      },
      layout: function(make, view) {
        make.top.left.inset(5)
        make.size.equalTo(30)
      },
      events: {
        tapped: () => $app.close()
      }
    }
  ]
})

var timer = $timer.schedule({
  interval: 0.005,
  handler: function() {
    var tail = point[point.length - 1]
    var jd = jud[towards[0]]
    if (jd[0] == "x") {
      if (jd[1] == "+") {
        head = [head[0] + speed, head[1]]
        jdd(jud[towards[towards.length - 1]], tail)
      } else {
        head = [head[0] - speed, head[1]]
        jdd(jud[towards[towards.length - 1]], tail)
      }
    } else {
      if (jd[1] == "+") {
        head = [head[0], head[1] + speed]
        jdd(jud[towards[towards.length - 1]], tail)
      } else {
        head = [head[0], head[1] - speed]
        jdd(jud[towards[towards.length - 1]], tail)
      }
    }
    var lhx = head[0]
    var shx = head[0] - 30
    var lhy = head[1]
    var shy = head[1] - 30
    for (var i = 0; i < block.length; i++) {
      var lbx = block[i][0] + 30
      var sbx = block[i][0]
      var lby = block[i][1] + 30
      var sby = block[i][1]
      if (lhx <= lbx && lhx >= sbx && lhy <= lby && lhy >= sby) {
        block.splice(i, 1)
        lengthUp()
      } else if (shx <= lbx && shx >= sbx && shy <= lby && shy >= sby) {
        block.splice(i, 1)
        lengthUp()
      }
    }
    $("canvas").runtimeValue().invoke("setNeedsDisplay")
    if (head[0] >= x || head[0] <= 0 || head[1] >= y || head[1] <= 0) gameOver()
  }
})

function jdd(jd, tail) {
  if (jd[0] == "x") {
    if (jd[1] == "+") {
      point[point.length - 1] = [tail[0] + 1, tail[1]]
    } else {
      point[point.length - 1] = [tail[0] - 1, tail[1]]
    }
  } else {
    if (jd[1] == "+") {
      point[point.length - 1] = [tail[0], tail[1] + 1]
    } else {
      point[point.length - 1] = [tail[0], tail[1] - 1]
    }
  }
  if (typeof point[point.length - 2] !== "undefined") {
    if (tail[0] == point[point.length - 2][0] && tail[1] == point[point.length - 2][1]) {
      point.pop()
      towards.pop()
      fortime = fortime - 1
    }
  }
}

function lengthUp() {
  $("label").text = (parseInt($("label").text) + 1).toString()
  var tail = point[point.length - 1]
  var jd = jud[towards[0]]
  if (random(10) == 5){
    speed = speed + 1
    $ui.toast("速度增加↑")
  } else if (random(10) == 5 && speed !== 1){
    speed = speed - 1
    $ui.toast("速度降低↓")
  }
  //  if (jd[0] == "x") {
  //      if (jd[1] == "+") {
  //      point[point.length - 1] = [tail[0] - 10, tail[1]]
  //    } else {
  //      point[point.length - 1] = [tail[0] + 10, tail[1]]
  //    }
  //  } else {
  //      if (jd[1] == "+") {
  //      point[point.length - 1] = [tail[0], tail[1] - 10]
  //    } else {
  //      point[point.length - 1] = [tail[0], tail[1] + 10]
  //    }
  //  }
}

function random(max) {
  return parseInt(Math.random() * max, 10) + 1
}

function gameOver() {
  timer.invalidate()
  $ui.alert({
    title: "游戏结束",
    actions: [{
        title: "再来一次",
        handler: function() {
          $app.openExtension($addin.current.name)
        }
      },
      {
        title: "取消"
      }
    ]
  })
}
