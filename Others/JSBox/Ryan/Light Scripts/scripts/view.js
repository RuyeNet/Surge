var _action = require("scripts/action")
var _data = require("scripts/data")
var _lan = require("scripts/localization")

$define({
  type: "MainTableViewDelegate: NSObject <UITableViewDelegate>",
  events: {
    "tableView:didSelectRowAtIndexPath:": function(table, indexPath) {
      table.$deselectRowAtIndexPath_animated(indexPath, true)
      var data = table.rawValue().object(indexPath.rawValue())
      _action.run(data.NAME.text)
    },
    "tableView:heightForRowAtIndexPath:": function(table, indexPath) {
      var summary = table.rawValue().object(indexPath.rawValue()).SUMMARY.text
      $("ROWHEIGHT").text = summary
      var height = $("ROWHEIGHT").contentSize.height
      if (height > 70) height = 70
      return 70 + height
    },
    "tableView:editActionsForRowAtIndexPath:": function(table, indexPath) {
      var isHighlighted = table.$cellForRowAtIndexPath(indexPath).$isHighlighted()
      if (isHighlighted) return []

      var handler = $block("void, UITableViewRowAction *, NSIndexPath *", function(action, indexPath) {
        var data = table.rawValue().object(indexPath.rawValue())
        options(data)
      })
      var action = $objc("UITableViewRowAction").$rowActionWithStyle_title_handler(1, _lan.l10n("more"), handler)
      action.$setBackgroundColor($color("#EFF1F1"))
      return [action]
    },
    "tableView:didHighlightRowAtIndexPath:": function(table, indexPath) {
      $ui.animate({
        duration: 0.3,
        animation: function() {
          table.rawValue().cell(indexPath.rawValue()).scale(0.95)
        }
      })
    },
    "tableView:didUnhighlightRowAtIndexPath:": function(table, indexPath) {
      $ui.animate({
        duration: 0.3,
        animation: function() {
          table.rawValue().cell(indexPath.rawValue()).scale(1)
        }
      })
    },
    "tableView:willDisplayCell:forRowAtIndexPath:": function(table, cell, indexPath) {
      if (cell.$selectionStyle()) {
        cell.$setSelectionStyle(0)
      }
    },
    "scrollViewDidEndDragging:willDecelerate:": function(scroll, decelerate) {
      var offset = scroll.$contentOffset().y
      if (decelerate === false) {
        var top = offset > 0 && offset <= 25 ? 0 : (offset > 25 && offset < 50 ? 50 : null)
        if (top == null) return
        scroll.$setContentOffset_animated($point(0, top), true)
      } else {
        if (offset < -100) {
          _data.search()
        }
      }
    },
    "scrollViewDidEndDecelerating:": function(scroll) {
      var offset = scroll.$contentOffset().y
      var top = offset <= 25 ? 0 : (offset > 25 && offset < 50 ? 50 : null)
      if (top == null) return
      scroll.$setContentOffset_animated($point(0, top), true)
    },
    "scrollViewShouldScrollToTop:": function(scroll) {
      scroll.$setContentOffset_animated($point(0, 50), true)
    }
  }
})
var delegate = $objc("MainTableViewDelegate").$new()

const TEMPLATE = {
  props: {
    bgcolor: $color("#EFF1F1"),
    //selectedBackgroundView: $ui.create()
  },
  views: [{
    type: "view",
    props: {
      clipsToBounds: false,
      bgcolor: $color("white")
    },
    layout: function(make, view) {
      make.top.bottom.inset(10)
      make.left.right.inset(15)
      shadow(view)
    },
    views: [{
        type: "image",
        props: {
          id: "ICON",
          bgcolor: $color("clear")
        },
        layout: function(make) {
          make.size.equalTo($size(20, 20))
          make.top.inset(15)
          make.left.inset(20)
        }
      },
      {
        type: "label",
        props: {
          id: "NAME",
          font: $font("bold", 20),
          textColor: $color("darkGray")
        },
        layout: function(make, view) {
          var pre = view.prev
          make.centerY.equalTo(pre.centerY)
          make.left.equalTo(pre.right).offset(20)
        }
      },
      {
        type: "label",
        props: {
          id: "SUMMARY",
          numberOfLines: 3,
          font: $font(15),
          textColor: $color("#AAAAAA")
        },
        layout: function(make, view) {
          var pre = view.prev
          make.top.equalTo(pre.bottom).offset(10)
          make.left.right.inset(20)
        }
      }
    ]
  }]
}

const HEADER = {
  type: "view",
  props: {
    height: 50
  },
  views: [{
    type: "tab",
    props: {
      id: "MENU",
      items: [_lan.l10n("tab_all"), _lan.l10n("tab_app"), _lan.l10n("tab_extension")],
      index: $app.env & 12 ? 2 : 0
    },
    layout: function(make) {
      make.centerY.equalTo()
      make.left.right.inset(50)
    },
    events: {
      changed: function(sender) {
        var idx = sender.index
        if (idx === 0) {
          $("MAIN").data = $("MAIN").info
        } else {
          var type = [0, 1, 4]
          _data.category(type[idx])
        }
      }
    }
  }]
}

function options(data) {
  $ui.action({
    title: data.NAME.text,
    message: "by " + data.AUTHOR,
    actions: [{
        title: _lan.l10n("action_button_preview"),
        handler: function() {
          _action.preview(data.NAME.text)
        }
      },
      {
        title: _lan.l10n("action_button_description"),
        handler: function() {
          var md = `${data.DESCRIPTION}[${data.AUTHOR}](${data.PROFILE})`
          _action.description(md)
        }
      }
    ]
  })
}

function render() {
  $ui.render({
    views: [{
        type: "text",
        props: {
          id: "ROWHEIGHT",
          font: $font(15)
        },
        layout: function(make) {
          make.top.inset(0)
          make.left.right.inset(26) // 15+20-9
        }
      },
      {
        type: "list",
        props: {
          id: "MAIN",
          bgcolor: $color("#EFF1F1"),
          separatorHidden: true,
          template: TEMPLATE,
          header: HEADER,
          actions: [{
            title: _lan.l10n("more"),
            handler: function(sender, indexPath) {
              var data = sender.object(indexPath)
              options(data)
            }
          }]
        },
        layout: $layout.fill
      }
    ]
  })

  $("MAIN").runtimeValue().$setDelegate(delegate)
}

function shadow(view) {
  var layer = view.runtimeValue().$layer()
  layer.$setCornerRadius(10)
  layer.$setShadowOffset($size(3, 3))
  layer.$setShadowColor($color("gray").runtimeValue().invoke("CGColor"))
  layer.$setShadowOpacity(0.3)
  layer.$setShadowRadius(5)
}

module.exports = {
  render: render
}