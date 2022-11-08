var timer = null;

const file = require('scripts/files');
const deal = require('scripts/deals');
const CatsViews = require('scripts/CatsViews/UIViews');

function fowardSongs() {
  let s;
  let i = --$("albumimg").info;
  let d = $("bgimgBlur").info[i];
  let c = $("bgimgBlur").info.length - 1;

  deal.assignment(s = i < 0 ? c : i);
  $audio.status ? play(file.get().lf ? d.flac ? d.flac : d.url : d.url) : $("albumimg").info = s;
}

function nextSongs() {
  let s;
  let i = ++$("albumimg").info;
  let d = $("bgimgBlur").info[i];
  let c = $("bgimgBlur").info.length - 1;

  deal.assignment(s = i > c ? 0 : i);
  $audio.status ? play(file.get().lf ? d.flac ? d.flac : d.url : d.url) : $("albumimg").info = s;
}

async function play(d, name) {
  $audio.status ? $audio.stop() : 0;
  $("pos").userInteractionEnabled = false;

  if (name) $audio.play({ path: `${file.path}/${name}` });
  else {
    if ($file.exists(`${file.path}/${deal.name(1)}`)) {
      $audio.play({ path: `${file.path}/${deal.name(1)}` });
      $ui.toast("发现FLAC缓冲文件,正在读取...")
    }
    else if ($file.exists(`${file.path}/${deal.name()}`)) {
      $audio.play({ path: `${file.path}/${deal.name()}` });
      $ui.toast("发现MP3缓冲文件,正在读取...")
    }
    else {
      $ui.toast("歌曲正在缓冲,请稍等...");
      CatsViews.show($("albumimgLoading"));
      let url = file.get().lf ? d.flac ? d.flac : d.url : d.url;
      $('platform').info == 1 ? deal.EVAL(0, d.id, 0) : $audio.play({ url: url })
    }

    $("sreachList").scrollTo({
      indexPath: $indexPath(0, $("albumimg").info),
      position: 1,
      animated: true
    })

    $("lrcView").info ? deal.lrc($("lrcView").info) : 0;
  }
  timer == null ? setTimer() : 0;
  $("pos").userInteractionEnabled = true;
  
}

function setTimer() {
  timer = $timer.schedule({
    interval: 0.1,
    handler: function () {
      let data = $("lrcView").data
      let offset = String($audio.offset.toFixed(0))
      $("pos").info = true;
      $("pos").src = "assets/stop.png";
      switch ($audio.status) {
        case 0:
          killTimer(timer);
          break;
        case 1:
          CatsViews.hide($("sTime"));
          CatsViews.hide($("eTime"));
          CatsViews.hide($("slider"));
          break;
        case 2:
          for (const key in data) {
            if (offset == data[key].index) {
              $("lrcView").scrollTo({
                indexPath: $indexPath(0, key),
                position: 2,
                animated: true
              })
            }
          }
          CatsViews.show($("sTime"));
          CatsViews.show($("eTime"));
          CatsViews.show($("slider"));
          CatsViews.hide($("albumimgLoading"));
          $("slider").max = $audio.duration;
          $("slider").value = $audio.offset;
          $('sTime').text = transTime($audio.offset);
          $('eTime').text = transTime($audio.duration);
          if (transTime($audio.offset) == transTime($audio.duration)) nextSongs();
          break;
        default:
          break;
      }
    }
  })
}

function killTimer() {
  if (timer) {
    $("pos").info = false;
    $("pos").src = "assets/play.png";

    CatsViews.hide($("sTime"))
    CatsViews.hide($("eTime"))
    CatsViews.hide($("slider"))
    if (!$audio.status) {
      timer.invalidate();
      timer = null;
    }
  }
}

function transTime(value) {
  function formatTime(value) {
    var time = "";
    var s = value.split(':');
    var i = 0;
    for (; i < s.length - 1; i++) {
      time += s[i].length == 1 ? ("0" + s[i]) : s[i];
      time += ":";
    }
    time += s[i].length == 1 ? ("0" + s[i]) : s[i];

    return time;
  }

  var time = "";
  var h = parseInt(value / 3600);
  value %= 3600;
  var m = parseInt(value / 60);
  var s = parseInt(value % 60);
  if (h > 0) {
    time = formatTime(h + ":" + m + ":" + s);
  } else {
    time = formatTime(m + ":" + s);
  }

  return time;
}

module.exports = {
  t: timer,
  play: play,
  setTimer: setTimer,
  killTimer: killTimer,
  nextSongs: nextSongs,
  fowardSongs: fowardSongs,
}