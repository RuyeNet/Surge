module.exports = {
    webDataList: webDataList
}
$app.autoKeyboardEnabled = true

var dataResults = {}
var dataCount
var errorMsg = ""

function webDataList() {

    $ui.push({
        props: {

        },
        events: {
            disappeared: function () {
                saveData()
                dataResults = {}
                if (errorMsg != "") {
                    $ui.alert({
                        title: "站点添加失败",
                        message: errorMsg,
                        actions: [
                            {
                                title: "OK",
                                handler: function () {
                                    errorMsg = ""
                                }
                            }
                        ]
                    })
                } else {

                    let app = require('/scripts/app');
                    app.checkData();

                }
            }
        },
        views: [{
            type: "list",
            props: {
                id: "dataList",
                bgcolor: $color("clear"),
                separatorHidden: 1,
                rowHeight: 130,
                footer: {
                    type: "label",
                    props: {
                        height: 50,
                        bgcolor: $color("clear"),
                        align: $align.center,
                        font: $font(12)
                    },
                    events: {
                        tapped: function (sender) {

                        }
                    },
                    views: [{
                        type: "view",
                        props: {
                            id: "addBtView",
                            clipsToBounds: false,
                            bgcolor: $color("white")
                        },
                        views: [{
                            type: "button",
                            props: {
                                title: "╋",
                                titleColor: $color("#AAAAAA"),
                                bgcolor: $color("clear")
                            },
                            layout: $layout.fill,
                            events: {
                                tapped: function (sender) {
                                    addData()
                                }
                            }
                        }],
                        layout: function (make, view) {
                            make.size.equalTo($size(40, 40))
                            make.center.equalTo(view.super)
                            shadow(view)
                        }
                    }]
                },
                actions: [
                    {
                        title: "delete",
                        handler: function (sender, indexPath) {
                            delData(sender.data)
                        }
                    }
                ],
                template: {
                    props: {
                        bgcolor: $color("clear")
                    },
                    views: [{
                        type: "view",
                        props: {
                            clipsToBounds: false,
                            bgcolor: $color("white")
                        },
                        views: [{
                            type: "image",
                            props: {
                                id: "newLogo",
                                bgcolor: $color("clear")
                            },
                            layout: function (make, view) {
                                make.top.left.inset(10)
                                make.size.equalTo($size(30, 30))
                            }
                        }, {
                            type: "input",
                            props: {
                                id: "newWebTitle",
                                placeholder: "请输入站点名称",
                                font: $font("bold", 20),
                                textColor: $color("darkGray"),
                                bgcolor: $color("clear")
                            },
                            layout: function (make, view) {
                                make.centerY.equalTo($("newLogo").centerY)
                                make.size.equalTo($size(200, 30))
                                make.left.inset(50)
                            },
                            events: {
                                didEndEditing: function (sender) {
                                    newData(sender.info, sender.text)
                                }
                            }
                        }, {
                            type: "input",
                            props: {
                                id: "newText0",
                                placeholder: "请输入站点地址",
                                font: $font(15),
                                textColor: $color("#AAAAAA"),
                                bgcolor: $color("clear")
                            },
                            layout: function (make, view) {
                                make.left.right.inset(10)
                                make.top.inset(45)
                                make.height.equalTo(20)
                            },
                            events: {
                                didEndEditing: function (sender) {
                                    newData(sender.info, sender.text)
                                }
                            }
                        }, {
                            type: "input",
                            props: {
                                id: "newText1",
                                placeholder: "请输入站点邮箱",
                                font: $font(15),
                                textColor: $color("#AAAAAA"),
                                bgcolor: $color("clear")
                            },
                            layout: function (make, view) {
                                make.left.right.inset(10)
                                make.top.inset(70)
                                make.height.equalTo(20)
                            },
                            events: {
                                didEndEditing: function (sender) {
                                    newData(sender.info, sender.text)
                                }
                            }
                        }, {
                            type: "input",
                            props: {
                                id: "newText2",
                                placeholder: "请输入站点密码",
                                font: $font(15),
                                textColor: $color("#AAAAAA"),
                                bgcolor: $color("clear")
                            },
                            layout: function (make, view) {
                                make.left.right.inset(10)
                                make.top.inset(95)
                                make.height.equalTo(20)
                            },
                            events: {
                                didEndEditing: function (sender) {
                                    newData(sender.info, sender.text)
                                }
                            }
                        }],
                        layout: function (make, view) {
                            make.top.bottom.inset(5)
                            make.left.right.inset(15)
                            shadow(view)
                        }
                    }]
                }
            },
            layout: $layout.fill
        }]
    });

    getDataList()

}

