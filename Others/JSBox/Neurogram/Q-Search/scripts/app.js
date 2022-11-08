var buyMeaCoffee = require('scripts/coffee')
$app.autoKeyboardEnabled = true

function launch() {
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
      type: "list",
      props: {
        id: "mainList",
        rowHeight: 55,
        actions: [
          {
            title: "delete",
            handler: function (sender, indexPath) {
              deleteData(sender.data)
            }
          },
          {
            title: $l10n("EDIT"),
            handler: function (sender, indexPath) {
              editData(sender.data[indexPath.row])
            }
          }
        ],
        footer: {
          type: "label",
          props: {
            height: 40,
            text: "Q-Search by Neurogram",
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
                id: "title",
                textColor: $color("#656565"),
                align: $align.center,
                font: $font(".SFUIText", 18)
              },
              layout: function (make, view) {
                make.top.inset(10)
                make.left.inset(15)
              }
            },
            {
              type: "label",
              props: {
                id: "cmdnUrl",
                textColor: $color("#BEC8C8"),
                align: $align.center,
                font: $font("bold", 10)
              },
              layout: function (make, view) {
                make.bottom.inset(10)
                make.left.inset(15)
              }
            },
            {
              type: "label",
              props: {
                id: "default",
                textColor: $color("#BEC8C8"),
                align: $align.center,
                font: $font("bold", 10)
              },
              layout: function (make, view) {
                make.top.inset(10)
                make.right.inset(15)
              }
            }
          ]
        }
      },
      layout: $layout.fill,
      events: {
        didScroll: function (sender) {
          addBt(sender.contentOffset.y)
        },
        didSelect: function (sender, indexPath, data) {
          launcher(data.title.info + " ")
        },
        didLongPress: function (sender, indexPath, data) {
          defaultWeb(data.title.info)
        }
      }
    }]
  });
  listData()
}

function listData() {
  let data = getConf()
  let listData = []
  for (var i in data) {
    if (i !== "@default")
      listData.push({
        title: {
          text: data[i].title,
          info: i
        },
        cmdnUrl: {
          text: i + " | " + data[i].url
        },
        default: {
          text: data["@default"] == i ? $l10n("DEFAULT") : ""
        }
      })
  }
  $("mainList").data = listData
}

module.exports = {
  launch: launch,
  launcher: launcher,
  widgets: widgets
}

function addBt(y) {
  let addBtView = {
    type: "button",
    props: {
      id: "addBt",
      bgcolor: $color("clear"),
      icon: $icon("104", $("gray"), $size(25, 25))
    },
    layout: function (make, view) {
      make.centerX.equalTo(view.super)
      make.top.inset(15)
    }
  }

  if (y < -20) {
    if (!$("addBt")) {
      $("mainView").add(addBtView)
    }
    $("addBt").alpha = - y / 100
    if ($("addBt").alpha >= 1) {
      addView("")
    }
  } else {
    if ($("addBt")) {
      $("addBt").remove()
    }
  }
}

function addView(oldData) {

  let bgView = {
    type: "blur",
    props: {
      bgcolor: $color("clear"),
      style: 1,
      alpha: 0.8
    },
    layout: $layout.fill,
    events: {
      tapped: function (sender) {
        removeAddView()
      }
    }
  }

  let newLine = {
    type: "view",
    props: {
      bgcolor: $color("white"),
      borderWidth: 1,
      borderColor: $color("lightGray")
    },
    layout: function (make, view) {
      make.width.equalTo(view.super)
      make.height.equalTo(0.8)
      make.bottom.inset(0)
    }
  }

  let newDataBg = {
    type: "view",
    props: {
      id: "newDataBg",
      bgcolor: $color("white"),
      alpha: 1
    },
    layout: function (make, view) {
      make.left.right.inset(30)
      make.height.equalTo(320)
      make.top.inset(30)
      shadow(view)
    },
    views: [{
      type: "list",
      props: {
        scrollEnabled: 0,
        radius: 10,
        rowHeight: 32,
        separatorHidden: 1,
        bgcolor: $color("white"),
        footer: {
          type: "view",
          props: {
            height: 50
          },
          views: [{
            type: "button",
            props: {
              title: "OK"
            },
            layout: function (make, view) {
              make.center.equalTo(view.super)
              make.size.equalTo($size(60, 30))
            },
            events: {
              tapped: function (sender) {
                saveData(oldData)
              }
            }
          }]
        },
        data: [
          {
            title: $l10n("TITLE"),
            rows: [
              {
                type: "input",
                props: {
                  id: "newTitle",
                  bgcolor: $color("white")
                },
                layout: function (make, view) {
                  make.left.right.inset(15)
                  make.height.equalTo(32)
                  make.center.equalTo(view.super)
                },
                events: {
                  returned: function (sender) {
                    sender.blur()
                  }
                },
                views: [newLine]
              }
            ]
          },
          {
            title: $l10n("COMMAND"),
            rows: [
              {
                type: "input",
                props: {
                  id: "newCommand",
                  bgcolor: $color("white")
                },
                layout: function (make, view) {
                  make.left.right.inset(15)
                  make.height.equalTo(32)
                  make.center.equalTo(view.super)
                },
                events: {
                  returned: function (sender) {
                    sender.blur()
                  }
                },
                views: [newLine]
              }
            ]
          },
          {
            title: $l10n("URL"),
            rows: [
              {
                type: "input",
                props: {
                  id: "newUrl",
                  bgcolor: $color("white")
                },
                layout: function (make, view) {
                  make.left.right.inset(15)
                  make.height.equalTo(32)
                  make.center.equalTo(view.super)
                },
                events: {
                  returned: function (sender) {
                    sender.blur()
                  }
                },
                views: [newLine]
              }
            ]
          }
        ]
      },
      layout: $layout.fill,
    }]
  }

  if (!$("blur")) {
    $device.taptic(2)
    $("mainView").add(bgView)
    $("mainView").add(newDataBg)
  }

}

