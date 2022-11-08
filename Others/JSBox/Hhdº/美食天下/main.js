const post_content = `"identifier":"beautifulfoods","app":"9a000e26a210052bv5.7.6","timer":"2018-05-06 15:37:09","accounts":"","uid":"","openudid":"E19C5BF5-A563-4998-8CDF-C13B019DDDB7","regid":"","sig":"E19C5BF5-A563-4998-8CDF-C13B019DDDB7","apikey":"9a000e26a210052b","appname":"ios_meishi","imei":"E19C5BF5-A563-4998-8CDF-C13B019DDDB7","appver":"5.7.6","osver":"10.3.2","device":"iPad Air (WiFi)","isjail":"越狱机","screen":"2048x1536","aMemory":"258.02MB","uMemory":"25.78MB","from":"(null)","openfrom":"(null)","current":"(null)","mcc_mnc":"(null)_(null)","network":"WIFI",`
screen_width = $device.info.screen.width
screen_height = $device.info.screen.height
mainColor = $color("#FF6767")
template = [{
    type: "image",
    props: {
      id: "image",
      radius: 5,
      bgcolor: $color("clear")
    },
    layout: function(make, view) {
      make.left.top.bottom.inset(5)
      make.width.equalTo(view.height)
    }
  },
  {
    type: "label",
    props: {
      id: "label",
      font: $font("bold", 20),
      lines: 0
    },
    layout: function(make) {
      make.left.equalTo($("image").right).offset(10)
      make.top.inset(10)
      make.right.inset(10)
    }
  },
  {
    type: "label",
    props: {
      id: "content",
      font: $font(15),
      lines: 0,
      textColor: $color("gray")
    },
    layout: function(make) {
      make.left.equalTo($("label"))
      make.top.equalTo($("label").bottom).inset(15)
      make.right.inset(10)
    }
  },
  {
    type: "label",
    props: {
      id: "type",
      font: $font(12),
      lines: 1,
      bgcolor: $color("#F5F5F5"),
      textColor: $color("#777777"),
      radius: 2
    },
    layout: function(make) {
      make.left.equalTo($("label"))
      make.bottom.inset(10)
      make.height.equalTo(20)
    }
  }
]

function Topic(bannerpic, title, quote, list) {
  $ui.push({
    props: {
      title: title
    },
    views: [{
        type: "text",
        props: {
          id: "这是一个id",
          text: quote
        },
        layout: $layout.fill
      },
      {
        type: "list",
        props: {
          data: [{
              rows: [{
                type: "image",
                props: {
                  id: "image",
                  src: bannerpic
                },
                layout: function(make, view) {
                  make.top.left.right.inset(0)
                  make.height.equalTo(screen_width * 0.35)
                },
                events: {

                }
              }]
            },
            {
              rows: [{
                type: "text",
                props: {
                  text: quote,
                  editable: false
                },
                layout: $layout.fill
              }]
            }
          ].concat(list),
          template: template
        },
        layout: $layout.fill,
        events: {
          rowHeight: function(sender, indexPath) {
            switch (indexPath.section) {
              case 0:
                return screen_width * 0.35
                break
              case 1:
                return $("这是一个id").contentSize.height
                break
              default:
                return 150
            }
          },
          didSelect(sender, indexPath, data) {
            viewRecipes(data.adid)
          }
        }
      }
    ]
  })
  console.log($("这是一个id").contentSize.height)
}

