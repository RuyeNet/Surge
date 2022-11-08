function viewsAddShadows(view) {
    var layer = view.runtimeValue().invoke("layer");
    layer.invoke("setShadowRadius", 5);
    layer.invoke("setCornerRadius", 10);
    layer.invoke("setShadowOpacity", 0.3);
    layer.invoke("setShadowOffset", $size(3, 3));
    layer.invoke("setShadowColor", $color("gray").runtimeValue().invoke("CGColor"));
}

function addViewWithAnimatiom(mviews, cviews, viewsid) {
    mviews.add(cviews)
    $ui.animate({
        duration: 0.4,
        animation: function () {
            viewsid ? viewsid.alpha = 1 : 0;
        }
    })
}

function removeViewWithAnimatiom(viewsid) {
    $ui.animate({
        duration: 0.4,
        animation: function () {
            viewsid ? viewsid.alpha = 0 : 0;
        },
        completion: function () {
            viewsid ? viewsid.remove() : 0;
        }
    })
}

function showViewsWithAnimatiom(viewsid) {
    $ui.animate({
        duration: 0.4,
        animation: function () {
            viewsid ? viewsid.alpha = 1 : 0;
        },
        completion: function () {

        }
    })
}

function hideViewsWithAnimatiom(viewsid) {
    $ui.animate({
        duration: 0.4,
        animation: function () {
            viewsid ? viewsid.alpha = 0 : 0;
        },
        completion: function () {

        }
    })
}

module.exports = {
    add: addViewWithAnimatiom,
    show: showViewsWithAnimatiom,
    hide: hideViewsWithAnimatiom,
    shadow: viewsAddShadows,
    remove: removeViewWithAnimatiom,
}