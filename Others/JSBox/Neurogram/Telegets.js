/*

Telegets by Neurogram

- Fill in Channel link path in Input Value of widget.

*/

const inputValue = $widget.inputValue;

if (inputValue) {

    let resp = await $http.get("https://t.me/s/" + inputValue)
    let data = resp.data
    data = data.match(/tgme_channel_info_header">(.|\n)+tgme_channel_download_telegram"/)[0]
    let logo = data.match(/https.+jpg/)[0]
    let title = data.match(/header_title"><span dir="auto">(.+)<\/span>/)[1]
    let entities = title.match(/&#\d{2,3};/g)
    if (entities) {
        for (var k in entities) {
            let rExp = new RegExp(entities[k], "g")
            title = title.replace(rExp, entityToString(entities[k]))
        }
    }
    let counters = data.match(/counter_value">.+?<\/span>/g)
    let type = data.match(/counter_type">.+?<\/span>/g)
    let counterView = []
    let typeView = []

    for (var i in counters) {
        counterView.push({
            type: "text",
            props: {
                text: counters[i].match(/>(.+)</)[1],
                font: $font("bold", 18),
                light: "#282828",
                dark: "white",
                minimumScaleFactor: 0.5,
                lineLimit: 1
            }
        })
        typeView.push({
            type: "text",
            props: {
                text: type[i].match(/>(.+)</)[1],
                font: $font(10),
                color: $color("#aaaaaa"),
                minimumScaleFactor: 0.5,
                lineLimit: 1
            }
        })
    }

    $widget.setTimeline({
        render: ctx => {
            //$widget.family = $widgetFamily.medium
            const family = ctx.family;
            const width = $widget.displaySize.width
            const height = $widget.displaySize.height

            const logoView = {
                type: "image",
                props: {
                    uri: logo,
                    frame: {
                        width: 60,
                        height: 60
                    },
                    resizable: true,
                    cornerRadius: 15
                }
            }

            const titleView = {
                type: "text",
                props: {
                    text: title,
                    font: family == 0 ? $font("bold", 20) : $font("bold", 25),
                    light: "#282828",
                    dark: "white",
                    minimumScaleFactor: 0.5,
                    lineLimit: 1
                }
            }

            const pathView = {
                type: "text",
                props: {
                    text: "@" + inputValue,
                    font: $font(10),
                    color: $color("#2481cc"),
                    minimumScaleFactor: 0.5,
                    lineLimit: 1
                }
            }

            const smallViews = [
                {
                    type: "hstack",
                    props: {
                        alignment: $widget.verticalAlignment.center,
                        frame: {
                            width: width - 30,
                            height: 60
                        },
                        spacing: 0
                    },
                    views: [
                        logoView,
                        {
                            type: "vstack",
                            props: {
                                alignment: $widget.horizontalAlignment.center,
                                frame: {
                                    maxWidth: Infinity,
                                    maxHeight: Infinity
                                },
                                spacing: 0
                            },
                            views: [
                                counterView.concat(typeView)[0],
                                counterView.concat(typeView)[counterView.concat(typeView).length / 2]
                            ]
                        }
                    ]
                },
                spacerMaker(18, width - 30),
                titleView,
                spacerMaker(3, width - 30),
                pathView
            ]

            const mediumViews = [
                {
                    type: "hstack",
                    props: {
                        alignment: $widget.verticalAlignment.center,
                        spacing: 0,
                        frame: {
                            width: width - 30,
                            height: 60
                        }
                    },
                    views: [
                        logoView,
                        spacerMaker(60, 8),
                        {
                            type: "vstack",
                            props: {
                                alignment: $widget.horizontalAlignment.leading,
                                spacing: 0,
                                frame: {
                                    width: width - 98,
                                    height: 60
                                }
                            },
                            views: [
                                spacerMaker(0, width - 98),
                                titleView,
                                pathView
                            ]
                        }

                    ]
                },
                spacerMaker(18, width - 30),
                {
                    type: "vgrid",
                    props: {
                        columns: Array(counterView.concat(typeView).length / 2).fill({
                            flexible: {
                                minimum: 10,
                                maximum: Infinity
                            },
                            spacing: 0
                        }),
                        spacing: 0
                    },
                    views: counterView.concat(typeView)
                }
            ]

            let currentViews = family == 0 ? smallViews : mediumViews

            return {
                type: "zstack",
                props: {
                    alignment: $widget.alignment.center
                },
                views: [
                    {
                        type: "color",
                        props: {
                            light: "white",
                            dark: "#282828"
                        }
                    },
                    {
                        type: "hstack",
                        props: {
                            alignment: $widget.verticalAlignment.center,
                            frame: {
                                width: width,
                                height: height
                            },
                            spacing: 0
                        },
                        views: [
                            spacerMaker(height, 15),
                            {
                                type: "vstack",
                                props: {
                                    frame: {
                                        width: width - 30,
                                        height: height
                                    },
                                    alignment: $widget.horizontalAlignment.leading,
                                    spacing: 0
                                },
                                views: currentViews
                            },
                            spacerMaker(height, 15)
                        ]
                    }
                ]
            }

        }
    });
}

function spacerMaker(height, width) {
    return {
        type: "spacer",
        props: {
            frame: {
                width: width,
                height: height
            }
        }
    }
}

function entityToString(entity) {
    let entities = entity.split(';')
    entities.pop()
    let tmp = entities.map(item => String.fromCharCode(
        item[2] === 'x' ? parseInt(item.slice(3), 16) : parseInt(item.slice(2)))).join('')
    return tmp
}