var clues = "加载中…"
$ui.progress(0.3, clues)
var resp = await $http.post({
  url: "https://we.meishichina.com/client/api_test.php?i=E4D86E6FE815BEAE65D7A8120A3DEFF1",
  form: {
    p: `{${post_content}"m":{"advert_getMscAdMagicList":["ms3",1,5],"mofang_getYirisancan":[1525592229],"advert_getMscAdHomeHead":[],"advert_getTimeLineList":[1,20]}}`
  }
})
$ui.progress(0.6, clues)
var data = resp.data
source_gallery = data.advert_getMscAdMagicList.map(function(item) {
  return {
    type: "button",
    props: {
      src: item.cover
    },
    events: {
      tapped(sender) {
        viewTopick(item.subid)
      }
    }
  }
})
recommend = data.advert_getTimeLineList.map(function(item) {
  return {
    image: {
      src: (item.pic640) ? item.pic640 : item.pic
    },
    label: {
      text: item.subject
    },
    content: {
      text: item.desc
    },
    type: {
      text: item.remark
    },
    adid: item.subid
  }
})
RecommendRowHeight = recommend.length * 150
var resp = await $http.post({
  url: "https://we.meishichina.com/client/api_test.php?i=E4D86E6FE815BEAE65D7A8120A3DEFF1",
  form: {
    p: `{${post_content}"m":{"category_tagTuiJian":[],"category_getAllTagList":[]},"timer":"2018-05-12 12:39:47","aMemory":"247.55MB","app":"9a000e26a210052bv5.7.6","appver":"5.7.6"}`
  }
})
AllTagList = resp.data.category_getAllTagList.map(function(item) {
  return {
    label: {
      text: item.tagname,
      bgcolor: $color("#F1F1F1")
    },
    source: item.categorylist.map((ITEM) => {
      return {
        label: {
          text: ITEM.tagname
        },
        id: ITEM.id
      }
    })
  }
})
var resp = await $http.post({
  url: "https://we.meishichina.com/client/api_test.php?i=E4D86E6FE815BEAE65D7A8120A3DEFF1",
  form: {
    p: `{${post_content}"m":{"category_tagTuiJian":[],"ingredient_getMainCategoryByOS":[]},"timer":"2018-05-12 16:06:51","aMemory":"127.53MB","app":"9a000e26a210052bv5.7.6","appver":"5.7.6"}`
  }
})
AllTagList1 = resp.data.ingredient_getMainCategoryByOS[0].childs.map(function(item) {
  return {
    label: {
      text: item.category
    },
    source: item.childs.map((ITEM) => {
      return {
        label: {
          text: ITEM.name
        },
        id: ITEM.id
      }
    })
  }
})
$ui.progress(1, clues)

