const debug = !true;
const isToday = $app.env == $env.today || $app.env == $env.keyboard ? true : false;

const file = require('scripts/files');
const deal = require('scripts/deals');
const updata = require('scripts/updata')
const donate = require('scripts/donate');
const control = require('scripts/control');
const CatsViews = require('scripts/CatsViews/UIViews');
const install = new CatsViews.Analysis("kTf11uCA2dnjnGeStAghRe2V-gzGzoHsz", "nuQzITSOu9xy03P6FPB0WKs0");

const bgImageView = {
    type: "image",
    props: {
        id: "bgimg",
        bgcolor: $color("clear"),
        src: "https://ablecats.github.io/ACPlayer/AbleCats"
    },
    layout: $layout.fill,
}

const appBottomView = {
    type: "view",
    props: {
        id: "tbv",
        bgcolor: $color("clear")
    },
    layout: function (make, view) {
        make.bottom.inset(5)
        make.left.right.inset(0)
        make.centerX.equalTo(view.super)
        make.top.equalTo($("lrcView").bottom).offset(5)
    },
    views: [{
        type: "view",
        props: {
            hidden: isToday,
            bgcolor: $color("clear")
        },
        layout: function (make, view) {
            make.top.inset(0)
            make.left.right.inset(20)
            make.height.equalTo(isToday ? 0 : view.super).multipliedBy(0.3)
        },
        views: [{
            type: "slider",
            props: {
                value: 0,
                max: 1.0,
                min: 0.0,
                alpha: 0,
                minColor: $color("#ea4c89")
            },
            layout: $layout.fill,
            events: {
                changed: function (sender) {
                    $audio.seek(sender.value)
                }
            }
        }]
    },
    {
        type: "view",
        props: {
            bgcolor: $color("clear")
        },
        layout: function (make, view) {
            make.left.right.inset(10)
            make.bottom.inset(isToday ? 0 : 5)
            isToday ? make.top.inset(0) : make.height.equalTo(view.super).multipliedBy(0.6)
        },
        views: [{
            type: "button",
            props: {
                id: "pos",
                info: false,
                bgcolor: $color("clear"),
                src: "assets/play.png"
            },
            layout: function (make, view) {
                make.center.equalTo(view.super)
                make.width.equalTo(view.super.height)
                make.height.equalTo(view.super.height)
            },
            events: {
                tapped: async function (sender) {
                    sender.info = !sender.info
                    let s = sender.info ? "stop" : "play"
                    sender.src = `assets/${s}.png`

                    if ($audio.status == 2 && s == "play") $audio.pause();
                    else if ($audio.status == 0 && s == "stop") {
                        $audio.resume();
                        !control.t ? control.setTimer() : 0;
                        let d = $("bgimgBlur").info[$("albumimg").info];
                        if (!$audio.status && s == "stop") await control.play(file.get().lf ? d.flac ? d.flac : d.url : d.url);
                    }
                }
            }
        },
        {
            type: "button",
            props: {
                id: "left",
                bgcolor: $color("clear"),
                src: "assets/left.png"
            },
            layout: function (make, view) {
                make.centerY.equalTo(view.prev)
                make.centerX.equalTo($("pos")).multipliedBy(0.5)
                make.width.equalTo(view.super.height).multipliedBy(0.5)
                make.height.equalTo(view.super.height).multipliedBy(0.5)
            },
            events: {
                tapped: function (sender) {
                    $("bgimgBlur").info.length < 2 ? $ui.toast("你的列表只有一首歌,不可能有上一首...") : control.fowardSongs()
                }
            }
        },
        {
            type: "button",
            props: {
                id: "right",
                bgcolor: $color("clear"),
                src: "assets/right.png"
            },
            layout: function (make, view) {
                make.centerY.equalTo(view.prev)
                make.centerX.equalTo($("pos")).multipliedBy(1.5)
                make.width.equalTo(view.super.height).multipliedBy(0.5)
                make.height.equalTo(view.super.height).multipliedBy(0.5)
            },
            events: {
                tapped: function (sender) {
                    $("bgimgBlur").info.length < 2 ? $ui.toast("你的列表只有一首歌,不可能有下一首...") : control.nextSongs()
                }
            }
        },
        {
            type: "label",
            props: {
                alpha: 0,
                id: "sTime",
                text: "00:00",
                font: $font(14),
                align: $align.center,
                textColor: $color("white")
            },
            layout: function (make, view) {
                make.left.inset(20)
                make.centerY.equalTo(view.prev)
            }
        },
        {
            type: "label",
            props: {
                alpha: 0,
                id: "eTime",
                text: "00:00",
                font: $font(14),
                align: $align.center,
                textColor: $color("white")
            },
            layout: function (make, view) {
                make.right.inset(20)
                make.centerY.equalTo(view.prev)
            }
        }
        ]
    }
    ]
}

