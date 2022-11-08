module.exports = {
    settingView: settingView,
    loadSetting: loadSetting
}

var general = getSetting()
var db = $sqlite.open("assets/apps.db")

function settingView(theme) {
    let sortbyValues = [
        ["Time", "Name", "Price", "Rating", "ReleaseDate"],
        [$l10n("TIME"), $l10n("NAME"), $l10n("PRICE"), $l10n("RATING"), $l10n("RELEASEDATE")]
    ]
    let settingViews = {
        type: "view",
        props: {
            id: "settingViewsBg",
            bgcolor: $color("clear")
        },
        layout: $layout.fill,
        views: [{
            type: "view",
            props: {
                id: "settingOptionBg",
                bgcolor: theme[10]
            },
            layout: function (make, view) {
                make.top.equalTo(view.super.bottom)
                make.width.equalTo(view.super)
                make.height.equalTo($("mainView").frame.height)
            },
            views: [
                {
                    type: "button",
                    props: {
                        bgcolor: $color("clear"),
                        src: `assets/${theme[0]}Back.png`
                    },
                    layout: function (make, view) {
                        make.left.inset(30)
                        make.top.inset($("exitBt").frame.y)
                        make.size.equalTo($size(20, 20))
                    },
                    events: {
                        tapped: function (sender) {
                            $device.taptic(2)
                            saveSetting()
                        }
                    }
                },
                {
                    type: "label",
                    props: {
                        text: $l10n("SETTINGS"),
                        bgcolor: $color("clear"),
                        font: $font("KohinoorDevanagari-Light", 35),
                        textColor: theme[1]
                    },
                    layout: function (make, view) {
                        make.left.inset(30)
                        make.top.inset($("appTitle").frame.y)
                    }
                },
                {
                    type: "list",
                    props: {
                        separatorHidden: 1,
                        bgcolor: $color("clear"),
                        rowHeight: 50,
                        footer: {
                            type: "label",
                            props: {
                                height: 50,
                                text: "App Collector by Neurogram",
                                textColor: theme[6],
                                align: $align.center,
                                font: $font("KohinoorDevanagari-Regular", 12), //Regular Semibold Light,
                            }
                        },
                        data: [{
                            type: "view",
                            props: {
                                bgcolor: $color("clear")
                            },
                            layout: $layout.fill,
                            views: [
                                {
                                    type: "label",
                                    props: {
                                        text: $l10n("APPTHEMES"),
                                        font: $font("KohinoorDevanagari-Regular", 15),
                                        textColor: theme[1]
                                    },
                                    layout: function (make, view) {
                                        make.left.inset(30)
                                        make.centerY.equalTo(view.super)
                                    }
                                },
                                {
                                    type: "label",
                                    props: {
                                        id: "appThemeLabel",
                                        text: general.theme == "Light" ? $l10n("LIGHT") : general.theme == "Dark" ? $l10n("DARK") : $l10n("AUTO"),
                                        font: $font("KohinoorDevanagari-Regular", 15),
                                        align: $align.right,
                                        textColor: theme[7],
                                        info: general.theme
                                    },
                                    layout: function (make, view) {
                                        make.right.inset(30)
                                        make.centerY.equalTo(view.super)
                                    }
                                }
                            ]
                        },
                        {
                            type: "view",
                            props: {
                                bgcolor: $color("clear")
                            },
                            layout: $layout.fill,
                            views: [
                                {
                                    type: "label",
                                    props: {
                                        text: $l10n("CATEGORY"),
                                        font: $font("KohinoorDevanagari-Regular", 15),
                                        textColor: theme[1]
                                    },
                                    layout: function (make, view) {
                                        make.left.inset(30)
                                        make.centerY.equalTo(view.super)
                                    }
                                },
                                {
                                    type: "label",
                                    props: {
                                        id: "categoryLabel",
                                        text: general.category == "Categories" ? $l10n("DEFAULT") : $l10n("CUSTOM"),
                                        font: $font("KohinoorDevanagari-Regular", 15),
                                        align: $align.right,
                                        textColor: theme[7],
                                        info: general.category
                                    },
                                    layout: function (make, view) {
                                        make.right.inset(30)
                                        make.centerY.equalTo(view.super)
                                    }
                                }
                            ]
                        },
                        {
                            type: "view",
                            props: {
                                bgcolor: $color("clear")
                            },
                            layout: $layout.fill,
                            views: [
                                {
                                    type: "label",
                                    props: {
                                        text: $l10n("LISTTHEMES"),
                                        font: $font("KohinoorDevanagari-Regular", 15),
                                        textColor: theme[1]
                                    },
                                    layout: function (make, view) {
                                        make.left.inset(30)
                                        make.centerY.equalTo(view.super)
                                    }
                                },
                                {
                                    type: "label",
                                    props: {
                                        id: "listThemeLabel",
                                        text: general.listTheme == "Classic" ? $l10n("CLASSIC") : $l10n("STORE"),
                                        font: $font("KohinoorDevanagari-Regular", 15),
                                        align: $align.right,
                                        textColor: theme[7],
                                        info: general.listTheme
                                    },
                                    layout: function (make, view) {
                                        make.right.inset(30)
                                        make.centerY.equalTo(view.super)
                                    }
                                }
                            ]
                        },
                        {
                            type: "view",
                            props: {
                                bgcolor: $color("clear")
                            },
                            layout: $layout.fill,
                            views: [
                                {
                                    type: "label",
                                    props: {
                                        text: $l10n("COUNTRYNLANGUAGE"),
                                        font: $font("KohinoorDevanagari-Regular", 15),
                                        textColor: theme[1]
                                    },
                                    layout: function (make, view) {
                                        make.left.inset(30)
                                        make.centerY.equalTo(view.super)
                                    }
                                },
                                {
                                    type: "label",
                                    props: {
                                        id: "countryNLanguageLabel",
                                        text: general.country + " / " + general.language,
                                        font: $font("KohinoorDevanagari-Regular", 15),
                                        align: $align.right,
                                        textColor: theme[7]
                                    },
                                    layout: function (make, view) {
                                        make.right.inset(30)
                                        make.centerY.equalTo(view.super)
                                    }
                                }
                            ]
                        },
                        {
                            type: "view",
                            props: {
                                bgcolor: $color("clear")
                            },
                            layout: $layout.fill,
                            views: [
                                {
                                    type: "label",
                                    props: {
                                        text: $l10n("SORTBY"),
                                        font: $font("KohinoorDevanagari-Regular", 15),
                                        textColor: theme[1]
                                    },
                                    layout: function (make, view) {
                                        make.left.inset(30)
                                        make.centerY.equalTo(view.super)
                                    }
                                },
                                {
                                    type: "label",
                                    props: {
                                        id: "sortbyLabel",
                                        text: sortbyValues[1][sortbyValues[0].indexOf(general.sortby)],
                                        font: $font("KohinoorDevanagari-Regular", 15),
                                        align: $align.right,
                                        textColor: theme[7],
                                        info: {
                                            type: general.sortby,
                                            "A-Z": general["A-Z"]
                                        }
                                    },
                                    layout: function (make, view) {
                                        make.right.inset(30)
                                        make.centerY.equalTo(view.super)
                                    }
                                }
                            ]
                        },
                        {
                            type: "view",
                            props: {
                                bgcolor: $color("clear")
                            },
                            layout: $layout.fill,
                            views: [
                                {
                                    type: "label",
                                    props: {
                                        text: $l10n("CUSTOMCATEGORIES"),
                                        font: $font("KohinoorDevanagari-Regular", 15),
                                        textColor: theme[1]
                                    },
                                    layout: function (make, view) {
                                        make.left.inset(30)
                                        make.centerY.equalTo(view.super)
                                    }
                                }
                            ]
                        },
                        {
                            type: "view",
                            props: {
                                bgcolor: $color("clear")
                            },
                            layout: $layout.fill,
                            views: [
                                {
                                    type: "label",
                                    props: {
                                        text: $l10n("MANUAL"),
                                        font: $font("KohinoorDevanagari-Regular", 15),
                                        textColor: theme[1]
                                    },
                                    layout: function (make, view) {
                                        make.left.inset(30)
                                        make.centerY.equalTo(view.super)
                                    }
                                }
                            ]
                        },
                        {
                            type: "view",
                            props: {
                                bgcolor: $color("clear")
                            },
                            layout: $layout.fill,
                            views: [
                                {
                                    type: "label",
                                    props: {
                                        id: "updateLabel",
                                        text: $l10n("UPDATE"),
                                        font: $font("KohinoorDevanagari-Regular", 15),
                                        textColor: theme[1]
                                    },
                                    layout: function (make, view) {
                                        make.left.inset(30)
                                        make.centerY.equalTo(view.super)
                                    }
                                }
                            ]
                        },
                        {
                            type: "view",
                            props: {
                                bgcolor: $color("clear")
                            },
                            layout: $layout.fill,
                            views: [
                                {
                                    type: "label",
                                    props: {
                                        text: $l10n("FEEDBACK"),
                                        font: $font("KohinoorDevanagari-Regular", 15),
                                        textColor: theme[1]
                                    },
                                    layout: function (make, view) {
                                        make.left.inset(30)
                                        make.centerY.equalTo(view.super)
                                    }
                                }
                            ]
                        },
                        {
                            type: "view",
                            props: {
                                bgcolor: $color("clear")
                            },
                            layout: $layout.fill,
                            views: [
                                {
                                    type: "label",
                                    props: {
                                        text: $l10n("COFFEE"),
                                        font: $font("KohinoorDevanagari-Regular", 15),
                                        textColor: theme[1]
                                    },
                                    layout: function (make, view) {
                                        make.left.inset(30)
                                        make.centerY.equalTo(view.super)
                                    }
                                }
                            ]
                        }]
                    },
                    layout: function (make, view) {
                        make.width.equalTo(view.super)
                        make.top.equalTo(view.prev.bottom).inset(40)
                        make.bottom.equalTo(view.super)
                    },
                    events: {
                        didSelect: function (sender, indexPath, data) {
                            $device.taptic(2)
                            let optionIds = ["appTheme", "category", "listTheme", "countryNLanguage", "sortby"]
                            if (indexPath.row < 5) {
                                optionPicker(optionIds[indexPath.row])
                            } else if (indexPath.row == 5) {
                                setCustomCategories(theme)
                            } else if (indexPath.row == 6) {
                                $safari.open({
                                    url: "https://www.notion.so/neurogram/App-Collector-82376d06af344053adce0cc9af5f5b42"
                                })
                            } else if (indexPath.row == 7) {
                                scriptUpdata(1)
                            } else if (indexPath.row == 8) {
                                $safari.open({
                                    url: "https://airtable.com/shrA1vmSMRtTZBdqb"
                                })
                            } else if (indexPath.row == 9) {
                                let buyMeaCoffee = require('scripts/coffee')
                                buyMeaCoffee.coffee("settingOptionBg")
                            }
                        }
                    }
                }
            ]
        }, {
            type: "view",
            props: {
                id: "customCategoriesBg",
                bgcolor: $color("black"),
                alpha: 0
            },
            layout: $layout.fill,
        }]
    }
    $("mainView").add(settingViews)
    $delay(0.1, function () {
        $("settingOptionBg").animator.moveY(-$("mainView").frame.height).easeInQuart.animate(0.7)
    })
    scriptUpdata(0)
}