$ui.render({
  props: {
    title: "美食天下",
    //debugging: true
  },
  views: [{
      type: "view",
      props: {
        id: "menu",
        bgcolor: mainColor
      },
      views: [{
          type: "button",
          props: {
            id: "B1",
            title: "首页",
            bgcolor: mainColor
          },
          layout: function(make, view) {
            make.bottom.inset(0)
            make.height.equalTo(view.super)
            make.width.equalTo(view.super).dividedBy(3)
          },
          events: {
            tapped(sender) {
              ChangeColor(sender)
              hideAll()
              $("列表。").hidden = false
            }
          }
        },
        {
          type: "button",
          props: {
            id: "B2",
            title: "分类",
            titleColor: $color("#EEA58B"),
            bgcolor: mainColor
          },
          layout: function(make, view) {
            make.bottom.inset(0)
            make.left.equalTo($("B1").right)
            make.height.equalTo(view.super)
            make.width.equalTo(view.super).dividedBy(3)
          },
          events: {
            tapped(sender) {
              ChangeColor(sender)
              hideAll()
              $("一个列表").hidden = false
              $("列表列表").hidden = false
              $("一个列表").data = AllTagList
              $("列表列表").data = AllTagList[0].source
            }
          }
        },
        {
          type: "button",
          props: {
            id: "B3",
            title: "食材",
            titleColor: $color("#EEA58B"),
            bgcolor: mainColor
          },
          layout: function(make, view) {
            make.bottom.inset(0)
            make.left.equalTo($("B2").right)
            make.height.equalTo(view.super)
            make.width.equalTo(view.super).dividedBy(3)
          },
          events: {
            tapped(sender) {
              ChangeColor(sender)
              hideAll()
              $("一个列表").hidden = false
              $("列表列表").hidden = false
              $("一个列表").data = AllTagList1
              $("列表列表").data = AllTagList1[0].source
            }
          }
        }
      ],
      layout: function(make) {
        make.height.equalTo(44)
        make.top.right.left.inset(0)
      }
    },
    {
      type: "list",
      props: {
        id: "一个列表",
        rowHeight: 55,
        template: [{
          type: "label",
          props: {
            id: "label",
            textColor: $color("black"),
            align: $align.center,
            bgcolor: $color("#F1F1F1")
          },
          layout: $layout.fill
        }],
        hidden: true
      },
      layout: function(make) {
        make.left.bottom.inset(0)
        make.width.equalTo(screen_width * 0.26)
        make.top.equalTo($("menu").bottom)
      },
      events: {
        didSelect(sender, indexPath, data) {
          $("列表列表").data = data.source
        }
      }
    },
    {
      type: "matrix",
      props: {
        id: "列表列表",
        columns: 4,
        itemHeight: 40,
        spacing: 10,
        template: [{
            type: "label",
            props: {
              id: "label",
              align: $align.center,
              font: $font(15)
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
                ctx.strokeColor = $color("black")
                ctx.moveToPoint(0, 0)
                ctx.setLineWidth(1)
                ctx.addLineToPoint(X, 0)
                ctx.addLineToPoint(X, Y)
                ctx.addLineToPoint(0, Y)
                ctx.addLineToPoint(0, 0)
                ctx.strokePath()
              }
            }
          }
        ],
        data: AllTagList[0].source,
        hidden: true
      },
      layout: function(make) {
        make.right.bottom.inset(0)
        make.left.equalTo($("一个列表").right)
        make.top.equalTo($("menu").bottom)
      },
      events: {
        didSelect: function(sender, indexPath, data) {
            $http.post({
              url: "https://we.meishichina.com/client/api_test.php?i=E4D86E6FE815BEAE65D7A8120A3DEFF1",
              form: {
                p: `${post_content}"m":{"category_getTagRecipeList":["${data.id}"],"":["${data.id}",1,20,"category_getTagRecipeList"}","false","before"]},"timer":"2018-05-13 08:22:47","aMemory":"219.28MB","app":"9a000e26a210052bv5.7.6","appver":"5.7.6"}`
              },
              handler(resp) {
                var d = resp.data.category_getTagRecipeList
                var list = d.map((item) => {
                  return {
                    image: {
                      src: item.cover
                    },
                    label: {
                      text: item.title
                    },
                    content: {
                      text: item.mainingredient
                    },
                    type: {
                      text: "菜谱"
                    },
                    adid: item.id
                  }
                })
                console.log(resp.data)
                viewSearchResults(data.label.text, list)
              }
            })
          
        }
      }
    },
    {
      type: "list",
      props: {
        id: "列表。",
        data: [{
            rows: [{
              type: "view",
              layout: $layout.fill,
              views: [{
                  type: "tab",
                  props: {
                    id: "SearchTab",
                    items: ["菜谱", "食材"],
                    tintColor: mainColor
                  },
                  layout: (make, view) => {
                    make.left.inset(10)
                    make.centerY.equalTo(view.super)
                  },
                  events: {
                    ready(sender) {
                      sender.disable(1)
                    }
                  }
                },
                {
                  type: "input",
                  props: {
                    id: "search",
                    type: $kbType.search,
                    placeholder: "搜索...",
                    clearsOnBeginEditing: true
                  },
                  layout(make) {
                    make.top.bottom.inset(5)
                    make.right.inset(10)
                    make.left.equalTo($("SearchTab").right).offset(10)
                  },
                  events: {
                    returned(sender) {
                      sender.blur()
                      search(sender.text)
                    }
                  }
                }
              ]
            }]
          },
          {
            rows: [{
              type: "gallery",
              props: {
                id: "随便取个id喵",
                items: source_gallery,
                interval: 3,
                radius: 5
              },
              layout: function(make, view) {
                make.edges.inset(10)
              }
            }]
          },
          {
            rows: [{
              type: "matrix",
              props: {
                columns: 5,
                itemHeight: 55,
                spacing: 0,
                scrollEnabled: false,
                template: [{
                  type: "label",
                  props: {
                    id: "label",
                    textColor: $color("white"),
                    align: $align.center,
                    font: $font(20)
                  },
                  layout: $layout.fill
                }],
                data: [{
                    label: {
                      text: "专题",
                      bgcolor: $color("#FEC7CD")
                    }
                  },
                  {
                    label: {
                      text: "菜单",
                      bgcolor: $color("#ABE4FF")
                    }
                  },
                  {
                    label: {
                      text: "排行榜",
                      bgcolor: $color("#9CEFDB")
                    }
                  },
                  {
                    label: {
                      text: "家常菜",
                      bgcolor: $color("#FCD391")
                    }
                  },
                  {
                    label: {
                      text: "养生",
                      bgcolor: $color("#D9C4EB")
                    }
                  }
                ]
              },
              layout: $layout.fill,
              events: {
                didSelect(sender, indexPath, data) {
                  switch (indexPath.row) {
                    case 0:
                      TopicList()
                      break
                    case 3:
                      jcc()
                      break
                    case 4:
                      yangsheng()
                      break
                  }
                }
              }
            }]
          },
          {
            rows: [{
              type: "list",
              props: {
                id: "喵喵喵喵喵？",
                rowHeight: 150,
                scrollEnabled: false,
                data: recommend,
                template: template
              },
              layout: $layout.fill,
              events: {
                didSelect: function(sender, indexPath, data) {
                  switch (data.type.text) {
                    case "菜谱":
                      viewRecipes(data.adid)
                      break
                    case "专题":
                      viewTopick(data.adid)
                      break
                  }
                }
              }
            }]
          }
        ]
      },
      layout: function(make) {
        make.right.left.bottom.inset(0)
        make.top.equalTo($("menu").bottom)
      },
      events: {
        rowHeight: function(sender, indexPath) {
          switch (indexPath.section) {
            case 0:
              return 42
              break
            case 1:
              return screen_width * 0.52
              break
            case 2:
              return 55
              break
            case 3:
              return RecommendRowHeight
              break
          }
        },
        willBeginDragging: function(sender) {
          dishideBtn()
          //$delay(0.1, () => console.info(sender.contentOffset))
        },
        didEndDecelerating: function(sender) {
          $delay(1, function() {
            if (sender.dragging == false) hideBtn()
          })
          //console.log(sender.contentOffset)
        }
      }
    },
    {
      type: "button",
      props: {
        id: "toTheTop",
        bgcolor: $color("clear"),
        src: $file.read("assets/totop.txt").string,
        hidden: true,
        alpha: 0
      },
      layout: function(make, view) {
        shadowButton(view)
        make.bottom.right.inset(25)
        make.size.equalTo(50)
      },
      events: {
        tapped: function() {
          hideBtn()
          $("list").scrollTo({
            indexPath: $indexPath(0, 0),
            animated: true
          })
        }
      }
    }
  ]
})

