const source = JSON.parse($file.read("assets/h_source.json").string)
check = $file.read("assets/check.txt").string
noChoice = $file.read("assets/noChoice.txt").string
width = $device.info.screen.width

$ui.render({
  props: {
    title: "日语五十音图"
  },
  views: [{
      type: "view",
      props: {
        bgcolor: $color("#DE4D19")
      },
      layout: $layout.fill
    },
    {
      type: "button",
      props: {
        id: "B4",
        title: "听写",
        bgcolor: $color("#DE4D19"),
        titleColor: $color("green")
      },
      layout: function(make, view) {
        make.top.inset(0)
        make.right.inset(10)
        make.width.equalTo(50)
        make.height.equalTo(44)
      },
      events: {
        tapped(sender) {
          let list = $("form").data
          arr = []
          list.map(function(item, index) {
            if (list[index].check.src == check) {
              arr.push({
                sn: list[index].sn,
                t: list[index].label.text,
                p: list[index].p.text
              })
            }
          })
          arr.sort(function(a, b) {
            return Math.random() > .5 ? -1 : 1
          })
          var words = getRandomWord(arr[0].t)
          one = 1 / arr.length
          $("form").info = 0
          finish()
          $cache.set("Round", 0)
          $cache.set("Statistics", [])
          dictation(words, arr.length, one, arr)
        }
      }
    },
    {
      type: "button",
      props: {
        id: "B5",
        title: "反选",
        bgcolor: $color("#DE4D19")
      },
      layout: function(make, view) {
        make.top.inset(0)
        make.right.equalTo($("B4").left).offset(-10)
        make.width.equalTo(50)
        make.height.equalTo(44)
      },
      events: {
        tapped(sender) {
          let list = $("form").data
          list.map(function(item, index) {
            if (list[index].check.src == check) {
              list[index].check.src = noChoice
              list[index].mask.bgcolor = $rgba(255, 255, 255, 0.1)
            } else {
              list[index].mask.bgcolor = $rgba(255, 255, 255, 0.7)
              list[index].check.src = check
            }
          })
          $("form").data = list
        }
      }
    },
    {
      type: "button",
      props: {
        id: "B6",
        title: "全选",
        bgcolor: $color("#DE4D19")
      },
      layout: function(make, view) {
        make.top.inset(0)
        make.right.equalTo($("B5").left).offset(-10)
        make.width.equalTo(70)
        make.height.equalTo(44)
      },
      events: {
        tapped(sender) {
          if (sender.title == "全选") {
            sender.title = "取消全选"
            let list = $("form").data
            list.map(function(item, index) {
              list[index].mask.bgcolor = $rgba(255, 255, 255, 0.7)
              list[index].check.src = check
            })
            $("form").data = list
          } else {
            sender.title = "全选"
            let list = $("form").data
            list.map(function(item, index) {
              list[index].check.src = noChoice
              list[index].mask.bgcolor = $rgba(255, 255, 255, 0.1)
            })
            $("form").data = list
          }
        }
      }
    },
    {
      type: "view",
      props: {
        id: "Rview",
        bgcolor: $color("#DE4D19")
      },
      views: [{
          type: "button",
          props: {
            id: "B2",
            title: "平   假   名",
            bgcolor: $color("#DE4D19")
          },
          layout: function(make, view) {
            make.bottom.inset(0)
            make.height.equalTo(view.super)
            make.width.equalTo(view.super).dividedBy(2)
          },
          events: {
            tapped(sender) {
              ChangeColor(sender)
            }
          }
        },
        {
          type: "button",
          props: {
            id: "B3",
            title: "片   假   名",
            titleColor: $color("#EEA58B"),
            bgcolor: $color("#DE4D19")
          },
          layout: function(make, view) {
            make.bottom.inset(0)
            make.left.equalTo($("B2").right)
            make.height.equalTo(view.super)
            make.width.equalTo(view.super).dividedBy(2)
          },
          events: {
            tapped(sender) {
              ChangeColor(sender)
              $ui.toast("敬请期待")
            }
          }
        }
      ],
      layout: function(make, view) {
        //make.left.top.inset(0)
        //make.width.equalTo(view.super).dividedBy(2)
        make.height.equalTo(44)
        make.left.top.right.inset(0)
      }
    },
    {
      type: "matrix",
      props: {
        id: "form",
        columns: 5,
        bgcolor: $color("#FDE697"),
        itemHeight: 80,
        data: makeData(),
        template: {
          props: {
            bgcolor: $color("#FFF9CE")
          },
          views: [{
              type: "label",
              props: {
                id: "label",
                bgcolor: $color("clear"),
                textColor: $color("#DE4D19"),
                align: $align.center,
                font: $font(35)
              },
              layout: function(make) {
                make.top.left.right.inset(0)
                make.bottom.inset(25)
              }
            },
            {
              type: "label",
              props: {
                id: "p",
                bgcolor: $color("#F4BE85"),
                textColor: $color("white"),
                align: $align.center,
                font: $font(25)
              },
              layout: function(make) {
                make.bottom.left.right.inset(0)
                make.height.equalTo(25)
              }
            },
            {
              type: "view",
              props: {
                id: "mask"
              },
              layout: $layout.fill
            },
            {
              type: "image",
              props: {
                id: "check",
                src: noChoice,
                bgcolor: $color("clear")
              },
              layout: function(make, view) {
                make.right.top.inset(10)
                make.size.equalTo(30, 30)
              }
            }
          ]
        }
      },
      layout: function(make) {
        make.left.right.bottom.inset(5)
        make.top.equalTo($("Rview").bottom)
      },
      events: {
        didSelect: function(sender, indexPath, data) {
          if (sender.info == 1) {
            let list = sender.data
            list[indexPath.row].mask.bgcolor = $rgba(255, 255, 255, 0.7)
            list[indexPath.row].check.src = check
            sender.data = list
          } else play(data.sn)
        },
        longPressed: function(sender) {
          if ($("form").info == 1) {
            finish()
          } else {
            $("Rview").updateLayout(function(make, view) {
              make.left.top.inset(0)
              make.width.equalTo(view.super).dividedBy(2)
              make.height.equalTo(44)
            })
            $("B3").hidden = true
            $("form").info = 1
            let list = $("form").data
            list.map(function(item, index) {
              list[index].check.hidden = false
              list[index].mask.hidden = false
            })
            $("form").data = list
          }
        }
      }
    }
  ]
})

