

if ($cache.get("meirituis") == undefined) {
  $cache.set("meirituis", true);
  $cache.set("dqxh", true);
  $cache.set("jiekou", "netease");
}


function actcun() {
  
  var data = $context.data;
  var filename = data.fileName;
  
  $file.write({
          data:data,
          path:filename
        });
    if ($file.read(filename)) {
  
  var name = filename.replace(/(.mp3|.m4a|.flac)/, "");
  namea = /(-|—)/.test(name) ? /.*(-|—)+/.exec(name)[0].replace(/(-|—)+/, "") : name;
  var fub = /(-|—)/.test(name) ? /(-|—)+.*/.exec(name)[0].replace(/(-|—)+/, "") : "";
  if ($file.read("bendisong.json")) {
    LocalData = JSON.parse($file.read("bendisong.json").string);
    LocalData.push({
      name:namea,
      filename:filename,
      src: "http://t.cn/EP4I2Wd",
      fubs:fub
    });
  } else {
    LocalData = [
      {
      name:namea,
      filename:filename,
      src: "http://t.cn/EP4I2Wd",
      fubs:fub
      }
    ];
  }
  $file.write({
    data: $data({ string: JSON.stringify(LocalData) }),
    path: "bendisong.json"
  });
    $ui.toast("存储已完成...")    
}else{
  $ui.toast("文件过大,无法存储!")
}$delay(1, function() {
  $context.close()
})}

if ($app.env == $env.siri) {
  $intents.height = 90;
  if ($cache.get("meirituis") == true) {
    if ($file.exists("bendisong.json") == true) {
      var ggboy = JSON.parse($file.read("bendisong.json").string);
      const m = ggboy.length;
      const n = Math.floor(Math.random() * m);
      $audio.play({
        path: ggboy[n].filename
      });
      $intents.finish("正在播放:" + ggboy[n].name);
    } else {
      $objc("LSApplicationWorkspace").$defaultWorkspace();
      var url = $objc("NSURL").$URLWithString("orpheuswidget://radio");
      workspace.$openURL(url);
      $intents.finish();
    }
  } else {
    var workspace = $objc("LSApplicationWorkspace").$defaultWorkspace();
    var url = $objc("NSURL").$URLWithString("orpheuswidget://radio");
    workspace.$openURL(url);
    $intents.finish();
  }
}

var songlist = [];

if($app.env == $env.action){
  actcun()
}else{
  viewa();
}

