let location = 3,
  timer = null

var width = $device.info.screen.width
var height = $device.info.screen.height

if ($file.exists("喵喵喵.txt") == 0) {
  $file.write({
    data: $data({
      string: "喵喵喵"
    }),
    path: "喵喵喵.txt"
  })
  if ($file.exists("JUZIMI.txt") == 1) $file.delete("JUZIMI.txt")
}

const lodingView = {
  type: "",
  props: {
    id: "lodingView",
    bgcolor: $color("clear")
  },
  layout: $layout.fill,
  views: [{
    type: "blur",
    props: {
      style: 2,
      radius: 20
    },
    layout: function(make, view) {
      make.center.equalTo(view.super)
      make.size.equalTo(110)
    },
    views: [{
      type: "canvas",
      layout: $layout.fill,
      events: {
        draw: function start(view, ctx) {
          ctx.strokeColor = $color("white")
          ctx.setLineWidth(6)
          ctx.addArc(view.frame.width / 2, view.frame.height / 2, 25, location, Math.PI * 2 * 0.8 + location, false)
          ctx.strokePath()
        }
      }
    }]
  }]
}

var loading = {
  start: function() {
    $("window").add(lodingView)
    timer = $timer.schedule({
      interval: 0.01,
      handler: function() {
        location = location + 0.07
        $("canvas").runtimeValue().invoke("setNeedsDisplay")
      }
    })
    $ui.animate({
      duration: 0.4,
      animation: function() {
        $("lodingView").alpha = 1
      }
    })
  },
  stop: function() {
    $ui.animate({
      duration: 0.4,
      animation: function() {
        $("lodingView").alpha = 0
      },
      completion: function() {
        timer.invalidate()
        $("lodingView").remove()
        $delay(0.5, () => $("lodingView").remove())
      }
    })
  }
}

const colorData = [
  [$color("#fd354a"), $color("#da0a6f")],
  [$color("#f97227"), $color("#f52156")],
  [$color("#edb319"), $color("#e47b18")],
  [$color("#eecb01"), $color("#e8a400")],
  [$color("#7ace1e"), $color("#5aba23")],
  [$color("#25c578"), $color("#3ab523")],
  [$color("#24d59a"), $color("#24bb9d")],
  [$color("#00c0c8"), $color("#00a0ca")],
  [$color("#12b7de"), $color("#2193e6")],
  [$color("#2f74e0"), $color("#5d44e0")],
  [$color("#825af6"), $color("#6251f5")],
  [$color("#cc3ec8"), $color("#9f0cdd")],
  [$color("#23456c"), $color("#003068")]
]

const template = [{
    type: "view",
    props: {
      bgcolor: $color("white"),
      id: "shadow"
    },
    layout: function(make, view) {
      make.edges.inset(offset + 3)
      shadowButton(view)
    }
  },
  {
    type: "gradient",
    props: {
      locations: [0.0, 1.0],
      startPoint: $point(0, 0),
      endPoint: $point(1, 1),
      radius: 10,
      colors: []
    },
    layout: function(make, view) {
      make.edges.inset(offset)
    }
  },
  {
    type: "text",
    props: {
      id: "content",
      bgcolor: $color("clear"),
      editable: false,
      alwaysBounceVertical: false,
      textColor: $color("white"),
      selectable: false,
      text: ""
    },
    layout: function(make) {
      make.bottom.inset(offset)
      make.left.right.top.inset(offset)
    }
  },
  {
    type: "image",
    props: {
      id: "image",
      bgcolor: $color("clear"),
      src: ""
    },
    layout: function(make, view) {
      make.left.top.inset(offset + 10)
      make.width.equalTo(100)
      make.height.equalTo(141)
    }
  },
  {
    type: "label",
    props: {
      id: "title",
      textColor: $color("black"),
      font: $font(19),
      text: ""
    },
    layout: function(make) {
      make.top.inset(offset + 10)
      make.left.equalTo($("image").right).offset(10)
      //make.height.equalTo(20)
    }
  },
  {
    type: "text",
    props: {
      id: "Content",
      bgcolor: $color("clear"),
      editable: false,
      alwaysBounceVertical: false,
      textColor: $color("black"),
      selectable: false,
      font: $font(15),
      text: ""
    },
    layout: function(make) {
      make.top.equalTo($("title").bottom)
      make.left.equalTo($("image").right)
      make.bottom.right.inset(offset * 2)
    }
  },
  {
    type: "view",
    props: {
      bgcolor: $color("clear"),
      id: "infoview",
      info: ""
    },
    layout: $layout.fill,
    events: {
      tapped: function(sender) {
        if (sender.info.jud == 1) {
          search(sender.info.href, sender.info.title, 1, 0, sender.info.a)
        } else if (sender.info.jud == 2) {
          //          viewSentence(1, [sender.info.a[0], sender.info.a[1], sender.info.a[2]])
          showit()
        } else if (sender.info.jud == 0) {
          viewSentence(0, [sender.info.text, sender.info.color, sender.info.author, sender.info.from], sender.info.lll, sender.info.index)
        }
      }
    }
  },
  {
    type: "label",
    props: {
      id: "bigTitle",
      textColor: $color("black"),
      font: $font("bold", 25)
    },
    layout: function(make, view) {
      make.left.inset(offset + 5)
      make.centerY.equalTo(view.super)
    }
  }
]