const bgimgBlurView = {
    type: "blur",
    props: {
        style: 2,
        id: "bgimgBlur",
    },
    layout: $layout.fill,
    views: [{
        type: "image",
        props: {
            id: "albumimg",
            bgcolor: $color("clear"),
            src: "https://ablecats.github.io/ACPlayer/AbleCats"
        },
        layout: function (make, view) {
            CatsViews.shadow(view)
            make.left.inset(20)
            make.width.equalTo(125)
            make.height.equalTo(125)
            make.centerY.equalTo(view.super)
        },
        views: [CatsViews.loading("albumimgLoading", 100, ' ', false)]
    }, {
        type: "list",
        props: {
            id: "lrcView",
            rowHeight: 125 / 3,
            selectable: true,
            separatorHidden: true,
            bgcolor: $color("clear"),
            template: {
                props: {
                    bgcolor: $color("clear"),
                },
                views: [{
                    type: "label",
                    props: {
                        lines: 2,
                        id: "lrc",
                        radius: 2,
                        font: $font(14),
                        autoFontSize: 1,
                        align: $align.center,
                        bgcolor: $color("clear"),
                        textColor: $color("white")
                    },
                    layout: function (make, view) {
                        make.left.right.inset(2)
                        make.center.equalTo(view.super)
                    }
                }]
            },
        },
        layout: function (make, view) {
            make.right.inset(20)
            make.height.equalTo(125)
            make.centerY.equalTo(view.super)
            make.left.equalTo(view.prev.right).offset(20)
        },
        events: {
            didSelect: function (tableView, indexPath, data) {
                $audio.seek(tableView.object(indexPath).index)
            }
        }
    }, {
        type: "view",
        props: {
            id: "titleBar",
        },
        layout: function (make, view) {
            make.height.equalTo(40)
            make.left.right.inset(50)
            make.top.inset(isToday ? 5 : $device.isIphoneX ? 40 : 20)
        },
        views: [{
            type: "label",
            props: {
                id: "songName",
                text: "ACPlayer",
                autoFontSize: true,
                align: $align.center,
                font: $font("bold", 18),
                bgcolor: $color("clear"),
                textColor: $color("white")
            },
            layout: function (make, view) {
                make.top.inset(0)
                make.height.equalTo(20)
                make.left.right.inset(30)
            }
        },
        {
            type: "label",
            props: {
                alpha: 0.5,
                font: $font(12),
                id: "songSinger",
                text: "Designed by AbleCats",
                align: $align.center,
                bgcolor: $color("clear"),
                textColor: $color("white")
            },
            layout: function (make, view) {
                make.left.right.inset(30)
                make.top.equalTo(view.prev.bottom).offset(2)
            }
        }
        ],
        events: {
            tapped: (sender) => {
                $("sreachList").contentOffset = $point(0, 0);
            }
        }
    }, {
        type: "button",
        props: {
            id: "close",
            src: "assets/close.png",
            bgcolor: $color("clear"),
            hidden: 0 <= $app.widgetIndex >= 2 ? true : false,
        },
        layout: function (make, view) {
            make.left.inset(10)
            make.centerY.equalTo(view.prev)
            make.size.equalTo($size(30, 30))
        },
        events: {
            tapped: function (sender) {
                $app.close()
            }
        }
    }, {
        type: "button",
        props: {
            id: "more",
            src: "assets/add.png",
            bgcolor: $color("clear"),
        },
        layout: function (make, view) {
            make.right.inset(10)
            make.centerY.equalTo(view.prev)
            make.size.equalTo($size(30, 30))
        },
        events: {
            tapped: function (sender) {
                function add() {
                    if (isToday) {
                        if ($("listControl").alpha) {
                            CatsViews.hide($("listControl"))
                        } else {
                            CatsViews.show($("listControl"))
                        }
                    } else {
                        let d = file.get();
                        $("playControl").add(settingView);
                        $("s").text = d.s;
                        $("lf").on = d.lf;
                        CatsViews.show($("settingView"));
                    }
                }
                debug ? console.open() : add()
            }
        }
    }, {
        type: "button",
        props: {
            id: "down",
            hidden: isToday,
            src: "assets/donate.png",
            bgcolor: $color("clear"),

        },
        layout: function (make, view) {
            make.right.inset(50)
            make.centerY.equalTo(view.prev)
            make.size.equalTo($size(30, 30))
        },
        events: {
            tapped: function (sender) {
                CatsViews.show($("donateView"))
            }
        }
    },
        appBottomView
    ]
}

