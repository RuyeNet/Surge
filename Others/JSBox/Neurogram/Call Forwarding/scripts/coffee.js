var timer
var bitcoinAddress = 0
async function coffee(viewId) {
  let resp = await $http.get("https://raw.githubusercontent.com/Neurogram-R/JSBox/master/Neurogram/Coffee.json")
  let data = resp.data
  let listData = []
  for (var i in data) {
    listData.push({
      coffeeLabel: {
        text: data[i].donator + "  " + data[i].amount
      }
    })
  }
  showCoffeeView(listData, viewId)
}

function showCoffeeView(data, viewId) {
  let scrollStop = data.length * 20
  let coffeeViews = {
    type: "view",
    props: {
      id: "coffeeViewBg",
      bgcolor: $color("clear")
    },
    layout: $layout.fill,
    views: [{
      type: "view",
      props: {
        id: "coffeeBlur",
        bgcolor: $color("white"),
        alpha: 0.3
      },
      layout: $layout.fill,
      events: {
        tapped: function (sender) {
          $ui.animate({
            duration: 0.3,
            animation: function () {
              $("coffeeBlur").alpha = 0
              $("coffeeImg").scale(1)
            },
            completion: function () {
              timer.invalidate()
              $("coffeeViewBg").remove()
            }
          })
        }
      }
    }, {
      type: "view",
      props: {
        id: "coffeeImg",
        bgcolor: $color("white"),
      },
      layout: function (make, view) {
        make.center.equalTo(view.super)
        make.size.equalTo($size(300, 323))
        shadow(view)
      },
      views: [{
        type: "image",
        props: {
          smoothRadius: 15,
          src: "assets/Coffee/Coffee.png"
        },
        views: [{
          type: "list",
          props: {
            id: "DonationList",
            bgcolor: $color("clear"),
            rowHeight: 20,
            data: data,
            header: {
              type: "label",
              props: {
                height: 20,
                text: $l10n("COFFEE"),
                textColor: $color("#AAAAAA"),
                align: $align.center,
                font: $font(12)
              }
            },
            footer: {
              type: "label",
              props: {
                height: 20,
                text: $l10n("COFFEETHANKS") + " : )",
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
                    id: "coffeeLabel",
                    bgcolor: $color("white"),
                    textColor: $color("black"),
                    align: $align.center,
                    font: $font(10)
                  },
                  layout: $layout.fill
                }
              ]
            }
          },
          layout: function (make, view) {
            make.top.inset(133)
            make.centerX.equalTo(view.super.centerX)
            make.size.equalTo($size(90, 53))
          }
        }, {
          type: "image",
          props: {
            id: "coffeeqrCodebg",
            smoothRadius: 15,
            src: "assets/Coffee/qrCodebg.png",
            alpha: 0
          },
          views: [{
            type: "image",
            props: {
              id: "coffeeQrCode",
              smoothRadius: 15
            },
            layout: function (make, view) {
              make.centerX.equalTo(view.super.centerX)
              make.size.equalTo($size(180, 180))
              make.top.inset(40)
            },
            events: {
              tapped: function (sender) {
                coffeeQrCodeSave($("coffeeQrCode").info)
                if (bitcoinAddress == 1) {
                  saveCoffeePrompt($l10n("COFFEECODESAVED"), "1PS2ofMKgFnr1cc3YB3aF99i4KYQSPrvuR")
                } else {
                  saveCoffeePrompt($l10n("COFFEECODESAVED"), $l10n("COFFEESAVECODE"))
                }
              }
            }
          }, {
            type: "label",
            props: {
              id: "coffeePrompt",
              textColor: $color("darkGray"),
              align: $align.center,
              font: $font(12)
            },
            layout: function (make, view) {
              make.centerX.equalTo(view.super.centerX)
              make.left.right.inset(10)
              make.top.inset(230)
            },
            events: {
              tapped: function (sender) {
                if (bitcoinAddress == 1) {
                  $clipboard.text = $("coffeePrompt").text
                  saveCoffeePrompt($l10n("COFFEEADDRESSSAVED"), "1PS2ofMKgFnr1cc3YB3aF99i4KYQSPrvuR")
                } else {
                  coffeeQrCodeSave($("coffeeQrCode").info)
                  saveCoffeePrompt($l10n("COFFEECODESAVED"), $l10n("COFFEESAVECODE"))
                }
              }
            }
          }],
          layout: $layout.fill,
          events: {
            tapped: function (sender) {
            }
          }
        }, {
          type: "button",
          props: {
            src: "assets/Coffee/Alipay.png"
          },
          layout: function (make, view) {
            make.centerX.equalTo(view.super.centerX)
            make.size.equalTo($size(68.75, 25))
            make.bottom.inset(20)
          },
          events: {
            tapped: function (sender) {
              showCoffeeQRCode("Alipay.jpg", $l10n("COFFEESAVECODE"), 0)
              $ui.alert({
                message: $l10n("ALIPAYALERT0"),
                actions: [
                  {
                    title: $l10n("OK"),
                    handler: function () {
                      $safari.open({
                        url: "HTTPS://QR.ALIPAY.COM/FKX08013EPORVLDVEIFLD5",
                      })
                    }
                  },
                  {
                    title: $l10n("CANCEL"),
                    handler: function () {

                    }
                  }
                ]
              })
            }
          }
        }, {
          type: "button",
          props: {
            src: "assets/Coffee/WeChat.png"
          },
          layout: function (make, view) {
            make.centerX.equalTo(view.super.centerX).offset(85)
            make.size.equalTo($size(68.75, 25))
            make.bottom.inset(20)
          },
          events: {
            tapped: function (sender) {
              showCoffeeQRCode("WeChat.jpg", $l10n("COFFEESAVECODE"), 0)
              $ui.alert({
                message: $l10n("WECHATALERT0"),
                actions: [
                  {
                    title: $l10n("OK"),
                    handler: function () {
                      coffeeQrCodeSave("WeChat.jpg")
                      $push.schedule({
                        title: $l10n("COFFEECODESAVED"),
                        body: $l10n("PICKCODEFROMALBUM"),
                        delay: 0,
                        mute: true,
                      })
                      $app.openURL("weixin://scanqrcode")
                    }
                  },
                  {
                    title: $l10n("CANCEL"),
                    handler: function () {
                    }
                  }
                ]
              })
            }
          }
        }, {
          type: "button",
          props: {
            src: "assets/Coffee/Bitcoin.png"
          },
          layout: function (make, view) {
            make.centerX.equalTo(view.super.centerX).offset(-85)
            make.size.equalTo($size(68.75, 25))
            make.bottom.inset(20)
          },
          events: {
            tapped: function (sender) {
              showCoffeeQRCode("Bitcoin.jpg", "1PS2ofMKgFnr1cc3YB3aF99i4KYQSPrvuR", 1)
              alert($l10n("BITCIONALERT0"))
            }
          }
        }],
        layout: $layout.fill,
        events: {
          tapped: function (sender) {
          }
        }
      }]
    }]
  }
  $(viewId).add(coffeeViews)
  $ui.animate({
    duration: 0.3,
    animation: function () {
      $("coffeeBlur").alpha = 0.5
      $("coffeeImg").scale(1.1)
    }
  })
  $delay(1, function () {
    var i = 0
    timer = $timer.schedule({
      interval: 0.1,
      handler: function () {
        if (i < scrollStop) {
          i = i + 3
          $ui.animate({
            duration: 0,
            animation: function () {
              $("DonationList").scrollToOffset($point(0, i));
            }
          })
        } else {
          timer.invalidate()
        }
      }
    })
  })
}