function viewa(loves) {
  if ($file.exists("bendisong.json") == false) {
    var bendisong = [];
  } else {
    var gg = JSON.parse($file.read("bendisong.json").string);
    var bendisong = gg.map(function(item) {
      return {
        labels: {
          text: item.name
        },
        fubiaot: {
          text: item.fubs
        },
        tup: {
          src: item.src
        }
      };
    });
  }
  $ui.render({
    props: {
      id: "label",
      title: "Jnmusic",
      bgcolor: $app.env === $env.today ? $color("clear") : $color("#fbfbf6"),
    },
    views: [
      {
        type: "label",
        props: {
          id: "tq",
          text: "ふ\tし",
          textColor: $color("black"),
          font: $font("HiraMinProN-W3", 25),
          align: $align.center
        },
        layout: function(make, view) {
          make.top.inset(20);
          make.left.inset(70);
        },
        events: {
          tapped: function(sender) {
            songlist = [];
            $device.taptic(2);
            viewa();
          },
          longPressed: function(sender) {
            select_color(sender);
          }
        }
      },
      {
        type: "input",
        props: {
          type: $kbType.search,
          id: "sousuo",
          placeholder: "搜索",
          bgcolor: $app.env === $env.today ? $color("clear") : $color("white"),
          darkKeyboard: true
        },
        layout: function(make, view) {
          make.top.inset(18);
          make.right.inset(55);
          make.size.equalTo($size(100, 30));
        },
        events: {
          returned: function(sender) {
            sousuo(sender.text);
            $("sousuo").blur();
            $device.taptic(2);
          }
        }
      },
      {
        type: "label",
        props: {
          id: "hengxian",
          bgcolor: $color("gray")
        },
        layout: function(make, view) {
          make.top.equalTo($("sousuo").bottom).offset(20);
          make.left.right.inset(30);
          make.height.equalTo(0.7);
        }
      },
      {
        type: "button",
        props: {
          id: "bofang",
          title: "bof",
          src: "http://t.cn/EvNW3X1",
          bgcolor: $color("clear")
        },
        layout: function(make, view) {
          make.top.inset(20);
          make.right.equalTo($("sousuo").left).offset(-18);
          make.size.equalTo($size(30, 30));
          //
        },
        events: {
          tapped: function(sender) {
            $device.taptic(1);

            if ($audio.status == 2) {
              $audio.pause();
              $("bofang").title = "bof";
              $("bofang").src = "http://t.cn/EvNW3X1";
            } else if ($audio.status == 0) {
              $audio.resume();
              $("bofang").title = "zt";
              $("bofang").src = "http://t.cn/EvNlbrD";
            }
          }
        }
      },{
  type: "blur",
  props: {
    id:"loading",
    alpha:0,
    style: 1 // 0 ~ 5
  },
  layout: $layout.fill
},
      {
        type: "list",
        props: {
          id: "listaa",
          radius: 10,
          separatorColor:
            $app.env !== $env.today ? $color("#DDDDDD") : $color("gray"),
          alpha:
            ($app.env === $env.today && $widget.mode === 1) ||
            $app.env === $env.app
              ? "1"
              : "0",
          selectable: true,
          rowHeight: $app.env === $env.today ? 38 : 50,
          bgcolor:
            $app.env === $env.today ? $color("clear") : $color("#fbfbf6"),
          actions:
            songlist.toString() == ""
              ? [
                  {
                    title: "delete",
                    color: $color("gray"), // default to gray
                    handler: function(sender, indexPath) {
                      shanCache(indexPath.row);
                    }
                  },
                  {
                    title: "导出",
                    handler: function(sender, indexPath) {
                      LocalData = JSON.parse(
                        $file.read("bendisong.json").string
                      );
                      var data = $file.read(LocalData[indexPath.row].filename);
                      data.fileName = LocalData[indexPath.row].filename;
                      $share.sheet(data);
                    }
                  },
                  {
                    title: "作者",
                    color: $color("#433d3c"),
                    handler: function(sender, indexPath) {
                      LocalData = JSON.parse(
                        $file.read("bendisong.json").string
                      );
                      var data = LocalData[indexPath.row].fubs;

                      sousuo(data);
                    }
                  }
                ]
              : [
                  {
                    title: "320K",
                    color: $color("gray"), // default to gray
                    handler: function(sender, indexPath) {
                      downsong(indexPath.row, "mp3");
                    }
                  },
                  {
                    title: "無損",
                    color: $color("black"),
                    handler: function(sender, indexPath) {
                      downsong(indexPath.row, "flac");
                    }
                  },
                  {
                    title: "作者",
                    color: $color("#433d3c"),
                    handler: function(sender, indexPath) {
                      var data = songlist[indexPath.row].names.fubs;

                      sousuo(data);
                    }
                  }
                ],
          template: {
            props: {
              bgcolor: $color("clear")
            },
            views: [
              {
                type: "label",
                props: {
                  bgcolor:
                    $app.env === $env.today
                      ? $color("clear")
                      : $color("#fbfbf6")
                },
                layout: $layout.fill
              },
              {
                type: "image",
                props: {
                  id: "tup",
                  bgcolor: $color("clear"),
                  radius: 5
                },
                layout: function(make, view) {
                  make.centerY.equalTo(view.super).offset(0);
                  make.size.equalTo(
                    $size(
                      $app.env === $env.today ? 25 : 38,
                      $app.env === $env.today ? 25 : 38
                    )
                  );
                  make.left.inset(10);
                }
              },
              {
                type: "label",
                props: {
                  id: "labels",
                  bgcolor: $color("clear"),
                  textColor: $color("black"),
                  align: $align.center,
                  font:
                    $app.env === $env.today
                      ? $font("AvenirNext-Regular", 15)
                      : $font("AvenirNext-Regular", 15)
                },
                layout: function(make, view) {
                  make.left.equalTo($("tup").right).offset(30);
                  make.centerY.equalTo(view.super).offset(-5);
                }
              },
              {
                type: "label",
                props: {
                  id: "fubiaot",
                  bgcolor: $color("clear"),
                  textColor: $color("gray"),
                  align: $align.center,
                  font: $app.env === $env.today ? $font(10) : $font(12)
                },
                layout: function(make, view) {
                  make.left.equalTo($("tup").right).offset(30);
                  make.top
                    .equalTo($("tup").bottom)
                    .offset($app.env === $env.today ? -10 : -15);
                }
              }
            ]
          },
          data: bendisong,
          footer: {
            type: "label",
            props: {
              height: $file.exists("bendisong.json") == false&&songlist.toString() == ""? 160 : 20,
              lines: 0,
              autoFontSize: true,
              text:
                $file.exists("bendisong.json") == false&&songlist.toString() == ""
                  ? "右上角的输入框用来搜索歌曲\n点击左上角的ふし可以返回这个页面\n这个页面是用来存放已下载歌曲的\n你下载了的歌都会出现在这\n请不要直接在文件管理处删除任何文件\n会报错的\n搜索页面左滑选择下载320或者无损\n本地音乐列表左滑选择分享或删除\n@橘年"
                  : loves
                    ? loves
                    : "Designed by Junian",
              textColor:
                $app.env === $env.today ? $color("gray") : $color("#AAAAAA"),
              align: $align.center,
              font:
                $file.exists("bendisong.json") == false ? $font(13) : $font(12)
            }
          }
        },
        layout: function(make, view) {
          make.top.equalTo($("hengxian").bottom).offset(0);
          make.right.left.inset(30);
          make.bottom.inset(5);
        },
        events: {
          didReachBottom: function(sender) {
if(songlist.toString() != ""&&$("sousuo").text!=""){
            jxsousuo(sender,$("sousuo").text)}else{
              sender.endFetchingMore()
            }
            },
          didSelect: function(sender, indexPath, data) {
              $device.taptic(1);

           shiting(indexPath.row,gg)}
        }
      },
      {
        type: "blur",
        props: {
          id: "blure",
          style: 1,
          alpha: "0" // 0 ~ 5
        },
        layout: $layout.fill,
        events: {
          tapped: function(sender) {
            xiaoshi(sender);
          }
        }
      },
      {
        type: "view",
        props: {
          id: "hex",
          alpha: "0",
          radius: 20,
          bgcolor: $cache.get("jiekou")=="netease"?$color("#AD002D"):$color("#3f4551")
        },
        layout: function(make, view) {
          make.size.equalTo($size(40, 40));
          make.centerX.equalTo(view.super).offset(0);
          make.centerY.equalTo(view.super);
        },
        views: [
          {
            type: "label",
            props: {
              text: "網",
              textColor: $color("white"),
              font: $font("HiraMinProN-W3", 20)
            },
            layout: function(make, view) {
              make.center.equalTo(view.super);
            }
          }
        ],
        events: {
          tapped: function(sender) {
            $device.taptic(2);
            $cache.set("jiekou", "netease");
            sousuo($("sousuo").text);
            xiaoshi(sender);
          }
        }
      },
      {
        type: "view",
        props: {
          id: "rgb",
          alpha: 0,
          radius: 20,
          bgcolor: $cache.get("jiekou")=="qq"?$color("#AD002D"):$color("#3f4551")
        },
        layout: function(make, view) {
          make.size.equalTo($size(40, 40));
          make.centerX.equalTo(view.super).offset(0);
          make.centerY.equalTo(view.super);
        },
        views: [
          {
            type: "label",
            props: {
              text: "騰",
              textColor: $color("white"),
              font: $font("HiraMinProN-W3", 20)
            },
            layout: function(make, view) {
              make.center.equalTo(view.super);
            }
          }
        ],
        events: {
          tapped: function(sender) {
            $device.taptic(2);
            $cache.set("jiekou", "qq");
            sousuo($("sousuo").text);
            xiaoshi(sender);
          }
        }
      },
      {
        type: "view",
        props: {
          id: "rgc",
          alpha: 0,
          radius: 20,
          bgcolor: $cache.get("jiekou")=="kugou"?$color("#AD002D"):$color("#3f4551")
        },
        layout: function(make, view) {
          make.size.equalTo($size(40, 40));
          make.centerX.equalTo(view.super).offset(0);
          make.centerY.equalTo(view.super);
        },
        views: [
          {
            type: "label",
            props: {
              text: "酷",
              textColor: $color("white"),
              font: $font("HiraMinProN-W3", 20)
            },
            layout: function(make, view) {
              make.center.equalTo(view.super);
            }
          }
        ],
        events: {
          tapped: function(sender) {
            $device.taptic(2);
            $cache.set("jiekou", "kugou");
            sousuo($("sousuo").text);
            xiaoshi(sender);
          }
        }
      },
      {
        type: "view",
        props: {
          id: "rga",
          alpha: 0,
          radius: 20,
          bgcolor: $cache.get("jiekou")=="xiami"?$color("#AD002D"):$color("#3f4551")
        },
        layout: function(make, view) {
          make.size.equalTo($size(40, 40));
          make.centerX.equalTo(view.super).offset(0);
          make.centerY.equalTo(view.super);
        },
        views: [
          {
            type: "label",
            props: {
              text: "蝦",
              textColor: $color("white"),
              font: $font("HiraMinProN-W3", 20)
            },
            layout: function(make, view) {
              make.center.equalTo(view.super);
            }
          }
        ],
        events: {
          tapped: function(sender) {
            $device.taptic(2);
            $cache.set("jiekou", "xiami");
            sousuo($("sousuo").text);
            xiaoshi(sender);
          }
        }
      },
      {
        type: "view",
        props: {
          id: "rgf",
          alpha: 0,
          radius: 20,
          bgcolor: $cache.get("jiekou")=="baidu"?$color("#AD002D"):$color("#3f4551")
        },
        layout: function(make, view) {
          make.size.equalTo($size(40, 40));
          make.centerX.equalTo(view.super).offset(0);
          make.centerY.equalTo(view.super).offset(0);
        },
        views: [
          {
            type: "label",
            props: {
              text: "度",
              textColor: $color("white"),
              font: $font("HiraMinProN-W3", 20)
            },
            layout: function(make, view) {
              make.center.equalTo(view.super);
            }
          }
        ],
        events: {
          tapped: function(sender) {
            $device.taptic(2);
            $cache.set("jiekou", "baidu");
            sousuo($("sousuo").text);
            xiaoshi(sender);
          }
        }
      },
      {
        type: "view",
        props: {
          id: "rgq",
          alpha: 0,
          radius: 20,
          bgcolor: $cache.get("jiekou")=="5singfc"?$color("#AD002D"):$color("#3f4551")
        },
        layout: function(make, view) {
          make.size.equalTo($size(40, 40));
          make.centerX.equalTo(view.super).offset(0);
          make.centerY.equalTo(view.super).offset(0);
        },
        views: [
          {
            type: "label",
            props: {
              text: "翻",
              textColor: $color("white"),
              font: $font("HiraMinProN-W3", 20)
            },
            layout: function(make, view) {
              make.center.equalTo(view.super);
            }
          }
        ],
        events: {
          tapped: function(sender) {
            $device.taptic(2);
$cache.set("jiekou", "5singfc");
sousuo($("sousuo").text);
            xiaoshi(sender);
          }
        }
      },
      {
        type: "view",
        props: {
          id: "rgr",
          alpha: 0,
          radius: 20,
          bgcolor: $cache.get("jiekou")=="ximalaya"?$color("#AD002D"):$color("#3f4551")
        },
        layout: function(make, view) {
          make.size.equalTo($size(40, 40));
          make.centerX.equalTo(view.super).offset(0);
          make.centerY.equalTo(view.super).offset(0);
        },
        views: [
          {
            type: "label",
            props: {
              text: "喜",
              textColor: $color("white"),
              font: $font("HiraMinProN-W3", 20)
            },
            layout: function(make, view) {
              make.center.equalTo(view.super);
            }
          }
        ],
        events: {
          tapped: function(sender) {
            $device.taptic(2);
            $cache.set("jiekou", "ximalaya");
            sousuo($("sousuo").text);
            xiaoshi(sender);
          }
        }
      },
      {
        type: "view",
        props: {
          id: "rgg",
          alpha: 0,
          radius: 20,
          bgcolor: $cache.get("jiekou")=="5singyc"?$color("#AD002D"):$color("#3f4551")
        },
        layout: function(make, view) {
          make.size.equalTo($size(40, 40));
          make.centerX.equalTo(view.super).offset(0);
          make.centerY.equalTo(view.super).offset(0);
        },
        views: [
          {
            type: "label",
            props: {
              text: "伍",
              textColor: $color("white"),
              font: $font("HiraMinProN-W3", 20)
            },
            layout: function(make, view) {
              make.center.equalTo(view.super);
            }
          }
        ],
        events: {
          tapped: function(sender) {
            $device.taptic(2);
             $cache.set("jiekou", "5singyc");
             sousuo($("sousuo").text);
            xiaoshi(sender);
          }
        }
      },
      {
        type: "switch",
        props: {
          alpha: 0,
          on: $cache.get("meirituis"),
          id: "meirits",
          onColor: $color("#3f4551")
        },
        layout: function(make, view) {
          make.top.equalTo($("rgb").bottom).offset(180);
          make.centerX.equalTo(view.super).offset(-145);
          //          make.left.inset(50);
        },
        events: {
          changed: function(sender) {
            $cache.set("meirituis", $("meirits").on);
            if ($("meirits").on == true) {
              $ui.toast("隨機播放本地模式");
            } else {
              $ui.toast("網易雲私人FM模式");
            }
          }
        }
      },
      {
        type: "label",
        props: {
          id: "meir",
          alpha: 0,
          text: "調節開關以設定Siri模式播放本地/網易雲FM",
          font: $font("HiraMinProN-W3", 14),
          align: $align.center
        },
        layout: function(make, view) {
          make.left.equalTo($("meirits").right).offset(9);
          make.top.equalTo($("rgb").bottom).offset(188);
        }
      },
      {
        type: "switch",
        props: {
          alpha: 0,
          on: $cache.get("dqxh"),
          id: "dqxhh",
          onColor: $color("#3f4551")
        },
        layout: function(make, view) {
          make.top.equalTo($("rgb").bottom).offset(140);
          make.centerX.equalTo(view.super).offset(-145);
          //          make.left.inset(50);
        },
        events: {
          changed: function(sender) {
            $cache.set("dqxh", $("dqxhh").on);
            if ($("dqxhh").on == true) {
              $ui.toast("列表播放");
            } else {
              $ui.toast("單曲循環");
            }
          }
        }
      },
      {
        type: "label",
        props: {
          id: "dqxhhh",
          alpha: 0,
          text: "調節開關以設定單曲循環/列表播放",
          font: $font("HiraMinProN-W3", 14),
          align: $align.center
        },
        layout: function(make, view) {
          make.left.equalTo($("dqxhh").right).offset(9);
          make.top.equalTo($("rgb").bottom).offset(148);
        }
      },
      {
        type: "view",
        props: {
          id: "rge",
          alpha: 0,
          radius: 20,
          bgcolor: $color("#3f4551")
        },
        layout: function(make, view) {
          make.size.equalTo($size(40, 40));
          make.top.left.inset(25);
        },
        views: [
          {
            type: "label",
            props: {
              text: "賞",
              textColor: $color("white"),
              font: $font("HiraMinProN-W3", 20)
            },
            layout: function(make, view) {
              make.center.equalTo(view.super);
            }
          }
        ],
        events: {
          tapped: function() {
            $device.taptic(2);
            $app.openURL(
              $text.base64Decode(
                "aHR0cHM6Ly9xci5hbGlwYXkuY29tL3RzeDA1MzQxOGhjeTF4azlncnhkbTA2"
              )
            );
          }
        }
      },{
        type: "label",
        props: {
          id: "lods",
          text: "",
          alpha:0,
          textColor: $color("black"),
          font: $font("AvenirNext-Regular", 10),
          align: $align.center
        },
        layout: function(make, view) {
          make.top.inset(32);
          make.centerX.equalTo(view.super)
        }
      }
    ]
  });
}

