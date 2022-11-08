$app.rotateDisabled = true
if ($app.env != $env.app) {
    let name = $text.URLEncode($addin.current.name.split(".js"))
    $app.openURL("jsbox://run?name=" + name)
} else {
    const app = require('./scripts/app');
    const general = require('/scripts/general');
    if ($context.query.settings) {
        let settingsOldConf = $context.query.settings
        let settingsConf = JSON.parse($file.read("assets/settings.json").string)
        let settingsOldConfKeys = Object.keys(settingsOldConf)
        for (var i = 0; i < settingsOldConfKeys.length; i++) {
            settingsConf[settingsOldConfKeys[i]] = settingsOldConf[settingsOldConfKeys[i]]
        }
        $file.write({
            data: $data({ string: JSON.stringify(settingsConf) }),
            path: "assets/settings.json"
        })
        $delay(0.3, function () {
            app.launch();
        })
    } else {
        if ($cache.get("settings")) {
            app.launch();
        } else {
            general.settings()
        }
    }
}