function saveCoffeePrompt(prompt0, prompt1) {
  $ui.animate({
    duration: 2,
    animation: function () {
      $("coffeePrompt").alpha = 0
      $("coffeePrompt").text = prompt0
      $("coffeePrompt").alpha = 1
      $delay(2, function () {
        $ui.animate({
          duration: 2,
          animation: function () {
            $("coffeePrompt").alpha = 0
            $("coffeePrompt").text = prompt1
            $("coffeePrompt").alpha = 1
          }
        })
      })
    }
  })
}

function coffeeQrCodeSave(path) {
  $photo.save({
    data: $file.read("assets/Coffee/" + path),
    handler: function (success) {
    }
  })
}

function showCoffeeQRCode(path, prompt, coffeeType) {
  $ui.animate({
    duration: 1,
    animation: function () {
      $("coffeeqrCodebg").alpha = 1
      bitcoinAddress = coffeeType
      $("coffeeQrCode").src = "assets/Coffee/" + path
      $("coffeeQrCode").info = path
      $("coffeePrompt").text = prompt
    }
  })
}

function showcoffeeAlert() {
  var showCoffee = $cache.get("coffee")
  if (showCoffee) {
    showCoffee.times = showCoffee.times + 1
    showCoffee.show = showCoffee.show + 1
    if (showCoffee.show == 100) {
      showCoffee.show = 0
      $ui.alert({
        message: $l10n("RUNSCRIPT") + showCoffee.times + $l10n("RUNSCRIPTTIMES"),
        actions: [
          {
            title: $l10n("COFFEEOK"),
            handler: function () {
              coffee("mainView")
            }
          },
          {
            title: $l10n("CANCEL"),
            handler: function () {
            }
          }
        ]
      })
    }
    $cache.set("coffee", {
      "times": showCoffee.times,
      "show": showCoffee.show
    })
  } else {
    $cache.set("coffee", {
      "times": 1,
      "show": 1
    })
  }
}

module.exports = {
  coffee: coffee,
  showcoffee: showcoffeeAlert
}

function shadow(view) {
  var layer = view.runtimeValue().invoke("layer")
  layer.invoke("setCornerRadius", 15)
  layer.invoke("setShadowOffset", $size(5, 5))
  layer.invoke("setShadowColor", $color("lightGray").runtimeValue().invoke("CGColor"))
  layer.invoke("setShadowOpacity", 0.6)
  layer.invoke("setShadowRadius", 5)
}