const WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const CACHE_HEIGHT = $cache.get("jike-height")
const HEIGHT = CACHE_HEIGHT || 110

const NOW = new Date()
const DAY = WEEK[NOW.getDay()]
const [MONTH, DATE] = [NOW.getMonth()+1, NOW.getDate()]
const DATE_STEING = `${MONTH}月\n${DATE}日`

/* --- Can Be Customized --- */
const NICKNAME = "RYAN"
const LINES = 4
const WHITE = [255, 255, 255]
const YELLOW = [255, 228, 17]
const TOPICS = [
  "5618c159add4471100150637", // 浴室沉思
  "557ed045e4b0a573eb66b751", // 无用但有趣的冷知识
  "5a82a88df0eddb00179c1df7", // 今日烂梗
  "572c4e31d9595811007a0b6b", // 弱智金句病友会
  "56d177a27cb3331100465f72", // 今日金句
  "5aa21c7ae54af10017dc93f8", // 一个想法不一定对
]
/* --- EOF --- */

function mainView(day, date) {
  let color = day === "Friday" ? $rgba(...WHITE, 0.8) : $rgba(...YELLOW, 0.8)
  let bgcolor = day === "Friday" ? $rgba(...YELLOW, 0.8) : $rgba(...WHITE, 0.8)
  
  let {content, topic} = $cache.get("jike-topic") || {
    topic: "",
    content: ""
  }
  
  $ui.render({
    views: [{
      type: "view",
      props: {
        bgcolor: bgcolor,
        smoothRadius: 10
      },
      events: {
        ready: () => {
          if (CACHE_HEIGHT) return
          cacheWidgetHeight()
        }
      },
      layout: (make, view) => {
        let sup = view.super
        make.width.equalTo(sup).multipliedBy(2/3).offset(-15)
        make.height.equalTo(HEIGHT-10)
        make.top.right.inset(5)
        
        shadow(view)
      },
      views: [{
        type: "label",
        props: {
          text: "今天是不是『周五』？",
          font: $font("HiraMinProN-W6", 15),
          align: $align.center,
          bgcolor: color,
          circular: true
        },
        layout: (make) => {
          make.left.right.inset(10)
          make.top.inset(5)
          make.height.equalTo(30)
        }
      },
      {
        type: "canvas",
        layout: (make, view) => {
          let pre = view.prev
          make.centerX.equalTo()
          make.top.equalTo(pre.bottom)
          make.width.equalTo(10)
          make.height.equalTo(5)
        },
        events: {
          draw: (view, ctx) => {
            let height = view.frame.height
            let base = view.frame.width * 0.5
            
            ctx.fillColor = color
            ctx.moveToPoint(base-5, 0)
            ctx.addLineToPoint(base, height)
            ctx.addLineToPoint(base+5, 0)
            ctx.fillPath()
          }
        }
      },
      {
        type: "label",
        props: {
          text: day === "Friday" ? "是" : "不是",
          font: $font("HiraMinProN-W6", 50),
          align: $align.center
        },
        layout: (make, view) => {
          let pre = view.prev
          make.centerX.equalTo()
          make.top.equalTo(pre.bottom).offset(5)
          make.size.equalTo($size(100, 50))
        }
      }]
    },
    {
      type: "view",
      layout: (make, view) => {
        let sup = view.super
        make.width.equalTo(sup).multipliedBy(1/3)
        make.height.equalTo(30)
        make.left.top.inset(0)
      },
      views: [{
        type: "label",
        props: {
          text: day,
          font: $font("HiraMinProN-W6", 25),
          autoFontSize: true,
          align: $align.left
        },
        layout: (make, view) => {
          let sup = view.super
          make.width.lessThanOrEqualTo(sup).multipliedBy(0.85)
          make.left.inset(10)
          make.top.inset(5)
        }
      },
      {
        type: "label",
        props: {
          id: "view-date",
          text: date,
          font: $font("HiraMinProN-W3", 5),
          lines: 2,
          align: $align.left
        },
        layout: (make, view) => {
          let pre = view.prev
          make.bottom.equalTo(pre).offset(-2)
          make.left.equalTo(pre.right)
          make.width.equalTo(15)
        }
      }]
    },
    {
      type: "view",
      props: {
        id: "view-display",
        info: false // false => off, true => on
      },
      layout: (make, view) => {
        let pre = view.prev
        make.top.equalTo(pre.bottom).offset(2)
        make.width.equalTo(pre)
        make.height.equalTo(HEIGHT-32)
        make.left.inset(0)
        
        shadow(view)
      },
      views: [{
        type: "view",
        props: {
          bgcolor: $rgba(...YELLOW, 1.0),
          smoothRadius: 3
        },
        layout: (make, view) => {
          make.size.equalTo($size(40, 60))
          make.centerX.equalTo()
          make.top.inset(5)
        },
        views: [{
          type: "view",
          props: {
            bgcolor: $rgba(...WHITE, 0.8),
            smoothRadius: 3
          },
          layout: (make) => {
            make.size.equalTo($size(30, 40))
            make.centerX.equalTo()
            make.top.inset(5)
          },
          views: [{
            type: "label",
            props: {
              id: "view-magnify",
              text: date,
              font: $font("HiraMinProN-W3", 5*2.5),
              lines: 2,
              align: $align.left
            },
            layout: (make) => {
              make.top.inset(-30*2.5)
              make.left.inset(15*2.5)
              make.width.equalTo(15*2.5)
            }
          },
          {
            type: "label",
            props: {
              text: "🔍",
              font: $font(10),
              align: $align.center
            },
            layout: $layout.fill
          }]
        },
        {
          type: "label",
          props: {
            text: "即刻 x " + NICKNAME,
            font: $font("bold", 5),
            align: $align.center
          },
          layout: (make) => {
            make.height.equalTo(15)
            make.bottom.equalTo()
            make.left.right.inset(0)
          }
        }]
      }],
      events: {
        tapped: (view) => {
          toggleMagnify(view.info)
          view.info = !view.info
          haptic(1)
        }
      }
    },
    {
      type: "view",
      props: {
        id: "view-expand",
        info: false // false => off, true => on
      },
      layout: (make) => {
        make.top.equalTo(HEIGHT+5)
        make.left.right.bottom.inset(0)
      },
      views: [{
        type: "label",
        props: {
          text: "•",
          textColor: $color("gray"),
          font: $font(8),
          align: $align.center
        },
        layout: (make, view) => {
          make.top.inset(0)
          make.centerX.equalTo()
          make.width.equalTo(20)
          make.height.equalTo(10)
        }
      },
      {
        type: "label",
        props: {
          text: "•",
          textColor: $color("gray"),
          font: $font(8),
          align: $align.center
        },
        layout: (make, view) => {
          let top = view.prev
          make.top.inset(0)
          make.right.equalTo(top.left)
          make.width.equalTo(20)
          make.height.equalTo(10)
        }
      },
      {
        type: "label",
        props: {
          text: "•",
          textColor: $color("gray"),
          font: $font(8),
          align: $align.center
        },
        layout: (make, view) => {
          let top = view.prev.prev
          make.top.inset(0)
          make.left.equalTo(top.right)
          make.width.equalTo(20)
          make.height.equalTo(10)
        }
      },
      {
        type: "label",
        props: {
          id: "view-content",
          text: content,
          align: $align.justified,
          numberOfLines: LINES,
          font: $font("PingFangSC-Regular", 12),
          lineBreakMode: 4
        },
        layout: (make) => {
          make.top.inset(15)
          make.left.right.inset(30)
        }
      },
      {
        type: "label",
        props: {
          id: "view-topic",
          text: topic,
          font: $font("PingFangSC-Regular", 10),
          align: $align.right
        },
        layout: (make, view) => {
          let pre = view.prev
          make.top.equalTo(pre.bottom).offset(2)
          make.left.right.inset(30)
        }
      }],
      events: {
        tapped: (view) => {
          getSource()
        },
        longPressed: () => {
          popView()
        }
      }
    }]
  })
}