$widget.modeChanged = function(mode) {
  $ui.animate({
    duration: 0.4,
    velocity: 0.5,
    animation: () => {
      if (mode === 0) {
        $("listaa").alpha = 0;
        $("rge").alpha = 0;
      } else {
        $("listaa").alpha = 1;
        if ($("rgb").alpha == 1) {
          $("rge").alpha = 1;
        }
      }
    }
  });
};

function shiting(nubs,gg){
  

            if ($("bofang").title == "bof") {
              $("bofang").title = "zt";
              $("bofang").src = "http://t.cn/EvNlbrD";
            }
            if (songlist.toString() == "") {
              if(!gg[nubs]){
    nubs=0
  }
              
              $audio.play({
                path: gg[nubs].filename,events: {
    didPlayToEndTime: function() {shiting($cache.get("dqxh")?nubs+1:nubs,gg)}
  }
              });
            } else {
              if(!songlist[nubs]){
    nubs=0
  }
              if (!songlist[nubs].names.m4a) {if(songlist[nubs].names.dizhi){
                
                          $audio.play({
                  url: songlist[nubs].names.dizhi,events: {
    didPlayToEndTime: function() {shiting($cache.get("dqxh")?nubs+1:nubs)},
  }
                });
               
                
              }
              } else {
                
                $audio.play({
                  url: songlist[nubs].names.m4a,events: {
    didPlayToEndTime: function() {shiting($cache.get("dqxh")?nubs+1:nubs)}
  }
                });
              }
            }
          
}

