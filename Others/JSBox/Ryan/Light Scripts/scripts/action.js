var global = $props(this.JSBox)

String.prototype.script = function() {
  var text = this
  text = text.replace(/\$([a-z]+)\.([a-z]+)/g, function(s, $1, $2) {
    if (global.indexOf($1) != -1)
      return `JSBox.${$1}.${$2}`
    else
      return s
  })
  text = text.replace("JSBox.ui.render", "JSBox.ui.push")
  return text
}

function run(fileName) {
  $device.taptic(0)
  $ui.loading(true)
  $http.get({
    url: "https://raw.githubusercontent.com/ryanfwy/jsbox-online-scripts/master/" + encodeURIComponent(fileName) + ".js",
    handler: function(resp) {
      $ui.loading(false);
      (new Function(resp.data.script()))();
      //eval(resp.data.script());
    }
  })
}

function preview(fileName) {
  $ui.push({
    props: {
      title: fileName
    },
    views: [{
      type: "web",
      props: {
        id: "PREVIEW",
        style: "pre{white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;}"
      },
      layout: $layout.fill
    }]
  })
  
  $ui.loading(true)
  $http.get({
    url: "https://raw.githubusercontent.com/ryanfwy/jsbox-online-scripts/master/" + encodeURIComponent(fileName) + ".js",
    handler: function(resp) {
      $ui.loading(false)
      $("PREVIEW").html = `<html><meta name="viewport" content="user-scalable=no" /><link rel='stylesheet' href='http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github-gist.min.css'><style>*{margin:0;padding:0;}pre{font-size:18px;}</style><script src='http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js'></script><script>hljs.initHighlightingOnLoad();</script><body class='hljs'><pre><code class='hljs'>${resp.data}</code></pre></body></html>`
    }
  })
}

function description(content) {
  $ui.push({
    views: [{
      type: "markdown",
      props: {
        content: content
      },
      layout: $layout.fill
    }]
  })
}

module.exports = {
  run: run,
  preview: preview,
  description: description
}