const searchView = {
    type: "blur",
    props: {
        alpha: 0,
        style: 1,
        id: "searchView",
    },
    views: [{
        type: "label",
        props: {
            id: 'platform',
            font: $font(12),
            text: "搜索源选择：",
            align: $align.left,
            textColor: $color("white")
        },
        layout: function (make, view) {
            make.left.inset(6)
            make.top.inset(isToday ? 5 : $device.isIphoneX ? 40 : 20)
        }
    }, {
        type: "menu",
        props: {
            smoothRadius: 10,
            items: ["网易", "腾讯", "虾米"],
            bgcolor: $rgba(255, 255, 255, .5)
        },
        layout: function (make, view) {
            make.height.equalTo(44)
            make.left.right.inset(6)
            make.top.equalTo(view.prev.bottom).offset(5)
        },
        events: {
            changed: function (sender) {
                let s = $("searchWord").text;
                let i = $('platform').info = sender.index;
                s ? deal.search(s, i) : 0;
            }
        }
    }, {
        type: "label",
        props: {
            font: $font(12),
            text: "热门推荐：",
            align: $align.left,
            textColor: $color("white")
        },
        layout: function (make, view) {
            make.left.inset(6)
            make.top.equalTo(view.prev.bottom).offset(5)
        }
    }, {
        type: "matrix",
        props: {
            columns: 4,
            spacing: 5,
            itemHeight: 80,
            bgcolor: $color("clear"),
            template: {
                props: {},
                views: [{
                    type: "spinner",
                    props: {
                        loading: true
                    },
                    layout: function (make, view) {
                        make.center.equalTo(view.super)
                    }
                }, {
                    type: "image",
                    props: {
                        radius: 5,
                        id: "plistImg",
                        bgcolor: $color("clear"),
                    },
                    views: [{
                        type: "gradient",
                        props: {
                            colors: [$color("black"), $color("clear")],
                            locations: [0.0, 1.0],
                            startPoint: $point(0, 1),
                            endPoint: $point(0, 0)
                        },
                        layout: $layout.fill,
                        views: [{
                            type: "label",
                            props: {
                                id: "plistName",
                                font: $font(12),
                                align: $align.center,
                                bgcolor: $color("clear"),
                                textColor: $color("lightGray"),
                            },
                            layout: function (make, view) {
                                make.width.equalTo(20)
                                make.left.right.inset(0)
                                make.bottom.equalTo(view.super.bottom)
                            }
                        }]
                    }],
                    layout: $layout.fill
                }]
            }
        },
        events: {
            pulled: async function (sender) {
                sender.data = await deal.recommend()
            },
            didSelect: async function (tableView, indexPath, data) {
                $("searchWord").blur()
                deal.search(`http://music.163.com/playlist?id=${tableView.object(indexPath).plistId}`, 0)
            }
        },
        layout: function (make, view) {
            make.bottom.inset(5)
            make.left.right.inset(0)
            make.top.equalTo(view.prev.bottom)
        }
    }],
    layout: $layout.fill
}

