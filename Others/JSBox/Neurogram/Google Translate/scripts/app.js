const buyMeaCoffee = require('scripts/coffee')
buyMeaCoffee.showcoffee()

const allLangCN = ["自动识别", "阿尔巴尼亚语", "阿拉伯语", "阿姆哈拉语", "阿塞拜疆语", "爱尔兰语", "爱沙尼亚语", "巴斯克语", "白俄罗斯语", "保加利亚语", "冰岛语", "波兰语", "波斯尼亚语", "波斯语", "丹麦语", "德语", "俄语", "法语", "菲律宾语", "芬兰语", "弗里斯兰语", "高棉语", "格鲁吉亚语", "古吉拉特语", "哈萨克语", "海地克里奥尔语", "韩语", "豪萨语", "荷兰语", "吉尔吉斯语", "加利西亚语", "加泰罗尼亚语", "捷克语", "卡纳达语", "科萨语", "科西嘉语", "克罗地亚语", "库尔德语", "拉丁语", "拉脱维亚语", "老挝语", "立陶宛语", "卢森堡语", "罗马尼亚语", "马尔加什语", "马耳他语", "马拉雅拉姆语", "马拉语", "马来语", "马其顿语", "毛利语", "蒙古语", "孟加拉语", "缅甸语", "苗语", "南非荷兰语", "尼泊尔语", "挪威语", "旁遮普语", "葡萄牙语", "普什图语", "奇切瓦语", "日语", "瑞典语", "萨摩亚语", "塞尔维亚语", "塞索托语", "僧伽罗语", "绍纳语", "世界语", "斯洛伐克语", "斯洛文尼亚语", "斯瓦希里语", "苏格兰盖尔语", "索马里语", "塔吉克语", "泰卢固语", "泰米尔语", "泰语", "土耳其语", "威尔士语", "乌尔都语", "乌克兰语", "乌兹别克语", "西班牙语", "希伯来语", "希腊语", "夏威夷语", "信德语", "匈牙利语", "宿务语", "巽他语", "亚美尼亚语", "伊博语", "意大利语", "意第绪语", "印地语", "印度尼西亚语", "英语", "约鲁巴语", "越南语", "爪哇语", "中文（繁体）", "中文（简体）", "祖鲁语"]
const allLangEN = ["Auto", "Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Azerbaijani", "Basque", "Belarusian", "Bengali", "Bosnian", "Bulgarian", "Catalan", "Cebuano", "Chichewa", "Chinese (Simplified)", "Chinese (Traditional)", "Corsican", "Croatian", "Czech", "Danish", "Dutch", "English", "Esperanto", "Estonian", "Filipino", "Finnish", "French", "Frisian", "Galician", "Georgian", "German", "Greek", "Gujarati", "Haitian Creole", "Hausa", "Hawaiian", "Hebrew", "Hindi", "Hmong", "Hungarian", "Icelandic", "Igbo", "Indonesian", "Irish", "Italian", "Japanese", "Javanese", "Kannada", "Kazakh", "Khmer", "Korean", "Kurdish (Kurmanji)", "Kyrgyz", "Lao", "Latin", "Latvian", "Lithuanian", "Luxembourgish", "Macedonian", "Malagasy", "Malay", "Malayalam", "Maltese", "Maori", "Marathi", "Mongolian", "Myanmar (Burmese)", "Nepali", "Norwegian", "Pashto", "Persian", "Polish", "Portuguese", "Punjabi", "Romanian", "Russian", "Samoan", "Scots Gaelic", "Serbian", "Sesotho", "Shona", "Sindhi", "Sinhala", "Slovak", "Slovenian", "Somali", "Spanish", "Sundanese", "Swahili", "Swedish", "Tajik", "Tamil", "Telugu", "Thai", "Turkish", "Ukrainian", "Urdu", "Uzbek", "Vietnamese", "Welsh", "Xhosa", "Yiddish", "Yoruba", "Zulu"]
const langCodesCN = ["auto", "sq", "ar", "am", "az", "ga", "et", "eu", "be", "bg", "is", "pl", "bs", "fa", "da", "de", "ru", "fr", "tl", "fi", "fy", "km", "ka", "gu", "kk", "ht", "ko", "ha", "nl", "ky", "gl", "ca", "cs", "kn", "xh", "co", "hr", "ku", "la", "lv", "lo", "lt", "lb", "ro", "mg", "mt", "ml", "mr", "ms", "mk", "mi", "mn", "bn", "my", "hmn", "af", "ne", "no", "pa", "pt", "ps", "ny", "ja", "sv", "sm", "sr", "st", "si", "sn", "eo", "sk", "sl", "sw", "gd", "so", "tg", "te", "ta", "th", "tr", "cy", "ur", "uk", "uz", "es", "iw", "el", "haw", "sd", "hu", "ceb", "su", "hy", "ig", "it", "yi", "hi", "id", "en", "yo", "vi", "jw", "zh-TW", "zh-CN", "zu"]
const langCodesEN = ["auto", "af", "sq", "am", "ar", "hy", "az", "eu", "be", "bn", "bs", "bg", "ca", "ceb", "ny", "zh-CN", "zh-TW", "co", "hr", "cs", "da", "nl", "en", "eo", "et", "tl", "fi", "fr", "fy", "gl", "ka", "de", "el", "gu", "ht", "ha", "haw", "iw", "hi", "hmn", "hu", "is", "ig", "id", "ga", "it", "ja", "jw", "kn", "kk", "km", "ko", "ku", "ky", "lo", "la", "lv", "lt", "lb", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mn", "my", "ne", "no", "ps", "fa", "pl", "pt", "pa", "ro", "ru", "sm", "gd", "sr", "st", "sn", "sd", "si", "sk", "sl", "so", "es", "su", "sw", "sv", "tg", "ta", "te", "th", "tr", "uk", "ur", "uz", "vi", "cy", "xh", "yi", "yo", "zu"]
const lightColor = ["#efeff4", "#080a0b", "093", "#f1bd00", "#080a0b", "#ffffff", "assets/speakLight.png", "assets/stopLight.png", "assets/copyLight.png", "#aaaaaa", "assets/googleLight.png"]
const darkColor = ["#191923", "#fbfbfb", "092", "#23c684", "#aab0ca", "#2b2d39", "assets/speakDark.png", "assets/stopDark.png", "assets/copyDark.png", "#7c7d83", "assets/googleDark.png"]

if ($app.env == $env.keyboard) {
    $keyboard.barHidden = true
    $keyboard.height = 267;
}
$app.autoKeyboardEnabled = true

if ($l10n("COFFEE") == "Coffee") {
    var allLang = allLangEN
    var langCodes = langCodesEN
    var hlang = "en"
} else {
    var allLang = allLangCN
    var langCodes = langCodesCN
    var hlang = "zh-CN"
}

var theme = $cache.get("theme")
if (theme) {
    var themeColor = theme.color == "dark" ? darkColor : lightColor
} else {
    $cache.set("theme", {
        "color": "light"
    })
    var themeColor = lightColor
}

$ui.render({
    props: {
        id: "mainView",
        navBarHidden: 1,
        statusBarStyle: themeColor == darkColor ? 1 : 0,
        homeIndicatorHidden: 1,
        bgcolor: $color(themeColor[0])
    },
    views: [{
        type: "view",
        props: {
            bgcolor: $color("clear")
        },
        layout: function (make, view) {
            make.top.left.right.inset(0)
            make.bottom.equalTo(view.super.topMargin).offset(40)
        },
        views: [{
            type: "label",
            props: {
                text: "Translate",
                bgcolor: $color("clear"),
                font: $font(".SFUIText-Bold", 30),
                textColor: $color(themeColor[1]),
                hidden: $app.env == $env.app ? 0 : 1
            },
            layout: function (make, view) {
                make.centerX.equalTo(view.super)
                make.top.equalTo(view.super.topMargin)
            },
            events: {
                tapped: function (sender) {
                    easterEggs()
                }
            }
        }, {
            type: "button",
            props: {
                bgcolor: $color("clear"),
                icon: $icon(themeColor[2], $color(themeColor[3]), $size(20, 20)),
                hidden: $app.env == $env.app ? 0 : 1
            },
            layout: function (make, view) {
                make.right.inset(55)
                make.top.equalTo(view.super.topMargin).inset(10)
            },
            events: {
                tapped: function (sender) {
                    $device.taptic(2)
                    themeSwitch()
                }
            }
        }, {
            type: "button",
            props: {
                id: "coffeeBt",
                [themeColor == darkColor ? "icon" : "src"]: themeColor == darkColor ? $icon("058", $color(themeColor[3])) : "assets/coffeeLight.png",
                bgcolor: $color("clear"),
                hidden: $app.env == $env.app ? 0 : 1
            },
            layout: function (make, view) {
                make.right.inset(15)
                make.top.equalTo(view.super.topMargin).inset(10)
                make.size.equalTo($size(20, 20))
            },
            events: {
                tapped: function (sender) {
                    $device.taptic(2)
                    $("slangText").blur()
                    buyMeaCoffee.coffee("mainView")
                }
            }
        }]
    }, {
        type: "button",
        props: {
            id: "switchBt",
            title: "⇌",
            font: $font(".SFUIText-Bold", 20),
            bgcolor: $color("clear"),
            titleColor: $color(themeColor[4])
        },
        layout: function (make, view) {
            make.centerX.equalTo(view.super)
            if ($app.env == $env.app) {
                make.top.equalTo(view.super.topMargin).inset(55)
            } else {
                make.top.equalTo(view.super.topMargin)
            }
            make.size.equalTo($size(40, 40))
        },
        events: {
            tapped: function (sender) {
                $device.taptic(2)
                switchLang()
            },
            doubleTapped: function (info) {
                $device.taptic(2)
                $app.close()
            }
        }
    }, {
        type: "label",
        props: {
            id: "slang",
            font: $font(".SFUIText-Bold", 20),
            align: $align.center,
            autoFontSize: 1,
            textColor: $color(themeColor[4])
        },
        layout: function (make, view) {
            make.left.inset(15)
            make.right.equalTo($("switchBt").left).inset(15)
            make.centerY.equalTo($("switchBt").centerY)
            make.height.equalTo(25)
        },
        events: {
            tapped: function (sender) {
                $device.taptic(2)
                $("slangText").blur()
                langPick()
            }
        }
    }, {
        type: "label",
        props: {
            id: "tlang",
            font: $font(".SFUIText-Bold", 20),
            align: $align.center,
            autoFontSize: 1,
            textColor: $color(themeColor[4])
        },
        layout: function (make, view) {
            make.right.inset(15)
            make.left.equalTo($("switchBt").right).inset(15)
            make.centerY.equalTo($("switchBt").centerY)
            make.height.equalTo(25)
        },
        events: {
            tapped: function (sender) {
                $device.taptic(2)
                $("slangText").blur()
                langPick()
            }
        }
    }, {
        type: "view",
        props: {
            id: "slangView",
            radius: 10,
            bgcolor: $color(themeColor[5]),
            hidden: $app.env == $env.keyboard ? 1 : 0
        },
        layout: function (make, view) {
            make.left.right.inset(15)
            make.height.equalTo(150)
            make.top.equalTo($("switchBt").bottom).inset(15)
        },
        views: [{
            type: "text",
            props: {
                id: "slangText",
                bgcolor: $color("clear"),
                textColor: $color(themeColor[4]),
                font: $font(".SFUIText", 15),
                darkKeyboard: themeColor == darkColor ? 1 : 0,
                accessoryView: {
                    type: "view",
                    props: {
                        height: 40,
                        bgcolor: $color("clear")
                    },
                    views: [{
                        type: "button",
                        props: {
                            bgcolor: $color("clear"),
                            icon: $icon("179", $color(themeColor[3]), $size(30, 30))
                        },
                        layout: function (make, view) {
                            make.centerY.equalTo(view.super)
                            make.right.inset(15)
                        },
                        events: {
                            tapped: function (sender) {
                                $device.taptic(2)
                                if ($("tlangList")) {
                                    $("tlangList").remove()
                                }
                                translate()
                                $("slangText").blur()
                            }
                        }
                    }]
                }
            },
            layout: function (make, view) {
                make.top.left.inset(10)
                make.right.inset(35)
                make.bottom.inset(10)
            },
            events: {
                doubleTapped: function (sender) {
                    $device.taptic(2)
                    $("slangText").blur()
                    textFullView("slangText")
                }
            }
        }, {
            type: "text",
            props: {
                id: "slangPNText",
                editable: 0,
                bgcolor: $color("clear"),
                textColor: $color(themeColor[9]),
                font: $font(".SFUIText", 12),
                hidden: 1
            },
            layout: function (make, view) {
                make.left.bottom.inset(10)
                make.right.inset(35)
                make.height.equalTo(35)
            },
            events: {
                doubleTapped: function (sender) {
                    $device.taptic(2)
                    $("slangText").blur()
                    textFullView("slangPNText")
                }
            }
        }, {
            type: "button",
            props: {
                id: "slangSBT",
                bgcolor: $color("clear"),
                src: themeColor[6]
            },
            layout: function (make, view) {
                make.top.right.inset(10)
                make.size.equalTo($size(20, 20))
            },
            events: {
                tapped: function (sender) {
                    $device.taptic(2)
                    $("slangText").blur()
                    speaker("slangSBT")
                }
            }
        }, {
            type: "button",
            props: {
                bgcolor: $color("clear"),
                src: themeColor[8]
            },
            layout: function (make, view) {
                make.right.inset(10)
                make.top.inset(40)
                make.size.equalTo($size(18, 18))
            },
            events: {
                tapped: function (sender) {
                    $device.taptic(2)
                    $("slangText").blur()
                    $clipboard.text = $("slangText").text
                }
            }
        }]
    }]
})

var langhistory = $cache.get("langhistory")
if (langhistory && hlang == langhistory.hlang) {
    $("slang").text = allLang[langhistory.slang]
    $("tlang").text = allLang[langhistory.tlang]
} else {
    $("slang").text = allLang[0]
    $("tlang").text = hlang == "en" ? allLang[15] : allLang[103]
    langCache()
}

function tlangListView(data) {
    let tlangTextHeight = textSize(data.tlangText, $font(".SFUIText", 15), 10)

    if (data.tlangPNText) {
        tlangTextHeight = tlangTextHeight + 35
    }
    if (tlangTextHeight < 130) {
        tlangTextHeight = 130
    } else if (tlangTextHeight > 180) {
        tlangTextHeight = 180
    }

    let slangTextHeight = textSize($("slangText").text, $font(".SFUIText", 15), 10)

    if (data.slangPNText) {
        slangTextHeight = slangTextHeight + 35
    }
    if (slangTextHeight < 120) {
        slangTextHeight = 120
    } else if (slangTextHeight > 150) {
        slangTextHeight = 150
    }

    $("slangView").updateLayout(function (make) {
        make.left.right.inset(15)
        make.height.equalTo(slangTextHeight)
        make.top.equalTo($("switchBt").bottom).inset(15)
    })

    let listData = []
    let textData = []
    if (data.tlangText) {
        let tlangView = {
            type: "view",
            props: {
                bgcolor: $color("clear")
            },
            layout: $layout.fill,
            views: [{
                type: "view",
                props: {
                    id: "tlangView",
                    radius: 10,
                    bgcolor: $color(themeColor[5])
                },
                layout: function (make, view) {
                    make.left.right.inset(15)
                    make.height.equalTo(tlangTextHeight - 10)
                    make.top.inset(0)
                },
                views: [{
                    type: "text",
                    props: {
                        id: "tlangText",
                        text: data.tlangText,
                        editable: 0,
                        bgcolor: $color("clear"),
                        textColor: $color(themeColor[4]),
                        font: $font(".SFUIText", 15),
                    },
                    layout: function (make, view) {
                        make.top.left.inset(10)
                        make.right.inset(35)
                        make.bottom.inset(10)
                    },
                    events: {
                        doubleTapped: function (sender) {
                            $device.taptic(2)
                            $("slangText").blur()
                            textFullView("tlangText")
                        }
                    }
                }, {
                    type: "text",
                    props: {
                        id: "tlangPNText",
                        editable: 0,
                        bgcolor: $color("clear"),
                        textColor: $color(themeColor[9]),
                        font: $font(".SFUIText", 12),
                        hidden: 1
                    },
                    layout: function (make, view) {
                        make.left.bottom.inset(10)
                        make.right.inset(35)
                        make.height.equalTo(35)
                    },
                    events: {
                        doubleTapped: function (sender) {
                            $device.taptic(2)
                            $("slangText").blur()
                            textFullView("tlangPNText")
                        }
                    }
                }, {
                    type: "button",
                    props: {
                        id: "tlangSBT",
                        bgcolor: $color("clear"),
                        src: themeColor[6]
                    },
                    layout: function (make, view) {
                        make.top.right.inset(10)
                        make.size.equalTo($size(20, 20))
                    },
                    events: {
                        tapped: function (sender) {
                            $device.taptic(2)
                            $("slangText").blur()
                            speaker("tlangSBT")
                        }
                    }
                }, {
                    type: "button",
                    props: {
                        bgcolor: $color("clear"),
                        src: themeColor[8]
                    },
                    layout: function (make, view) {
                        make.right.inset(10)
                        make.top.inset(40)
                        make.size.equalTo($size(18, 18))
                    },
                    events: {
                        tapped: function (sender) {
                            $device.taptic(2)
                            $("slangText").blur()
                            $clipboard.text = $("tlangText").text
                        }
                    }
                }, {
                    type: "button",
                    props: {
                        bgcolor: $color("clear"),
                        src: themeColor[10],
                        hidden: $app.env == $env.keyboard ? 0 : 1
                    },
                    layout: function (make, view) {
                        make.right.inset(10)
                        make.top.inset(68)
                        make.size.equalTo($size(18, 18))
                    },
                    events: {
                        tapped: function (sender) {
                            $device.taptic(2)
                            if ($("tlangList")) {
                                $("tlangList").remove()
                            }
                            translate()
                        }
                    }
                }]
            }]
        }
        listData.push(tlangView)
    }

    if (data.dictHtml) {
        let alternateView = {
            type: "view",
            props: {
                bgcolor: $color("clear")
            },
            layout: $layout.fill,
            views: [
                {
                    type: "view",
                    props: {
                        bgcolor: $color(themeColor[5]),
                        radius: 10,
                    },
                    layout: function (make, view) {
                        make.edges.insets($insets(0, 15, 10, 15))
                    },
                    views: [{
                        type: "web",
                        props: {
                            radius: 10,
                            transparent: 1,
                            showsProgress: 0,
                            html: data.dictHtml
                        },
                        layout: function (make, view) {
                            make.edges.insets($insets(10, 15, 5, 15))
                        }
                    }]
                }
            ]
        }
        listData.push(alternateView)
        textData.push(data.dictText)
    }

    if (data.defiHtml) {
        let definitionView = {
            type: "view",
            props: {
                bgcolor: $color("clear")
            },
            layout: $layout.fill,
            views: [
                {
                    type: "view",
                    props: {
                        bgcolor: $color(themeColor[5]),
                        radius: 10,
                    },
                    layout: function (make, view) {
                        make.edges.insets($insets(0, 15, 10, 15))
                    },
                    views: [{
                        type: "web",
                        props: {
                            radius: 10,
                            transparent: 1,
                            showsProgress: 0,
                            html: data.defiHtml
                        },
                        layout: function (make, view) {
                            make.edges.insets($insets(10, 15, 5, 15))
                        }
                    }]
                }
            ]
        }
        listData.push(definitionView)
        textData.push(data.defiText)
    }

    if (data.exampleHtml) {
        let exampleView = {
            type: "view",
            props: {
                bgcolor: $color("clear")
            },
            layout: $layout.fill,
            views: [
                {
                    type: "view",
                    props: {
                        bgcolor: $color(themeColor[5]),
                        radius: 10,
                    },
                    layout: function (make, view) {
                        make.edges.insets($insets(0, 15, 10, 15))
                    },
                    views: [{
                        type: "web",
                        props: {
                            radius: 10,
                            transparent: 1,
                            showsProgress: 0,
                            html: data.exampleHtml
                        },
                        layout: function (make, view) {
                            make.edges.insets($insets(10, 15, 5, 15))
                        }
                    }]
                }
            ]
        }
        listData.push(exampleView)
        textData.push(data.exampleText)
    }

    let listView = {
        type: "list",
        props: {
            id: "tlangList",
            bgcolor: $color("clear"),
            separatorHidden: 1,
            data: [{
                rows: listData
            }],
            footer: {
                type: "label",
                props: {
                    height: 20,
                    text: "Google Translate by Neurogram",
                    textColor: $color(themeColor[9]),
                    align: $align.center,
                    font: $font(".SFUIText", 12)
                }
            }
        },
        layout: function (make, view) {
            make.width.equalTo(view.super)
            if ($app.env == $env.keyboard) {
                make.top.equalTo($("switchBt").bottom).inset(15)
            } else {
                make.top.equalTo($("slangView").bottom).inset(10)
            }
            make.bottom.inset(0)
        },
        events: {
            rowHeight: function (sender, indexPath) {
                if (indexPath.row == 0) {
                    return tlangTextHeight
                } else if (indexPath.row == 1) {
                    return textSize(textData[0], $font("Georgia", 12), 1)
                } else if (indexPath.row == 2) {
                    return textSize(textData[1], $font("Georgia", 12), 1)
                } else {
                    return textSize(textData[2], $font("Georgia", 12), 1)
                }
            }
        }
    }

    $("mainView").add(listView)

    if (data.tlangPNText) {
        $("tlangPNText").hidden = 0
        $("tlangPNText").text = data.tlangPNText
        $("tlangText").updateLayout(function (make) {
            make.top.left.inset(10)
            make.right.inset(35)
            make.bottom.inset(50)
        })
    }

    if (data.slangPNText) {
        $("slangPNText").hidden = 0
        $("slangPNText").text = data.slangPNText
        $("slangText").updateLayout(function (make) {
            make.top.left.inset(10)
            make.right.inset(35)
            make.bottom.inset(50)
        })
    }

}

function themeSwitch() {
    let color = themeColor == darkColor ? "light" : "dark"
    $cache.set("theme", {
        "color": color
    })
    $addin.restart()
}

function launch() {
    if ($clipboard.text) {
        $("slangText").text = $clipboard.text
        translate()
    }
}

module.exports = {
    launch: launch
}

async function translate() {
    let sl = allLang.indexOf($("slang").text)
    let tl = allLang.indexOf($("tlang").text)
    if ($app.env == $env.keyboard) {
        var sltext = $keyboard.selectedText ? $keyboard.selectedText : $clipboard.text
    } else if ($("slangText")) {
        var sltext = $("slangText").text
    }
    let resp = await $http.get({
        url: `https://translate.google.cn/translate_a/single?client=it&dt=t&dt=rmt&dt=bd&dt=rms&dt=qca&dt=ss&dt=md&dt=ld&dt=ex&otf=2&dj=1&q=${$text.URLEncode(sltext)}&hl=${hlang}&ie=UTF-8&oe=UTF-8&sl=${langCodes[sl]}&tl=${langCodes[tl]}`,
        header: {
            "User-Agent": "GoogleTranslate/5.27.59117 (iPhone; iOS 12.2; en; iPhone10,3)"
        }
    })
    let results = resp.data

    if ($("slang").text == allLang[0]) {
        $("slang").text = resp.data.src ? allLang[langCodes.indexOf(resp.data.src)] : allLang[0]
    }

    let data = {}

    if (results.sentences) {
        let sentences = results.sentences
        let sentencesText = ""
        let translitText = ""
        let src_translitText = ""
        for (let i in sentences) {
            if (sentences[i].src_translit) {
                src_translitText = src_translitText + sentences[i].src_translit + "\n"
                data.slangPNText = src_translitText
            }
            if (sentences[i].translit) {
                translitText = translitText + sentences[i].translit + "\n"
                data.tlangPNText = translitText
            }
            if (sentences[i].trans) {
                sentencesText = sentencesText + sentences[i].trans
                data.tlangText = sentencesText
            }
        }
    }

    if (results.dict) {
        let dictData = results.dict
        let dictHtml = ""
        let dictText = ""
        for (let i in dictData) {
            let dictPos = `<span style="color:${themeColor[3]};font-size:40px;line-height:80px;"><i>${dictData[i].pos}</i></span><br />`
            let dictEntry = ""
            let dictEntryText = ""

            for (let k in dictData[i].entry) {
                dictEntry = dictEntry + `<span style="color:${themeColor[4]};font-size:40px;">&ensp;&ensp;${dictData[i].entry[k].word}</span><br />
                <span style="color:${themeColor[9]};font-size:40px;">&ensp;&ensp;${dictData[i].entry[k].reverse_translation}</span><br /><br />`
                dictEntryText = dictEntryText + `  ${dictData[i].entry[k].word}\n  ${dictData[i].entry[k].reverse_translation}\n\n`
            }

            dictHtml = dictHtml + dictPos + dictEntry
            dictText = dictText + dictData[i].pos + "\n" + dictEntryText
        }
        data.dictHtml = `<span style="color:${themeColor[9]};font-size:45px;">${$l10n("TRANSLATIONS")}</span><br />` + dictHtml
        data.dictText = $l10n("TRANSLATIONS") + "\n\n" + dictText
    }

    if (results.definitions) {
        let defiData = results.definitions
        let defiHtml = ""
        let defiText = ""
        for (let i in defiData) {
            let defiPos = `<span style="color:${themeColor[3]};font-size:40px;line-height:80px;"><i>${defiData[i].pos}</i></span><br />`
            let defiEntry = ""
            let defiEntryText = ""

            for (let k in defiData[i].entry) {
                defiEntry = defiEntry + `<span style="color:${themeColor[4]};font-size:40px;">&ensp;&ensp;${defiData[i].entry[k].gloss}</span><br />
                <span style="color:${themeColor[9]};font-size:40px;">&ensp;&ensp;"${defiData[i].entry[k].example}"</span><br /><br />`
                defiEntryText = defiEntryText + `  ${defiData[i].entry[k].gloss}\n  "${defiData[i].entry[k].example}"\n\n`
            }

            defiHtml = defiHtml + defiPos + defiEntry
            defiText = defiText + defiData[i].pos + "\n" + defiEntryText
        }
        data.defiHtml = `<span style="color:${themeColor[9]};font-size:45px;">${$l10n("DEFINITIONS")}</span><br />` + defiHtml
        data.defiText = $l10n("DEFINITIONS") + "\n\n" + defiText
    }

    if (results.examples) {
        let exampleData = results.examples.example
        let exampleHtml = ""
        let exampleText = ""
        for (let i in exampleData) {
            exampleHtml = exampleHtml + `&ensp;&ensp;❝${exampleData[i].text}<br /><br />`
            exampleText = exampleText + `  ❝${exampleData[i].text}\n\n`
        }

        data.exampleHtml = `<span style="color:${themeColor[9]};font-size:45px;">${$l10n("EXAMPLES")}</span><br /><br />
        <span style="color:${themeColor[4]};font-size:40px;">${exampleHtml}</span>`
        data.exampleText = $l10n("EXAMPLES") + "\n\n" + exampleText
    }
    tlangListView(data)
}

function textSize(text, font, space) {
    var size = $text.sizeThatFits({
        text: text,
        width: $device.info.screen.width - 75,
        font: font,
        lineSpacing: space
    })
    return size.height + 20
}

function switchLang() {
    if ($("slang").text != allLang[0]) {
        let slangText = $("slang").text
        $("slang").text = $("tlang").text
        $("tlang").text = slangText
        langCache()
    }
}

async function langPick() {

    let slangPick = allLang
    if ($("slang").text != allLang[0]) {
        slangPick = [$("slang").text].concat(slangPick)
    }

    let tlangPick = allLang.slice(1)
    if ($("tlang").text != allLang[1]) {
        tlangPick = [$("tlang").text].concat(tlangPick)
    }

    let result = await $pick.data({
        props: {
            items: [slangPick, tlangPick]
        }
    })

    if (result) {
        $("slang").text = result[0]
        $("tlang").text = result[1]
        langCache()
    }

}

async function speaker(type) {
    if ($(type).src == themeColor[6]) {
        $(type).src = themeColor[7]
        let tl = type == "slangSBT" ? allLang.indexOf($("slang").text) : allLang.indexOf($("tlang").text)
        let text = type == "slangSBT" ? $("slangText").text : $("tlangText").text
        let audio = await $http.download({
            url: `https://translate.google.cn/translate_tts?client=it&tl=${langCodes[tl]}&q=${$text.URLEncode(text)}&hl=${hlang}&total=1&idx=0&textlen=${text.length}&prev=target&ie=UTF-8`,
            header: {
                "User-Agent": "GoogleTranslate/5.27.59117 (iPhone; iOS 12.2; en; iPhone10,3)"
            }
        })
        $file.write({
            data: audio.data,
            path: "assets/demo.mp3"
        })
        $audio.play({
            path: "assets/demo.mp3",
            events: {
                didPlayToEndTime: function () {
                    $(type).src = themeColor[6]
                }
            }
        })
    } else {
        $(type).src = themeColor[6]
        $audio.stop()
    }
}

function langCache() {
    $cache.set("langhistory", {
        "slang": allLang.indexOf($("slang").text),
        "tlang": allLang.indexOf($("tlang").text),
        "hlang": hlang
    })
}

function textFullView(id) {
    let Textviews = {
        type: "view",
        props: {
            id: "textFullView",
            bgcolor: $color("clear"),
            alpha: 0
        },
        layout: $layout.fill,
        events: {
            tapped: function (sender) {
                removeFullText(id)
            }
        },
        views: [{
            type: "view",
            props: {
                bgcolor: $color(themeColor[5])
            },
            layout: function (make, view) {
                make.left.right.inset(15)
                if ($app.env == $env.app) {
                    make.top.equalTo(view.super.topMargin).inset(110)
                    make.bottom.inset(100)
                } else {
                    make.top.equalTo(view.super.topMargin).inset(55)
                    make.bottom.inset(15)
                }
                shadow(view)
            },
            events: {

            },
            views: [{
                type: "text",
                props: {
                    id: "fullText",
                    font: $font(".SFUIText", 15),
                    darkKeyboard: themeColor == darkColor ? 1 : 0,
                    textColor: $color(themeColor[4]),
                    bgcolor: $color("clear")
                },
                layout: function (make, view) {
                    make.edges.insets($insets(10, 15, 10, 15))
                },
                events: {
                    doubleTapped: function (sender) {
                        removeFullText(id)
                    }
                }
            }]
        }]
    }
    $("mainView").add(Textviews)
    $ui.animate({
        duration: 0.4,
        animation: function () {
            $("textFullView").alpha = 1
        },
        completion: function () {
            $("fullText").text = $(id).text
        }
    })
}

function removeFullText(id) {
    $ui.animate({
        duration: 0.4,
        animation: function () {
            $device.taptic(2)
            $("fullText").blur()
            $(id).text = $("fullText").text
            $("textFullView").alpha = 0
        },
        completion: function () {
            $("textFullView").remove()
        }
    })
}

function easterEggs() {
    $device.taptic(2)
    $("slang").text = allLang[0]
    $("slangText").text = $l10n("SUPPORT")
    if ($("tlangList")) {
        $("tlangList").remove()
    }
    translate()
}

function shadow(view) {
    var layer = view.runtimeValue().invoke("layer")
    layer.invoke("setCornerRadius", 10)
    layer.invoke("setShadowOffset", $size(0, 0))
    layer.invoke("setShadowColor", $color("lightGray").runtimeValue().invoke("CGColor"))
    layer.invoke("setShadowOpacity", 0.8)
    layer.invoke("setShadowRadius", 10)
}