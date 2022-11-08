if ($app.env != $env.app && !$context.link) {
    let name = $text.URLEncode($addin.current.name.split(".js"))
    $app.openURL("jsbox://run?name=" + name)
} else {
    if ($cache.get("settings")) {
        const app = require('./scripts/app');
        app.launch();
    } else {
        const settings = require("scripts/settings")
        settings.loadSetting()
    }
}