function dishideBtn() {
  $("toTheTop").hidden = false
  $ui.animate({
    duration: 0.4,
    animation: function() {
      $("toTheTop").alpha = 100
    }
  })
}

function hideBtn() {
  $ui.animate({
    duration: 0.5,
    animation: function() {
      $("toTheTop").alpha = 0
    },
    completion: function() {
      $("toTheTop").hidden = true
    }
  })
}

function hideAll() {
  $("一个列表").hidden = true
  $("列表列表").hidden = true
  $("列表。").hidden = true
}

function viewTopick(subid) {
  $http.post({
    url: "https://we.meishichina.com/client/api_test.php?i=E4D86E6FE815BEAE65D7A8120A3DEFF1",
    form: {
      p: `{${post_content}"m":{"mofang_mGetMofangNewInfo":["${subid}",1,20]}}`
    },
    handler: function(resp) {
      console.log(resp.data)
      let data = resp.data.mofang_mGetMofangNewInfo.data
      kinfo = data.kinfo
      arr = new Array()
      heightArr = []
      data.kinfo.map((item) => {
        let info = item.info
        infoin = item.infoin
        arr1 = []
        for (i in infoin) {
          let itemData = infoin[i]
          arr1.push({
            image: {
              src: itemData.cover
            },
            label: {
              text: itemData.title
            },
            content: {
              text: itemData.mainingredient
            },
            type: {
              text: "食谱"
            },
            adid: itemData.id
          })
        }
        arr.push({
          title: `◎${info.subject}\n${info.message}`,
          rows: arr1
        })
      })
      console.log(data)
      Topic(data.bannerpic, data.title, data.quote, arr)
    }
  })
}

