var app = require("./scripts/app");

if ($app.env == $env.app) {
    app.launch();
} else if ($app.env == $env.today) {
    let index = $app.widgetIndex;
    if (index == -1) {
        app.launcher("");
    } else {
        app.widgets()
    }
}