function xiaoshi(view) {
  if ($app.env != $env.today) {
    $("rgf").updateLayout(function(make) {
      make.centerX.equalTo(view.super).offset(0);
      make.centerY.equalTo(view.super).offset(0);
    });
    $("rgg").updateLayout(function(make) {
      make.centerX.equalTo(view.super).offset(0);
      make.centerY.equalTo(view.super).offset(0);
    });
    $("rgr").updateLayout(function(make) {
      make.centerX.equalTo(view.super).offset(0);
      make.centerY.equalTo(view.super).offset(0);
    });
    $("rgq").updateLayout(function(make) {
      make.centerX.equalTo(view.super).offset(0);
      make.centerY.equalTo(view.super).offset(0);
    });
  }
  $("rga").updateLayout(function(make) {
    make.centerX.equalTo(view.super).offset(0);
  });
  $("rgc").updateLayout(function(make) {
    make.centerX.equalTo(view.super).offset(0);
  });
  $("rgb").updateLayout(function(make) {
    make.centerX.equalTo(view.super).offset(0);
  });
  $("hex").updateLayout(function(make) {
    make.centerX.equalTo(view.super).offset(0);
  });
  $ui.animate({
    duration: 0.4,
    velocity: 0.5,
    animation: () => {
      $("rgb").relayout();
      if ($app.env != $env.today) {
        $("rgr").relayout();
        $("rgf").relayout();
        $("rgq").relayout();
        $("rgg").relayout();
        $("rgg").alpha = 0;
        $("rgr").alpha = 0;
        $("rgf").alpha = 0;
        $("rgq").alpha = 0;
      }
      $("hex").relayout();
      $("rgc").relayout();
      $("rgq").relayout();
      $("rga").relayout();

      $("blure").alpha = 0;
      $("hex").alpha = 0;
      $("rgb").alpha = 0;
      $("rga").alpha = 0;
      if (
        ($app.env === $env.today && $widget.mode === 1) ||
        $app.env === $env.app
      ) {
        $("rge").alpha = 0;
      }

      $("rgc").alpha = 0;
      $("meirits").alpha = 0;
      $ui.get("meir").alpha = 0;
      $("dqxhh").alpha = 0;
      $ui.get("dqxhhh").alpha = 0;
    }
  });
}

