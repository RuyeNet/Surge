const COUNT = 30

var option = $objc("PHFetchOptions").invoke("new")
var descriptor = $objc("NSSortDescriptor").invoke("sortDescriptorWithKey:ascending:", "creationDate", 0)
option.invoke("setFetchLimit", COUNT)
option.invoke("setSortDescriptors", [descriptor])

var fetchResult = $objc("PHAsset").invoke("fetchAssetsWithOptions:", option)

module.exports = {
  result: fetchResult
}