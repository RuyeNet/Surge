var buyMeaCoffee = require('scripts/coffee')
buyMeaCoffee.showcoffee()

var type = 0
var typeCode = [21, 67, 61, 62]
var timeoutData = [$l10n("default"), 5, 10, 15, 20, 25, 30]

$ui.render({
    props: {
        id:"mainView",
        navButtons: [
            {
                icon: "058",
                handler: function () {
                    buyMeaCoffee.coffee("mainView")
                }
            }
        ]
    },
    views: [{
        type: "tab",
        props: {
            items: [$l10n("type0"), $l10n("type1"), $l10n("type2"), $l10n("type3")],
            tintColor: $color("tint")
        },
        layout: function (make) {
            make.left.top.right.inset(20)
            make.height.equalTo(30)
        },
        events: {
            changed: function (sender) {
                type = sender.index
                timeoutHidden()
            }
        }
    }, {
        type: "input",
        props: {
            type: $kbType.phone,
            placeholder: $l10n("input"),
            textColor: $color("tint"),
            borderColor: $color("tint"),
            borderWidth: 0.5,
            bgcolor: $color("clear"),
            autoFontSize: true
        },
        layout: function (make) {
            make.left.inset(20)
            make.top.inset(70)
            make.right.inset(150)
            make.height.equalTo(30)
        },
    }, {
        type: "button",
        props: {
            title: $l10n("enable"),
            bgcolor: $color("tint")
        },
        layout: function (make, view) {
            make.left.equalTo($("input").right).inset(20)
            make.top.inset(70)
            make.right.inset(20)
            make.height.equalTo(30)
        },
        events: {
            tapped: function (sender) {
                divertEnable()
            }
        }
    }, {
        type: "button",
        props: {
            id: "contactBt",
            title: $l10n("contact"),
            titleColor: $color("tint"),
            bgcolor: $color("clear"),
            borderColor: $color("tint"),
            borderWidth: 0.5,
            font: $font(10)
        },
        layout: function (make, view) {
            make.left.inset(20)
            make.top.inset(110)
            make.right.inset(250)
            make.height.equalTo(30)
        },
        events: {
            tapped: function (sender) {
                contactPick()
            }
        }
    }, {
        type: "view",
        props: {
            titleColor: $color("tint"),
            bgcolor: $color("clear"),
            hidden: true
        },
        views: [{
            type: "label",
            props: {
                text: $l10n("time"),
                textColor: $color("tint"),
                align: $align.left,
                font: $font(10)
            },
            layout: function (make, view) {
                make.top.bottom.inset(0)
                make.right.inset(170)
                make.width.equalTo(40)
            }
        }, {
            type: "label",
            props: {
                id: "timeData",
                text: $l10n("default"),
                textColor: $color("tint"),
                align: $align.center,
                font: $font("bold", 15)
            },
            layout: function (make, view) {
                make.top.bottom.inset(0)
                make.right.inset(110)
                make.width.equalTo(50)
            }
        }, {
            type: "stepper",
            props: {
                max: 6,
                min: 0,
                value: 0,
            },
            layout: function (make, view) {
                make.top.bottom.right.inset(0)
                make.width.equalTo(95)
            },
            events: {
                changed: function (sender) {
                    $("timeData").text = timeoutData[$("stepper").value]
                }
            }
        }],
        layout: function (make, view) {
            make.left.equalTo($("contactBt").right).inset(20)
            make.top.inset(110)
            make.right.inset(20)
            make.height.equalTo(30)
        }
    }, {
        type: "button",
        props: {
            title: $l10n("disable"),
            bgcolor: $color("tint")
        },
        layout: function (make, view) {
            make.top.inset(150)
            make.left.right.inset(20)
            make.height.equalTo(30)
        },
        events: {
            tapped: function (sender) {
                divertDisable()
            }
        }
    }, {
        type: "button",
        props: {
            title: $l10n("status"),
            bgcolor: $color("tint")
        },
        layout: function (make, view) {
            make.top.inset(190)
            make.left.right.inset(20)
            make.height.equalTo(30)
        },
        events: {
            tapped: function (sender) {
                checkStatus()
            }
        }
    }, {
        type: "button",
        props: {
            title: $l10n("cancel"),
            bgcolor: $color("tint")
        },
        layout: function (make, view) {
            make.top.inset(230)
            make.left.right.inset(20)
            make.height.equalTo(30)
        },
        events: {
            tapped: function (sender) {
                cancelALL()
            }
        }
    }, {
        type: "matrix",
        props: {
            columns: 3,
            itemHeight: 20,
            spacing: 5,
            bgcolor: $color("clear"),
            template: {
                props: {},
                views: [{
                    type: "label",
                    props: {
                        id: "label",
                        textColor: $color("tint"),
                        bgcolor: $color("clear"),
                        borderColor: $color("tint"),
                        borderWidth: 0.5,
                        radius: 5,
                        align: $align.center,
                        autoFontSize: true
                    },
                    layout: $layout.fill
                }]
            }
        },
        layout: function (make, view) {
            make.top.inset(270)
            make.left.right.inset(20)
            make.bottom.inset(20)
        },
        events: {
            didSelect: function (sender, indexPath, data) {
                $("input").text = data.label.text
            },
            longPressed: function (sender, indexPath) {
                delHistory()
            }
        }
    }, {
        type: "label",
        props: {
            text: "Call Forwarding by Neurogram",
            textColor: $color("gray"),
            align: $align.center,
            font: $font(10)
        },
        layout: function (make, view) {
            make.bottom.inset(0)
            make.left.right.inset(20)
            make.height.equalTo(20)
        },
        events: {
            tapped: function (sender) {
                $app.openURL("https://itunes.apple.com/cn/app/divert-calls/id625765678?l=en&mt=8")
            }
        }
    }]
})