function Recipes(title, quote, Picsrc, list, steps) {
  $ui.push({
    props: {
      title: title
    },
    views: [{
        type: "text",
        props: {
          id: "这又是一个id",
          text: quote
        },
        layout: $layout.fill
      },
      {
        type: "list",
        props: {
          data: [{
              rows: [{
                type: "image",
                props: {
                  id: "image",
                  src: Picsrc
                },
                layout: function(make, view) {
                  make.top.left.right.inset(0)
                  make.height.equalTo(screen_width * 0.35)
                }
              }]
            },
            {
              rows: [{
                type: "text",
                props: {
                  text: quote,
                  editable: false,
                  scrollEnabled: false
                },
                layout: $layout.fill
              }]
            }
          ].concat(list).concat([{
            title: "步骤",
            rows: [{
              type: "list",
              props: {
                rowHeight: 200,
                scrollEnabled: false,
                data: steps,
                template: template
              },
              layout: $layout.fill,
              events: {
                didSelect: function(sender, indexPath, data) {
                  $http.download({
                    url: data.bigpic,
                    handler(resp) {
                      $quicklook.open({
                        image: resp.data.image
                      })
                    }
                  })
                }
              }
            }]
          }]),
          template: [{
              type: "label",
              props: {
                id: "title",
                font: $font(16)
              },
              layout: function(make, view) {
                make.left.inset(10)
                make.centerY.equalTo(view.super)
              }
            },
            {
              type: "label",
              props: {
                id: "much",
                font: $font(16),
                textColor: $color("#AAAAAA")
              },
              layout: function(make, view) {
                make.right.inset(10)
                make.centerY.equalTo(view.super)
              }
            }
          ]
        },
        layout: $layout.fill,
        events: {
          rowHeight: function(sender, indexPath) {
            switch (indexPath.section) {
              case 0:
                return screen_width * 0.35
                break
              case 1:
                return $("这又是一个id").contentSize.height
                break
              case 4:
                return steps.length * 200
            }
          }
        }
      }
    ]
  })
}

function search(kw) {
  $http.post({
    url: "https://we.meishichina.com/client/api_test.php?i=E4D86E6FE815BEAE65D7A8120A3DEFF1",
    form: {
      p: `{${post_content}"m":{"common_mSearchUserMofangIngredientView":["${kw}"],"search_getRecipeListByNameOS":["${kw}",1,20,"","hot"]},"timer":"2018-05-12 08:37:20","aMemory":"188.55MB","app":"9a000e26a210052bv5.7.6","appver":"5.7.6"}`
    },
    handler: function(resp) {
      var list = resp.data.search_getRecipeListByNameOS.map((item) => {
        return {
          image: {
            src: item.cover
          },
          label: {
            text: item.title
          },
          content: {
            text: item.mainingredient
          },
          type: {
            text: "菜谱"
          },
          adid: item.id
        }
      })
      console.log(resp.data)
      viewSearchResults(`"${kw}"的搜索结果`, list)
    }
  })
}

function viewSearchResults(title, list) {
  $ui.push({
    props: {
      title: title
    },
    views: [{
      type: "list",
      props: {
        rowHeight: 150,
        template: template,
        data: list
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath, data) {
          viewRecipes(data.adid)
        }
      }
    }]
  })
}

