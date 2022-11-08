/* 
App to RSS by Neurogram

 - 利用 RSSHub 服务生成 App 的更新 / 价格 / 内购价格 RSS 订阅链接
 - 支持 iOS、Mac App
 - 支持 Share Extension 和复制 App 链接到剪贴板后运行脚本 

RSSHub App Store/Mac App Store 介绍
https://docs.rsshub.app/program-update.html#app-store-mac-app-store
*/

const country = "cn" // 可替换为其他国家代码以切换到不同区域（eg：us）

var url = $context.safari ? $context.safari.items.location.href : $context.link || $context.text || $clipboard.text
url ? appUrlMatch() : alert("No app url")

function appUrlMatch() {
  let appUrl = url.match(/https:\/\/itunes.apple.com\S+/)
  appUrl ? app2rss(appUrl[0]) : alert("No app url")
}

async function app2rss(url) {
  let meta_type = url.match(/mt=\d+/)
  if (!meta_type) {
    let result = await $ui.menu({ items: ["iOS", "Mac"] })
    var mtype = result.title
  } else {
    var mtype = meta_type[0] == "mt=8" ? "iOS" : "mac"
  }

  let appId = url.match(/\/id\d+/)
  appId = appId[0].replace(/^\//, "")

  const rsslink = {
    "App Update": "https://rsshub.app/appstore/update/" + country + "/" + appId,
    "App Price": "https://rsshub.app/appstore/price/" + country + "/" + mtype + "/" + appId,
    "App iap": "https://rsshub.app/appstore/iap/" + country + "/" + appId,
  }

  $delay(0.1, async function () {
    let rssType = await $ui.menu({ items: ["App Update", "App Price", "App iap", "Price & iap"] })
    if (rssType.index == 3) {
      $clipboard.text = rsslink["App Price"] + "\n" + rsslink["App iap"]
    } else {
      $clipboard.text = rsslink[rssType.title]
    }
    $ui.alert({
      title: "RSS Link Copied",
      message: $clipboard.text,
    })
  })
}