function shadow(view) {
  var layer = view.runtimeValue().invoke("layer")
  layer.invoke("setCornerRadius", 10)
  layer.invoke("setShadowOffset", $size(0, 0))
  layer.invoke("setShadowColor", $color("lightGray").runtimeValue().invoke("CGColor"))
  layer.invoke("setShadowOpacity", 0.6)
  layer.invoke("setShadowRadius", 5)
}

function saveData(oldData) {
  $device.taptic(2)
  if ($("newCommand").text.match(/\s/)) {
    alert($l10n("SPACE"))
  } else if (!$("newUrl").text.match(/^http/)) {
    alert($l10n("HTTP"))
  } else if (!$("newTitle").text || !$("newCommand").text || !$("newUrl").text) {
    alert($l10n("EMPTY"))
  } else {
    let data = getConf()
    if (oldData) {
      delete (data[oldData])
    }
    data[$("newCommand").text] = {
      title: $("newTitle").text,
      url: $("newUrl").text
    }
    let dataCmd = Object.keys(data).sort()
    var newData = {}
    for (var i in dataCmd) {
      newData[dataCmd[i]] = data[dataCmd[i]]
    }
    saveConf(newData)
    removeAddView()
    listData()
  }
}

function removeAddView() {
  $("blur").animator.makeOpacity(0).animate(0.5)
  $("blur").remove()
  $("newDataBg").animator.makeOpacity(0).animate(0.5)
  $("newDataBg").remove()
}

function editData(data) {
  addView(data.title.info)
  $("newTitle").text = data.title.text
  $("newCommand").text = data.title.info
  $("newUrl").text = data.cmdnUrl.text.replace(/^.+?\s\|\s/, "")
}

function deleteData(data) {
  let newData = {}
  for (var i in data) {
    newData[data[i].title.info] = {
      title: data[i].title.text,
      url: data[i].cmdnUrl.text.replace(/^.+?\s\|\s/, "")
    }
  }
  let oldData = getConf()
  newData["@default"] = oldData["@default"]
  saveConf(newData)
  listData()
}

function webSearch(text) {
  let data = getConf()
  let command = text.match(/^\S+/)
  let links = $detector.link(text)
  if (data[command[0]]) {
    $app.openURL(data[command[0]].url.replace(/\%@/, $text.URLEncode(text.replace(/^\S+\s*/, ""))))
  } else if (links.length != 0) {
    $app.openURL(links)
  } else {
    $app.openURL(data[data["@default"]].url.replace(/\%@/, $text.URLEncode(text)))
  }
}

function widgets() {
  $ui.render({
    props: {
    },
    views: [{
      type: "button",
      props: {
        icon: $icon("023", $color("white"), $size(20, 20)),
        bgcolor: $color("clear")
      },
      layout: function (make, view) {
        make.centerY.equalTo(view.super)
        make.left.inset(15)
      }
    }, {
      type: "input",
      props: {
        placeholder: "Search",
        bgcolor: $color("clear")
      },
      layout: function (make, view) {
        make.center.equalTo(view.super)
        make.height.equalTo(32)
        make.left.right.inset(40)
      },
      events: {
        returned: function (sender) {
          sender.blur()
          webSearch(sender.text)
        }
      }
    }]
  });
}

async function launcher(cmd) {
  let text = await $input.text({
    text: cmd
  })
  webSearch(text)
}

function defaultWeb(cmd) {
  $device.taptic(2)
  let data = getConf()
  data["@default"] = cmd
  saveConf(data)
  listData()
}

function saveConf(data) {
  $file.write({
    data: $data({ string: JSON.stringify(data) }),
    path: "assets/conf.json"
  })
}

function getConf() {
  return JSON.parse($file.read("assets/conf.json").string)
}