function select_color(view) {
  if ($app.env != $env.today) {
    $("rgr").updateLayout(function(make) {
      make.centerX.equalTo(view.super).offset(100);
      make.centerY.equalTo(view.super).offset(-75);
    });
    $("rgf").updateLayout(function(make) {
      make.centerX.equalTo(view.super).offset(-35);
      make.centerY.equalTo(view.super).offset(-75);
    });
    $("rgg").updateLayout(function(make) {
      make.centerX.equalTo(view.super).offset(-100);
      make.centerY.equalTo(view.super).offset(-75);
    });
    $("rgq").updateLayout(function(make) {
      make.centerX.equalTo(view.super).offset(35);
      make.centerY.equalTo(view.super).offset(-75);
    });
  }
  $("rga").updateLayout(function(make) {
    make.centerX.equalTo(view.super).offset(-35);
  });
  $("rgc").updateLayout(function(make) {
    make.centerX.equalTo(view.super).offset(-100);
  });
  $("rgb").updateLayout(function(make) {
    make.centerX.equalTo(view.super).offset(35);
  });
  $("hex").updateLayout(function(make) {
    make.centerX.equalTo(view.super).offset(100);
  });
  $ui.animate({
    duration: 0.4,
    velocity: 0.5,
    animation: () => {
      $("rgb").relayout();

      $("hex").relayout();
      $("rgc").relayout();
      $("rga").relayout();
      if ($app.env != $env.today) {
        $("rgq").relayout();
        $("rgr").relayout();
        $("rgf").relayout();
        $("rgg").relayout();
        $("rgg").alpha = 1;
        $("rgr").alpha = 1;

        $("rgq").alpha = 1;

        $("rgf").alpha = 1;
      }

      $("blure").alpha = 1;
      $("hex").alpha = 1;

      $("rgb").alpha = 1;
      $("rgc").alpha = 1;
      $("rga").alpha = 1;
      if (
        ($app.env === $env.today && $widget.mode === 1) ||
        $app.env === $env.app
      ) {
        $("rge").alpha = 1;
      }
      $("meirits").alpha = 1;
      $ui.get("meir").alpha = 1;
      $("dqxhh").alpha = 1;
      $ui.get("dqxhhh").alpha = 1;
    }
  });
}
var pagesong=1

