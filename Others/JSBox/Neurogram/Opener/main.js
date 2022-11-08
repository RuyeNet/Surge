var buyMeaCoffee = require('scripts/coffee')

const link = $context.safari ? $context.safari.items.location.href : $context.link || $context.text || $clipboard.text
if (!link) {
    alert("Run Script with Share Extension or Copy a Link First.")
    return
}

var setting = $cache.get("icon")
if (setting) {
    var showIcon = setting.show
} else {
    var showIcon = true
}
var matched = false
const openerJsonData = await $http.get("https://raw.githubusercontent.com/timonus/OpenerManifest/master/openerManifest-v3.json")
const rules = openerJsonData.data.actions
const appsInfo = openerJsonData.data.apps
const browsers = openerJsonData.data.browsers

var listData = []
for (var rule of rules) {
    let regex = new RegExp(rule.regex.replace(/\(\?\i\)/g, ""), "gi")
    let matches = link.match(regex)
    if (matches) {
        matched = true
        let listRows = []
        for (var apps of rule.formats) {
            if (showIcon) {
                var appInfo = await getAppInfo(apps.appIdentifier)
            } else {
                var appInfo = {
                    icon: "",
                    name: await getAppName(apps.appIdentifier)
                }
            }
            if (appInfo != null) {
                listRows.push(
                    {
                        icon: {
                            src: appInfo.icon
                        },
                        title: {
                            text: appInfo.name,
                            info: {
                                formats: apps,
                                regex: rule.regex
                            }
                        }
                    }
                )
            }
        }
        listData.push(
            {
                title: rule.title,
                rows: listRows
            }
        )
    }
}

if (!matched) {
    openInBrowsers()
} else {
    listData.push(
        {
            title: "Open in Browsers",
            rows: [
                {
                    icon: {
                        src: "assets/Safari.jpg"
                    },
                    title: {
                        text: "Browsers",
                        info: "browsers"
                    }
                }
            ]
        }
    )
    appList(listData)
}

async function getAppInfo(appIdentifier) {
    for (var info of appsInfo) {
        if (appIdentifier == info.identifier) {
            if (info.storeIdentifier) {
                let resp = await $http.get("https://itunes.apple.com/lookup?id=" + info.storeIdentifier)
                if (resp.data.resultCount == 0) {
                    var appinfo = null
                } else {
                    let iconUrl = resp.data.results[0].artworkUrl512
                    var appinfo = {
                        icon: iconUrl,
                        name: info.displayName
                    }
                }
            } else {
                var appinfo = {
                    icon: info.iconURL,
                    name: info.displayName
                }
            }
            return appinfo
        }
    }
}

function getAppName(appIdentifier) {
    for (var info of appsInfo) {
        if (appIdentifier == info.identifier) {
            return info.displayName
        }
    }
}

async function openInBrowsers() {
    listData = []
    if (showIcon) {
        let browserIds = browsers.map((browser) => { return browser.storeIdentifier })
        var resp = await $http.get("https://itunes.apple.com/lookup?id=" + browserIds.toString().replace(/^,|,,|,$/, ""))
    }
    let listRows = []
    for (var browser of browsers) {
        if (browser.identifier == "safari") {
            var appInfo = {
                icon: "assets/Safari.jpg",
                name: browser.displayName
            }
        } else {
            if (showIcon) {
                if (resp.data.resultCount == 0) {
                    var appInfo = ""
                } else {
                    for (app of resp.data.results) {
                        if (browser.storeIdentifier == app.trackId) {
                            let iconUrl = app.artworkUrl512
                            var appInfo = {
                                icon: iconUrl,
                                name: browser.displayName
                            }
                            break
                        }
                    }
                }
            } else {
                var appInfo = {
                    icon: "",
                    name: browser.displayName
                }
            }
        }
        if (appInfo) {
            listRows.push(
                {
                    icon: {
                        src: appInfo.icon
                    },
                    title: {
                        text: appInfo.name,
                        info: {
                            formats: browser,
                            regex: browser.regex
                        }
                    }
                }
            )
        }
    }
    listData.push(
        {
            title: "Open in Browsers",
            rows: listRows
        }
    )
    appList(listData)
}

function appList(listData) {
    buyMeaCoffee.showcoffee()
    $ui.render({
        props: {
            id: "mainView",
            navButtons: [
                {
                    icon: "058",
                    handler: function () {
                        buyMeaCoffee.coffee("mainView")
                    }
                },
                {
                    icon: "002",
                    handler: function () {
                        let show = showIcon ? false : true
                        $cache.set("icon", {
                            "show": show
                        })
                        $addin.restart()
                    }
                }
            ]
        },
        views: [{
            type: "list",
            props: {
                grouped: true,
                rowHeight: 64.0,
                footer: {
                    type: "label",
                    props: {
                        height: 20,
                        text: "Opener by Neurogram",
                        textColor: $color("#AAAAAA"),
                        align: $align.center,
                        font: $font(12)
                    }
                },
                template: [
                    {
                        type: "image",
                        props: {
                            id: "icon",
                            smoothRadius: 49 / 4.7
                        },
                        layout: function (make) {
                            make.left.equalTo(15);
                            make.top.bottom.inset(7.5)
                            if (showIcon) {
                                make.width.equalTo(49)
                            } else {
                                make.width.equalTo(0)
                            }
                        }
                    }, {
                        type: "label",
                        props: {
                            id: "title",
                            font: $font(20)
                        },
                        layout: function (make) {
                            if (showIcon) {
                                make.left.equalTo($("icon").right).inset(10)
                            } else {
                                make.left.equalTo($("icon").right).inset(0)
                            }
                            make.centerY.equalTo(("icon"))
                        }
                    }
                ],
                data: listData
            },
            layout: $layout.fill,
            events: {
                didSelect: function (sender, indexPath, data) {
                    if (data.title.info == "browsers") {
                        openInBrowsers()
                    } else {
                        open(data.title.info)
                    }
                }
            }
        }]
    });
}

function open(data) {
    var formats = data.formats
    if (formats.format) {
        let regex = new RegExp(data.regex.replace(/\(\?\i\)/g, ""), "gi")
        let url = link.replace(regex, formats.format)
        openUrl(url)
    } else if (formats.script) {
        runScript(formats.script)
    } else {
        runScript(formats.script2)
    }
}

async function runScript(script) {
    var result = await $browser.exec({
        script: `
  let urlScheme = ""
  ${script.replace(/xmlhttp.open\('GET', url, true\)/, "xmlhttp.open('GET', url, false)")};
  process("${link}", (url) => {
    urlScheme = url
  });
  return urlScheme
  `
    })
    openUrl(result)
}

function openUrl(url) {
    if (url) {
        url.match(/\:\/\//) ? $app.openURL(url) : alert("Oops!")
    } else {
        alert("Oops!")
    }
}