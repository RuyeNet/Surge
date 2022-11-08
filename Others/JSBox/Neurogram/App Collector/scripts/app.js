const buyMeaCoffee = require('scripts/coffee')
buyMeaCoffee.showcoffee()

$app.rotateDisabled = true
$app.autoKeyboardEnabled = true

module.exports = {
    launch: launch
}
const lightColor = [
    "light", // 0. botton #a9adb2
    $color("#2a2a2a"),  // 1. title、app name
    $color("#2e2e2e"), // 2. selected menu bg 
    $color("#f0f4f7"),  // 3. unselected menu bg
    $color("white"),  // 4. selected menu label
    $color("#7e90a1"), // 5. unselected menu label
    $color("#acacac"), // 6. footer、release date、version
    $color("#5fa196"), // 7. app price
    $color("#59978c"), // 8. app rating 1
    $color("#eceeef"), // 9. app rating 0
    $color("white"), // 10. main bg
    $color("#ff355d"), // 11. delete list
    $color("#ffcc00"), // 12. edit list
    $color("#a9adb2") // 13. done button
]

const darkColor = [
    "light", // 0. botton #a9adb2
    $color("white"),  // 1. title、app name
    $color("#f0f4f7"), // 2. selected menu bg 
    $color("#2e2e2e"),  // 3. unselected menu bg
    $color("#7e90a1"),  // 4. selected menu label
    $color("white"), // 5. unselected menu label
    $color("#acacac"), // 6. footer、release date、version
    $color("#5fa196"), // 7. app price
    $color("#59978c"), // 8. app rating 1
    $color("#eceeef"), // 9. app rating 0
    $color("black"), // 10. main bg
    $color("#ff355d"), // 11. delete list
    $color("#ffcc00"), // 12. edit list
    $color("#a9adb2") // 13. done button
]

var generalSetting = getSetting()
var theme = generalSetting.theme == "Light" ? lightColor : generalSetting.theme == "Dark" ? darkColor : $device.isDarkMode ? darkColor : lightColor
var listTheme = generalSetting.listTheme

var applink = $context.link
var categories = [$l10n("ALL")]
var menuIndex = 0
var categoryCount = []
var db = $sqlite.open("assets/apps.db")
var updateCancel = false

var retoreData = false
if ($context.query) {
    if ($context.query.database) {
        generalSetting.update = true
        generalSetting.cancelBt = true
        retoreData = true
    }
}

$ui.render({
    props: {
        id: "mainView",
        navBarHidden: 1,
        homeIndicatorHidden: 1,
        statusBarStyle: theme[10] == $color("white") ? 0 : 1,
        bgcolor: theme[10]
    },
    views: [{
        type: "button",
        props: {
            id: "exitBt",
            bgcolor: $color("clear"),
            src: `assets/${theme[0]}Back.png`
        },
        layout: function (make, view) {
            make.left.inset(30)
            make.top.equalTo(view.super.topMargin).inset(5)
            make.size.equalTo($size(20, 20))
        },
        events: {
            tapped: function (sender) {
                $device.taptic(2)
                $app.close()
            }
        }
    }, {
        type: "button",
        props: {
            id: "moreBt",
            src: `assets/${theme[0]}More.png`,
            bgcolor: $color("clear")
        },
        layout: function (make, view) {
            make.right.inset(30)
            make.centerY.equalTo(view.prev)
            make.size.equalTo($size(25, 25))
        },
        events: {
            tapped: async function (sender) {
                $device.taptic(2)
                if ($("appList")) {
                    $("moreBt").hidden = true
                    $("searchBt").hidden = false
                    $("settingBt").hidden = false
                    $("searchBt").animator.moveX(-40).easeOutQuart.animate(0.3)
                    $delay(1.0, function () {
                        if ($("moreBt").hidden) {
                            $("searchBt").animator.moveX(40).easeInQuart.animate(0.3)
                            $delay(0.3, function () {
                                $("moreBt").hidden = false
                                $("searchBt").hidden = true
                                $("settingBt").hidden = true
                            })
                        }
                    })
                }
            }
        }
    }, {
        type: "button",
        props: {
            id: "searchBt",
            src: `assets/${theme[0]}Search.png`,
            bgcolor: $color("clear"),
            hidden: true
        },
        layout: function (make, view) {
            make.right.inset(30)
            make.centerY.equalTo(view.prev)
            make.size.equalTo($size(25, 25))
        },
        events: {
            tapped: async function (sender) {
                $device.taptic(2)
                searchApp()
            }
        }
    }, {
        type: "button",
        props: {
            id: "settingBt",
            src: `assets/${theme[0]}Setting.png`,
            bgcolor: $color("clear"),
            hidden: true
        },
        layout: function (make, view) {
            make.right.inset(30)
            make.centerY.equalTo(view.prev)
            make.size.equalTo($size(25, 25))
        },
        events: {
            tapped: async function (sender) {
                $device.taptic(2)
                $delay(0.8, function () {
                    let setting = require('scripts/settings')
                    setting.settingView(theme)
                });
            }
        }
    }, {
        type: "label",
        props: {
            id: "appTitle",
            text: $l10n("APPCOLLECTOR"),
            bgcolor: $color("clear"),
            font: $font("KohinoorDevanagari-Light", 35),
            textColor: theme[1]
        },
        layout: function (make, view) {
            make.left.inset(30)
            make.top.equalTo(view.super.topMargin).inset(65)
        }
    }]
})