function randomColor(Min, Max) {
  var Range = colorData.length - 1 - 0;
  var Rand = Math.random();
  var num = 0 + Math.round(Rand * Range);
  return num;
}

var offset = 10

const searchView = {
  type: "input",
  props: {
    id: "search",
    type: $kbType.search,
    placeholder: "搜索..."
  },
  layout: function(make, view) {
    make.top.bottom.inset(offset)
    make.right.left.inset(10)
  },
  events: {
    returned(sender) {
      sender.blur()
      search(`http://www.juzimi.com/search/node/${encodeURI(sender.text)}%20type:sentence`, sender.text, 0)
    }
  }
}

var exists = $file.exists("JUZIMI.txt")
if (exists == 0) {
  var files = [{ "ifm": ["Welcome！欢迎来到句子迷~\n句子迷，一个美句佳句的分享社区，专属您自己的句子摘抄本。\n在这里，您可以轻松发布和收藏您喜欢的句子，和同好谈论感兴趣的佳句妙语、诗词歌赋。\n在每一句感动你我的文字后面，有着我们真挚的情感和故事，有着我们一起的倾诉和聆听。", ["#eecb01", "#e8a400"], "句子迷", "：句子迷"] }, { "ifm": ["爱写字，爱摘抄，不爱平庸；\n爱阅读，爱收藏，不爱遗忘。\n迷恋文字，崇尚共鸣，\n有那么一点点执着，有那么一点点个性，\n不是什么小众，也不是什么大流，\n我们只为那一行行跳动的文字着迷。\n我们是自己精神世界的主人，\n我们是句子迷。", ["#825af6", "#6251f5"], "句子迷", "：句子迷"] }, { "ifm": ["by Hhdº\n点我给作者加鸡腿🍗\n如果你觉得打赏按钮碍眼，可以进入移除", ["#2f74e0", "#5d44e0"], "Hhdº", "：Hhdº"] }]
  $file.write({
    data: $data({
      string: JSON.stringify(files)
    }),
    path: "JUZIMI.txt"
  })
}

var sentences = gl()

function gl() {
  var sentences = [searchView, {
    bigTitle: {
      text: "我的收藏"
    },
    shadow: {
      hidden: true
    }
  }]
  var files = JSON.parse($file.read("JUZIMI.txt").string)
  for (var i in files) {
    var item = files[i]
    sentences.push(creatData(item.ifm[0], [$color(item.ifm[1][0]), $color(item.ifm[1][1])], "", "", "", false, "", {
      jud: 0,
      text: item.ifm[0],
      color: [$color(item.ifm[1][0]), $color(item.ifm[1][1])],
      author: item.ifm[2],
      'from': item.ifm[3],
      lll: 1,
      index: i
      //fromurl: fromurl
    }))
    console.log(item.ifm[1][1])
    var a = $color(item.ifm[1][1])
    var r = (a.runtimeValue().invoke("redComponent") * 255).toString(16)
    var g = (a.runtimeValue().invoke("greenComponent") * 255).toString(16)
    var b = (a.runtimeValue().invoke("blueComponent") * 255).toString(16)
    var str = `#${r}${g}${b}`
    console.log(str)
  }
  return sentences
}

