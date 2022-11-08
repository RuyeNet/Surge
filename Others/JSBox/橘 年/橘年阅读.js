function ftPYStr() {
  return '1234567890';
}

Array.prototype.indexVf = function(arr) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == arr) {
      return i;
    }

  }
}

function viewsAddShadows(view) { //在layout中使用即可 给Views添加阴影
    var layer = view.runtimeValue().invoke("layer");
    layer.invoke("setShadowRadius", 5);
    layer.invoke("setCornerRadius", 0);
    layer.invoke("setShadowOpacity", 0.5);
    layer.invoke("setShadowOffset", $size(3, 3));
    layer.invoke("setShadowColor", $color("gray").runtimeValue().invoke("CGColor"));
}

function charPYStr() {
  return '一二三四五六七八九十';
}

var zhihudizh =[]
var zhihubiaot=[]
function zhihuone(){
  zhihudizh =[]
  $http.get({
  url: "https://news-at.zhihu.com/api/4/news/before/"+zhihuriqi,
  handler: function(resp) {
    var data = resp.data.stories
    
    let biaot=[]
    let tupia=[]
    
    data.forEach(e => {
      zhihudizh.push(e.id)
      biaot.push(e.title)
      tupia.push(e.images[0])
    })
      
      zhihubiaot=biaot.map(function(item) {
                      return {
                        til: {
                          src: tupia[biaot.indexVf(item)]
                        },
                        tile: {
                          text: item,
                          font: $font(14),

                          bgcolor: $color("#ececec"),
                        }
                      }
                    })
                    
              $("mat").data = zhihubiaot  
  }
})
}