const settingView = {
    type: "blur",
    props: {
        style: 1,
        alpha: 0,
        id: "settingView",
    },
    layout: $layout.fill,
    views: [{
        type: "view",
        props: {
            bgcolor: $color("#F9F9F9")
        },
        layout: function (make, view) {
            make.top.inset(0)
            make.height.equalTo(70)
            make.left.right.inset(0)
        },
        views: [{
            type: "button",
            props: {
                bgcolor: $color("clear"),
                src: "assets/close_b.png"
            },
            layout: function (make, view) {
                make.right.inset(15)
                make.bottom.inset(5)
                make.size.equalTo($size(30, 30))
            },
            events: {
                tapped(sender) {
                    file.set($("s").text, $("lf").on);
                    CatsViews.remove($("settingView"));
                }
            }
        }]
    }, {
        type: "list",
        props: {
            data: [{
                title: "默认搜索内容",
                rows: [{
                    type: "input",
                    props: {
                        id: "s",
                        text: file.get().s,
                        darkKeyboard: true,
                        type: $kbType.search,
                        bgcolor: $color("clear")
                    },
                    layout: function (make) {
                        make.top.bottom.inset(5)
                        make.left.right.inset(10)
                    },
                    events: {
                        returned: function (sender) {
                            sender.blur()
                        }
                    }
                }]
            }, {
                title: "其他设置",
                rows: [{
                    type: "view",
                    props: {
                        bgcolor: $color("clear")
                    },
                    layout: $layout.fill,
                    views: [{
                        type: "label",
                        props: {
                            bgcolor: $color("clear"),
                            text: "打开Web服务器分享音乐文件",
                            align: $align.center
                        },
                        layout: function (make, view) {
                            make.left.inset(15)
                            make.centerY.equalTo(view.super)
                        }
                    }, {
                        type: "switch",
                        props: {
                            id: "lf",
                            on: file.get().lf
                        },
                        layout: function (make, view) {
                            make.right.inset(15)
                            make.centerY.equalTo(view.super)
                        },
                        events: {
                            changed: (sender) => {
                                if (sender.on) webSever(sender.on);
                                else {
                                    $http.stopServer();
                                    $("webURL").text = "";
                                    console.log("web服务器已关闭");
                                }
                            }
                        }
                    }]
                }, {
                    type: "view",
                    props: {
                        bgcolor: $color("clear")
                    },
                    layout: $layout.fill,
                    views: [{
                        type: "label",
                        props: {
                            id: "webURL",
                            bgcolor: $color("clear"),
                            align: $align.center,
                            font: $font(14)
                        },
                        layout: $layout.fill
                    }]
                }]
            }]
        },
        layout: function (make, view) {
            make.left.right.bottom.inset(0)
            make.top.equalTo(view.prev.bottom)
        }
    }]
}

const donateView = {
    type: "blur",
    props: {
        style: 1,
        alpha: 0,
        id: "donateView",
        bgcolor: $color("white"),
    },
    layout: $layout.fill,
    views: [{
        type: "view",
        props: {
            bgcolor: $color("white")
        },
        layout: function (make, view) {
            make.top.inset(0)
            make.height.equalTo(70)
            make.left.right.inset(0)
        },
        views: [{
            type: "button",
            props: {
                bgcolor: $color("white"),
                src: "assets/close_b.png"
            },
            layout: function (make, view) {
                make.right.inset(15)
                make.bottom.inset(5)
                make.size.equalTo($size(30, 30))
            },
            events: {
                tapped(sender) {
                    CatsViews.hide($("donateView"))
                }
            }
        }]
    }, {
        type: "image",
        props: {
            circular: 1,
            bgcolor: $color("white"),
            src: "https://ablecats.github.io/ACPlayer/AbleCats"
        },
        layout: function (make, view) {
            make.centerX.equalTo(view.super)
            make.top.equalTo(view.prev.bottom)
            make.size.equalTo($size(120, 120))
        }
    }, donate.make()]
}