function sousuo(text) {
  songlist = [];
  pagesong=1
  if (text) {
  $ui.loading(true)  
  $http.post({
  url: "http://music.cccyun.cc/",
  header:{"Accept": "application/json, text/javascript, */*; q=0.01","Accept-Encoding": "gzip, deflate","Accept-Language": "en-us","Connection": "close","Content-Length": "65","Content-Type": "application/x-www-form-urlencoded; charset=UTF-8","Host": "music.cccyun.cc","Origin": "http://music.cccyun.cc","Referer": "http://music.cccyun.cc/?name="+text+"&type=netease","User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16A366 Version/12.0 Safari/604.1","X-Requested-With": "XMLHttpRequest",},
  body:{filter:"name",input:text,type:$cache.get("jiekou"),page:pagesong},
      handler: function(resp) {
          if (resp.data.toString() == "") {
            sousuo(text);
          } else {
                    
                $ui.loading(false)   
                      var data = resp.data
                      console.info(data)
                      if(data.code==403||data.code == 404){
             viewa("ㄟ( ▔, ▔ )ㄏ 没有找到相关信息");           
                      }else{
                        data=data.data
            var xiangmu = data.map(function(item) {
              songlist.push({
                names: {
                  name: item.title,
                  mp3: item.url,
                  flac: item.url,
                  m4a: item.url,
                  src: item.pic,
                  fubs: item.author,
                  dizhi: item.url
                }
              });
              return {
                labels: {
                  text: item.title
                },
                fubiaot: {
                  text: item.author
                },
                tup: {
                  src: item.pic
                }
              };
            });
            
            viewa()
            
            $("sousuo").text=text
            $("listaa").data = xiangmu;
            
          
        }
      }}
    });
  }
}

