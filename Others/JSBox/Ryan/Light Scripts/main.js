$app.tips("目前区分主应用和分享扩展两种运行方式的脚本，顶部 Tab 可切换；\n强下拉可激活搜索输入框。")

var _view = require("scripts/view")
var _data = require("scripts/data")

_view.render()
_data.getConfig()

$app.listen({
  exist: function() {
    $app.autoKeyboardEnabled = false
    $app.keyboardToolbarEnabled = false
  }
})