function dictation(ListData, Length, One, Words) {
  $ui.push({
    props: {
      title: "请在下面选出听到的字"
    },
    views: [{
        type: "matrix",
        props: {
          id: "choice",
          spacing: 5,
          square: true,
          columns: 5,
          scrollEnabled: false,
          template: {
            views: [{
                type: "label",
                props: {
                  id: "label",
                  textColor: $color("black"),
                  align: $align.center,
                  font: $font(37),
                  bgcolor: $color("#FCFCFC")
                },
                layout: $layout.fill
              },
              {
                type: "canvas",
                props: {
                  id: "frame"
                },
                layout: $layout.fill,
                events: {
                  draw: function(view, ctx) {
                    var X = view.frame.width
                    Y = view.frame.height
                    ctx.strokeColor = $color("#157EFB")
                    ctx.moveToPoint(0, 0)
                    ctx.setLineWidth(5)
                    ctx.addLineToPoint(X, 0)
                    ctx.addLineToPoint(X, Y)
                    ctx.addLineToPoint(0, Y)
                    ctx.addLineToPoint(0, 0)
                    ctx.strokePath()
                  }
                }
              },
              {
                type: "canvas",
                props: {
                  id: "frame0"
                },
                layout: $layout.fill,
                events: {
                  draw: function(view, ctx) {
                    var X = view.frame.width
                    Y = view.frame.height
                    ctx.strokeColor = $rgb(0, 199, 66)
                    ctx.moveToPoint(0, 0)
                    ctx.setLineWidth(5)
                    ctx.addLineToPoint(X, 0)
                    ctx.addLineToPoint(X, Y)
                    ctx.addLineToPoint(0, Y)
                    ctx.addLineToPoint(0, 0)
                    ctx.strokePath()
                  }
                }
              },
              {
                type: "canvas",
                props: {
                  id: "frame1"
                },
                layout: $layout.fill,
                events: {
                  draw: function(view, ctx) {
                    var X = view.frame.width
                    Y = view.frame.height
                    ctx.strokeColor = $color("red")
                    ctx.moveToPoint(0, 0)
                    ctx.setLineWidth(5)
                    ctx.addLineToPoint(X, 0)
                    ctx.addLineToPoint(X, Y)
                    ctx.addLineToPoint(0, Y)
                    ctx.addLineToPoint(0, 0)
                    ctx.strokePath()
                  }
                }
              }
            ]
          }
        },
        layout: function(make, view) {
          make.centerY.equalTo(view.super)
          make.left.right.inset(0)
          make.height.equalTo(width / 5)
        },
        events: {
          didSelect: function(sender, indexPath, data) {
            sender.data = $cache.get("Choice")
            let list = sender.data
            list[indexPath.row].frame.hidden = false
            sender.data = list
            $("ok").hidden = false
            $cache.set("MyChoice", [list[indexPath.row].label.text, indexPath.row])
          }
        }
      },
      {
        type: "button",
        props: {
          id: "speech",
          icon: $icon("012", $color("gray"), $size(50, 50)),
          bgcolor: $color("clear")
        },
        layout: function(make, view) {
          make.centerX.equalTo(view.super)
          make.left.right.inset(0)
          make.size.equalTo($size(50, 50))
          make.top.inset(width / 4 - 30)
        },
        events: {
          tapped: function(sender) {
            let idx = $cache.get("Round")
            play(Words[idx].sn)
          }
        }
      },
      {
        type: "label",
        props: {
          id: "Progress",
          text: "25/50",
          align: $align.center
        },
        layout: function(make, view) {
          make.top.right.inset(10)
          make.height.equalTo(15)
          make.width.equalTo(50)
        }
      },
      {
        type: "progress",
        props: {
          radius: 5,
          progressColor: $color("#157EFB")
        },
        layout: function(make, view) {
          make.top.left.inset(10)
          make.right.equalTo($("Progress").left).offset(-10)
          make.height.equalTo(15)
        }
      },
      {
        type: "button",
        props: {
          id: "ok",
          bgcolor: $color("#157EFB"),
          title: "确   定",
          hidden: true
        },
        layout: function(make, view) {
          make.centerX.equalTo(view.super)
          make.size.equalTo($size(130, 50))
          make.bottom.inset(width / 4 - 30)
        },
        events: {
          tapped: function(sender) {
            var idx = $cache.get("Round")
            if (sender.title == "确   定") {
              let list = $cache.get("Choice")
              myChoice = $cache.get("MyChoice")
              StatisticsCache = $cache.get("Statistics")
              if (Words[idx].t == myChoice[0]) {
                var rightIdx = myChoice[1]
                list[rightIdx].frame0.hidden = false
              } else {
                var errorIdx = myChoice[1]
                rightIdx = $cache.get("rightIndex")
                list[errorIdx].frame1.hidden = false
                list[rightIdx].frame0.hidden = false
                StatisticsCache.push({
                  sn: Words[idx].sn,
                  t: Words[idx].t,
                  p: Words[idx].p,
                  wrong: myChoice[0]
                })
              }
              $("choice").data = list
              $cache.set("Statistics", StatisticsCache)
              sender.title = "知道了，继续"
              sender.bgcolor = $rgb(0, 199, 66)

            } else {
              sender.hidden = true
              sender.title = "确   定"
              sender.bgcolor = $color("#157EFB")
              idx++
              $cache.set("Round", idx)
              if (idx == Length) {
                $ui.pop()
                statistics(Length)
              } else {
                $("choice").data = getRandomWord(arr[idx].t)
                $("Progress").text = `${idx+1}/${Length}`
                $("progress").value = one * (idx + 1)
                play(Words[idx].sn)
              }
            }
          }
        }
      }
    ]
  })

  $("choice").data = ListData
  $("Progress").text = "1/" + Length
  $("progress").value = one
  play(Words[0].sn)
}

