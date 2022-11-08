var _fetch = require("scripts/fetch")

String.prototype.suffix = function() {
  return this.split(".")[1]
}

function renderData() {
  var thumbs = [], data = [], start = 0
  var count = _fetch.result.invoke("count")
  for (var i = 0; i < count; i++) {
    let asset = _fetch.result.invoke("objectAtIndex", i)
    var date = $objc("NSDateFormatter").invoke("new")
    var handler = $block("void, UIImage *, NSDictionary *", function(result, info) {
      if (info.invoke("valueForKey", "PHImageResultIsDegradedKey")) {
        thumbs.push({
          img: {
            data: result.rawValue().jpg(0.0)
          },
          type: {
            text: asset.invoke("filename").rawValue().suffix()
          },
        })
        if (thumbs.length == count) {
          $("photos").data = thumbs
        }
      } else {
        var index = info.invoke("valueForKey", "PHImageResultRequestIDKey")
        var x = start === 0 ? 0 : index - start
        data[x] = {
          img: {
            data: result.rawValue().jpg(0.0)
          },
          type: {
            text: asset.invoke("filename").rawValue().suffix()
          },
          selected: {
            hidden: true
          },
          asset: asset
        }
        if (data.length == count) {
          $("photos").data = data
        }
      }
    })
    var PHImageManager = $objc("PHImageManager").invoke("defaultManager")
    var idx = PHImageManager.invoke("requestImageForAsset:targetSize:contentMode:options:resultHandler:", asset, $size(200, 200), 0, null, handler)
    if (i === 0) start = idx
  }
}

module.exports = renderData