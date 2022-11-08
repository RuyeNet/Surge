let Path = $file.read("version.json").string

async function check() {
    ready();
    clearCache();
    
    let object = await download("http://js.able.cat/ACPlayer/version.json")
    if (object.data) {
        let string = object.data.string;
        if (parse(string).app > parse(Path).app) {
            for (let o of parse(string).scripts) {
                record(o)
            }
            let info = await download("http://js.able.cat/ACPlayer/README.md")
            writeFiles(info.data, "README.md");
            writeFiles(object.data, "version.json");
            $ui.toast(`热更新完成，当前版本V${parse(string).app}`);
            $ui.push({
                props: {
                    title: ""
                },
                views: [{
                    type: "markdown",
                    props: {
                        content: $file.read("README.md").string
                    },
                    layout: $layout.fill
                }]
            });
            checkCallBack();
        }
    }
}

function ready() {
    let path = 'scripts/CatsViews/'
    $file.exists(path) ? 0 : $file.mkdir(path);
}

async function record(n) {
    let res = await download(`http://js.able.cat/ACPlayer/scripts/${n}`);
    res.data ? writeFiles(res.data, `scripts/${n}`) : false;
}

async function download(url) {
    return await $http.download({
        url: url
    });
}

async function checkCallBack() { 
}

function writeFiles(s, path) {
    $file.write({
        data: s,
        path: path
    })
}

function clearCache() {
    var date = $objc('NSDate').invoke('dateWithTimeIntervalSince1970', 0)
    $objc('NSURLCache').invoke('sharedURLCache').invoke('removeCachedResponsesSinceDate', date)

    var types = $objc('NSMutableSet').invoke('set')

    types.invoke('addObject', 'WKWebsiteDataTypeDiskCache')
    types.invoke('addObject', 'WKWebsiteDataTypeMemoryCache')
    types.invoke('addObject', 'WKWebsiteDataTypeOfflineWebApplicationCache')

    var handler = $block("void, void", async function () {

    })

    $objc('WKWebsiteDataStore').invoke('defaultDataStore').invoke('removeDataOfTypes:modifiedSince:completionHandler:', types, date, handler)
}

function parse(s) {
    return JSON.parse(s);
}

module.exports = {
    check: check
}