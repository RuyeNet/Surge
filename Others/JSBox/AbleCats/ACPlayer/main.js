const views = require('scripts/views');


$app.listen({
  exit: views.exit(),
  ready: views.init(),
  pause: views.pause(),
  resume: views.resume()
})