async function optionPicker(type) {
    let pickItems = {
        appTheme: [[$l10n("AUTO"), $l10n("LIGHT"), $l10n("DARK")]],
        category: [[$l10n("DEFAULT"), $l10n("CUSTOM")]],
        listTheme: [[$l10n("CLASSIC"), $l10n("STORE")]],
        countryNLanguage: [
            ["AE", "AG", "AI", "AL", "AM", "AO", "AR", "AT", "AU", "AZ", "BB", "BE", "BF", "BG", "BH", "BJ", "BM", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CG", "CH", "CL", "CN", "CO", "CR", "CV", "CY", "CZ", "DE", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "ES", "FI", "FJ", "FM", "FR", "GB", "GD", "GH", "GM", "GR", "GT", "GW", "GY", "HK", "HN", "HR", "HU", "ID", "IE", "IL", "IN", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KN", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LK", "LR", "LT", "LU", "LV", "MD", "MG", "MK", "ML", "MN", "MO", "MR", "MS", "MT", "MU", "MW", "MX", "MY", "MZ", "NA", "NE", "NG", "NI", "NL", "NO", "NP", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PT", "PW", "PY", "QA", "RO", "RU", "SA", "SB", "SC", "SE", "SG", "SI", "SK", "SL", "SN", "SR", "ST", "SV", "SZ", "TC", "TD", "TH", "TJ", "TM", "TN", "TR", "TT", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VC", "VE", "VG", "VN", "YE", "ZA", "ZW"],
            ["EN", "ZH"]
        ],
        sortby: [[$l10n("TIME"), $l10n("NAME"), $l10n("PRICE"), $l10n("RATING"), $l10n("RELEASEDATE")], ["A-Z", "Z-A"]],
    }
    let picker = await $pick.data({
        props: {
            items: pickItems[type]
        }
    })
    if (type == "appTheme") {
        let appThemeValues = ["Auto", "Light", "Dark"]
        $("appThemeLabel").text = picker[0]
        $("appThemeLabel").info = appThemeValues[pickItems.appTheme[0].indexOf(picker[0])]
    } else if (type == "category") {
        $("categoryLabel").text = picker[0]
        $("categoryLabel").info = picker[0] == $l10n("Default") ? "Categories" : "CustomCategories"
    } else if (type == "listTheme") {
        $("listThemeLabel").text = picker[0]
        $("listThemeLabel").info = picker[0] == $l10n("CLASSIC") ? "Classic" : "Store"
    } else if (type == "countryNLanguage") {
        $("countryNLanguageLabel").text = picker[0] + " / " + picker[1]
    } else if (type == "sortby") {
        let sortbyValues = ["Time", "Name", "Price", "Rating", "ReleaseDate"]
        $("sortbyLabel").text = picker[0]
        $("sortbyLabel").info = {
            type: sortbyValues[pickItems[type][0].indexOf(picker[0])],
            "A-Z": picker[1] == "A-Z" ? "ASC" : "DESC"
        }
    }
}

function saveSetting() {
    let setting = getSetting()
    let country = $("countryNLanguageLabel").text.replace(/(\w+) \/.+/, "$1")
    let language = $("countryNLanguageLabel").text.replace(/.+\/ (\w+)/, "$1")
    if (setting.country != country || setting.language != language) {
        setting.update = true
        setting.cancelBt = true
    } else {
        setting.update = false
    }
    setting.theme = $("appThemeLabel").info
    setting.category = $("categoryLabel").info
    setting.listTheme = $("listThemeLabel").info
    setting.country = country
    setting.language = language
    setting.sortby = $("sortbyLabel").info.type
    setting["A-Z"] = $("sortbyLabel").info["A-Z"]
    $file.write({
        data: $data({ string: JSON.stringify(setting) }),
        path: "assets/settings.json"
    })
    $addin.restart()
}

function getSetting() {
    return JSON.parse($file.read("assets/settings.json").string)
}

function setCustomCategories(theme) {
    let setting = getSetting()
    let customCategories = setting.customCategories.sort()
    let listData = []
    for (var i = 0; i < customCategories.length; i++) {
        listData.push({
            customCategoriesLabel: {
                text: customCategories[i]
            }
        })
    }
    let customCategoriesListViews = {
        type: "view",
        props: {
            id: "customCategoriesView",
            bgcolor: theme[10]
        },
        layout: function (make, view) {
            make.top.equalTo(view.super.bottom)
            make.width.equalTo(view.super)
            make.height.equalTo(300)
        },
        views: [{
            type: "button",
            props: {
                title: $l10n("CANCEL"),
                font: $font("KohinoorDevanagari-Regular", 18),
                titleColor: theme[1],
                bgcolor: $color("clear")
            },
            layout: (make, view) => {
                make.top.inset(4)
                make.left.equalTo(view.super)
                make.size.equalTo($size(80, 32))
            },
            events: {
                tapped: function (sender) {
                    $device.taptic(2)
                    let customCategoriesResult = []
                    for (var k = 0; k < listData.length; k++) {
                        customCategoriesResult.push(listData[k].customCategoriesLabel.text)
                    }
                    setting.customCategories = customCategoriesResult
                    $file.write({
                        data: $data({ string: JSON.stringify(setting) }),
                        path: "assets/settings.json"
                    })
                    $("customCategoriesView").animator.moveY(300).easeOutQuart.animate(0.2)
                    $("customCategoriesBg").animator.makeOpacity(0).animate(0.1)
                    $delay(0.2, function () {
                        $("customCategoriesView").remove()
                    });
                }
            }
        },
        {
            type: "button",
            props: {
                title: $l10n("ADD"),
                font: $font("KohinoorDevanagari-Regular", 18),
                titleColor: theme[1],
                bgcolor: $color("clear")
            },
            layout: (make, view) => {
                make.top.inset(4)
                make.right.equalTo(view.super)
                make.size.equalTo($size(80, 32))
            },
            events: {
                tapped: async function (sender) {
                    $device.taptic(2)
                    let newCategory = await $input.text()
                    if (newCategory) {
                        listData.push({
                            customCategoriesLabel: {
                                text: newCategory
                            }
                        })
                        $("customCategoriesList").data = listData
                    }
                }
            }
        },
        {
            type: "list",
            props: {
                id: "customCategoriesList",
                rowHeight: 50,
                bgcolor: $color("clear"),
                separatorHidden: 1,
                actions: [
                    {
                        title: $l10n("DELETE"),
                        color: theme[11], // default to gray
                        handler: function (sender, indexPath) {
                            $device.taptic(2)
                            let delCategory = sender.data[indexPath.row].customCategoriesLabel.text
                            sender.delete(indexPath)
                            listData = sender.data
                            db.update({
                                sql: "UPDATE IOS SET CustomCategories = ? WHERE CustomCategories = ? ",
                                args: ["⊘    ", delCategory]
                            })
                        }
                    },
                    {
                        title: $l10n("EDIT"),
                        color: theme[12],
                        handler: async function (sender, indexPath) {
                            $device.taptic(2)
                            let currentCategory = sender.data[indexPath.row].customCategoriesLabel.text
                            let editedCategory = await $input.text({
                                text: currentCategory
                            })
                            if (editedCategory != currentCategory) {
                                sender.delete(indexPath)
                                sender.insert({
                                    indexPath: indexPath,
                                    value: {
                                        customCategoriesLabel: {
                                            text: editedCategory
                                        }
                                    }
                                })
                                listData = sender.data
                                db.update({
                                    sql: "UPDATE IOS SET CustomCategories = ? WHERE CustomCategories = ? ",
                                    args: [editedCategory, currentCategory]
                                })
                            }
                        }
                    }
                ],
                data: listData,
                template: {
                    props: {
                        bgcolor: $color("clear")
                    },
                    views: [
                        {
                            type: "label",
                            props: {
                                id: "customCategoriesLabel",
                                font: $font("KohinoorDevanagari-Regular", 15),
                                textColor: theme[1]
                            },
                            layout: function (make, view) {
                                make.left.inset(30)
                                make.centerY.equalTo(view.super)
                            }
                        }
                    ]
                }
            },
            layout: function (make, view) {
                make.top.inset(40)
                make.width.equalTo(view.super)
                make.bottom.inset(0)
            }
        }]
    }
    $("customCategoriesBg").animator.makeOpacity(0.3).animate(0.1)
    $("mainView").add(customCategoriesListViews)
    $delay(0.1, function () {
        $("customCategoriesView").animator.moveY(-300).easeInQuart.animate(0.1)
    });
}

function loadSetting() {
    $cache.set("settings", {
        "status": "updated"
    })
    scriptUpdata(1)
}

async function scriptUpdata(type) {
    let name = $addin.current.name
    if ($("updateLabel")) {
        if (type == 0) {
            $("updateLabel").text = $l10n("CHECKUPDATE")
        } else {
            $("updateLabel").text = $l10n("UPDATING")
        }
    }
    let conf = await $http.get("https://raw.githubusercontent.com/Neurogram-R/JSBox/master/Neurogram/Conf.json")
    if (type == 0) {
        if (conf.data["App Collector"].version != "1.0.0(17072019)") {
            $("updateLabel").text = $l10n("UPDATE") + "❗"
        } else {
            $("updateLabel").text = $l10n("UPDATE")
        }
    } else {
        let link = conf.data["App Collector"].link
        let script = await $http.download(link)
        let database = $file.read("assets/apps.db")
        let settingJson = $file.read("assets/settings.json")
        $addin.save({
            name: name,
            data: script.data,
            handler: function (success) {
                $addin.run({
                    name: name,
                    query: {
                        database: database,
                        settingJson: settingJson
                    }
                })
            }
        })
    }
}