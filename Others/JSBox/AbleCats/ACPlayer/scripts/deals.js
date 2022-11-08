const dns = "http://api.able.cat/";
const file = require('scripts/files');
const CatsViews = require('scripts/CatsViews/UIViews');
const isToday = $app.env == $env.today || $app.env == $env.keyboard ? true : false;

function getLrc(url) {
  function parseLyric(lrc) {
    let LRC = []
    var lrcObj = {};
    var lyrics = lrc ? lrc.split("\n") : "[00:00.00] 暂无歌词".split("\n");
    for (var i = 0; i < lyrics.length; i++) {
      var lyric = decodeURIComponent(lyrics[i]);
      var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
      var timeRegExpArr = lyric.match(timeReg);
      if (!timeRegExpArr) continue;
      var clause = lyric.replace(timeReg, '');
      for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
        var t = timeRegExpArr[k];
        var min = Number(String(t.match(/\[\d*/i)).slice(1)),
          sec = Number(String(t.match(/\:\d*/i)).slice(1));
        var time = min * 60 + sec;
        if (clause)
          lrcObj[time] = clause;
      }
    }
    if (lrcObj) {
      for (let i in lrcObj) {
        LRC.push({
          index: i,
          lrc: {
            text: lrcObj[i]
          }
        })
      }
    }

    $("lrcView").data = LRC
    $("lrcView").scrollTo({
      indexPath: $indexPath(0, 0),
      position: 1,
      animated: false
    })
  }

  $http.get({
    url: url,
    handler: function (res) {
      parseLyric(res.data)
    }
  })
}

function getName(t) {
  return `${$("songName").text}_${$("songSinger").text}.${t ? 'flac' : 'mp3'}`
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

async function action(i) {
  let url = null;
  let index = i.row;
  let ldata = $("bgimgBlur").info[index];

  if (ldata.flac && ldata.url) {
    let result = await $ui.menu({
      items: ["mp3", "flac"]
    })
    url = result.index ? ldata.flac : ldata.url
  } else url = ldata.url

  return {
    url: url,
    name: `${ldata.title}_${ldata.singer}.${url.split('.')[url.split('.').length - 1].split('?')[0]}`
  }
}

async function search(url, t) {
  file.exit();
  CatsViews.addLoading(isToday ? $("playControl") : $("listControl"), 150)

  async function word() {
    let s = file.get().s;
    let r = s ? s : await $http.get(`http://js.able.cat/ACPlayer/strings/search`);
    return s ? r : r.data;
  }

  async function Platform(url, t) {
    let s = $text.URLEncode(url ? url : await word());
    switch (t) {
      case 0:
        let wr = await $http.get(`http://api.able.cat/music/?t=wy&id=${s}`);
        return wr;
      case 1:
        let qr = await $http.get(`http://api.able.cat/music/?t=qq&id=${s}`);
        return qr;
      case 2:
        return 't=xm';
      default:
        temp = await $http.get(`http://api.able.cat/music/?t=wy&id=${s}`);
        return temp;
    }
  }

  let resp = await Platform(url, t);
  resp.data.count ? file.make(resp.data) : $ui.toast("errorCode(201) 无访问数据...");
  $("sreachList").endRefreshing();
  CatsViews.removeLoading()
}

async function recommend() {
  let array = []
  let res = await $http.get(`${dns}netease/plist.php`);
  let arr = await $http.get('http://ablecats.github.io/ACPlayer/recommend');
  array.push(arr.data)
  for (let i in res.data.playlists) {
    if (i < 19) {
      let v = res.data.playlists[i]
      array.push({
        plistId: v.id,
        plistImg: {
          src: v.coverImgUrl,
        },
        plistName: {
          text: v.name
        },
      })
    }
  }
  $("matrix").endRefreshing()
  return array
}

function EVAL(d, s, t) {

  function search(s) {
    let script = reCookie("$notify(\"Tips\", { tips: 'Please Wait...'});$.post(\"api.php?search=pf\", \"w=sreach&p=1&n=50\", function (data) { $notify(\"Search\", { data: data}); }).error(function() {$notify(\"Error\", true);})");
    return script.replace("pf", "wy").replace("sreach", s)
  }

  function obtain(s, t) {
    let script = reCookie("$.post(\"api.php?get_song=qq\", \"mid=songmid\", function (data) { $notify(\"LOG\", { log:data});var name = `${data.song}_${data.singer}`; $.get(data.url['FLAC'] ? data.url['FLAC'] : data.url['320MP3'] ? data.url['320MP3'] : data.url['128MP3'], function (data) { $notify(\"HQ\", { name: name, type: data.suffix, url: data.url})});})")
    return t ? script.replace("songmid", s) : script.replace("songmid", s).replace("HQ", "Listen");
  }

  function reCookie(s) {
    return "var rsa = new RSAKey();var n = \"D28B9DAEBBBC2884F31981791EF959AC0AB1BB1987ADDE98EA6932CB0AB5DCFE592284D296F3A0FDB8962496597F4BF1142972F08E9982164896ADBAA05284EA56072A1E74D8D134570386466C36AEA4FFAB6BC2C1B911A1F1ADC5EF89BB1AA07EC14F540DD49C2EC3CA95C5D290E7C2ED418CA469F13C3AE69B9D06BE6B495D\";var e = \"10001\";rsa.setPublic(n, e);var res = rsa.encrypt('{\"platform\":1,\"timestamp\":' + (Date.parse(new Date()) / 1000) + '}');var exdate = new Date();exdate.setDate(exdate.getDate() + 365);document.cookie = \"encrypt_data=\" + escape(res) + \"; expires=\" + exdate.toGMTString();" + s;
  }

  $("simulation").eval({ script: d ? search(s) : obtain(s, t), handler: (result, error) => { } })
}

module.exports = {
  dns: dns,
  lrc: getLrc,
  EVAL: EVAL,
  name: getName,
  action: action,
  search: search,
  recommend: recommend,
  assignment: assignment,
}