function Topic(bannerpic, title, quote, list) {
  $ui.push({
    props: {
      title: title
    },
    views: [{
        type: "text",
        props: {
          id: "这是一个id",
          text: quote
        },
        layout: $layout.fill
      },
      {
        type: "list",
        props: {
          data: [{
              rows: [{
                type: "image",
                props: {
                  id: "image",
                  src: bannerpic
                },
                layout: function(make, view) {
                  make.top.left.right.inset(0)
                  make.height.equalTo(screen_width * 0.35)
                },
                events: {

                }
              }]
            },
            {
              rows: [{
                type: "text",
                props: {
                  text: quote,
                  editable: false
                },
                layout: $layout.fill
              }]
            }
          ].concat(list),
          template: template
        },
        layout: $layout.fill,
        events: {
          rowHeight: function(sender, indexPath) {
            switch (indexPath.section) {
              case 0:
                return screen_width * 0.35
                break
              case 1:
                return $("这是一个id").contentSize.height
                break
              default:
                return 150
            }
          },
          didSelect(sender, indexPath, data) {
            viewRecipes(data.adid)
          }
        }
      }
    ]
  })
  console.log($("这是一个id").contentSize.height)
}