function launch() {
    $delay(0.1, function () {
        if (generalSetting.update == false) {
            addMenuViews()
            addAppList()
            resetUpdateSetting()
        } else {
            let updateViews = {
                type: "view",
                props: {
                    id: "updateView",
                    bgcolor: theme[10]
                },
                layout: $layout.fill,
                views: [{
                    type: "lottie",
                    props: {
                        id: "updateLottie",
                        src: `assets/${theme[0]}Loading.json`,
                        loop: 1,
                        bgcolor: $color("clear")
                    },
                    layout: (make, view) => {
                        make.height.equalTo($("mainView").frame.width * 695 / 375)
                        make.width.equalTo($("mainView").frame.width * 695 / 375)
                        make.centerX.equalTo(view.super)
                        make.centerY.equalTo(view.super.centerY).offset($("mainView").frame.height * 50 / 812)
                    }
                },
                {
                    type: "label",
                    props: {
                        text: $l10n("UPDATINGMSG"),
                        font: $font("KohinoorDevanagari-Light", 30),
                        textColor: theme[5],
                        align: $align.center,
                        lines: 0
                    },
                    layout: (make, view) => {
                        make.centerX.equalTo(view.super)
                        make.top.equalTo(view.super.topMargin).inset(60)
                        make.right.left.inset(30)
                    }
                },
                {
                    type: "button",
                    props: {
                        id: "updateCancelBt",
                        title: $l10n("CANCEL"),
                        hidden: generalSetting.cancelBt,
                        font: $font("KohinoorDevanagari-Semibold", 15),
                        titleColor: theme[5],
                        bgcolor: theme[3]
                    },
                    layout: (make, view) => {
                        make.centerX.equalTo(view.super)
                        make.bottom.equalTo(view.super).inset(60)
                        make.size.equalTo($size(80, 40))
                    },
                    events: {
                        tapped: function (sender) {
                            $device.taptic(2)
                            updateFinish()
                        }
                    }
                }]
            }
            $("mainView").add(updateViews)
            $("updateLottie").play()
            $delay(0.5, function () {
                updateDatebase()
            });
        }
    });
}

