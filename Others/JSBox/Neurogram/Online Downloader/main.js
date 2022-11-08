if ($app.env == $env.today) {
    let name = $addin.current.name.split(".js")
    $app.openURL("jsbox://run?name=" + $text.URLEncode(name[0]))
} else {
    var app = require('./scripts/app');
    app.urlCheck();
}