const listView = {
    type: "list",
    props: {
        id: "sreachList",
        template: {
            props: {
                bgcolor: $color("clear")
            },
            views: [{
                type: "label",
                props: {
                    id: "num",
                    font: $font(15),
                    align: $align.center,
                    textColor: isToday ? $color("white") : $color("darkGray"),
                },
                layout: function (make, view) {
                    make.top.left.bottom.inset(0)
                    make.width.equalTo(view.super.height)
                }
            }, {
                type: "button",
                props: {
                    id: "videoBtn",
                    hidden: !isToday,
                    bgcolor: $color("clear"),
                    src: "assets/video-play.png"
                },
                layout: function (make, view) {
                    let s = isToday ? 0 : 20;
                    make.right.inset(s)
                    make.size.equalTo($size(s, s))
                    make.centerY.equalTo(view.super)
                },
                events: {
                    tapped(sender) {
                        let video = CatsViews.video("video", sender.info, "", function (make, view) {
                            make.top.inset(0)
                            make.bottom.inset(10)
                            make.left.right.inset(0)
                        });
                        let close = {
                            type: "button",
                            props: {
                                id: "close",
                                hidden: isToday,
                                src: "assets/close.png",
                                bgcolor: $color("clear"),
                            },
                            layout: function (make, view) {
                                make.left.inset(10)
                                make.size.equalTo($size(30, 30))
                                make.top.equalTo(view.prev.top).offset(40)
                            },
                            events: {
                                tapped: function (sender) {
                                    $("video").eval({ script: "dp.pause()" });
                                    CatsViews.remove($("videoView"));
                                }
                            }
                        };
                        let views = {
                            type: "view",
                            props: {
                                style: 1,
                                alpha: 1,
                                id: "videoView",
                                bgcolor: $color("black"),
                            },
                            views: [video, close],
                            layout: $layout.fill
                        };
                        $("videoView") ? $("videoView").remove() : 0;

                        CatsViews.add($("playControl"), views, $("videoView"), () => {
                            $delay(0.3, () => {
                                $("video").eval({ script: "dp.play()" });
                            });
                        })
                    }
                }
            }, {
                type: "label",
                props: {
                    id: "title",
                    font: $font(15),
                    align: $align.left,
                    textColor: isToday ? $color("white") : $color("black"),
                },
                layout: function (make, view) {
                    make.top.inset(5)
                    make.left.equalTo($("num").right).offset(0)
                    make.right.equalTo($("videoBtn").left).offset(-10)
                }
            }, {
                type: "label",
                props: {
                    id: "singer",
                    font: $font(13),
                    align: $align.left,
                    textColor: $color("lightGray"),
                },
                layout: function (make, view) {
                    make.bottom.inset(5)
                    make.left.equalTo($("num").right).offset(0)
                    make.right.lessThanOrEqualTo($("videoBtn").left).offset(-25)
                }
            }, {
                type: "image",
                props: {
                    id: "isPath",
                    src: "assets/path.png",
                    bgcolor: $color("clear")
                },
                layout: function (make, view) {
                    make.bottom.inset(5)
                    make.size.equalTo($size(15, 15))
                    make.left.equalTo(view.prev.right).offset(2)
                }
            }]
        },
        bgcolor: $color("clear"),
        header: {
            type: "view",
            props: {
                bgcolor: $color("clear")
            },
            layout: function (make, view) {
                make.height.equalTo(40)
                make.left.right.inset(0)
                make.center.equalTo(view.super)
            },
            views: [{
                type: "input",
                props: {
                    radius: 20,
                    id: "searchWord",
                    darkKeyboard: true,
                    type: $kbType.search,
                    align: $align.center,
                    bgcolor: $rgba(191, 191, 191, .1),
                    placeholder: "请输入搜索内容或指令",
                },
                layout: function (make, view) {
                    make.left.right.inset(5)
                    make.top.bottom.inset(2)
                    make.center.equalTo(view.super)
                },
                events: {
                    returned: function (sender) {
                        sender.blur();
                        if (sender.text.indexOf("$qq ") != -1) {
                            sender.text = sender.text.replace("$qq ", "");
                            deal.search(sender.text, 1);
                        } else if (sender.text.indexOf("$xm ") != -1) {
                            sender.text = sender.text.replace("$xm ", "");
                            deal.search(sender.text, 2);
                        } else deal.search(sender.text, $('platform').info);
                        !isToday ? CatsViews.hide($("searchView")) : 0;
                    },
                    didEndEditing: function (sender) {
                        !isToday ? CatsViews.hide($("searchView")) : 0;
                    },
                    didBeginEditing: async function (sender) {
                        if (!isToday) {
                            CatsViews.show($("searchView"))
                            $("matrix").data = await deal.recommend()
                        }
                    }
                }
            }]
        },
        actions: [{
            title: "下载",
            color: $color("blue"),
            handler: async (sender, indexPath) => {
                if ($('platform').info == 1) deal.EVAL(0, $("bgimgBlur").info[indexPath.row].id, 1);
                else {
                    let data = await deal.action(indexPath)
                    let ddata = await $http.download({ url: data.url, showsProgress: true })
                    switch (ddata.response.statusCode) {
                        case 200:
                            $file.write({
                                data: ddata.data,
                                path: `${file.path}/${data.name}`
                            })
                            $ui.toast("歌曲缓冲完成...")
                            break;
                        default:
                            $ui.toast("error 403 ,歌曲缓冲失败...")
                            break;
                    }
                }
            }
        }, {
            title: "delete",
            handler: async function (sender, indexPath) {
                let data = await deal.action(indexPath)
                $ui.toast($file.delete(`${file.path}/${data.name}`) ? "歌曲删除成功..." : "errorCode(911) ,歌曲删除失败...")
            }
        }, {
            title: "导出",
            handler: async function (sender, indexPath) {
                let data = await deal.action(indexPath)
                $share.sheet({
                    items: [data.name, $file.read(`${file.path}/${data.name}`)],
                    handler: function (success) {
                        $ui.toast(success ? "歌曲导出成功..." : "errorCode(908) ,歌曲导出失败...")
                    }
                })
            }
        }]
    },
    events: {
        pulled: function (sender) {
            deal.search($("searchWord").text ? $("searchWord").text : '', $('platform').info)
        },
        didSelect: async function (tableView, indexPath, data) {
            deal.assignment(indexPath.row);
            control.play($("bgimgBlur").info[$("albumimg").info]);
        }
    },
    layout: $layout.fill,
}