console.log(sentences)

$ui.render({
  props: {
    title: "句子迷",
    id: "window"
  },
  views: [{
      type: "text",
      props: {
        id: "getHeight"
      },
      layout: function(make) {
        make.left.right.inset(offset * 2)
        make.top.bottom.inset(0)
      },
    },
    {
      type: "text",
      props: {
        id: "getheight1"
      },
      layout: function(make) {
        make.left.right.inset(offset * 2)
        make.top.bottom.inset(0)
      }
    },
    {
      type: "list",
      props: {
        id: "list",
        itemHeight: 88,
        separatorHidden: true,
        data: sentences,
        selectable: false,
        template: template
      },
      layout: $layout.fill,
      events: {
        rowHeight: function(sender, indexPath) {
          if (indexPath.row == 0) {
            return 42 + (offset - 5) * 2
          } else {
            if (sender.data[indexPath.row].jud == 1) {
              return 141 + (offset * 4)
            } else {
              $("getHeight").text = sender.data[indexPath.row].content.text
              return $("getHeight").contentSize.height + (offset * 2)
            }
          }
        },
        pulled: function(sender) {
          refresh()
          $("input").text = ""
        },
        didReachBottom: function(sender) {
          sender.endFetchingMore()
          if (sender.data[sender.data.length - 1].infoview.info.nu !== "none" && sender.data[1].bigTitle.text !== "我的收藏") {
            search("http://www.juzimi.com" + sender.data[sender.data.length - 1].infoview.info.nu, "", 0, 1)
          }
        }
      }
    }
  ]
})