function popView() {
  let {topic, content, picture, user} = $cache.get("jike-topic")
  topic = `『${topic.replace("—— ", "")}』`
  content = content.replace(/\n{2,}/g, "\n")
  user = `via ${user}`
  
  $ui.window.add({
    type: "blur",
    props: {
      id: "view-popover",
      style: 1,
      alpha: 0
    },
    layout: $layout.fill,
    views: [{
      type: "view",
      props: {
        bgcolor: $color("white"),
        smoothRadius: 10
      },
      layout: (make) => {
        make.edges.inset(15)
      },
      views: [{
        type: "label",
        props: {
          text: topic,
          font: $font("PingFangSC-Semibold", 12),
          align: $align.left
        },
        layout: (make) => {
          make.height.equalTo(15)
          make.left.inset(15)
          make.bottom.inset(10)
        }
      },
      {
        type: "label",
        props: {
          text: user,
          font: $font("PingFangSC-Regular", 12),
          align: $align.right
        },
        layout: (make) => {
          make.height.equalTo(15)
          make.right.inset(15)
          make.bottom.inset(10)
        }
      },
      {
        type: "view",
        props: {
          bgcolor: $rgba(...YELLOW, 0.8)
        },
        layout: (make, view) => {
          let pre = view.prev
          make.bottom.equalTo(pre.top).offset(-10)
          make.left.top.right.inset(0)
        },
        views: [{
          type: "image",
          props: {
            src: picture,
            smoothRadius: 5
          },
          layout: (make, view) => {
            let sup = view.super
            make.height.equalTo(sup).multipliedBy(0.8)
            make.centerY.equalTo()
            
            if (picture === "") {
              make.width.equalTo(0)
              make.left.inset(5)
            } else {
              make.width.equalTo(sup.height).multipliedBy(0.8*0.75)
              make.left.inset(10)
            }
          }
        },
        {
          type: "text",
          props: {
            text: content,
            textContainerInset: $insets(0, 0, 0, 0),
            editable: false,
            selectable: false,
            bgcolor: $color("clear"),
            align: $align.justified,
            font: $font("PingFangSC-Regular", 11),
          },
          layout: (make, view) => {
            let pre = view.prev
            make.left.equalTo(pre.right).offset(5)
            make.top.equalTo(pre)
            make.bottom.equalTo(pre)
            make.right.inset(10)
          }
        }]
      }]
    }],
    events: {
      tapped: () => {
        dismissPopover()
      }
    }
  })
  
  $ui.animate({
    duration: 0.3,
    animation: () => {
      $("view-popover").alpha = 1.0
    }
  })
  
  $device.taptic(0)
}