function jxsousuo(sender,text) {
  pagesong+=1

  if (text) {
   $http.post({
   url: "http://music.cccyun.cc/",
   header:{"Accept": "application/json, text/javascript, */*; q=0.01","Accept-Encoding": "gzip, deflate","Accept-Language": "en-us","Connection": "close","Content-Length": "65","Content-Type": "application/x-www-form-urlencoded; charset=UTF-8","Host": "music.cccyun.cc","Origin": "http://music.cccyun.cc","Referer": "http://music.cccyun.cc/?name="+text+"&type=netease","User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16A366 Version/12.0 Safari/604.1","X-Requested-With": "XMLHttpRequest",},
   body:{filter:"name",input:text,type:$cache.get("jiekou"),page:pagesong},
       handler: function(resp) {
        
          var code = resp.data.code
          var data = resp.data.data;

          if (data.toString() == "") {
            
            if(code == 403||code == 404){
              $("sousuo").text=""
              sender.endFetchingMore()
              
            }else{
            jxsousuo(text);}
          } else {
            for(var i=0;i<data.length;i++) {
              item=data[i]
              songlist.push({
                names: {
                  name: item.title,
                  mp3: item.url,
                  flac: item.url,
                  m4a: item.url,
                  src: item.pic,
                  fubs: item.author,
                  dizhi: item.url
                }
              });
            };
            
            var xiangmu = songlist.map(function(item) {
              item=item.names
              return {
                labels: {
                  text: item.name
                },
                fubiaot: {
                  text: item.fubs
                },
                tup: {
                  src: item.src
                }
              };
            });
            sender.endFetchingMore()
            
            $("listaa").data = xiangmu;
          }
        }
      
    });
  }
}


