var buyMeaCoffee = require('scripts/coffee')

module.exports = {
    urlCheck: urlCheck
}

function urlCheck() {
    var videoUrl = $context.safari ? $context.safari.items.location.href : $context.link || $clipboard.text
    if (videoUrl) {
        if (videoUrl.match(/^http/)) {
            if (videoUrl.indexOf("twitter.com") != -1) {
                twitterDl(videoUrl)
            } else {
                videoParser(videoUrl)
            }
        } else {
            alert($l10n("ALERT"))
        }
    } else {
        alert($l10n("ALERT"))
    }
}

async function videoParser(videoUrl) {
    $ui.loading(true)
    let resp = await $http.get('https://www.online-downloader.com/DL/dd.php?videourl=' + videoUrl)
    $ui.loading(false)
    let data = resp.data
    data = data.replace(/^\({/, "{")
    data = data.replace(/}\)$/, "}")
    data = JSON.parse(data)
    if (data.Video_DownloadURL == null) {
        alert($l10n("INVALID"))
    } else {
        let rowsData = ["Recommended Quality"]
        let urlsData = [data.Video_DownloadURL]
        for (var i = 1; i <= data.Video_Format_Count; i++) {
            urlsData.push(data["Video_" + i + "_Url"])
            rowsData.push(data["Video_" + i + "_WH"] + " - " + data["Video_" + i + "_Format_Note"] + "." + data["Video_" + i + "_Ext"] + "  ( " + data["Video_" + i + "_File_Size"] + ")")
        }
        let videoIntro = [data.Video_Image, data.Video_Title]
        mainView(rowsData, urlsData, videoIntro)
    }
}

function mainView(rowsData, urlsData, videoIntro) {
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
                }
            ]
        },
        views: [{
            type: "video",
            props: {
                src: rowsData[0],
                poster: videoIntro[0]
            },
            layout: function (make, view) {
                make.left.right.top.inset(0)
                make.height.equalTo(256)
            }
        }, {
            type: "list",
            props: {
                data: rowsData,
                header: {
                    type: "view",
                    props: {
                        height: titleHeight(videoIntro[1])
                    },
                    views: [{
                        type: "label",
                        props: {
                            text: videoIntro[1],
                            textColor: $color("#AAAAAA"),
                            align: $align.left,
                            font: $font(15),
                            autoFontSize: 1,
                            lines: 0
                        },
                        layout: function (make, view) {
                            make.edges.insets($insets(0, 5, 0, 5))
                        }
                    }]
                },
                footer: {
                    type: "label",
                    props: {
                        height: 20,
                        text: "Online Downloader by Neurogram",
                        textColor: $color("#AAAAAA"),
                        align: $align.center,
                        font: $font(12)
                    }
                },
                actions: [
                    {
                        title: $l10n("DOWNLOAD"),
                        color: $color("#31c2f2"),
                        handler: function (sender, indexPath) {
                            videoDl(urlsData[indexPath.row])
                        }
                    },
                    {
                        title: $l10n("COPY"),
                        color: $color("#ffcc00"),
                        handler: function (sender, indexPath) {
                            $clipboard.text = urlsData[indexPath.row]
                            alert($l10n("COPYLINK"))
                        }
                    }
                ]
            },
            layout: function (make, view) {
                make.edges.insets($insets(256, 0, 0, 0))
            },
            events: {
                didSelect: function (sender, indexPath, data) {
                    $("video").src = urlsData[indexPath.row]
                }
            }
        },
        {
            type: "blur",
            props: {
                style: 5,
                alpha: 0
            },
            views: [{
                type: "view",
                props: {
                    id: "progressView",
                    bgcolor: $color("clear"),
                    clipsToBounds: 0
                },
                layout: function (make, view) {
                    make.center.equalTo(view.super)
                    make.size.equalTo($size(300, 15))
                    shadow(view)
                },
                views: [
                    {
                        type: "gradient",
                        props: {
                            circular: 1,
                            colors: [$color("#84fab0"), $color("#8fd3f4"), $color("white")],
                            locations: [0.0, 0.0, 0.0],
                            startPoint: $point(0, 1),
                            endPoint: $point(1, 1)
                        },
                        layout: $layout.fill
                    }
                ]
            }, {
                type: "label",
                props: {
                    id: "progressLabel",
                    textColor: $color("darkGray"),
                    align: $align.center
                },
                layout: function (make, view) {
                    make.top.equalTo($("progressView").bottom).inset(10)
                    make.centerX.equalTo(view.super.centerX)
                }
            }],
            layout: $layout.fill
        }
        ]
    })
}

function shadow(view) {
    var layer = view.runtimeValue().invoke("layer")
    layer.invoke("setCornerRadius", 5)
    layer.invoke("setShadowOffset", $size(0, 0))
    layer.invoke("setShadowColor", $color("#8fd3f4").runtimeValue().invoke("CGColor"))
    layer.invoke("setShadowOpacity", 0.8)
    layer.invoke("setShadowRadius", 5)
}

function videoDl(url) {
    $ui.animate({
        duration: 0.3,
        animation: function () {
            $("blur").alpha = 1
        }
    })
    $http.download({
        url: url,
        showsProgress: 0,
        progress: function (bytesWritten, totalBytes) {
            $("progressLabel").text = (bytesWritten / 1048576).toFixed(2) + "MB / " + (totalBytes / 1048576).toFixed(2) + "MB"
            let num = bytesWritten / totalBytes
            $("gradient").locations = [0.0, num, num]
        },
        handler: function (resp) {
            $ui.animate({
                duration: 0.3,
                animation: function () {
                    $("blur").alpha = 0
                }
            })
            $share.sheet(resp.data)
        }
    })
}

async function twitterDl(videoUrl) {
    $ui.loading(true)
    let login = await $http.get("http://twittervideodownloader.com/")
    let token = login.data.match(/'csrfmiddlewaretoken.+?='[^']+/)
    let resp = await $http.post({
        url: "http://twittervideodownloader.com/download",
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: {
            "csrfmiddlewaretoken": token[0].replace(/'csrfmiddlewaretoken.+?='/, ""),
            "tweet": videoUrl
        }
    });
    $ui.loading(false)
    let videoPoster = resp.data.match(/Download Another video<\/i><\/b>(.|\n)*<\/b>/)
    if (!videoPoster) {
        alert($l10n("INVALID"))
    } else {
        let videoTitle = videoPoster[0].match(/<b>(.|\n)*?<\/b>/)
        videoPoster = videoPoster[0].match(/img src="[^"]+/)
        let videoIntro = [videoPoster[0].replace(/img src="/, ""), videoTitle[0].replace(/<b>|<\/b>/g, "")]
        let dlUrls = resp.data.match(/<a href=".+(?=" download class.+Download Video)/g)
        let dlrows = resp.data.match(/class="float-left">.+(?=<\/p>)/g)
        let rowsData = []
        let urlsData = []
        for (var i = 0; i < dlUrls.length; i++) {
            rowsData.push(dlrows[i].replace(/class="float-left">/, ""))
            urlsData.push(dlUrls[i].replace(/<a href="/, ""))
        }
        mainView(rowsData, urlsData, videoIntro)
    }
}

function titleHeight(text) {
    var size = $text.sizeThatFits({
        text: text,
        width: $device.info.screen.width - 10,
        font: $font(15)
    })
    return size.height + 5
}