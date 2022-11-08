const path = "shared://ACP/songs";
const isToday = $app.env == $env.today || $app.env == $env.keyboard ? true : false;

function get() {
    if (!$file.exists("strings/setting")) set('', false, false, 1);
    return JSON.parse($file.read("strings/setting").string);
}

function set(s, lf, df, t) {
    let info = JSON.stringify({
        s: s,
        df: df,
        lf: lf
    })
    $file.write({
        data: $data({
            string: info
        }),
        path: "strings/setting"
    })
    t ? 0 : $ui.toast("保存成功");
}

function exit() {
    if (!$file.exists(path)) {
        if (!$file.mkdir(path)) {
            $ui.alert({
                title: "子文件夹创建失败",
                message: "需要的话请联系一下作者\n\n@AbleCats",
            })
        }
    }
}

function make(d) {
    let array = [];
    let items = [];

    function isPath(v, s) {
        return $file.exists(`${path}/${v}_${s}.mp3`) || $file.exists(`${path}/${v}_${s}.flac`)
    }

    function findID(s) {
        return `${s.match(/_(.*?)_(.*?).mp3/)[2]}/0`
    }

    for (let i = 0; i < d.count; i++) {
        let v = d.data[i]
        array.push({
            id: findID(v.url),
            url: v.url,
            img: v.pic,
            ape: v.ape,
            lrc: v.lrc,
            flac: v.flac,
            mvurl: v.mvurl,
            title: v.title,
            singer: `${v.singer} - ${v.Album}`
        })
        items.push({
            id: {
                text: v.id
            },
            num: {
                text: `${i + 1}`
            },
            url: {
                text: v.url
            },
            img: {
                text: v.pic
            },
            ape: {
                text: v.ape
            },
            lrc: {
                text: v.lrc
            },
            flac: {
                text: v.flac
            },
            title: {
                text: v.title,
            },
            videoBtn: {
                info: v.mvurl,
                hidden: v.mvurl ? false : true
            },
            singer: {
                text: `${v.singer} - ${v.Album}`
            },
            isPath: {
                hidden: !isPath(v.title, `${v.singer} - ${v.Album}`, 0)
            },
            progress: {
                id: (i).toString()
            }
        })
    }

    $("bgimgBlur").info = array;
    $("sreachList").data = items;
    console.log(items)
    if (d.count && d.data) {
        !$audio.status ? assignment(0) : 0;
        $delay(0.5, () => $("sreachList").scrollTo({
            indexPath: $indexPath(0, 0),
            position: 1,
            animated: true
        }))
    }
    
}

function assignment(i) {
    let d = $("bgimgBlur").info[i];

    $("albumimg").info = i;
    $("bgimg").src = d.img;
    $("albumimg").src = d.img;
    $("lrcView").info = d.lrc;
    $("songName").text = d.title;
    $("songSinger").text = d.singer;
}

module.exports = {
    set: set,
    get: get,
    make: make,
    exit: exit,
    path: path
}