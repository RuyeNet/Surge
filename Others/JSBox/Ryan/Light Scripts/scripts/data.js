var _lan = require("scripts/localization")

function getConfig() {
  $ui.loading(true)
  $http.get({
    url: "https://raw.githubusercontent.com/ryanfwy/jsbox-online-scripts/master/config.json",
    handler: function(resp) {
      $ui.loading(false)
      var conf = resp.data
      var scripts = Object.keys(conf)

      var data = []
      for (var i = 0; i < scripts.length; i++) {
        var name = scripts[i]
        var script = conf[name]
        data.push({
          ICON: {
            icon: $icon(script["icon"], $color("lightGray"))
          },
          NAME: {
            text: name
          },
          SUMMARY: {
            text: script["description"][_lan.locale].match(/\n\n(.+?)\n\n/)[1]
          },
          TYPES: script["types"],
          AUTHOR: script["author"],
          PROFILE: script["profile"],
          DESCRIPTION: script["description"][_lan.locale]
        })
      }
      $("MAIN").info = data

      if ($app.env & 12) {
        category(4)
      } else {
        $("MAIN").data = data
      }

      $delay(0.1, function() {
        var inset = $ui.window.frame.height - $("MAIN").contentSize.height
        if (inset < -50) {
          $("MAIN").runtimeValue().invoke("setContentOffset:animated:", $point(0, 50), true)
        }
      })
    }
  })
}

function category(type) {
  var raw = $("MAIN").info
  var subData = []
  for (var i = 0; i < raw.length; i++) {
    if ((raw[i].TYPES & type) == type) {
      subData.push(raw[i])
    }
  }
  $("MAIN").data = subData
}

function search() {
  $input.text({
    placeholder: _lan.l10n("search_name"),
    handler: function(text) {
      if (!text) return
      
      var raw = $("MAIN").info
      var subData = []
      for (var i = 0; i < raw.length; i++) {
        var lowerText = text.toLowerCase()
        var lowerName = raw[i].NAME.text.toLowerCase()
        if (lowerName.indexOf(lowerText) != -1) {
          subData.push(raw[i])
        }
      }
      
      $("MENU").index = -1
      if (subData.length === 0) {
        $ui.error(_lan.l10n("error_search"))
        return
      }
      
      $("MAIN").data = subData
    }
  })
}

module.exports = {
  getConfig: getConfig,
  category: category,
  search: search
}