function viewSentence(jud, ifm, lll, index) {
  if (jud == 0) {
    var views = [{
        type: "gradient",
        props: {
          locations: [0.0, 1.0],
          startPoint: $point(0, 0),
          endPoint: $point(1, 1),
          radius: 10,
          colors: ifm[1]
        },
        layout: function(make, view) {
          make.edges.inset(offset)
        }
      },
      {
        type: "text",
        props: {
          id: "content",
          bgcolor: $color("clear"),
          editable: false,
          alwaysBounceVertical: false,
          textColor: $color("white"),
          selectable: false,
          text: ifm[0]
        },
        layout: function(make) {
          make.bottom.inset(offset)
          make.left.right.top.inset(offset)
        }
      }
    ]
  } else {
    var views = [{
        type: "view",
        props: {
          bgcolor: $color("white"),
          radius: 10
        },
        layout: function(make, view) {
          make.edges.inset(offset)
        }
      },
      {
        type: "image",
        props: {
          id: "image",
          bgcolor: $color("clear"),
          src: ifm[0]
        },
        layout: function(make, view) {
          make.left.top.bottom.inset(offset + 10)
          make.width.equalTo(100)
          make.height.equalTo(141)
        }
      },
      {
        type: "label",
        props: {
          id: "title",
          textColor: $color("black"),
          font: $font(19),
          text: ifm[1]
        },
        layout: function(make) {
          make.top.inset(offset + 10)
          make.left.equalTo($("image").right).offset(10)
          //make.height.equalTo(20)
        }
      },
      {
        type: "text",
        props: {
          id: "Content",
          bgcolor: $color("clear"),
          editable: false,
          alwaysBounceVertical: false,
          textColor: $color("black"),
          selectable: false,
          font: $font(15),
          text: ifm[2]
        },
        layout: function(make) {
          make.top.equalTo($("title").bottom)
          make.left.equalTo($("image").right)
          make.bottom.right.inset(offset * 2)
        }
      }
    ]
  }
  views.unshift({
    type: "view",
    props: {
      bgcolor: $color("white"),
      id: "shadow"
    },
    layout: function(make, view) {
      make.edges.inset(offset + 5)
      shadowButton(view)
    }
  })
  const blurView = {
    type: "blur",
    props: {
      style: 1,
      alpha: 0
    },
    layout: $layout.fill
  }
  const shadowView = {
    type: "view",
    props: {
      bgcolor: $color("white"),
      id: "Shadow",
      alpha: 0
    },
    layout: function(make, view) {
      make.edges.inset(18)
      shadowButton(view)
    }
  }
  const listView = {
    type: "view",
    props: {
      id: "ListView",
      alpha: 0,
      bgcolor: $color("white"),
      radius: 10
    },
    layout: function(make) {
      make.edges.inset(15)
    },
    views: [{
      type: "list",
      props: {
        id: "list1",
        separatorHidden: true,
        bgcolor: $color("white"),
        data: [{
            rows: [{
              type: "image",
              props: {
                id: "ShareImage",
                bgcolor: $color("clear")
              },
              layout: $layout.fill,
              views: views,
              events: {
                tapped: () => {
                  if (jud == 1) showit($("list").info)
                }
              }
            }]
          },
          {
            rows: [{
                lb: {
                  text: "作者：" + ifm[2]
                }
              },
              {
                lb: {
                  text: "出自" + ifm[3]
                }
              }
            ]
          },
          {
            rows: [{
                image: {
                  icon: $icon("019", $color("#666666"), $size(100, 100))
                },
                label: {
                  text: "复制句子"
                }
              },
              {
                image: {
                  icon: $icon("022", $color("#666666"), $size(100, 100))
                },
                label: {
                  text: "分享句子"
                }
              },
              {
                image: {
                  icon: $icon("061", $color("#666666"), $size(100, 100))
                },
                label: {
                  text: (lll == 1) ? "取消收藏" : "收藏本句"
                }
              }
            ]
          },
          {
            rows: [{
              image: {
                icon: $icon("015", $color("#666666"), $size(100, 100))
              },
              label: {
                text: "返回"
              }
            }]
          }
        ],
        template: [{
            type: "label",
            props: {
              id: "lb",
              font: $font("bold", 17),
              lines: 0
            },
            layout: function(make) {
              make.left.inset(offset)
              make.top.bottom.equalTo(0)
              make.right.inset(10)
            }
          },
          {
            type: "image",
            props: {
              bgcolor: $color("clear")
            },
            layout: function(make, view) {
              make.top.bottom.inset(10)
              make.left.inset(offset)
              make.width.equalTo(view.height)
            }
          },
          {
            type: "label",
            props: {
              font: $font("bold", 17),
              lines: 0
            },
            layout: function(make) {
              make.left.equalTo($("image").right).offset(10)
              make.top.bottom.equalTo(0)
              make.right.inset(10)
            }
          }
        ]
      },
      layout: $layout.fill,
      events: {
        rowHeight: function(sender, indexPath) {
          switch (indexPath.section) {
            case 0:
              if (jud == 0) {
                $("getheight1").text = ifm[0]
                return $("getheight1").contentSize.height + (offset * 2)
              } else {
                return 141 + (offset * 4)
              }
              break
          }
        },
        didSelect: function(sender, indexPath) {
          if (indexPath.section == 1) {
            switch (indexPath.row) {
              case 1:

                break
            }
          } else if (indexPath.section == 2) {
            switch (indexPath.row) {
              case 0:
                $clipboard.text = ifm[0]
                $ui.toast("已复制")
                break
              case 1:
                $share.universal($("ShareImage").snapshot)
                break
              case 2:
                var exists = $file.exists("JUZIMI.txt")
                if (exists == 1) {
                  var files = JSON.parse($file.read("JUZIMI.txt").string)
                } else var files = []
                if (lll !== 1) {
                  for (var i in ifm[1]) {
                    var a = ifm[1][i]
                    var r = formatNumber((a.runtimeValue().invoke("redComponent") * 255).toString(16))
                    var g = formatNumber((a.runtimeValue().invoke("greenComponent") * 255).toString(16))
                    var b = formatNumber((a.runtimeValue().invoke("blueComponent") * 255).toString(16))
                    ifm[1][i] = `#${r}${g}${b}`
                  }
                  files.unshift({
                    ifm: [ifm[0], ifm[1], ifm[2], ifm[3]]
                  })
                  $ui.toast("已收藏")
                  $file.write({
                    data: $data({
                      string: JSON.stringify(files)
                    }),
                    path: "JUZIMI.txt"
                  })
                } else {
                  files.splice(index, 1)
                  $ui.toast("已取消")
                  $file.write({
                    data: $data({
                      string: JSON.stringify(files)
                    }),
                    path: "JUZIMI.txt"
                  })
                  exit()
                  refresh()
                }
                break
            }
          } else if (indexPath.section == 3) {
            exit()
          }
        }
      }
    }]
  }
  $("window").add(blurView)
  $("window").add(shadowView)
  $("window").add(listView)
  $ui.animate({
    duration: 0.4,
    animation: function() {
      $("blur").alpha = 1
      $("Shadow").alpha = 1
      $("ListView").alpha = 1
    }
  })

  function exit() {
    $ui.animate({
      duration: 0.4,
      animation: function() {
        $("blur").alpha = 0
        $("Shadow").alpha = 0
        $("ListView").alpha = 0
      },
      completion: function() {
        $("blur").remove()
        $("Shadow").remove()
        $("ListView").remove()
      }
    })
  }

  function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  if (ifm[0] == "by Hhdº\n点我给作者加鸡腿🍗\n如果你觉得打赏按钮碍眼，可以进入移除") {
    exit()
    $ui.push({
      props: {
        title: "打赏"
      },
      views: [{
          type: "button",
          props: {
            title: "移除打赏按钮"
          },
          layout: function(make) {
            make.top.left.inset(0)
          },
          events: {
            tapped(sender) {
              var files = JSON.parse($file.read("JUZIMI.txt").string)
              files.splice(files.length - 1, 1)
              $ui.toast("已移除")
              $file.write({
                data: $data({
                  string: JSON.stringify(files)
                }),
                path: "JUZIMI.txt"
              })
              refresh()
            }
          }
        },
        {
          type: "web",
          props: {
            url: "https://i.loli.net/2018/06/25/5b30d61b2160c.jpg"
          },
          layout: function(make) {
            make.right.bottom.left.inset(0)
            make.top.equalTo($("button").bottom)
          }
        }
      ]
    })
  }
}