function addMenuViews() {
    let object = db.query(`SELECT ${generalSetting.category}, SUM(CategoryCount) FROM IOS GROUP BY ${generalSetting.category} ORDER BY ${generalSetting.category} ASC`);
    let result = object.result;
    let appCount = 0
    let menu = []
    while (result.next()) {
        let categoryName = result.values[generalSetting.category] == "⊘    " ? $l10n("UNCATEGORIZED") : result.values[generalSetting.category]
        categories.push(categoryName)
        menu.push(categoryName + menuNumFormat(result.values["SUM(CategoryCount)"]))
        appCount = appCount + result.values["SUM(CategoryCount)"]
        categoryCount.push(result.values["SUM(CategoryCount)"])
    }
    menu = [$l10n("ALL") + menuNumFormat(appCount)].concat(menu)
    categoryCount = [appCount].concat(categoryCount)
    let menuWidth = 0
    let menuLabelViewWidth = []
    for (var i = 0; i < menu.length; i++) {
        let size = $text.sizeThatFits({
            text: menu[i],
            width: $device.info.screen.width,
            font: $font("KohinoorDevanagari-Semibold", 15),
            lineSpacing: 15, // Optional
        })
        menuLabelViewWidth.push(size.width)
        menuWidth = menuWidth + size.width + 30
    }
    menuWidth = menuWidth + (menu.length + 1) * 15
    let menuViews = {
        type: "scroll",
        props: {
            id: "menuScroll",
            clipsToBounds: 0,
            bgcolor: $color("clear"),
            alwaysBounceVertical: 0,
            showsHorizontalIndicator: 0
        },
        layout: function (make, view) {
            make.right.left.inset(15)
            make.top.equalTo(view.super.topMargin).offset(140)
            make.height.equalTo(60)
        },
        views: [{
            type: "view",
            props: {
                id: "scrollViewBg",
                bgcolor: $color("clear")
            },
            layout: function (make, view) {
                make.width.equalTo(menuWidth)
                make.left.inset(0)
                make.height.equalTo(view.super)
            }
        }]
    }
    $("mainView").add(menuViews)
    for (var k = 0; k < menu.length; k++) {
        let menuLabelView = {
            type: "view",
            props: {
                id: "menulabelBg" + k,
                bgcolor: k == 0 ? theme[2] : theme[3],
                smoothRadius: (menuLabelViewWidth[k] + 30) / 4.7,
                info: k
            },
            layout: function (make, view) {
                make.width.equalTo(menuLabelViewWidth[k] + 30)
                make.centerY.equalTo(view.super)
                make.height.equalTo(60)
                if (k == 0) {
                    make.left.inset(15)
                } else {
                    make.left.equalTo(view.prev.right).inset(15)
                }
            },
            events: {
                tapped: function (sender) {
                    $device.taptic(2)
                    $("menulabelBg" + menuIndex).bgcolor = theme[3]
                    $("menulabel" + menuIndex).textColor = theme[5]
                    sender.bgcolor = theme[2]
                    $("menulabel" + sender.info).textColor = theme[4]
                    menuIndex = sender.info
                    $("appList").data = listDataUpdate(categories[sender.info], "")
                }
            },
            views: [
                {
                    type: "label",
                    props: {
                        id: "menulabel" + k,
                        text: menu[k],
                        bgcolor: $color("clear"),
                        textColor: k == 0 ? theme[4] : theme[5],
                        font: $font("KohinoorDevanagari-Semibold", 15),
                        align: $align.center
                    },
                    layout: function (make, view) {
                        make.center.equalTo(view.super)
                    }
                }
            ]
        }
        $("scrollViewBg").add(menuLabelView)
    }
}