const moreSound = {
    type: "web",
    props: {
        id: "simulation",
        url: "http://moresound.tk/music/",
        script: "$notify(\"LOG\", { log: 'moreSound starts running'});"
    },
    layout(make) {
        make.size.equalTo($size(1, 1))
    },
    events: {
        HQ: async (object) => {
            console.log(object)
            if (object.url) {
                let ddata = await $http.download({ url: object.url, showsProgress: true });
                switch (ddata.response.statusCode) {
                    case 200:
                        $file.write({
                            data: ddata.data,
                            path: `${file.path}/${object.name}.${object.type}`
                        })
                        $ui.toast("歌曲缓冲完成...")
                        break;
                    default:
                        $ui.toast("error 403 ,歌曲缓冲失败...")
                        break;
                }
            }
        },
        LOG: (object) => { console.log(object.log) },
        Tips: (object) => { $("tips").text = object.tips; },
        Error: (object) => { $ui.alert({ title: "Error Code 403", message: "plz send code to AbleCats" }) },
        Listen: (object) => { console.log(object); $audio.play({ url: object.url }); control.t == null ? control.setTimer() : 0; },
        Search: (object) => {
            if (object.data.song_list) {
                let list = object.data.song_list;
                for (const i in list) {
                    list[i].songname = list[i].songname.split(/<s/)[0].replace(/\n\s*/, "")
                }
            } else $ui.alert({ title: "Error Code 0", message: "plz send code to @AbleCats" })
        },
        didFail: (sender, navigation, error) => { $ui.alert({ title: "Error Code 403", message: "Simulator Failure" }) }
    }
}

function webSever(on) {
    $http.stopServer();
    on ? $http.startServer({
        port: 8080,
        path: file.path,
        handler: function (result) {
            var url = result.url;
            console.log("web服务已开启")
            $("webURL").text = url ? url : "检查网络是否处于WIFI状态";
        }
    }) : 0;
}

function init() {
    return () => {
        $ui.render({
            props: {
                id: "MainView",
                navBarHidden: true
            },
            views: [{
                type: "view",
                props: {
                    id: "playControl"
                },
                layout: function (make, view) {
                    make.top.left.right.inset(0)
                    isToday ? make.bottom.inset(0) : make.height.equalTo(view.super.height).multipliedBy(0.41);
                },
                views: [bgImageView, bgimgBlurView, searchView, donateView, moreSound]
            }, {
                type: "blur",
                props: {
                    style: 1,
                    smoothRadius: 10,
                    id: "listControl",
                    alpha: isToday ? 0 : 1,
                },
                layout: function (make, view) {
                    if (isToday) {
                        make.right.inset(20)
                        make.centerY.equalTo(view.super)
                        make.width.equalTo($("lrcView"))
                        make.height.equalTo($("albumimg"))
                    } else {
                        let height = view.super.height
                        make.left.right.bottom.inset(0);
                        make.top.equalTo(view.prev.bottom);
                        make.height.equalTo(height).multipliedBy(0.6);
                    }
                },
                views: [listView]
            }]
        })
        
        updata.check();
        //deal.search(null);
        webSever(file.get().lf);
        install.upload(JSON.parse($file.read("version.json").string).app);
        install.count((resp) => console.warn(`There are now ${resp.data.count} users used ACPlayer.`));
        require('scripts/keyboard').hideBar("MainView");
    }
}

function exit() {
    return () => {
        control.killTimer()
    }
}

function pause() {
    return () => control.killTimer()
}

function resume() {
    return () => control.setTimer()
}

function pathFile(views) {
    let data = [];
    let orig = $file.list(file.path);
    orig.map((x, i) => {
        data.push({ pathNum: { text: (i + 1).toString() }, pathTitle: { text: x } });
    });
    $delay(1, () => $("pathList").data = data);

}

module.exports = {
    init: init,
    exit: exit,
    pause: pause,
    resume: resume,
    isToday: isToday,
}