function search(url, key, jd, mode, a) {
  loading.start()
  $http.get({
    url: url,
    header: {
      'Cookie': 'xqmohis=http%3A%2F%2Fm.juzimi.com%2F|http%3A%2F%2Fm.juzimi.com%2Fcate|http%3A%2F%2Fm.juzimi.com%2Fju%2F1445609|http%3A//m.juzimi.com/; xqrcli=MTUyOTUwNjY4NSwzMjAqNDgwLGlQYWQsTmV0c2NhcGUsODA2MzEs; xqrclm=; has_js=1; SESSa2c85ed4a17fdd4290e6f6db3ef737e5=q48n3pff1ojonm42kbi6m0vhk7; Hm_cv_0684e5255bde597704c827d5819167ba=1*login*0!1*version*IOSAPP!*!1*IOSAPP*0; Hm_lpvt_0684e5255bde597704c827d5819167ba=1529506685; Hm_lvt_0684e5255bde597704c827d5819167ba=1529506669; __cfduid=df921f3b74dc198ffa1cac7dbb3ad4d051529506667;xqrclbr=80631'
    },
    handler: function(resp) {
      var data = resp.data
      loading.stop()
      console.log(data)
      var reg = /searcharimgleft.*?<\/a><\/div><\/div>  <\/div>/g
      var wprec = reg.test(data)
      //      var label = data.match(/searchcontent.*?view-dom-id-1/)[0]
      //      console.log(label)
      var result = data.replace(/\n/g, "").match(/title=\"查看本句\"[\s|\S]*?(?=喜欢本句\">喜欢)/g)
      console.log(result)
      var arr = []
      if (mode !== 1) arr.push(creatData("", [], "", "", "", true, (jd == 1) ? `${key}全部句子` : `"${key}"的搜索结果`))
      if (jd == 1) {
        var item = a
        arr.push(creatData("", [$color("white"), $color("white")], a[0], a[1], a[2], false, "", {
          title: a[3],
          href: a[4],
          jud: 2,
          a: a
        }, 1))
        var jianjie = "http://www.juzimi.com" + data.match(/\/jianjiejieshao\/\d+/)[0]
        $("list").info = jianjie
      }
      console.log(nextPage)
      if (wprec == 1 && mode !== 1) {
        var prec = data.match(reg)
        console.log(prec)
        prec.map(function(item) {
          var a = "http://" + item.match(/src=\"\/\/file\.juzimi\.com\/.*?\.jpg/)[0].replace("src=\"\/\/", ""),
            b = item.match(/title=\".*?(?=\")/g)[1].replace("title=\"", ""),
            c = item.match(/wridesccon\'>.*?(?=<br>)/)[0].replace("wridesccon'>", ""),
            d = item.match(/title=\".*?(?=\")/g)[1].replace("title=\"", ""),
            e = "http://www.juzimi.com" + encodeURI(item.match(/<br><a href=\'.*?(?=\')/)[0].replace("<br><a href=\'", ""))
          arr.push(creatData("", [$color("white"), $color("white")], a, b, c, false, "", {
            title: d,
            href: e,
            jud: 1,
            a: [a, b, c, d, e]
          }, 1))
        })
      }
      var reg = /class=\"pager-next\">.*?(?=\" title=\"去下一个页面\")/
      var nextPage = (reg.test(data) == 1) ? data.match(reg)[0].replace("class=\"pager-next\"><a href=\"", "") : "none"
      for (var i = 0; i < result.length; i++) {
        var item = result[i].match(/title=\"查看本句\" class=\"xlistju\">[\s|\S]*?(?=<\/a><\/div><div class=\")/)[0].replace(/<br\/>/g, "\n").replace("title=\"查看本句\" class=\"xlistju\">", "")
        console.log(item)
        var reg = /rel=\"tag\" title=\"原作者：.*?(?=\" class=\"views-field-field-oriwriter-value)/
        var author = (reg.test(result[i]) == 1) ? result[i].match(reg)[0].replace("rel=\"tag\" title=\"原作者：", "") : "未知"
        var reg = /rel=\"tag\" title=\"出自[\s|\S]*?(?=\" class=\"active\">)/
        var From = (reg.test(result[i]) == 1) ? result[i].match(reg)[0].replace("rel=\"tag\" title=\"出自", "") : "：未知"
        if (From !== "：未知") var fromurl = "http://www.juzimi.com" + result[i].match(/<a href=\".*?(?=" rel=\"tag\" title=\"出自)/)[0].replace("<a href=\"", "")
        var color = colorData[randomColor(0, 11)]
        var v = creatData(item, color, "", "", "", false, "", {
          jud: 0,
          nu: nextPage,
          text: item,
          color: color,
          author: author,
          'from': From,
          fromurl: fromurl
        })
        arr.push(v)
        if (mode == 1) {
          $("list").insert({
            index: $("list").data.length,
            value: v
          })
        }
      }
      if (mode !== 1) {
        arr.unshift(searchView)
        $("list").data = arr
      }
      console.log(arr)
    }
  })
}

function creatData(a, b, c, d, e, f, g, h, i) {
  return {
    content: {
      text: a
    },
    gradient: {
      colors: b
    },
    image: {
      src: c
    },
    title: {
      text: d
    },
    Content: {
      text: e
    },
    shadow: {
      hidden: f
    },
    bigTitle: {
      text: g
    },
    infoview: {
      info: h
    },
    jud: i
  }
}

function shadowButton(view) {
  var layer = view.runtimeValue().invoke("layer")
  layer.invoke("setShadowOffset", $size(0, 5))
  layer.invoke("setShadowColor", $color("gray").runtimeValue().invoke("CGColor"))
  layer.invoke("setShadowOpacity", 1)
  layer.invoke("setShadowRadius", 6)
  //  layer.invoke("setMasksToBounds", true)
  //  layer.invoke("setCornerRadius", 25)
}

function refresh() {
  var sentences = gl()
  $("list").endRefreshing()
  $("list").data = sentences
}

function showit() {
  loading.start()
  $http.get({
    url: $("list").info,
    handler: function(resp) {
      loading.stop()
      var data = resp.data
      var text = data.replace(/\n|\s|\r/g, "").match(/class=\"jianjiecontext\">.*?(?=<\/div><divclass)/)[0].replace("class=\"jianjiecontext\">", "").replace(/<br\/>/g, "\n")
      var hintView = $objc("BaseHintView").invoke("alloc.initWithText", text)
      var textView = hintView.invoke("subviews.objectAtIndex", 1).invoke("subviews.objectAtIndex", 1)
      hintView.invoke("show")
    }
  })
}