function addAppList() {
    if (listTheme == "Classic") {
        var listRowViews = {
            props: {
                bgcolor: $color("clear")
            },
            views: [
                {
                    type: "image",
                    props: {
                        id: "appIcon",
                        smoothRadius: 90 / 4.7
                    },
                    layout: function (make, view) {
                        make.left.inset(30)
                        make.centerY.equalTo(view.suer)
                        make.size.equalTo($size(90, 90))
                    }
                },
                {
                    type: "label",
                    props: {
                        id: "appName",
                        textColor: theme[1],
                        font: $font("KohinoorDevanagari-Light", 20),
                    },
                    layout: function (make, view) {
                        make.left.equalTo(view.prev.right).inset(15)
                        make.right.inset(30)
                        make.top.equalTo(view.prev).inset(3)
                    }
                },
                {
                    type: "label",
                    props: {
                        id: "appPrice",
                        textColor: theme[7],
                        font: $font("KohinoorDevanagari-Regular", 28),
                        align: $align.right
                    },
                    layout: function (make, view) {
                        make.left.equalTo(view.prev)
                        make.right.inset(30)
                        make.bottom.inset(28)
                    }
                },
                {
                    type: "label",
                    props: {
                        id: "appDeveloper",
                        textColor: theme[6],
                        font: $font("KohinoorDevanagari-Regular", 10),
                        align: $align.left
                    },
                    layout: function (make, view) {
                        make.left.equalTo(view.prev)
                        make.right.inset(30)
                        make.top.equalTo(view.prev.prev.bottom).inset(0)
                    }
                },
                {
                    type: "label",
                    props: {
                        id: "appVersion",
                        textColor: theme[6],
                        font: $font("KohinoorDevanagari-Regular", 10),
                        align: $align.left
                    },
                    layout: function (make, view) {
                        make.left.equalTo(view.prev)
                        make.right.inset(30)
                        make.top.equalTo(view.prev.bottom).inset(8)
                    }
                },
                {
                    type: "label",
                    props: {
                        id: "appReleaseDate",
                        textColor: theme[1],
                        font: $font("KohinoorDevanagari-Regular", 13)
                    },
                    layout: function (make, view) {
                        make.left.equalTo(view.prev)
                        make.right.inset(30)
                        make.top.equalTo(view.prev.bottom)
                    }
                }
            ]
        }
    } else {
        var listRowViews = {
            props: {
                bgcolor: $color("clear")
            },
            views: [
                {
                    type: "image",
                    props: {
                        id: "appIcon",
                        smoothRadius: 90 / 4.7
                    },
                    layout: function (make, view) {
                        make.left.inset(30)
                        make.centerY.equalTo(view.suer)
                        make.size.equalTo($size(80, 80))
                    }
                },
                {
                    type: "label",
                    props: {
                        id: "appName",
                        textColor: theme[1],
                        font: $font("KohinoorDevanagari-Regular", 16),
                    },
                    layout: function (make, view) {
                        make.left.equalTo(view.prev.right).inset(15)
                        make.right.inset(110)
                        make.top.equalTo(view.prev).inset(6)
                    }
                },
                {
                    type: "label",
                    props: {
                        id: "appPrice",
                        textColor: theme[7],
                        font: $font("KohinoorDevanagari-Regular", 25),
                        align: $align.right,
                        autoFontSize: 1
                    },
                    layout: function (make, view) {
                        make.right.inset(30)
                        make.top.equalTo(view.prev)
                        make.width.equalTo(80)
                    }
                },
                {
                    type: "label",
                    props: {
                        id: "appDeveloper",
                        textColor: theme[6],
                        font: $font("KohinoorDevanagari-Regular", 10),
                        align: $align.left,
                        hidden: 1
                    },
                    layout: function (make, view) {
                        make.left.equalTo($("appName").left)
                        make.right.inset(110)
                        make.top.equalTo($("appName").bottom)
                    }
                },
                {
                    type: "label",
                    props: {
                        id: "appVersion",
                        textColor: theme[6],
                        font: $font("KohinoorDevanagari-Regular", 10),
                        align: $align.left
                    },
                    layout: function (make, view) {
                        make.left.equalTo(view.prev)
                        make.right.inset(30)
                        make.top.equalTo(view.prev.bottom)
                    }
                },
                {
                    type: "label",
                    props: {
                        id: "appReleaseDate",
                        textColor: theme[1],
                        font: $font("KohinoorDevanagari-Regular", 13)
                    },
                    layout: function (make, view) {
                        make.left.equalTo(view.prev)
                        make.right.inset(30)
                        make.top.equalTo(view.prev.bottom)
                    }
                }
            ]
        }
    }
    let appListView = {
        type: "list",
        props: {
            id: "appList",
            rowHeight: listTheme == "Classic" ? 140 : 120,
            separatorHidden: 1,
            data: listDataUpdate($l10n("ALL"), ""),
            bgcolor: $color("clear"),
            footer: {
                type: "label",
                props: {
                    height: 20,
                    text: "App Collector by Neurogram",
                    textColor: theme[6],
                    align: $align.center,
                    font: $font("KohinoorDevanagari-Regular", 12), //Regular Semibold Light,
                }
            },
            actions: [
                {
                    title: $l10n("DELETE"),
                    color: theme[11], // default to gray
                    handler: function (sender, indexPath) {
                        $device.taptic(2)
                        deleteApp(sender.data[indexPath.row].appName.info, sender.data[indexPath.row].appPrice.info, indexPath)
                    }
                },
                {
                    title: $l10n("EDIT"),
                    color: theme[12],
                    handler: function (sender, indexPath) {
                        $device.taptic(2)
                        appDetail(sender.data[indexPath.row].appName.info)
                    }
                }
            ],
            template: listRowViews
        },
        layout: function (make, view) {
            make.width.equalTo(view.super)
            make.top.equalTo(view.super.topMargin).offset(220)
            make.bottom.equalTo(view.super)
        },
        events: {
            didSelect: function (sender, indexPath, data) {
                $device.taptic(2)
                const storeVC = $objc("SKStoreProductViewController").$new();
                storeVC.$setDelegate($delegate({
                    type: "SKStoreProductViewControllerDelegate",
                    events: {
                        productViewControllerDidFinish: sender => {
                            sender.$dismissViewControllerAnimated_completion(true, null);
                        }
                    }
                }));
                const rootVC = $ui.controller.runtimeValue();
                rootVC.$presentViewController_animated_completion(storeVC, true, null);
                const parameters = { "id": data.appName.info }.ocValue();
                storeVC.$loadProductWithParameters_completionBlock(parameters, null);
            }
        }
    }
    $("mainView").add(appListView)
    if (applink) {
        let appid = applink.match(/\/id\d+/)
        appid = appid[0].replace(/\/id/, "")
        appDetail(appid)
    } else if ($clipboard.text) {
        if ($clipboard.text.match(/\/id\d+/)) {
            $ui.alert({
                title: $l10n("CLIPBOARDLINK"),
                actions: [
                    {
                        title: $l10n("COFFEEOK"),
                        disabled: false, // Optional
                        handler: function () {
                            let appid = $clipboard.text.match(/\/id\d+/)
                            appid = appid[0].replace(/\/id/, "")
                            appDetail(appid)
                            $clipboard.text = ""
                        }
                    },
                    {
                        title: $l10n("CANCEL"),
                        handler: function () {

                        }
                    }
                ]
            })
        }
    }
    $app.tips($l10n("TIPS"))
}