function dismissPopover() {
  $ui.animate({
    duration: 0.3,
    animation: () => {
      $("view-popover").alpha = 0.0
    },
    completion: () => {
      $("view-popover").remove()
    }
  })
}

function toggleMagnify(isOn=false) {
  const [dateView, displayView, magnifyView] = [
    $("view-date"),
    $("view-display"),
    $("view-magnify")
  ]
  
  let leftInset = (MONTH < 10 && DATE < 10) ? 4 : 1
  
  let dateX = dateView.runtimeValue().$center().x
  let displayX = displayView.runtimeValue().$center().x
  
  let emojiView = magnifyView.next
  
  if (isOn === false) {
    displayView.updateLayout((make) => {
      make.top.inset(-10)
      make.left.inset(dateX-displayX-10)
    })
    
    magnifyView.updateLayout((make) => {
      make.top.inset(4)
      make.left.inset(leftInset)
    })
    
    $ui.animate({
      duration: 0.5,
      animation: () => {
        emojiView.alpha = 0
        magnifyView.rotate(-0.15*Math.PI)
        displayView.rotate(0.15*Math.PI)
        displayView.super.runtimeValue().$layoutIfNeeded()
      }
    })
  } else {
    displayView.remakeLayout((make, view) => {
      let pre = view.prev
      make.top.equalTo(pre.bottom).offset(2)
      make.width.equalTo(pre)
      make.height.equalTo(HEIGHT-32)
      make.left.inset(0)
    })
    
    magnifyView.updateLayout((make) => {
      make.top.inset(-30*2.5)
      make.left.inset(15*2.5)
    })
    
    $ui.animate({
      duration: 0.5,
      animation: () => {
        emojiView.alpha = 1
        magnifyView.rotate(0)
        displayView.rotate(0)
        displayView.super.runtimeValue().$layoutIfNeeded()
      }
    })
  }
}

