var buyMeaCoffee = require('scripts/coffee')
buyMeaCoffee.showcoffee()

var gPage = 0
var tfCPage = 1
var keywords = ""
var gListData = []
var tfCListData = []

let gList = {
    type: "list",
    props: {
        id: "gList",
        rowHeight: 64.0,
        header: {
            type: "view",
            props: {
                height: 42
            },
            views: [{
                type: "input",
                props: {
                    id: "gSearch",
                    placeholder: "Tap to search",
                    type: $kbType.search
                },
                layout: function (make, view) {
                    make.height.equalTo(32)
                    make.top.inset(10)
                    make.left.right.inset(15)
                },
                events: {
                    returned: function (sender) {
                        sender.blur()
                        gPage = 0
                        keywords = $("gSearch").text
                        searchTF()
                    }
                }
            }]
        },
        footer: {
            type: "label",
            props: {
                height: 20,
                text: "Power by Google",
                textColor: $color("#AAAAAA"),
                align: $align.center,
                font: $font(12)
            }
        },
        template: {
            props: {
                bgcolor: $color("clear")
            },
            views: [
                {
                    type: "label",
                    props: {
                        id: "tfName",
                        textColor: $color("black"),
                        align: $align.left,
                        font: $font(".SFUI", 20)
                    },
                    layout: function (make, view) {
                        make.centerY.equalTo(view.super)
                        make.left.inset(15)
                    }
                }
            ]
        }
    },
    layout: $layout.fill,
    events: {
        didReachBottom: function (sender) {
            $delay(0.5, function () {
                sender.endFetchingMore()
                gPage = gPage + 10
                searchTF()
            })
        },
        didSelect: function (sender, indexPath, data) {
            $app.openURL(data.tfName.info)
        }
    }
}

let tcList = {
    type: "list",
    props: {
        id: "tcList",
        rowHeight: 64.0,
        header: {
            type: "view",
            props: {
                height: 42
            },
            views: [{
                type: "input",
                props: {
                    id: "tfCSearch",
                    placeholder: "Tap to search",
                    type: $kbType.search
                },
                layout: function (make, view) {
                    make.height.equalTo(32)
                    make.top.inset(10)
                    make.left.right.inset(15)
                },
                events: {
                    returned: function (sender) {
                        sender.blur()
                        gPage = 0
                        keywords = $("tfCSearch").text
                        $("gSearch").text = keywords
                        searchTF()
                        $("gallery").page = 1
                    }
                }
            }]
        },
        footer: {
            type: "label",
            props: {
                height: 20,
                text: "Power by TestFlight.Center",
                textColor: $color("#AAAAAA"),
                align: $align.center,
                font: $font(12)
            }
        },
        template: {
            props: {
                bgcolor: $color("clear")
            },
            views: [
                {
                    type: "image",
                    props: {
                        id: "icon",
                        smoothRadius: 49 / 4.7
                    },
                    layout: function (make) {
                        make.left.equalTo(15);
                        make.top.bottom.inset(7.5)
                        make.width.equalTo(49)
                    }
                }, {
                    type: "label",
                    props: {
                        id: "title",
                        font: $font(".SFUI", 20)
                    },
                    layout: function (make) {
                        make.left.equalTo($("icon").right).inset(10)
                        make.centerY.equalTo(("icon"))
                    }
                }
            ]
        }
    },
    layout: $layout.fill,
    events: {
        didReachBottom: function (sender) {
            $delay(0.5, function () {
                sender.endFetchingMore()
                tfCPage = tfCPage + 1
                tfCenter()
            })
        },
        didSelect: function (sender, indexPath, data) {
            tfweb("https://testflight.center" + data.title.info)
        }
    }
}

async function searchTF() {
    $ui.toast("loading...")
    let search = await $http.get({
        url: `https://www.google.com/search?q=${keywords ? keywords.replace(/\s/, "+") + "+" : ""}site%3Atestflight.apple.com%2Fjoin&start=${gPage}&client=firefox-b-1-d`,
        header: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0"
        }
    })
    let results = search.data.match(/Join\sthe.+?beta\s-\sTestFlight\s-\sApple.+?https:\/\/testflight.apple.com\/join\/\w+/g)
    if (results) {
        let newListData = []
        for (var i in results) {
            newListData.push({
                tfName: {
                    text: results[i].replace(/^Join\sthe\s(.+)?\sbeta\s-\sTestFlight\s-\sApple.+/, "$1"),
                    info: results[i].replace(/.+(https.+)/, "$1")
                }
            })
        }
        gListData = gPage == 0 ? newListData : gListData.concat(newListData)
        $("gList").data = gListData
    } else {
        let isRobot = search.data.match(/and not a robot./g)
        if (isRobot) {
            verification()
        } else {
            alert("Oops, no items found.")
        }
    }
}

function verification() {
    let url = `https://www.google.com/search?q=${keywords ? keywords.replace(/\s/, "+") + "+" : ""}site%3Atestflight.apple.com%2Fjoin&start=${gPage}`
    $ui.push({
        props: {
            title: "TestFlighter"
        },
        views: [{
            type: "web",
            props: {
                url: url
            },
            layout: $layout.fill,
            events: {
                didFinish: function (sender, navigation) {
                    if (sender.url == url) {
                        $ui.pop()
                        searchTF()
                    }
                }
            }
        }]
    })
}

async function tfCenter() {
    $ui.toast("loading...")
    let tfs = await $http.post({
        url: "https://testflight.center/index.php/home/index/tflist",
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: {
            p: tfCPage
        }
    })
    if (tfs.data.length != 0) {
        let newListData = []
        for (var i in tfs.data) {
            newListData.push({
                icon: {
                    src: tfs.data[i].tf_app_icon_url
                },
                title: {
                    text: tfs.data[i].tf_app_name,
                    info: tfs.data[i].tf_app_url
                }
            })
        }
        tfCListData = tfCPage == 1 ? newListData : tfCListData.concat(newListData)
        $("tcList").data = tfCListData
    } else {
        alert("Oops, no items found.")
    }
}

function tfweb(url) {
    $ui.push({
        props: {
            title: ""
        },
        views: [{
            type: "web",
            props: {
                url: url
            },
            layout: $layout.fill,
            events: {
                didFinish: function (sender, navigation) {
                    $ui.pop()
                    $app.openURL(sender.url)
                }
            }
        }]
    });
}

function launch() {
    $ui.render({
        props: {
            id: "mainView",
            title: "TestFlighter",
            navButtons: [
                {
                    icon: "058",
                    handler: function () {
                        buyMeaCoffee.coffee("mainView")
                    }
                }
            ]
        },
        views: [
            {
                type: "gallery",
                props: {
                    items: [
                        {
                            type: "view",
                            props: {

                            },
                            views: [tcList]
                        },
                        {
                            type: "view",
                            props: {

                            },
                            views: [gList]
                        }
                    ],
                    interval: 0
                },
                layout: $layout.fill
            }
        ]
    })
    tfCenter()
    searchTF()
}

module.exports = {
    launch: launch
}