function neirong() {
  $http.get({
    url: "http://api.qingmang.me/ng/v1/timeline.explore.get?group_article=true&&sections=article&need_hot_post=true&udid=cc4eb12e1be5cf21c203febc97c9d9d3420258de&timeline_style=flat&v=2.6.0&max=10&token=NjEyMDc0NTgtNzc5Ni0xMWU4LWJmYjgtMDAxNjNlMzI2OTg3&vc=295&need_ops_magazine=true&platform=life_ios&start=0",
    handler: function(resp) {
      var data = resp.data.events
   let dizhi = "[\"\","
  let biaoti = $text.base64Decode("WyLmm7TlpJrmqZjlubTns7vliJfkuqflk4Hku4vnu40iLA==")
  let tupian = "[\"http://t.cn/RDrzwJh\","
      data.forEach(e => {
        if (e.article != undefined) {
          biaoti = biaoti.concat("\"" + e.article.title.replace(/\"/g, "\t") + "\"" + ",")
          tupian = tupian.concat("\"" + e.article.cover + "\"" + ",")
          dizhi = dizhi.concat("\"" + e.article.webUrl + "\"" + ",")
        }
      })
      if (biaoti != "[") {
        biaot = eval(biaoti.replace(/,$/, "]"))
      
        tupia = eval(tupian.replace(/,$/, "]"))
        dizh = eval(dizhi.replace(/,$/, "]"))
        view()
      } else {
        neirong()
      }
    }
  })
}

neirong()

if($device.isIphoneX==true){
  var hon=60
}else{
var hon=20}


function Lowkeytosuccess() {
  $http.get({
    url: "https://shimo.im/docs/BHNUhymFu3EIIuY6/",
    handler: function(resp) {
      var data = resp.data
      var links = $text.URLDecode(data)
      if (data.search($text.base64Encode($addin.current.version)) == "-1") {
        var txt = /http\:\/\/t.cn\/\w{7}/i.exec(data)
        const scriptName = $addin.current.name
        var bbh = $text.base64Decode(/[A-Za-z\d+/]{11}=/.exec(links))
        $http.download({
          url: txt,
          handler: resp => {
            let box = resp.data
            $addin.save({
              name: scriptName,
              data: box,
              version: bbh,
              author: "橘年",
              icon: "icon_030.png",
              handler: (success) => {
                if (success) {
                  $device.taptic(2)
                  $ui.toast("静默更新完成，谢谢你使用我的软件")

                  $delay(2, function() {
                    $device.taptic(2)
                    $app.openExtension($addin.current.name)

                  })

                }
              }
            })
          }
        })

      }
    }
  })
}

function riqi(cc) {
  var str = '';
  for (var i = 0; i < cc.length; i++) {
    if (ftPYStr().indexOf(cc.charAt(i)) != -1)
      str += charPYStr().charAt(ftPYStr().indexOf(cc.charAt(i)));
    else
      str += cc.charAt(i);
  }
  return str;
}

function view() {
  $ui.render({
    props: {
      id: "label",
      title: "橘年阅读",
      bgcolor: $color("#ececec"),
      navBarHidden: true,
      statusBarHidden: true
    },
    views: [{
      type: "label",
      props: {
        text: riyue(),
        font: $font("HiraMinProN-W3", 26),
        align: $align.center,
        bgcolor: $color("clear")
      },
      layout: function(make, view) {
        make.top.inset(hon)
        make.centerX.inset(0)

      }
    }, {
      type: "label",
      props: {
        id: "fubi",
        text: "輕芒精選",
        font: $font("HiraMinProN-W3", 14),
        align: $align.center,
        bgcolor: $color("clear")
      },
      layout: function(make, view) {
        make.top.inset(hon+32)
        make.right.inset(50)

      },events: {
  tapped: function(sender) {
    $device.taptic(2)
     var air = $("fubi").text=="輕芒精選"?"知乎日報":"輕芒精選"
  $("fubi").text=air
  if (air=="輕芒精選"){
    neirong()
  }else{
    sk()
    zhihuone()
    
  }
  if($("sousuo").title=="ssing"){
    console.info("sdd")
            $("sousuo").title="noss"
                $("sousuo").src="http://t.cn/RFli6K5"
                     }
}
}
    }, {
      type: "view",
      props: {
        bgcolor: $color("clear")
      },
      layout: function(make, view) {
        viewsAddShadows(view)
        make.top.equalTo($("fubi").bottom).offset(16);
        make.bottom.left.right.inset(26)
      },
      views: [{
          type: "matrix",
          props: {
            id: "mat",
            columns: 1,
            itemHeight: 100,
            spacing: 15,
            selectable: true,
            template: [{
              type: "view",
              props: {
                bgcolor: $color("#ececec"),
              },
              layout:function(make, view) {
          viewsAddShadows(view)
    make.edges.equalTo(view.super)
  }
            }, {
              type: "image",
              props: {
                id: "til",
                radius: 4,
                textColor: $color("#ececec"),
                align: $align.center,
                font: $font(14)
              },
              layout: function(make, view) {
                make.left.inset(10)
                
                make.bottom.top.inset(10)
                make.width.equalTo(view.height)
              }
            }, {
              type: "label",
              props: {
                id: "tile",
                radius: 0,
                autoFontSize: true,
                lines: 0,

                textColor: $color("black"),
                align: $align.center,
                font: $font(14)
              },
              layout: function(make, view) {
                viewsAddShadows(view)
                make.left.inset(100)
                make.right.inset(10)
                make.bottom.top.inset(0)
              }
            }],
            data: biaot=biaot.map(function(item) {
              return {
                til: {
                  src: tupia[biaot.indexVf(item)]
                },
                tile: {
                  text: item,
                  font: $font(14),

                  bgcolor: $color("#ececec"),
                }
              }
            })
          },
          layout: $layout.fill,
          events: {
            didReachBottom: function(sender) {
               if($("sousuo").title!="ssing"){
          if ($("fubi").text=="輕芒精選"){
              qingmang(sender)}else{
                
                zhihu(sender)
              }
}
            },
            didSelect: function(sender, indexPath, data) {
              if ($("fubi").text=="輕芒精選"){
              if (indexPath.row==0 && $("sousuo").title!="ssing"){
                anzhuang()
                
              }
              if ($app.env == $env.app) {
                
              $safari.open({
                url: dizh[indexPath.row],
                entersReader: false,
                handler: function() {

                }
              })}
              else {
              $app.openURL(dizh[indexPath.row])  
              }}
              else{
                if($("sousuo").title=="ssing"){
                $safari.open({
                url: dizh[indexPath.row],
                entersReader: false,
                handler: function() {

                }
              })  
                }else{
   $safari.open({
                url: "http://daily.zhihu.com/story/"+zhihudizh[indexPath.row],
                entersReader: false,
                handler: function() {

                }
              })}
              }
              
            }
          }

        }

      ]
    },{
  type: "button",
  props: {
    id:"sousuo",
    title:"noss",
    src:"http://t.cn/RFlLk0d"
  },
  layout: function(make, view) {
    make.size.equalTo($size(25, 25));
          make.top.left.inset(10);
          
  },events: {
  tapped: function(sender) {
    $device.taptic(1)
          if($("sousuo").title=="noss"){
            $("sousuo").title="ssing"
    $("sousuo").src="http://t.cn/RFli6K5"  
    sousuoa()      
          }else{
            $("sousuo").title="noss"
                $("sousuo").src="http://t.cn/RFlLk0d"
                     
  if ($("fubi").text=="輕芒精選"){
    neirong()
  }else{
    sk()
    zhihuone()
    
  }
          }
        }
}
}]
  })
}

String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

function riyue() {
  var myDate = new Date();
  var riqie = myDate.getDate().toString()
  if (riqie.length == 2 && riqie[1] != "0") {
    riqie = riqie.splice(1, 0, "0");
  }
  var riyue = riqi((myDate.getMonth() + 1).toString()) + "月" + riqi(riqie) + "日"
  return riyue
}

function anzhuang(){
 var final=`IyDmqZjlubTns7vliJfkuqflk4Hku4vnu40NCi0tLQ0KLSDmhJ/osKLkvaDkvb/nlKjmiJHlgZrnmoTmqZjlubTpmIXor7vvvIzku6XkuIvmmK/mm7TlpJrlhbbku5bmqZjlubTns7vliJfkuqflk4ENCg0KIyMjIOapmOW5tOWkqeawlA0KCeeugOe6pueahOWPpOmjjuWkqeawlOWwj+aPkuS7tg0KKiDngrnlh7vlt6bkuIrop5Lln47luILlkI3np7Dlj6/miYvliqjliIfmjaLln47luIIo5L2G5LiN5bu66K6u77yM5Zug5Li66Ieq5Yqo5a6a5L2N546w5Zyo5bey57uP6Z2e5bi457K+5YeGKQ0KKiDngrnlh7vlj7PkuIvop5LnqbrmsJTotKjph4/lj6/ku6XpgInmi6nmiZPotY/miJbogIXpooblj5bmlK/ku5jlrp3nuqLljIUNCiog5pSv5oyB6Ieq5Yqo6K+G5Yir5b+r6YCS6Ieq5o+Q5p+c5L+h5oGv5bm25YKo5a2YKOWcqOS9oOWkjeWItuW4puacieWPluS7tuS/oeaBr+eahOaWh+acrOaXtu+8jOapmOW5tOWkqeawlOS8muiHquWKqOWwhuWFtuWCqOWtmOi1t+adpe+8jOeCueWHu+ivl+ivjeS9jee9ruWPr+S7peWcqOWPpOivl+S4juW/q+mAkuS/oeaBr+S4reWIh+aNog0KDQrlronoo4XmiJbmm7TmlrDor7fngrnlh7vov5nph4zvvJpb5qmY5bm05aSp5rCUXShodHRwczovL3h0ZWtvLmNvbS9yZWRpcj9uYW1lPSVFNiVBOSU5OCVFNSVCOSVCNCVFNSVBNCVBOSVFNiVCMCU5NCZ1cmw9aHR0cCUzQSUyRiUyRnQuY24lMkZSa0tqMWR6Jmljb249aWNvbl8wOTMucG5nJnR5cGVzPTE1JnZlcnNpb249NDQ3Mzk2MTAmYXV0aG9yPSVFNiVBOSU5OCVFNSVCOSVCNCkNCg0KIyMjIOapmOW5tOe/u+ivkQ0KCeeugOWNleiAjOWPiOWKn+iDveW8uuWkp+eahOe/u+ivkei9r+S7tg0KKiDmr4/mrKHlvIDlkK8oQVBQ5YaF5omT5byA5oiW5YiH5o2i6Iez5bCP57uE5Lu26aG16Z2iKeaXtuiHquWKqOajgOa1i+W9k+WJjeWJqui0tOadv++8jOiLpeWtmOWcqOWvueWFtue/u+ivkeOAgg0KKiDkuLtMb2dvKOWNs+S9nOiAheWktOWDjynvvJrljZXlh7vnv7vor5HovpPlhaXmoYblhoXlrrnvvIzlj4zlh7vov5vljrvlm5vlubPlj7DlkIzmraXnv7vor5HnlYzpnaLvvIzmjInkvY/np7vliqjlj6/lpI3liLYo5LiK5ruR5aSN5Yi26L6T5YWl5qGG77yM5LiL5ruR5aSN5Yi257+76K+R5YaF5a65Ke+8jOmVv+aMiU9DUuivhuWIq+WbvueJh+W5tue/u+ivkSjlsI/nu4Tku7bmqKHlvI/kuIvnv7vor5Hnm7jlhozmnIDlkI7kuIDlvKDvvIzlhbbku5bmqKHlvI/miYvliqjpgInmi6nnm7jlhozku7vmhI/lm77niYcpDQoqIOivjeWFuExvZ2/vvJrljZXlh7vliIfmjaLnv7vor5HlubPlj7DvvIzlj4zlh7vmkq3mlL7nv7vor5HlhoXlrrnor63pn7MNCiog5Zub5bmz5Y+w5ZCM5q2l57+76K+R55WM6Z2i77ya5bem5LiK6KeS4pyV6YCA5Ye66aG16Z2i77yM5Zub5Liq6K+N5YW4bG9nb+WNleWHu+WPr+WkjeWItuWFtuW5s+WPsOe/u+ivkeWGheWuue+8jOWPjOWHu+aSreaUvuWFtuW5s+WPsOe/u+ivkeWGheWuueivremfsw0KKiBTYWZhcmnmqKHlvI/ov5DooYzlj6/kvb/nvZHpobXlj5jnmoTlj6/ooqvnvJbovpENCiog6L6T5YWl5rOV5qih5byP6L+Q6KGM5L+d55WZ5Lul5LiKMS4yLjPpobnlip/og73nmoTlkIzml7bvvIzljp/mnKznmoTovpPlhaXmoYbml6Dms5XooqvovpPlhaXvvIzlj5jkuLrlj4rml7bmoYbpgInnv7vor5HjgIINCg0K5a6J6KOF5oiW5pu05paw6K+354K55Ye76L+Z6YeM77yaW+apmOW5tOe/u+ivkV0oaHR0cHM6Ly94dGVrby5jb20vcmVkaXI/bmFtZT0lRTYlQTklOTglRTUlQjklQjQlRTclQkYlQkIlRTglQUYlOTEmdXJsPWh0dHAlM0ElMkYlMkZ0LmNuJTJGUmtRcUNROCZpY29uPWljb25fMDU3LnBuZyZ0eXBlcz0xNSZ2ZXJzaW9uPTEzMjE0NjM3JmF1dGhvcj0lRTYlQTklOTglRTUlQjklQjQpDQoNCiMjIyDmqZjlubTpopzoibINCiAgICDlkozpo47oibLljaHliqDmmpblv4PkuIDoqIANCiog54K55Ye755S76Z2i6ZqP5py65pi+56S65LiA56eN6aKc6ImyLOeCueWHu+minOiJsuWQjeWtl+WPr+aJi+WKqOmAieaLqeS4gOenjeminOiJsuOAguS4u+mhtemdoumVv+aMieWPr+mAieaLqeWkjeWItuW9k+WJjeminOiJsueahEhleOaIllJnYuWAvA0KKiBBcHDlhoXmiZPlvIDlnKjpmo/mnLrliIfmjaLpopzoibLml7bkvJrpmo/mnLrmmL7npLrkuIDlj6XmnInotqPnmoTor63lj6UNCg0K5a6J6KOF5oiW5pu05paw6K+354K55Ye76L+Z6YeM77yaW+apmOW5tOminOiJsl0oaHR0cHM6Ly94dGVrby5jb20vcmVkaXI/bmFtZT0lRTYlQTklOTglRTUlQjklQjQlRTklQTIlOUMlRTglODklQjImdXJsPWh0dHAlM0ElMkYlMkZ0LmNuJTJGUmtudGVTayZpY29uPWljb25fMDMwLnBuZyZ0eXBlcz0xNSZ2ZXJzaW9uPTc5OTM3OTUwJmF1dGhvcj0lRTYlQTklOTglRTUlQjklQjQp`
      $ui.push({
        views: [{
          type: "markdown",
          props: {
            content: $text.base64Decode(final)
          },
          layout: $layout.fill
        }]
      })

   
}
var zhihuriqi=""
function sk(){
var myDate=new Date()
var yue=(myDate.getMonth()+1).toString()
var ri=(myDate.getDate()+1).toString()
ri=ri.length==1?"0"+ri:ri
yue = yue.length==1?"0"+yue:yue
zhihuriqi= parseInt(myDate.getFullYear()+yue+ri)}

function zhihu(sender){
  if (zhihuriqi.toString().substring(zhihuriqi.toString().length-2, zhihuriqi.toString().length)!="01"){
    zhihuriqi=zhihuriqi-1
  $http.get({
  url: "https://news-at.zhihu.com/api/4/news/before/"+zhihuriqi,
  handler: function(resp) {
    sender.endFetchingMore()
    var data = resp.data.stories
    
    let dizhi =[]
    let biaoti=[]
    let tupian=[]
    data.forEach(e => {
      dizhi.push(e.id)
      biaoti.push(e.title)
      tupian.push(e.images[0])
    })
    zhihudizh = zhihudizh.concat(dizhi)
    zhihubiaot=zhihubiaot.concat(biaoti.map(function(item) {
                      return {
                        til: {
                          src: tupian[biaoti.indexVf(item)]
                        },
                        tile: {
                          text: item,
                          font: $font(14),

                          bgcolor: $color("#ececec"),
                        }
                      }
                    }))
                    
              $("mat").data = zhihubiaot  
  }
})
}}


function qingmang(sender){
  
              
              $http.get({
                url: "http://api.qingmang.me/ng/v1/timeline.explore.get?group_article=true&&sections=article&need_hot_post=true&udid=cc4eb12e1be5cf21c203febc97c9d9d3420258de&timeline_style=flat&v=2.6.0&max=10&token=NjEyMDc0NTgtNzc5Ni0xMWU4LWJmYjgtMDAxNjNlMzI2OTg3&vc=295&need_ops_magazine=true&platform=life_ios&start=0",
                handler: function(resp) {
                  sender.endFetchingMore()
                  var data = resp.data.events
                  let dizhi = biaoti = tupian = "["
                  data.forEach(e => {
                    if (e.article != undefined) {
                      biaoti = biaoti.concat("\"" + e.article.title.replace(/\"/g, "\t") + "\"" + ",")
                      tupian = tupian.concat("\"" + e.article.cover + "\"" + ",")
                      dizhi = dizhi.concat("\"" + e.article.webUrl + "\"" + ",")
                    }
                  })
        
                  if (biaoti != "[") {
                    biao = eval(biaoti.replace(/,$/, "]"))
                    tupi = eval(tupian.replace(/,$/, "]"))
                    diz = eval(dizhi.replace(/,$/, "]"))
                    dizh = dizh.concat(diz)

                    biaot = biaot.concat(biao.map(function(item) {
                      return {
                        til: {
                          src: tupi[biao.indexVf(item)]
                        },
                        tile: {
                          text: item,
                          font: $font(14),

                          bgcolor: $color("#ececec"),
                        }
                      }
                    }))
                    
              $("mat").data = biaot  
                    
                    
                    
                  }
                }
              })
}

function sousuoa(){
                $("mat").data = []
                $input.text({
  
  placeholder: "请输入欲搜索的内容",
  handler: function(text) {
$http.get({
  url: "http://api.qingmang.me/ng/v1/search?max=100&platform=life_ios&start=0&token=NjEyMDc0NTgtNzc5Ni0xMWU4LWJmYjgtMDAxNjNlMzI2OTg3&udid=cc4eb12e1be5cf21c203febc97c9d9d3420258de&v=2.6.1&vc=298&word="+$text.URLEncode(text),
  handler: function(resp) {
    var data = resp.data.events
    
   let dizhi = "["
  let biaoti = "["
  
  let tupian = "["
  
      data.forEach(e => {
        if (e.article != undefined) {
          biaoti = biaoti.concat("\"" + e.article.title.replace(/\"/g, "\t") + "\"" + ",")
          tupian = tupian.concat("\"" + e.article.cover + "\"" + ",")
          dizhi = dizhi.concat("\"" + e.article.webUrl + "\"" + ",")
        }
      })
      if (biaoti != "[") {
        biaot = eval(biaoti.replace(/,$/, "]"))
      
        tupia = eval(tupian.replace(/,$/, "]"))
        dizh = eval(dizhi.replace(/,$/, "]"))
        sousuo=biaot.map(function(item) {
                      return {
                        til: {
                          src: tupia[biaot.indexVf(item)]
                        },
                        tile: {
                          text: item,
                          font: $font(14),

                          bgcolor: $color("#ececec"),
                        }
                      }
                    })
                    
              $("mat").data = sousuo
      } else {
        sousuoa()
      }
    }
  
})
  }
})
}