function viewRecipes(adid) {
  $http.post({
    url: "https://we.meishichina.com/client/api_test.php?i=E4D86E6FE815BEAE65D7A8120A3DEFF1",
    form: {
      p: `{${post_content}"m":{"recipe_getRecipeCollect":["${adid}","1","5","hot"],"recipe_getRecipeById":["${adid}",""],"advert_getMscFooterAdList":["${adid}"],"event_getActivityInfo":["${adid}","1"]}}`
    },
    handler: function(resp) {
      console.log(resp.data)
      let data = resp.data.recipe_getRecipeById
      mainGroup = data.ingredientgroups.ingredient_groups[0].ingredient
      Group = data.ingredientgroups.ingredient_groups[1].ingredient
      steps = data.steps.map((item, index) => {
        return {
          image: {
            src: item.bigpic
          },
          label: {
            text: `第${index+1}步`
          },
          content: {
            text: item.note
          },
          bigpic: item.p800_pic
        }
      })
      arr1 = []
      arr2 = []
      arr3 = []
      for (key in mainGroup) {
        arr1.push({
          title: {
            text: key
          },
          much: {
            text: mainGroup[key]
          }
        })
      }
      for (key in Group) {
        arr2.push({
          title: {
            text: key
          },
          much: {
            text: mainGroup[key]
          }
        })
      }
      list = [{
          title: "主料",
          rows: arr1
        },
        {
          title: "辅料",
          rows: arr2
        }
      ]
      Recipes(data.managetitle, data.message, data.tvpic, list, steps)
    }
  })
}

function jcc() {
  $http.get({
    url: "https://m.meishichina.com/jiachangcai/",
    handler: function(resp) {
      var data = resp.data.match(/<li><a target\=\"_blank\" href\=\"https:\/\/m\.meishichina.com\/mofang\/.*?\/\" title=\".*?\">.*?<\/a><\/li>/g).map((item) => {
        return {
          label: {
            text: item.match(/title=\".*?(?=\")/)[0].replace("title=\"", "")
          },
          adid: item.match(/mofang\/.*?(?=\/\")/)[0].replace("mofang\/", "")
        }
      })
      $ui.push({
        props: {
          title: "家常菜"
        },
        views: [{
          type: "matrix",
          props: {
            columns: 4,
            itemHeight: 40,
            spacing: 10,
            template: [{
                type: "label",
                props: {
                  id: "label",
                  align: $align.center,
                  font: $font(15)
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
                    ctx.strokeColor = $color("black")
                    ctx.moveToPoint(0, 0)
                    ctx.setLineWidth(1)
                    ctx.addLineToPoint(X, 0)
                    ctx.addLineToPoint(X, Y)
                    ctx.addLineToPoint(0, Y)
                    ctx.addLineToPoint(0, 0)
                    ctx.strokePath()
                  }
                }
              }
            ],
            data: data
          },
          layout: $layout.fill,
          events: {
            didSelect(sender, indexPath, data) {
              viewTopick(data.adid)
            }
          }
        }]
      })
    }
  })
}

