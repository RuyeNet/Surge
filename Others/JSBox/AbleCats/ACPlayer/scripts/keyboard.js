function hideBar(views) {
    if ($app.env == $env.keyboard) {
        $define({
            type: "JSBoxKeyVC",
            events: {
                viewDidLayoutSubviews: () => {
                    var view = self.$view();
                    var sourceView = self.$sourceRenderView();
                    view.$bringSubviewToFront(sourceView);
                    sourceView.$setFrame(view.$bounds());
                }
            }
        });
        if (!$device.isIphoneX) {
            $(views).add({
                type: "button",
                props: {
                    alpha: .7,
                    id: "nextIpnut",
                    bgcolor: $color("clear"),
                    icon: $icon("053", $color("lightGray"), $size(20, 20))
                },
                layout: (make) => {
                    make.left.inset(5);
                    make.bottom.inset(5);
                },
                events: {
                    ready: sender => {
                        if ($app.env == $env.keyboard) {
                            var button = sender.runtimeValue();
                            var target = $ui.vc.runtimeValue();
                            var selector = "handleInputModeListFromView:withEvent:";
                            var events = 0x00000FFF;
                            button.$addTarget_action_forControlEvents(target, selector, events);
                        }
                    }
                }
            })
        }
    }
}

module.exports = {
    hideBar: hideBar
}