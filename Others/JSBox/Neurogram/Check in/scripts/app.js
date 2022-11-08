var buyMeaCoffee = require('scripts/coffee')
var matrixData = []

module.exports = {
    checkData: checkData
}

$ui.render({
    props: {
        id: "mainView",
        navButtons: [
            {
                icon: "104",
                handler: function () {
                    var webData = require('scripts/data')
                    webData.webDataList()
                }
            }, {
                icon: "058",
                handler: function () {
                    buyMeaCoffee.coffee("mainView")
                }
            }
        ]
    },
    views: [{
        type: "matrix",
        props: {
            columns: 1,
            itemHeight: 120,
            spacing: 20,
            template: {
                props: {
                    bgcolor: $color("clear"),
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
                            id: "logo",
                            bgcolor: $color("clear")
                        },
                        layout: function (make, view) {
                            make.top.left.inset(10)
                            make.size.equalTo($size(30, 30))
                        }
                    }, {
                        type: "label",
                        props: {
                            id: "webTitle",
                            text: "请输入站点名称",
                            font: $font("bold", 20),
                            textColor: $color("darkGray"),
                            bgcolor: $color("clear")
                        },
                        layout: function (make, view) {
                            make.centerY.equalTo($("logo").centerY)
                            make.size.equalTo($size(200, 30))
                            make.left.inset(50)
                        }
                    }, {
                        type: "label",
                        props: {
                            id: "text0",
                            text: "请输入站点地址",
                            font: $font(15),
                            textColor: $color("#AAAAAA"),
                            bgcolor: $color("clear")
                        },
                        layout: function (make, view) {
                            make.left.right.inset(10)
                            make.top.inset(45)
                            make.height.equalTo(20)
                        }
                    }, {
                        type: "label",
                        props: {
                            id: "text1",
                            text: "请输入站点邮箱",
                            font: $font(15),
                            textColor: $color("#AAAAAA"),
                            bgcolor: $color("clear")
                        },
                        layout: function (make, view) {
                            make.left.right.inset(10)
                            make.top.inset(70)
                            make.height.equalTo(20)
                        }
                    }, {
                        type: "label",
                        props: {
                            id: "text2",
                            text: "请输入站点密码",
                            font: $font(15),
                            textColor: $color("#AAAAAA"),
                            bgcolor: $color("clear")
                        },
                        layout: function (make, view) {
                            make.left.right.inset(10)
                            make.top.inset(95)
                            make.height.equalTo(20)
                        }
                    }],
                    layout: function (make, view) {
                        make.top.bottom.inset(0)
                        make.left.right.inset(0)
                        shadow(view)
                    }
                }]
            }
        },
        layout: $layout.fill
    }]
})

function checkData() {
    $("matrix").data = []
    matrixData = []
    let data = getData()
    let webNames = Object.keys(data)
    if (webNames.length == 0) {
        alert("请添加签到的站点信息")
    } else {
        for (var i = 0; i < webNames.length; i++) {
            checkin(data[webNames[i]].address, data[webNames[i]].email, data[webNames[i]].password, webNames[i])
        }
    }
}

function shadow(view) {
    var layer = view.runtimeValue().invoke("layer")
    layer.invoke("setCornerRadius", 10)
    layer.invoke("setShadowOffset", $size(3, 3))
    layer.invoke("setShadowColor", $color("gray").runtimeValue().invoke("CGColor"))
    layer.invoke("setShadowOpacity", 0.3)
    layer.invoke("setShadowRadius", 5)
}

async function checkin(url, email, password, title) {
    let checkinPath = url.indexOf("auth/login") != -1 ? "user/checkin" : "user/_checkin.php"
    let resp = await $http.post({
        url: url.replace(/(auth|user)\/login(.php)*/g, "") + checkinPath
    })
    if (resp.data.msg) {
        dataResults(url, resp.data.msg, title)
    } else {
        login(url, email, password, title)
    }
}

async function login(url, email, password, title) {
    let loginPath = url.indexOf("auth/login") != -1 ? "auth/login" : "user/_login.php"
    let resp = await $http.request({
        method: "POST",
        url: url.replace(/(auth|user)\/login(.php)*/g, "") + loginPath,
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: {
            "email": email,
            "passwd": password,
            "rumber-me": "week"
        }
    })
    if (resp.response.statusCode == 200) {
        if (JSON.parse(data).msg.match(/邮箱或者密码错误|Mail or password is incorrect/)) {
            $ui.toast(title + "邮箱或者密码错误")
        } else {
            checkin(url, email, password, title)
        }
    } else {
        $ui.toast(title + "登录失败")
    }
}

async function dataResults(url, checkinMsg, title) {
    let userPath = url.indexOf("auth/login") != -1 ? "user" : "user/index.php"
    let resp = await $http.get(url.replace(/(auth|user)\/login(.php)*/g, "") + userPath)
    let data = resp.data

    if (data.match(/theme\/malio/)) {

        let flowInfo = data.match(/trafficDountChat\s*\(([^\)]+)/)
        if (flowInfo) {
            let flowData = flowInfo[1].match(/\d[^\']+/g)
            var usedData = flowData[0]
            var restData = flowData[2]
        }

    } else {

        var usedData = data.match(/(Used Transfer|>过去已用|>已用|\"已用)[^B]+/)
        if (usedData) {
            usedData = flowFormat(usedData[0])
        }

        var restData = data.match(/(Remaining Transfer|>剩余流量|>可用|\"剩余)[^B]+/)
        if (restData) {
            restData = flowFormat(restData[0])
        }

    }

    matrixData.push({
        logo: {
            src: url.replace(/(auth|user)\/login(.php)*/g, "") + "favicon.ico"
        },
        webTitle: {
            text: title
        },
        text0: {
            text: checkinMsg
        },
        text1: {
            text: usedData ? "已用流量：" + usedData : "流量信息获取失败"
        },
        text2: {
            text: restData ? "剩余流量：" + restData : "流量信息获取失败"
        }
    })
    $("matrix").data = matrixData.reverse()

}

function getData() {
    return JSON.parse($file.read("assets/data.json").string)
}


function flowFormat(data) {
    data = data.replace(/\d+(\.\d+)*%/, "")
    let flow = data.match(/\d+(\.\d+)*\w*/)
    return flow[0] + "B"
}