function menuNumFormat(num) {
    let superNum = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]
    num = num.toString()
    let nums = num.match(/\d/g)
    for (var i = 0; i < nums.length; i++) {
        let rExp = new RegExp(nums[i])
        num = num.replace(rExp, superNum[parseInt(nums[i])])
    }
    return num
}

function listDataUpdate(category, keywords) {
    var listData = []
    category = category == $l10n("UNCATEGORIZED") ? "⊘    " : category
    if (keywords) {
        var object = db.query({
            sql: `SELECT * FROM IOS where Name LIKE ? OR Tag LIKE ? ORDER BY ${generalSetting.sortby} ${generalSetting["A-Z"]}`,
            args: ["%" + keywords + "%", "%" + keywords + "%"]
        })
    } else if (category == $l10n("ALL")) {
        var object = db.query(`SELECT * FROM IOS ORDER BY ${generalSetting.sortby} ${generalSetting["A-Z"]}`)
    } else {
        var object = db.query({
            sql: `SELECT * FROM IOS where ${generalSetting.category} = ? ORDER BY ${generalSetting.sortby} ${generalSetting["A-Z"]}`,
            args: [category]
        })
    }
    let result = object.result
    while (result.next()) {
        let values = result.values;
        if (keywords && category != $l10n("ALL") && result.values[generalSetting.category] != category) {

        } else {
            listData.push({
                appIcon: {
                    src: values.Icon
                },
                appName: {
                    text: values.Name,
                    info: values.ID
                },
                appPrice: {
                    text: values.FormattedPrice.replace(/(\d)/, " $1"),
                    info: values[generalSetting.category]
                },
                appDeveloper: {
                    text: "by " + values.Developer
                },
                appReleaseDate: {
                    text: values.ReleaseDate.replace(/^(\d{4})-(\d{2})-(\d{2}).+/, "$3.$2.$1")
                },
                appVersion: {
                    text: "v" + values.Version
                }
            })
        }

    }
    return listData
}

function deleteApp(id, category, indexPath) {
    $("menulabel0").text = $l10n("ALL") + menuNumFormat(categoryCount[0] - 1)
    let categoryIndex = categories.indexOf(category)
    $("menulabel" + categoryIndex).text = categories[categoryIndex] + menuNumFormat(categoryCount[categoryIndex] - 1)
    categoryCount.splice(categoryIndex, 1, categoryCount[categoryIndex] - 1)
    categoryCount.splice(0, 1, categoryCount[0] - 1)
    db.update({
        sql: "DELETE FROM IOS WHERE ID = ?",
        args: [id]
    });
    $("appList").delete(indexPath)
    if (categoryCount[categoryIndex] == 0) {
        if (menuIndex != 0) {
            $("appList").remove()
            addAppList()
        }
        $("menuScroll").remove()
        categories = [$l10n("ALL")]
        categoryCount = []
        menuIndex = 0
        addMenuViews()
    }
}

async function searchApp() {
    let keywords = await $input.text()
    if (keywords) {
        let listData = listDataUpdate(categories[menuIndex], keywords)
        $("appList").data = listData
    }
}

