var _action = require("scripts/action")

function render() {
  $ui.render({
    props: {
      navButtons: [{
        icon: "027",
        handler: function() {
          _action.delete()
        }
      }]
    },
    views: [{
      type: "matrix",
      props: {
        id: "photos",
        square: true,
        columns: 5,
        spacing: 1,
        template: [{
            type: "image",
            props: {
              id: "img"
            },
            layout: $layout.fill,
            views: [{
              type: "label",
              props: {
                id: "type",
                font: $font(8),
                smoothRadius: 3,
                align: $align.center,
                textColor: $color("white"),
                bgcolor: $color("black"),
                alpha: 0.7
              },
              layout: function(make) {
                make.height.equalTo(15)
                make.width.equalTo(25)
                make.centerX.equalTo()
                make.bottom.inset(4)
              }
            }]
          },
          {
            type: "canvas",
            props: {
              id: "selected",
              hidden: true
            },
            layout: $layout.fill,
            events: {
              draw: function(view, ctx) {
                var width = view.frame.width
                var height = view.frame.height
                /* Blur view */
                ctx.fillColor = $color("white")
                ctx.setAlpha(0.3)
                ctx.fillRect($rect(0, 0, height, width))
                /* Stroke */
                ctx.setAlpha(1)
                ctx.strokeColor = $color("tint") // #DF565D
                ctx.fillColor = $color("tint") // #DF565D
                ctx.setLineWidth(5)
                ctx.strokeRect($rect(0, 0, height, width))
                /* Full Circle */
                ctx.addArc(width - 15, height - 15, 10, 0, Math.PI * 2, true)
                ctx.fillPath()
                /* Edges of Circle */
                ctx.setLineWidth(1)
                ctx.strokeColor = $color("white")
                ctx.addArc(width - 15, height - 15, 10, 0, Math.PI * 2, true)
                ctx.strokePath()
                /* Checkmark */
                ctx.setLineWidth(1.5)
                ctx.moveToPoint(width - 20.5, height - 14.4)
                ctx.addLineToPoint(width - 17.2, height - 11.3)
                ctx.addLineToPoint(width - 10, height - 18.5)
                ctx.strokePath()
              }
            }
          }
        ]
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath) {
          var data = sender.data
          data[indexPath.row].selected.hidden = !data[indexPath.row].selected.hidden
          sender.data = data
        },
        longPressed: function(sender) {
          var point = sender.location.runtimeValue().invoke("CGPointValue")
          var indexPath = sender.sender.runtimeValue().invoke("indexPathForItemAtPoint", point)
          
          if (!indexPath) return
          
          $device.taptic(0)
          var data = sender.sender.object(indexPath.rawValue())
          _action.original(data.asset)
        }
      }
    }]
  })
}

module.exports = {
  render: render
}