function statistics(LENGTH) {
  $ui.push({
    props: {
      title: "统计"
    },
    views: [{
        type: "label",
        props: {
          id: "model",
          font: $font(25)
        },
        layout(make) {
          make.top.inset(20)
          make.centerX.equalTo($("tip"))
        }
      },
      {
        type: "list",
        props: {
          id: "modelList",
          data: [],
          template: [{
            type: "label",
            props: {
              id: "label",
              align: $align.center
            },
            layout: $layout.center
          }]
        },
        layout(make) {
          make.top.equalTo($("model").bottom).offset(30)
          make.bottom.left.right.inset(0)
        },
        events: {
          didSelect(sender, indexPath, data) {
            play(data.sn)
          }
        }
      }
    ]
  })

  var cache = $cache.get("Statistics")
  wrongNum = cache.length
  $("model").text = `共${LENGTH}个音，正确${LENGTH - wrongNum}个，错误${wrongNum}个`
  $("modelList").data = cache.map(function(item) {
    return {
      label: {
        text: `${item.p}   ${item.t}       错误的答案:${item.wrong}`
      },
      sn: item.sn
    }
  })
}

function play(sn) {
  $audio.play({
    path: "audio/" + sn + ".mp3"
  })
}

function ChangeColor(Button) {
  $("B2").titleColor = $color("#EEA58B")
  $("B3").titleColor = $color("#EEA58B")
  Button.titleColor = $color("white")
}

function makeData() {
  return source.map(function(item) {
    return {
      label: {
        text: item.t,
        bgcolor: (item.sn % 2 == 0) ? $color("#FFF9CE") : $color("#FDEDB2")
      },
      p: {
        text: item.p
      },
      mask: {
        hidden: true,
        bgcolor: $rgba(255, 255, 255, 0.1)
      },
      check: {
        src: noChoice,
        hidden: true
      },
      sn: item.sn
    }
  })
}

function finish() {
  $("Rview").remakeLayout(function(make) {
    make.height.equalTo(44)
    make.left.top.right.inset(0)
  })
  $("B3").hidden = false
  $("form").info = 0
  $("form").data = makeData()
}

function getRandomWord(word) {
  var arr = source.map(function(item) {
    if (item.t !== word) {
      return item.t
    }
  })
  result = []
  ranNum = 4
  for (var i = 0; i < ranNum; i++) {
    var ran = Math.floor(Math.random() * arr.length)
    result.push(arr.splice(ran, 1)[0])
  }
  var arr = result.map(function(item) {
    return {
      label: {
        text: item
      },
      frame: {
        hidden: true
      },
      frame0: {
        hidden: true
      },
      frame1: {
        hidden: true
      }
    }
  })
  num = Math.floor(Math.random() * 5)
  arr.splice(num, 0, {
    label: {
      text: word
    },
    frame: {
      hidden: true
    },
    frame0: {
      hidden: true
    },
    frame1: {
      hidden: true
    }
  })
  $cache.set("Choice", arr)
  $cache.set("rightIndex", num)
  return arr
}

$cache.clear()