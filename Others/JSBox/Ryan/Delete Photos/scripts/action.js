function deleteAssets() {
  var data = $("photos").data
  var assets = []
  var idx = []
  for (var i = 0; i < data.length; i++) {
    if (data[i].selected.hidden === false) {
      assets.push(data[i].asset)
      idx.push(i)
    }
  }

  if (idx.length === 0) return

  if ($app.env == $env.today) {
    $ui.alert({
      title: $l10n("alert_title_warning"),
      message: $l10n("alert_message_dismiss"),
      actions: [{
          title: $l10n("alert_button_cancel"),
          style: "Cancel",
          handler: function() {}
        },
        {
          title: $l10n("alert_button_continue"),
          handler: function() {
            executeDelete(assets)
            $app.close()
          }
        }
      ]
    })
  } else {
    executeDelete(assets, true)
  }
}

function getOriginalPhoto(asset) {
  var handler = $block("void, NSData *", function(result) {
    $quicklook.open({
      type: "png",
      data: result.rawValue()
    })
  })
  var PHImageManager = $objc("PHImageManager").invoke("defaultManager")
  PHImageManager.invoke("requestImageDataForAsset:options:resultHandler:", asset, null, handler)
}

function executeDelete(assets, isHandler = false) {
  var handler
  if (isHandler) {
    handler = $block("void, BOOL, NSError *", function(success, error) {
      if (success) {
        $app.close(0.5)
      }
    })
  } else {
    handler = null
  }
  var deleteBlock = $block("void", function() {
    $objc("PHAssetChangeRequest").invoke("deleteAssets", assets)
  })
  var PHPhotoLibrary = $objc("PHPhotoLibrary").invoke("sharedPhotoLibrary")
  PHPhotoLibrary.invoke("performChanges:completionHandler:", deleteBlock, handler)
}

module.exports = {
  delete: deleteAssets,
  original: getOriginalPhoto
}