async function appDetail(id) {
    let mainViewHeight = $("mainView").frame.height
    let mainViewWidth = $("mainView").frame.width
    let customMenuIndex = 0
    let customMenu = ["⊘    "].concat(generalSetting.customCategories.sort())
    let object = db.query({
        sql: "SELECT * FROM IOS where ID = ?",
        args: [id]
    });
    let result = object.result;
    let type = "add"
    let appLocalInfo = {}
    while (result.next()) {
        if (result.values.ID == id) {
            type = "edit"
            appLocalInfo = result.values
        }
    }
    let appOnlineInfo = await getAppInfo([id])
    if (!appOnlineInfo && type == "add") {
        alert($l10n("APPNOTFOUND"))
        return
    } else if (appOnlineInfo && type == "add") {
        var appInfo = appOnlineInfo[id]
        appInfo.ScreenShot = [appOnlineInfo[id].Icon].concat(appOnlineInfo[id].ScreenShot)
        appInfo.Tag = ""
    } else if (appOnlineInfo && type == "edit") {
        var appInfo = appOnlineInfo[id]
        appInfo.ScreenShot = [appOnlineInfo[id].Icon].concat(appOnlineInfo[id].ScreenShot)
        appInfo.Tag = appLocalInfo.Tag
        customMenuIndex = customMenu.indexOf(appLocalInfo.CustomCategories)
    } else if (!appOnlineInfo && type == "edit") {
        var appInfo = appLocalInfo
        appInfo.FormattedPrice = $l10n("REMOVED")
        appInfo.ScreenShot = [appLocalInfo.Icon]
        customMenuIndex = customMenu.indexOf(appLocalInfo.CustomCategories)
    } else {
        return
    }
    let galleryItems = []
    for (var j = 0; j < appInfo.ScreenShot.length; j++) {
        galleryItems.push({
            type: "image",
            props: {
                src: appInfo.ScreenShot[j]
            }
        })
    }
    let appDetailView = {
        type: "view",
        props: {
            id: "appDetailViews",
            bgcolor: $color("clear")
        },
        layout: $layout.fill,
        views: [{
            type: "view",
            props: {
                id: "appDetailBg",
                bgcolor: theme[10]
            },
            layout: function (make, view) {
                make.top.equalTo(view.super.bottom)
                make.centerX.equalTo(view.super)
                make.width.equalTo(view.super)
                make.height.equalTo(mainViewHeight)
            },
            views: [{
                type: "gallery",
                props: {
                    id: "appDetailGallery",
                    items: galleryItems,
                    interval: 0
                },
                layout: function (make, view) {
                    make.top.inset(0)
                    make.centerX.equalTo(view.super)
                    if (mainViewHeight - mainViewWidth > 292) {
                        make.height.width.equalTo(mainViewWidth)
                    } else {
                        make.height.width.equalTo(mainViewHeight - 292)
                    }
                }
            },
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
                        saveAppInfo(customMenu[customMenuIndex], false, type)
                    }
                }
            }, {
                type: "button",
                props: {
                    title: "Done",
                    font: $font("KohinoorDevanagari-Regular", 20),
                    titleColor: theme[13],
                    bgcolor: $color("clear")
                },
                layout: function (make, view) {
                    make.right.inset(30)
                    make.centerY.equalTo(view.prev)
                    make.size.equalTo($size(50, 20))
                },
                events: {
                    tapped: async function (sender) {
                        $device.taptic(2)
                        saveAppInfo(customMenu[customMenuIndex], true, type)
                    }
                }
            },
            {
                type: "view",
                props: {
                    id: "appDetailEditBg",
                    bgcolor: $color("clear"),
                    smoothRadius: 20
                },
                layout: function (make, view) {
                    make.top.equalTo($("appDetailGallery").bottom).inset(-20)
                    make.width.equalTo(view.super)
                    make.bottom.equalTo(view.super)
                },
                views: [
                    {
                        type: "label",
                        props: {
                            id: "appDetailName",
                            text: appInfo.Name,
                            textColor: theme[1],
                            font: $font("KohinoorDevanagari-Light", 20),
                            info: {
                                icon: appInfo.Icon,
                                id: id,
                                categories: appInfo.Categories,
                                developer: appInfo.Developer
                            }
                        },
                        layout: function (make, view) {
                            make.left.inset(30)
                            make.right.inset(110)
                            make.top.inset(30)
                        }
                    },
                    {
                        type: "label",
                        props: {
                            id: "appDetailPrice",
                            text: appInfo.FormattedPrice,
                            textColor: theme[7],
                            font: $font("KohinoorDevanagari-Regular", 25),
                            align: $align.right,
                            autoFontSize: 1,
                            info: appInfo.Price
                        },
                        layout: function (make, view) {
                            make.right.inset(30)
                            make.top.equalTo(view.prev)
                            make.width.equalTo(80)
                        }
                    },
                    {
                        type: "label",
                        props: {
                            id: "appDetailVnR",
                            text: appInfo.Version + " (" + appInfo.ReleaseDate.replace(/^(\d{4})-(\d{2})-(\d{2}).+/, "$3.$2.$1") + ")",
                            textColor: theme[6],
                            font: $font("KohinoorDevanagari-Regular", 10),
                            align: $align.left,
                            info: {
                                rating: appInfo.Rating,
                                version: appInfo.Version,
                                releaseDate: appInfo.ReleaseDate
                            }
                        },
                        layout: function (make, view) {
                            make.left.equalTo(view.prev.prev)
                            make.right.inset(30)
                            make.top.equalTo(view.prev.prev.bottom).inset(5)
                        }
                    },
                    {
                        type: "text",
                        props: {
                            id: "appDetailTag",
                            text: appInfo.Tag,
                            placeholder: $l10n("TAGMSG"),
                            textColor: theme[5],
                            font: $font("KohinoorDevanagari-Regular", 12),
                            align: $align.left,
                            smoothRadius: 20,
                            bgcolor: theme[3],
                            insets: $insets(10, 10, 10, 10)
                        },
                        layout: function (make, view) {
                            make.right.left.bottom.inset(30)
                            make.top.inset(190)
                        }
                    }
                ]
            }]
        }]
    }
    $("mainView").add(appDetailView)
    let customMenuWidth = 0
    let customMenuLabelViewWidth = []
    for (var i = 0; i < customMenu.length; i++) {
        let size = $text.sizeThatFits({
            text: customMenu[i],
            width: $device.info.screen.width,
            font: $font("KohinoorDevanagari-Semibold", 15),
            lineSpacing: 15, // Optional
        })
        customMenuLabelViewWidth.push(size.width)
        customMenuWidth = customMenuWidth + size.width + 30
    }
    customMenuWidth = customMenuWidth + (customMenu.length + 1) * 15
    let customMenuViews = {
        type: "scroll",
        props: {
            clipsToBounds: 0,
            bgcolor: $color("clear"),
            alwaysBounceVertical: 0,
            showsHorizontalIndicator: 0
        },
        layout: function (make, view) {
            make.right.left.inset(15)
            make.top.equalTo(view.super).inset(100)
            make.height.equalTo(60)
        },
        views: [{
            type: "view",
            props: {
                id: "customScrollViewBg",
                bgcolor: $color("clear")
            },
            layout: function (make, view) {
                make.width.equalTo(customMenuWidth)
                make.left.inset(0)
                make.height.equalTo(view.super)
            }
        }]
    }
    $("appDetailEditBg").add(customMenuViews)
    for (var k = 0; k < customMenu.length; k++) {
        let customMenuView = {
            type: "view",
            props: {
                id: "customMenulabelBg" + k,
                bgcolor: k == customMenuIndex ? theme[2] : theme[3],
                smoothRadius: (customMenuLabelViewWidth[k] + 30) / 4.7,
                info: k
            },
            layout: function (make, view) {
                make.width.equalTo(customMenuLabelViewWidth[k] + 30)
                make.centerY.equalTo(view.super)
                make.height.equalTo(60)
                if (k == 0) {
                    make.left.inset(15)
                } else {
                    make.left.equalTo(view.prev.right).inset(15)
                }
            },
            events: {
                tapped: function (sender) {
                    $device.taptic(2)
                    $("customMenulabelBg" + customMenuIndex).bgcolor = theme[3]
                    $("customMenulabel" + customMenuIndex).textColor = theme[5]
                    sender.bgcolor = theme[2]
                    $("customMenulabel" + sender.info).textColor = theme[4]
                    customMenuIndex = sender.info
                }
            },
            views: [
                {
                    type: "label",
                    props: {
                        id: "customMenulabel" + k,
                        text: customMenu[k],
                        bgcolor: $color("clear"),
                        textColor: k == customMenuIndex ? theme[4] : theme[5],
                        font: $font("KohinoorDevanagari-Semibold", 15),
                        align: $align.center
                    },
                    layout: function (make, view) {
                        make.center.equalTo(view.super)
                    }
                }
            ]
        }
        $("customScrollViewBg").add(customMenuView)
    }
    $delay(0.1, function () {
        $("appDetailBg").animator.moveY(-mainViewHeight).easeInQuart.animate(0.7)
    });
}

