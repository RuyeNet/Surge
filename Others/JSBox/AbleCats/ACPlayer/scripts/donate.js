const pay = {
    Ali: (i) => {
        switch (i) {
            case 0:
                $app.openURL("HTTPS://QR.ALIPAY.COM/FKX02210W66YWKIMCL1JF6")
                break;
            case 1:
                $app.openURL("HTTPS://QR.ALIPAY.COM/FKX02118FHNQVBWZO4IG0D")
                break;
            case 2:
                $app.openURL("HTTPS://QR.ALIPAY.COM/FKX01173SFIRGZVJYNCB82")
                break;
            case 3:
                $app.openURL("HTTPS://QR.ALIPAY.COM/FKX04705BHBZCKBW04XM75")
                break;
        }
        $ui.alert({
            title: "捐赠",
            message: "\n\n~感谢来着您的友情捐赠~\n",
        })
    },
    Wechat: () => {
        $photo.save({
            data: $file.read("assets/qrcode.png"),
            handler: function (success) {
                $ui.alert({
                    title: "捐赠",
                    message: "微信二维码已保存至系统相册\n使用微信打开扫一扫\n加载相册二维码即可捐赠\n\n越努力 越幸运\n\n~感谢来着您的友情捐赠~",
                })
            }
        })
    },
    exit: () => { }
}

function make() {
    return {
        type: "list",
        props: {
            data: deal(),
            rowHeight: 30,
            template: {
                props: {
                    bgcolor: $color("white"), 
                },
                views: [{
                    type: "label",
                    props: {
                        id: "label",
                        radius: 10,
                        align: $align.center,
                        font: $font("bold", 16),
                        textColor: $color("lightGray"),
                    },
                    layout: function (make, view) {
                        viewsAddShadows(view)
                        make.top.bottom.inset(2)
                        make.center.equalTo(view.super)
                    }
                }]
            },
            separatorHidden: true,
        },
        layout: function (make, view) {
            make.left.right.bottom.inset(0)
            make.top.equalTo(view.prev.bottom).offset(10)
        },
        events: {
            didSelect: function (sender, indexPath, data) {
                $ui.action({
                    title: "请选择捐赠渠道",
                    actions: [{
                        title: "支付宝",
                        handler: () => pay.Ali(indexPath.row)
                    }, {
                        title: "微信",
                        handler: () => pay.Wechat()
                    },
                    {
                        title: "取消",
                        handler: pay.exit()
                    }
                    ]
                })
            }
        }
    }
}

function deal() {
    let data = new Array();
    ["打赏 2 元", "打赏 5 元", "打赏 10 元", "自定义打赏"].map(d => data.push({
        label: {
            text: d
        }
    }));
    return data;
}

function viewsAddShadows(view) {
    var layer = view.runtimeValue().invoke("layer")
    layer.invoke("setCornerRadius", 10)
    layer.invoke("setShadowOffset", $size(3, 3))
    layer.invoke("setShadowColor", $color("gray").runtimeValue().invoke("CGColor"))
    layer.invoke("setShadowOpacity", 0.3)
    layer.invoke("setShadowRadius", 5)
}

module.exports = {
    make: make
}