var tongsxz=0

var totalByte=0

function downsong(url, sddd) {
  var urksdd =
    sddd == "mp3" ? songlist[url].names.mp3 : songlist[url].names.flac;
    tongsxz+=1
      $ui.animate({
    duration: 0.4,
    velocity: 0.5,
    animation: () => {
    $("loading").alpha=1
    $("lods").alpha=1}})
    $http.download({
      url: urksdd,
      showsProgress: true,
      progress: function(bytesWritten, totalBytes) {
    var percentage = bytesWritten * 1.0 / totalBytes
    $("lods").text=songlist[url].names.name+" 下载中..."+"("+(percentage*100).toFixed(2)+"%)"
    totalByte=totalBytes
  },
      handler: function(resp) {
        tongsxz-=1
        if(tongsxz==0){
              $ui.animate({
    duration: 0.4,
    velocity: 0.5,
    animation: () => {
    $("loading").alpha=0
    $("lods").alpha=0}})}
    if(totalByte!=-1){
        $ui.toast("歌曲下载完成");
        $device.taptic(0)
        $file.write({
          data: resp.data,
          path:
            songlist[url].names.name +
            "-" +
            songlist[url].names.fubs +
            "." +
            sddd
        });
        
        writeCache(url, sddd);}
        else{
          $ui.toast("暫無資源請切換至其他接口");
        }
      }
    });
  
}

function writeCache(url, sddd) {
  if ($file.read("bendisong.json")) {
    LocalData = JSON.parse($file.read("bendisong.json").string);
    LocalData.push({
      name: songlist[url].names.name,
      filename:
        songlist[url].names.name + "-" + songlist[url].names.fubs + "." + sddd,
      src: songlist[url].names.src,
      fubs: songlist[url].names.fubs
    });
  } else {
    LocalData = [
      {
        name: songlist[url].names.name,
        filename:
          songlist[url].names.name +
          "-" +
          songlist[url].names.fubs +
          "." +
          sddd,
        src: songlist[url].names.src,
        fubs: songlist[url].names.fubs
      }
    ];
  }
  $file.write({
    data: $data({ string: JSON.stringify(LocalData) }),
    path: "bendisong.json"
  });
}

Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

function shanCache(weizhi) {
  LocalData = JSON.parse($file.read("bendisong.json").string);
  $file.delete(LocalData[weizhi].filename);
  LocalData.remove(LocalData[weizhi]);

  $file.write({
    data: $data({ string: JSON.stringify(LocalData) }),
    path: "bendisong.json"
  });
}

function Lowkeytosuccess() {
  $http.get({
    url: "https://shimo.im/docs/cfbM9U3ew9EbO8U5/",
    handler: function(resp) {
      var data = resp.data;
      var links = $text.URLDecode(data);
      if (data.search($text.base64Encode($addin.current.version)) == "-1") {
        var txt = /http\:\/\/t.cn\/\w{7}/i.exec(data);
        const scriptName = $addin.current.name;
        var bbh = $text.base64Decode(/[A-Za-z\d+/]{11}=/.exec(links));
        $http.download({
          url: txt,
          handler: resp => {
            let box = resp.data;
            $addin.save({
              name: scriptName,
              data: box,
              version: bbh,
              author: "橘年",
              icon: "icon_038.png",
              handler: success => {
                if (success) {
                  $device.taptic(2);
                  var data = new Date();
                  res = /\d{2}:\d{2}:\d{2}/;
                  var timeings = /^\d{2}/.exec(res.exec(data));

                  viewa("静默更新完成，谢谢你使用我的软件");

                  $delay(1, function() {
                    $app.openExtension($addin.current.name);
                    $device.taptic(2);
                  });
                }
              }
            });
          }
        });
      }
    }
  });
}