matrixDataView()

function matrixDataView() {
    var matrixData = []
    var cacheData = $cache.get("history")
    if (cacheData) {
        for (var i in cacheData.numbers) {
            matrixData.push({
                "label": {
                    "text": cacheData.numbers[i]
                }
            })
        }
        $("matrix").data = matrixData
    } else {
        $("matrix").data = []
    }
}

function timeoutHidden() {
    if (type == 2) {
        $("view").hidden = false
    } else {
        $("view").hidden = true
    }
}

function divertEnable() {
    if ($("input").text == "") {
        alert($l10n("input"))
    } else {
        if (type == 2) {
            if ($("timeData").text == $l10n("default")) {
                $app.openURL("tel:*" + typeCode[type] + "*" + $("input").text + "%23")
            } else {
                $app.openURL("tel:*" + typeCode[type] + "*" + $("input").text + "*" + $("timeData").text + "%23")
            }
        } else {
            $app.openURL("tel:*" + typeCode[type] + "*" + $("input").text + "%23")
        }
        histories()
    }
}

function divertDisable() {
    if (type == 2) {
        if ($("timeData").text == $l10n("default")) {
            $app.openURL("tel:%23%23" + typeCode[type] + "%23")
        } else {
            $app.openURL("tel:%23%23" + typeCode[type] + "*" + $("timeData").text + "%23")
        }
    } else {
        $app.openURL("tel:%23%23" + typeCode[type] + "%23")
    }
}

function checkStatus() {
    $app.openURL("tel:*%23" + typeCode[type] + "%23")
}

function cancelALL() {
    $app.openURL("tel:%23%23002%23")
}

function contactPick() {
    $contact.pick({
        multi: false,
        handler: function (contact) {
            var numbers = []
            for (var i in contact.phoneNumbers) {
                var numberOrig = contact.phoneNumbers[i].content
                var number = numberOrig.replace(/-/g, "")
                number = number.replace(/\s/g, "")
                numbers.push(number)
            }
            $delay(0.5, function () {
                $ui.menu({
                    items: numbers,
                    handler: function (title, idx) {
                        $("input").text = title
                    }
                })
            })
        }
    })
}

function histories() {
    var history = $cache.get("history")
    if (history) {
        var duplicate = history.numbers.indexOf($("input").text)
        if (duplicate == -1) {
            history.numbers.unshift($("input").text)
        } else {
            history.numbers.splice(duplicate, 1)
            history.numbers.unshift($("input").text)
        }
        $cache.set("history", {
            "numbers": history.numbers
        })
    } else {
        $cache.set("history", {
            "numbers": [$("input").text]
        })
    }
    matrixDataView()
}

function delHistory() {
    var history = $cache.get("history")
    if (history) {
        $ui.menu({
            items: history.numbers,
            handler: function (title, idx) {
                history.numbers.splice(idx, 1)
                if (history.numbers == "") {
                    $cache.clear()
                } else {
                    $cache.set("history", {
                        "numbers": history.numbers
                    })
                }
                matrixDataView()
            }
        })
    } else {
        alert($l10n("noHistory"))
    }
}