async function getAppInfo(ids) {
    var appData = await $http.get(`https://itunes.apple.com/lookup?id=${ids}&country=${generalSetting.country}&lang=${generalSetting.language}`);
    var appInfoResult = {}
    if (appData.data.resultCount > 0) {
        var appInfos = appData.data.results
        for (var i = 0; i < appInfos.length; i++) {
            appInfoResult[appInfos[i].trackId.toString()] = {
                ID: appInfos[i].trackId.toString(),
                Icon: appInfos[i].artworkUrl512,
                Name: appInfos[i].trackName,
                Categories: appInfos[i].genres[0],
                Developer: appInfos[i].artistName,
                Price: appInfos[i].price,
                FormattedPrice: appInfos[i].formattedPrice,
                Rating: appInfos[i].averageUserRating,
                ReleaseDate: appInfos[i].currentVersionReleaseDate,
                Version: appInfos[i].version,
                ScreenShot: appInfos[i].screenshotUrls
            }
        }
        return appInfoResult
    } else {
        return null
    }
}

function getSetting() {
    return JSON.parse($file.read("assets/settings.json").string)
}

function saveAppInfo(customCategory, save, type) {
    if (save) {
        if (type == "edit") {
            db.update({
                sql: "UPDATE IOS SET Icon = ?, Name = ?, Categories = ?, Developer = ?, Price = ?, FormattedPrice = ?, Rating = ?, ReleaseDate = ?, Version = ?, Tag = ?, CustomCategories = ? WHERE ID = ? ",
                args: [$("appDetailName").info.icon, $("appDetailName").text, $("appDetailName").info.categories, $("appDetailName").info.developer, $("appDetailPrice").info, $("appDetailPrice").text, $("appDetailVnR").info.rating, $("appDetailVnR").info.releaseDate, $("appDetailVnR").info.version, $("appDetailTag").text, customCategory, $("appDetailName").info.id]
            })
        } else {
            db.update({
                sql: "INSERT INTO IOS values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                args: [$("appDetailName").info.id, $("appDetailName").info.icon, $("appDetailName").text, $("appDetailName").info.categories, $("appDetailName").info.developer, $("appDetailPrice").info, $("appDetailPrice").text, $("appDetailVnR").info.rating, $("appDetailVnR").info.releaseDate, $("appDetailVnR").info.version, customCategory, $("appDetailTag").text, 1, new Date().getTime()]
            });
        }
        $("appList").remove()
        $("menuScroll").remove()
        categories = [$l10n("ALL")]
        categoryCount = []
        menuIndex = 0
        addAppList()
        addMenuViews()
    }
    $("appDetailBg").animator.moveY($("mainView").frame.height).easeOutQuart.animate(0.7)
    $delay(0.7, function () {
        $("appDetailViews").remove()
        if (applink) {
            $app.close()
        }
    });
}