function getDataList() {
    let webData = getData()
    let webNames = Object.keys(webData)
    if (webNames.length != 0) {
        var data = []
        for (var i in webNames) {

            dataCount = i
            dataResults["web" + i] = {}
            dataResults["web" + i]["web" + i + "title"] = webNames[i]
            dataResults["web" + i]["web" + i + "address"] = webData[webNames[i]].address
            dataResults["web" + i]["web" + i + "email"] = webData[webNames[i]].email
            dataResults["web" + i]["web" + i + "password"] = webData[webNames[i]].password

            data.push({
                newLogo: {
                    src: webData[webNames[i]].address.replace(/user\/login.php|auth\/login/g, "") + "favicon.ico"
                },
                newWebTitle: {
                    text: webNames[i],
                    info: "web" + i + "title"
                },
                newText0: {
                    text: webData[webNames[i]].address,
                    info: "web" + i + "address"
                },
                newText1: {
                    text: webData[webNames[i]].email,
                    info: "web" + i + "email"
                },
                newText2: {
                    text: webData[webNames[i]].password,
                    info: "web" + i + "password"
                }
            })
        }

        $("dataList").data = data
    }
}

function getData() {
    return JSON.parse($file.read("assets/data.json").string)
}

function addData() {
    if (dataCount > -1) {
        dataCount++
    } else {
        dataCount = 0
    }
    let data = $("dataList").data
    $("dataList").data = []
    data.push({
        newLogo: {

        },
        newWebTitle: {
            info: "web" + dataCount + "title"
        },
        newText0: {
            info: "web" + dataCount + "address"
        },
        newText1: {
            info: "web" + dataCount + "email"
        },
        newText2: {
            info: "web" + dataCount + "password"
        }
    })

    $("dataList").data = data
}

function newData(index, data) {
    let webIndex = index.match(/^web\d+/)
    if (!dataResults[webIndex[0]]) {
        dataResults[webIndex[0]] = {}
    }
    let type = index.replace(/^web\d+/, "")
    dataResults[webIndex[0]][webIndex[0] + type] = data
    dataRefresh()
}

function shadow(view) {
    var layer = view.runtimeValue().invoke("layer")
    layer.invoke("setCornerRadius", 10)
    layer.invoke("setShadowOffset", $size(3, 3))
    layer.invoke("setShadowColor", $color("gray").runtimeValue().invoke("CGColor"))
    layer.invoke("setShadowOpacity", 0.3)
    layer.invoke("setShadowRadius", 5)
}

function dataRefresh() {
    var data = []
    for (var i in dataResults) {
        if (!dataResults[i][i + "address"]) {
            dataResults[i][i + "address"] = ""
        }

        if (!dataResults[i][i + "title"]) {
            dataResults[i][i + "title"] = ""
        }

        if (!dataResults[i][i + "email"]) {
            dataResults[i][i + "email"] = ""
        }

        if (!dataResults[i][i + "password"]) {
            dataResults[i][i + "password"] = ""
        }

        data.push({
            newLogo: {
                src: dataResults[i][i + "address"].replace(/user\/login.php|auth\/login/g, "") + "favicon.ico"
            },
            newWebTitle: {
                text: dataResults[i][i + "title"],
                info: i + "title"
            },
            newText0: {
                text: dataResults[i][i + "address"],
                info: i + "address"
            },
            newText1: {
                text: dataResults[i][i + "email"],
                info: i + "email"
            },
            newText2: {
                text: dataResults[i][i + "password"],
                info: i + "password"
            }
        })
    }
    $("dataList").data = data
}

function saveData() {
    let data = {}

    for (var i in dataResults) {

        if (dataResults[i][i + "title"]) {
            var title = dataResults[i][i + "title"]
        } else {
            errorMsg = errorMsg + "新站点未填写标题" + "\n"
            continue
        }

        if (dataResults[i][i + "address"].match(/user\/login.php|auth\/login/)) {
            var address = dataResults[i][i + "address"]
        } else {
            errorMsg = errorMsg + title + "地址格式错误" + "\n"
            continue
        }

        if (dataResults[i][i + "email"].match(/@/)) {
            var email = dataResults[i][i + "email"]
        } else {
            errorMsg = errorMsg + title + "邮箱格式错误" + "\n"
            continue
        }

        if (dataResults[i][i + "password"]) {
            var password = dataResults[i][i + "password"]
        } else {
            errorMsg = errorMsg + title + "未填写密码" + "\n"
            continue
        }

        data[title] = {
            "address": address,
            "email": email,
            "password": password
        }
    }

    $file.write({
        data: $data({ string: JSON.stringify(data) }),
        path: "assets/data.json"
    })
}

function delData(data) {

    dataResults = {}
    for (var i in data) {
        dataCount = i
        dataResults["web" + i] = {}
        dataResults["web" + i]["web" + i + "title"] = data[i].newWebTitle.text
        dataResults["web" + i]["web" + i + "address"] = data[i].newText0.text
        dataResults["web" + i]["web" + i + "email"] = data[i].newText1.text
        dataResults["web" + i]["web" + i + "password"] = data[i].newText2.text
    }
    dataRefresh()

}