async function getSource() {
  $("view-expand").info = true
  startLoading()
  
  const [contentView, topicView] = [
    $("view-content"),
    $("view-topic")
  ]
  
  let topicIndex = Math.floor(Math.random()*TOPICS.length)

  let res = await $http.post({
    url: "https://app.jike.ruguoapp.com/1.0/squarePosts/list",
    header: {
      "Content-Type": "application/json"
    },
    body: {
      "topicId": TOPICS[topicIndex],
      "limit": 20
    }
  })
  
  let result = res.data.data
  
  let contentIndex = Math.floor(Math.random()*result.length)
  let topic = "—— " + result[contentIndex].topic.content
  let content = result[contentIndex].content
  let picture = result[contentIndex].pictures.length > 0 ? result[contentIndex].pictures[0].smallPicUrl : ""
  let user = result[contentIndex].user.screenName
  
  if (content === "") {
    getSource()
    return
  }
  
  contentView.runtimeValue().$fadeToText(content.replace(/\n{2,}/g, "\n"))
  topicView.runtimeValue().$fadeToText(topic)
  $device.taptic(0)
  
  $cache.set("jike-topic", {
    topic: topic,
    content: content,
    picture: picture,
    user: user
  })
  
  $("view-expand").info = false
}

function startLoading(idx=0, up=true) {
  let view = $("view-expand")
  let views = view.views
  
  let on = view.info
  
  if (on === false) {
    for (let i=0; i<3; i++) {
      views[i].updateLayout((make) => {
        make.top.inset(0)
      })
    }
    
    $ui.animate({
      duration: 0.3,
      animation: () => {
        view.runtimeValue().$layoutIfNeeded()
      }
    })
  } else if (on === true) {
    views[idx].updateLayout((make) => {
      make.top.inset(up ? -5 : 0)
    })
    
    $ui.animate({
      duration: 0.3,
      animation: () => {
        view.runtimeValue().$layoutIfNeeded()
      },
      completion: () => {
        if (on === false) startLoading()
        else startLoading(up ? idx : (idx+1)%3, !up)
      }
    })
  }
}

function cacheWidgetHeight() {
  $delay(0.0, () => {
    let height = $widget.height
    if (height === 0) return
    
    if ($widget.mode === 0) {
      $cache.set("jike-height", height)
    }
  })
}

function shadow(view) {
  let corner = 5
  let offset = $size(0, 0)
  let opacity = 0.5
  let radius = 5
  
  let layer = view.runtimeValue().$layer()
  layer.$setCornerRadius(corner)
  layer.$setShadowOffset(offset)
  layer.$setShadowColor($color("lightGray").runtimeValue().$CGColor())
  layer.$setShadowOpacity(opacity)
  layer.$setShadowRadius(radius)
}

function haptic(type) {
  let haptic = $objc("UINotificationFeedbackGenerator").$new()
  haptic.$notificationOccurred(type)
}


/* Main */
mainView(DAY, DATE_STEING)

$delay(0.0, () => {
  $widget.modeChanged = (mode) => {
    if (mode === 1) getSource()
  }
})

$app.listen({
  ready: () => {
    $delay(0.3, () => {
      if ($widget.mode === 1) getSource()
    })
  }
})