function yangsheng() {
  $ui.push({
    props: {
      title: "食疗养生"
    },
    views: [{
        type: "menu",
        props: {
          id: "菜单",
          items: ["维生素排行", "矿物质排行", "食材功效大全"],
          index: 0
        },
        layout: function(make, view) {
          make.top.left.right.inset(0)
          make.height.equalTo(44)
        },
        events: {
          changed(sender) {
            switch (sender.index) {
              case 0:
                $("网页").url = "https://m.meishichina.com/newwap.php?ac=category&op=yingyanginapp_list&type=1"
                break
              case 1:
                $("网页").url = "https://m.meishichina.com/newwap.php?ac=category&op=yingyanginapp_list&type=2"
                break
              case 2:
                $("网页").url = "https://m.meishichina.com/newwap.php?ac=category&op=gongxiaoinapp_list"
                break
            }
          }
        }
      },
      {
        type: "web",
        props: {
          id: "网页",
          url: "https://m.meishichina.com/newwap.php?ac=category&op=yingyanginapp_list&type=1",
          showsProgress: false,
          script: function() {
            function notify(url) {
              if (url) {
                if (url.indexOf("pinyin=") == -1) {
                  $notify("id", { "url": url })
                } else {
                  $notify("pinyin", { "url": url })
                }
              }
            }
            var elements = document.getElementsByTagName("*")
            for (var i = 0; i < elements.length; ++i) {
              var element = elements[i]
              if (element.tagName.toLowerCase() === "a") {
                element.onclick = function(event) {
                  if (event.target.href.indexOf("beautifulfoods") == 0) {
                    notify(event.target.href)
                    return false
                  } else return true
                }
              }
            }
          }
        },
        layout: function(make, view) {
          make.bottom.left.right.inset(0)
          make.top.equalTo($("菜单").bottom)
        },
        events: {
          pinyin: function(message) {
            var url = message.url
            var Pinyin = url.replace("beautifulfoods://com.msc.com/open?type=ingredient&pinyin=", "")
            $ui.loading(true)
            $http.post({
              url: "https://we.meishichina.com/client/api_test.php?i=E4D86E6FE815BEAE65D7A8120A3DEFF1",
              form: {
                p: `{"device":"iPad Air (WiFi)","screen":"1536x2048","regid":"","apikey":"9a000e26a210052b","isjail":"越狱机","sig":"E19C5BF5-A563-4998-8CDF-C13B019DDDB7","osver":"10.3.2","imei":"E19C5BF5-A563-4998-8CDF-C13B019DDDB7","mcc_mnc":"(null)_(null)","current":"(null)","uMemory":"60.93MB","accounts":"","identifier":"beautifulfoods","openudid":"E19C5BF5-A563-4998-8CDF-C13B019DDDB7","uid":"","appname":"ios_meishi","openfrom":"(null)","from":"(null)","network":"WIFI","m":{"ingredient_getIngredientPaiList":["${Pinyin}"],"ingredient_getIngredientRecipeListByPinyin":["${Pinyin}",1,20,"","false","before"]},"timer":"2018-05-13 08:24:23","aMemory":"275.41MB","app":"9a000e26a210052bv5.7.6","appver":"5.7.6"}`
              },
              handler: function(resp) {
                $ui.loading(false)
                var list = resp.data.ingredient_getIngredientRecipeListByPinyin.map((item) => {
                  return {
                    image: {
                      src: item.cover
                    },
                    label: {
                      text: item.title
                    },
                    content: {
                      text: item.mainingredient
                    },
                    type: {
                      text: "菜谱"
                    },
                    adid: item.id
                  }
                })
                viewSearchResults(Pinyin, list)
              }
            })
          },
          id: function(message) {
            var url = message.url
            var id = url.match(/id\=.*/)[0].replace("id=", "")
            viewRecipes(id)
          }
        }
      }
    ]
  })
}

function TopicList() {
  $http.post({
    url: "https://we.meishichina.com/client/api_test.php?i=E4D86E6FE815BEAE65D7A8120A3DEFF1",
    form: {
      p: `{${post_content}"m":{"mofang_mofangNewList":[1,30,"",""]}}`
    },
    handler(resp) {
      data = resp.data.mofang_mofangNewList.map((item) => {
        return {
          ImageId: {
            src: item.bannerpic
          },
          id: item.mfid
        }
      })
      $ui.push({
        props: {
          title: "专题"
        },
        views: [{
          type: "list",
          props: {
            rowHeight: screen_width * 0.35,
            template: [{
              type: "image",
              props: {
                id: "ImageId",
                radius: 5
              },
              layout: function(make) {
                make.edges.inset(10)
              }
            }],
            data: data,
            separatorHidden: true
          },
          layout: $layout.fill,
          events: {
            didSelect(sender, indexPath, data) {
              viewTopick(data.id)
            }
          }
        }]
      })
    }
  })
}

function ChangeColor(Button) {
  $("B1").titleColor = $color("#EEA58B")
  $("B2").titleColor = $color("#EEA58B")
  $("B3").titleColor = $color("#EEA58B")
  Button.titleColor = $color("white")
}

//修改自Ryan大佬的Quick+Delete
function shadowButton(view) {
  var layer = view.runtimeValue().invoke("layer")
  layer.invoke("setShadowOffset", $size(1, 1))
  layer.invoke("setShadowColor", $color("lightGray").runtimeValue().invoke("CGColor"))
  layer.invoke("setShadowOpacity", 1)
  layer.invoke("setShadowRadius", 5)
  //  layer.invoke("setMasksToBounds", true)
  //  layer.invoke("setCornerRadius", 25)
}