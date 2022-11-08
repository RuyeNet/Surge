/*
单击屏幕即可开始倒计时
倒计时过程中单击可暂停，双击以停止计时
空闲状态长按屏幕可更改倒计时秒数

特别感谢 @Eva1ent 和 @wind 的帮助使我简化了很多代码

by Hhdº
*/

progress = 1
timer = ""
state = 0
$ui.render({
  props: {
    id: "window"
  },
  views: [{
    type: "canvas",
    layout: $layout.fill,
    events: {
      draw: function(view, ctx) {
        var lineWidth = 7
        var radius = 50
        var x = view.frame.width / 2
        var y = view.frame.height / 2
        var startAngle = Math.PI * 1.5
        var endAngle = Math.PI * 2
        ctx.strokeColor = $color("#e7e7e7")
        ctx.setLineWidth(lineWidth)
        ctx.addArc(x, y, radius, 0, endAngle, false)
        ctx.strokePath()
        ctx.strokeColor = $color("black")
        ctx.setLineWidth(lineWidth)
        ctx.addArc(x, y, radius, startAngle, (endAngle) * progress + startAngle, false)
        ctx.strokePath()
      },
      tapped: function(sender) {
        switch (state) {
          case 0:
            state = 1
            timer = $timer.schedule({
              interval: 0.01,
              handler: function() {
                var once = (1 / second) * 0.01
                var index = progress - once
                if (index <= 0) {
                  progress = 0
                  state = 2
                  timer.invalidate()
                } else {
                  progress = index
                  $("label").text = (index * second).toFixed(0).toString()
                }
                redraw(sender)
              }
            })
            break
          case 1:
            timer.invalidate()
            state = 0
            break
          case 2:
            state = 0
            progress = 1
            timer = ""
            $("label").text = second
            redraw(sender)
            break
        }
      },
      longPressed: function() {
        if (timer == "") {
          console.log(timer)
          $input.text({
            placeholder: "输入倒计时的秒数",
            handler: function(text) {
              $cache.set("second", parseInt(text))
              second = parseInt(text)
              $("label").text = text
            }
          })
        }
      },
      doubleTapped: function(sender) {
        timer.invalidate()
        state = 0
        progress = 1
        timer = ""
        $("label").text = second
        redraw(sender)
      }
    },
    views: [{
      type: "label",
      props: {
        text: "30",
        font: $font(30),
        align: $align.center
      },
      layout: function(make, view) {
        make.center.equalTo(view.super)
      }
    }]
  }]
})

second = $cache.get("second")
if (second) {
  $("label").text = second.toString()
} else {
  second = 30
}

function redraw(id) { id.runtimeValue().invoke("setNeedsDisplay") }

$app.tips(`单击屏幕即可开始倒计时
倒计时过程中单击可暂停，双击以停止计时
空闲状态长按屏幕可更改倒计时秒数`)
