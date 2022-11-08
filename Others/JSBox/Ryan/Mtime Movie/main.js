$app.rotateDisabled = true

var _app = require("scripts/app")
$include("scripts/variables")

if (!$file.exists(SETTING_FILE[1][0])) {
  $file.mkdir(SETTING_FILE[1][0])
}

_app.main()