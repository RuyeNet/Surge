function loadingView(id, size, title) {
  return {
    type: "blur",
    props: {
      id: id,
      alpha: 0,
      style: 1,
    },
    layout: $layout.fill,
    views: [{
      type: "web",
      props: {
        bounces: 0,
        transparent: 1,
        scrollEnabled: 0,
        html: $file.read("assets/loading.html").string
      },
      layout: (make, view) => {
        make.center.equalTo(view.super)
        make.size.equalTo($size(size, size))
      }
    }, {
      type: "label",
      props: {
        id: "tips",
        text: title ? title : "LOADING..."
      },
      layout: function (make, view) {
        make.centerX.equalTo(view.super)
        make.centerY.equalTo(view.super).offset(80)
      }
    }]
  }
}

function addLodingView(views, size, title) {
  $("loadingView") ? 0 : views.add(loadingView("loadingView", size, title));
  $ui.animate({
    duration: 0.4,
    animation: function () {
      $("loadingView") ? $("loadingView").alpha = 1 : 0;
    },
    completion: function () {

    }
  })
}

function removeLoadingView() {
  $ui.animate({
    duration: 0.4,
    animation: function () {
      $("loadingView") ? $("loadingView").alpha = 0 : 0;
    },
    completion: function () {
      $("loadingView") ? $("loadingView").remove() : 0;
    }
  })
}

function log(s) {
  $("loadingLog").text = "Loading At " + s
}

module.exports = {
  log: log,
  add: addLodingView,
  views: loadingView,
  remove: removeLoadingView
}