async function updateDatebase() {
    if (retoreData) {
        $file.write({
            data: $context.query.database,
            path: "assets/old.db"
        })
        let oldDb = $sqlite.open("assets/old.db")
        let oldObject = oldDb.query(`SELECT * FROM IOS`)
        let oldResult = oldObject.result
        let oldAppInfos = []
        while (oldResult.next()) {
            oldAppInfos.push(oldResult.values)
        }
        for (var j = 0; j < oldAppInfos.length; j++) {
            db.update({
                sql: "INSERT INTO IOS values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                args: [oldAppInfos[j].ID, oldAppInfos[j].Icon, oldAppInfos[j].Name, oldAppInfos[j].Categories, oldAppInfos[j].Developer, oldAppInfos[j].Price, oldAppInfos[j].FormattedPrice, oldAppInfos[j].Rating, oldAppInfos[j].ReleaseDate, oldAppInfos[j].Version, oldAppInfos[j].CustomCategories, oldAppInfos[j].Tag, 1, oldAppInfos[j].Time]
            });
        }
        $file.delete("assets/old.db")
        let oldSettings = JSON.parse($context.query.settingJson.string)
        $file.write({
            data: $data({ string: JSON.stringify(oldSettings) }),
            path: "assets/settings.json"
        })
        $addin.restart()
    } else {
        let object = db.query("SELECT ID FROM IOS");
        let result = object.result;
        let ids = []
        while (result.next()) {
            ids.push(result.values.ID)
        }
        let idGroup = arrGroup(ids)
        let appinfos = {}
        for (var i = 0; i < idGroup.length; i++) {
            let data = await getAppInfo(idGroup[i])
            if (data) {
                Object.assign(appinfos, data)
            }
        }
        if (updateCancel == false) {
            $("updateCancelBt").hidden = true
            for (var k = 0; k < ids.length; k++) {
                if (appinfos[ids[k]]) {
                    db.update({
                        sql: "UPDATE IOS SET Icon = ?, Name = ?, Categories = ?, Developer = ?, Price = ?, FormattedPrice = ?, Rating = ?, ReleaseDate = ?, Version = ? WHERE ID = ? ",
                        args: [appinfos[ids[k]].Icon, appinfos[ids[k]].Name, appinfos[ids[k]].Categories, appinfos[ids[k]].Developer, appinfos[ids[k]].Price, appinfos[ids[k]].FormattedPrice, appinfos[ids[k]].Rating, appinfos[ids[k]].ReleaseDate, appinfos[ids[k]].Version, ids[k]]
                    })
                } else {
                    db.update({
                        sql: "UPDATE IOS SET FormattedPrice = ? WHERE ID = ? ",
                        args: [$l10n("REMOVED"), ids[k]]
                    })
                }
            }
            updateFinish()
        }
    }
}

function updateFinish() {
    updateCancel = true
    $("updateView").animator.moveY($("mainView").frame.height).easeOutQuart.animate(0.7)
    $delay(0.7, function () {
        $("updateLottie").stop()
        $("updateView").remove()
        addMenuViews()
        addAppList()
    });
    resetUpdateSetting()
}

function arrGroup(arr) {
    let result = [];
    for (var i = 0, len = arr.length; i < len; i += 6) {
        result.push(arr.slice(i, i + 6));
    }
    return result;
}

function resetUpdateSetting() {
    let setting = getSetting()
    setting.update = true
    setting.cancelBt = false
    $file.write({
        data: $data({ string: JSON.stringify(setting) }),
        path: "assets/settings.json"
    })
}