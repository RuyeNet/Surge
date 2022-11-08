const unicodeRange = {
  "Control character": [0, 31],
  "Basic Latin": [32, 127],
  "Latin-1 Supplement": [128, 255],
  "Latin Extended-A": [256, 383],
  "Latin Extended-B": [384, 591],
  "IPA Extensions": [592, 687],
  "Spacing Modifier Letters": [688, 767],
  "Combining Diacritical Marks": [768, 879],
  "Greek and Coptic": [880, 1023],
  "Cyrillic": [1024, 1279],
  "Cyrillic Supplement": [1280, 1327],
  "Armenian": [1328, 1423],
  "Hebrew": [1424, 1535],
  "Arabic": [1536, 1791],
  "Syriac": [1792, 1871],
  "Arabic Supplement": [1872, 1919],
  "Thaana": [1920, 1983],
  "NKo": [1984, 2047],
  "Samaritan": [2048, 2111],
  "Mandaic": [2112, 2143],
  "Syriac Supplement": [2144, 2159],
  "Arabic Extended-A": [2208, 2303],
  "Devanagari": [2304, 2431],
  "Bengali": [2432, 2559],
  "Gurmukhi": [2560, 2687],
  "Gujarati": [2688, 2815],
  "Oriya": [2816, 2943],
  "Tamil": [2944, 3071],
  "Telugu": [3072, 3199],
  "Kannada": [3200, 3327],
  "Malayalam": [3328, 3455],
  "Sinhala": [3456, 3583],
  "Thai": [3584, 3711],
  "Lao": [3712, 3839],
  "Tibetan": [3840, 4095],
  "Myanmar": [4096, 4255],
  "Georgian": [4256, 4351],
  "Hangul Jamo": [4352, 4607],
  "Ethiopic": [4608, 4991],
  "Ethiopic Supplement": [4992, 5023],
  "Cherokee": [5024, 5119],
  "Unified Canadian Aboriginal Syllabics": [5120, 5759],
  "Ogham": [5760, 5791],
  "Runic": [5792, 5887],
  "Tagalog": [5888, 5919],
  "Hanunoo": [5920, 5951],
  "Buhid": [5952, 5983],
  "Tagbanwa": [5984, 6015],
  "Khmer": [6016, 6143],
  "Mongolian": [6144, 6319],
  "Unified Canadian Aboriginal Syllabics Extended": [6320, 6399],
  "Limbu": [6400, 6479],
  "Tai Le": [6480, 6527],
  "New Tai Lue": [6528, 6623],
  "Khmer Symbols": [6624, 6655],
  "Buginese": [6656, 6687],
  "Tai Tham": [6688, 6831],
  "Combining Diacritical Marks Extended": [6832, 6911],
  "Balinese": [6912, 7039],
  "Sundanese": [7040, 7103],
  "Batak": [7104, 7167],
  "Lepcha": [7168, 7247],
  "Ol Chiki": [7248, 7295],
  "Cyrillic Extended C": [7296, 7311],
  "Sundanese Supplement": [7360, 7375],
  "Vedic Extensions": [7376, 7423],
  "Phonetic Extensions": [7424, 7551],
  "Phonetic Extensions Supplement": [7552, 7615],
  "Combining Diacritical Marks Supplement": [7616, 7679],
  "Latin Extended Additional": [7680, 7935],
  "Greek Extended": [7936, 8191],
  "General Punctuation": [8192, 8303],
  "Superscripts and Subscripts": [8304, 8351],
  "Currency Symbols": [8352, 8399],
  "Combining Diacritical Marks for Symbols": [8400, 8447],
  "Letterlike Symbols": [8448, 8527],
  "Number Forms": [8528, 8591],
  "Arrows": [8592, 8703],
  "Mathematical Operators": [8704, 8959],
  "Miscellaneous Technical": [8960, 9215],
  "Control Pictures": [9216, 9279],
  "Optical Character Recognition": [9280, 9311],
  "Enclosed Alphanumerics": [9312, 9471],
  "Box Drawing": [9472, 9599],
  "Block Elements": [9600, 9631],
  "Geometric Shapes": [9632, 9727],
  "Miscellaneous Symbols": [9728, 9983],
  "Dingbats": [9984, 10175],
  "Miscellaneous Mathematical Symbols-A": [10176, 10223],
  "Supplemental Arrows-A": [10224, 10239],
  "Braille Patterns": [10240, 10495],
  "Supplemental Arrows-B": [10496, 10623],
  "Miscellaneous Mathematical Symbols-B": [10624, 10751],
  "Supplemental Mathematical Operators": [10752, 11007],
  "Miscellaneous Symbols and Arrows": [11008, 11263],
  "Glagolitic": [11264, 11359],
  "Latin Extended-C": [11360, 11391],
  "Coptic": [11392, 11519],
  "Georgian Supplement": [11520, 11567],
  "Tifinagh": [11568, 11647],
  "Ethiopic Extended": [11648, 11743],
  "Cyrillic Extended-A": [11744, 11775],
  "Supplemental Punctuation": [11776, 11903],
  "CJK Radicals Supplement": [11904, 12031],
  "Kangxi Radicals": [12032, 12255],
  "Ideographic Description Characters": [12272, 12287],
  "CJK Symbols and Punctuation": [12288, 12351],
  "Hiragana": [12352, 12447],
  "Katakana": [12448, 12543],
  "Bopomofo": [12544, 12591],
  "Hangul Compatibility Jamo": [12592, 12687],
  "Kanbun": [12688, 12703],
  "Bopomofo Extended": [12704, 12735],
  "CJK Strokes": [12736, 12783],
  "Katakana Phonetic Extensions": [12784, 12799],
  "Enclosed CJK Letters and Months": [12800, 13055],
  "CJK Compatibility": [13056, 13311],
  "CJK Unified Ideographs Extension A": [13312, 19903],
  "Yijing Hexagram Symbols": [19904, 19967],
  "CJK Unified Ideographs": [19968, 40959],
  "Yi Syllables": [40960, 42127],
  "Yi Radicals": [42128, 42191],
  "Lisu": [42192, 42239],
  "Vai": [42240, 42559],
  "Cyrillic Extended-B": [42560, 42655],
  "Bamum": [42656, 42751],
  "Modifier Tone Letters": [42752, 42783],
  "Latin Extended-D": [42784, 43007],
  "Syloti Nagri": [43008, 43055],
  "Common Indic Number Forms": [43056, 43071],
  "Phags-pa": [43072, 43135],
  "Saurashtra": [43136, 43231],
  "Devanagari Extended": [43232, 43263],
  "Kayah Li": [43264, 43311],
  "Rejang": [43312, 43359],
  "Hangul Jamo Extended-A": [43360, 43391],
  "Javanese": [43392, 43487],
  "Myanmar Extended-B": [43488, 43519],
  "Cham": [43520, 43615],
  "Myanmar Extended-A": [43616, 43647],
  "Tai Viet": [43648, 43743],
  "Meetei Mayek Extensions": [43744, 43775],
  "Ethiopic Extended-A": [43776, 43823],
  "Latin Extended-E": [43824, 43887],
  "Cherokee Supplement": [43888, 43967],
  "Meetei Mayek": [43968, 44031],
  "Hangul Syllables": [44032, 55215],
  "Hangul Jamo Extended-B": [55216, 55295],
  "High Surrogates": [55296, 56191],
  "High Private Use Surrogates": [56192, 56319],
  "Low Surrogates": [56320, 57343],
  "Private Use Area": [57344, 63743],
  "CJK Compatibility Ideographs": [63744, 64255],
  "Alphabetic Presentation Forms": [64256, 64335],
  "Arabic Presentation Forms-A": [64336, 65023],
  "Variation Selectors": [65024, 65039],
  "Vertical Forms": [65040, 65055],
  "Combining Half Marks": [65056, 65071],
  "CJK Compatibility Forms": [65072, 65103],
  "Small Form Variants": [65104, 65135],
  "Arabic Presentation Forms-B": [65136, 65279],
  "Halfwidth and Fullwidth Forms": [65280, 65519],
  "Specials": [65520, 65535],
  "Linear B Syllabary": [65536, 65663],
  "Linear B Ideograms": [65664, 65791],
  "Aegean Numbers": [65792, 65855],
  "Ancient Greek Numbers": [65856, 65935],
  "Ancient Symbols": [65936, 65999],
  "Phaistos Disc": [66000, 66047],
  "Lycian": [66176, 66207],
  "Carian": [66208, 66271],
  "Coptic Epact Numbers": [66272, 66303],
  "Old Italic": [66304, 66351],
  "Gothic": [66352, 66383],
  "Old Permic": [66384, 66431],
  "Ugaritic": [66432, 66463],
  "Old Persian": [66464, 66527],
  "Deseret": [66560, 66639],
  "Shavian": [66640, 66687],
  "Osmanya": [66688, 66735],
  "Osage": [66736, 66815],
  "Elbasan": [66816, 66863],
  "Caucasian Albanian": [66864, 66927],
  "Linear A": [67072, 67455],
  "Cypriot Syllabary": [67584, 67647],
  "Imperial Aramaic": [67648, 67679],
  "Palmyrene": [67680, 67711],
  "Nabataean": [67712, 67759],
  "Hatran": [67808, 67839],
  "Phoenician": [67840, 67871],
  "Lydian": [67872, 67903],
  "Meroitic Hieroglyphs": [67968, 67999],
  "Meroitic Cursive": [68000, 68095],
  "Kharoshthi": [68096, 68191],
  "Old South Arabian": [68192, 68223],
  "Old North Arabian": [68224, 68255],
  "Manichaean": [68288, 68351],
  "Avestan": [68352, 68415],
  "Inscriptional Parthian": [68416, 68447],
  "Inscriptional Pahlavi": [68448, 68479],
  "Psalter Pahlavi": [68480, 68527],
  "Old Turkic": [68608, 68687],
  "Old Hungarian": [68736, 68863],
  "Rumi Numeral Symbols": [69216, 69247],
  "Brahmi": [69632, 69759],
  "Kaithi": [69760, 69839],
  "Sora Sompeng": [69840, 69887],
  "Chakma": [69888, 69967],
  "Mahajani": [69968, 70015],
  "Sharada": [70016, 70111],
  "Sinhala Archaic Numbers": [70112, 70143],
  "Khojki": [70144, 70223],
  "Multani": [70272, 70319],
  "Khudawadi": [70320, 70399],
  "Grantha": [70400, 70527],
  "Newa": [70656, 70783],
  "Tirhuta": [70784, 70879],
  "Siddham": [71040, 71167],
  "Modi": [71168, 71263],
  "Mongolian Supplement": [71264, 71295],
  "Takri": [71296, 71375],
  "Ahom": [71424, 71487],
  "Warang Citi": [71840, 71935],
  "Zanabazar Square": [72192, 72271],
  "Soyombo": [72272, 72367],
  "Pau Cin Hau": [72384, 72447],
  "Bhaiksuki": [72704, 72815],
  "Marchen": [72816, 72895],
  "Masaram Gondi": [72960, 73055],
  "Cuneiform": [73728, 74751],
  "Cuneiform Numbers and Punctuation": [74752, 74879],
  "Early Dynastic Cuneiform": [74880, 75087],
  "Egyptian Hieroglyphs": [77824, 78895],
  "Anatolian Hieroglyphs": [82944, 83583],
  "Bamum Supplement": [92160, 92735],
  "Mro": [92736, 92783],
  "Bassa Vah": [92880, 92927],
  "Pahawh Hmong": [92928, 93071],
  "Miao": [93952, 94111],
  "Ideographic Symbols and Punctuation": [94176, 94207],
  "Tangut": [94208, 100351],
  "Tangut Components": [100352, 101119],
  "Kana Supplement": [110592, 110847],
  "Kana Extended-A": [110848, 110895],
  "Nushu": [110960, 111359],
  "Duployan": [113664, 113823],
  "Shorthand Format Controls": [113824, 113839],
  "Byzantine Musical Symbols": [118784, 119039],
  "Musical Symbols": [119040, 119295],
  "Ancient Greek Musical Notation": [119296, 119375],
  "Tai Xuan Jing Symbols": [119552, 119647],
  "Counting Rod Numerals": [119648, 119679],
  "Mathematical Alphanumeric Symbols": [119808, 120831],
  "Sutton SignWriting": [120832, 121519],
  "Glagolitic Supplement": [122880, 122927],
  "Mende Kikakui": [124928, 125151],
  "Adlam": [125184, 125279],
  "Arabic Mathematical Alphabetic Symbols": [126464, 126719],
  "Mahjong Tiles": [126976, 127023],
  "Domino Tiles": [127024, 127135],
  "Playing Cards": [127136, 127231],
  "Enclosed Alphanumeric Supplement": [127232, 127487],
  "Enclosed Ideographic Supplement": [127488, 127743],
  "Miscellaneous Symbols and Pictographs": [127744, 128511],
  "Emoticons (Emoji)": [128512, 128591],
  "Ornamental Dingbats": [128592, 128639],
  "Transport and Map Symbols": [128640, 128767],
  "Alchemical Symbols": [128768, 128895],
  "Geometric Shapes Extended": [128896, 129023],
  "Supplemental Arrows-C": [129024, 129279],
  "Supplemental Symbols and Pictographs": [129280, 129535],
  "CJK Unified Ideographs Extension B": [131072, 173791],
  "CJK Unified Ideographs Extension C": [173824, 177983],
  "CJK Unified Ideographs Extension D": [177984, 178207],
  "CJK Unified Ideographs Extension E": [178208, 183983],
  "CJK Unified Ideographs Extension F": [183984, 191471],
  "CJK Compatibility Ideographs Supplement": [194560, 195103],
  "Tags": [917504, 917631],
  "Variation Selectors Supplement": [917760, 917999]
}
var restart = 1
var unicodeDisplaySort = $cache.get("displaySort")
var unicodeSwitch = unicodeDisplaySort ? unicodeDisplaySort.display : [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var unicodeNames = unicodeDisplaySort ? unicodeDisplaySort.sort : Object.keys(unicodeRange)
if ($app.env != $env.app) {
  var unicodekybd = []
  for (var i in unicodeSwitch) {
    if (unicodeSwitch[i] == 1) {
      unicodekybd.push(unicodeNames[i])
    }
  }
  var unicodeName = unicodekybd
} else {
  var unicodeName = unicodeNames
}
var historyData = $cache.get("charHistories")
var historyChar = historyData ? historyData.history : []

var items = ["◷"].concat(unicodeName)
var symbols = [historyChar].concat(unicodeName)

$ui.render({
  props: {
    id: "mainView",
    title: "Chars Keyboard",
    navButtons: [
      {
        icon: "002",
        handler: function () {
          settingView()
        }
      }
    ]
  },
  views: [{
    type: "menu",
    props: {
      items: items,
      segmentWidthStyle: 1
    },
    layout: function (make, view) {
      if ($app.env != $env.app) {
        make.height.equalTo(40)
      } else {
        make.height.equalTo(50)
      }
      if ($device.isIphoneX) {
        make.bottom.equalTo(view.super.safeAreaBottom)
      } else {
        make.bottom.equalTo(0)
      }

      make.left.right.inset(0)
    },
    events: {
      changed: function (sender) {
        dataPick(sender.index)
      }
    }
  }, {
    type: "matrix",
    props: {
      id: "mainMatrix",
      columns: 9,
      spacing: 0,
      square: true,
      bgcolor: $color("white"),
      data: dataPush(historyChar, "charLabel"),
      template: {
        props: {},
        views: [{
          type: "label",
          props: {
            id: "charLabel",
            textColor: $color("darkGray"),
            bgcolor: $color("white"),
            align: $align.center,
            font: $font(".SFUIText", 20)
          },
          layout: $layout.fill
        }]
      }
    },
    layout: function (make, view) {
      make.width.equalTo(view.super)
      make.top.inset(0)
      make.bottom.equalTo($("menu").top)
    },
    events: {
      didSelect: function (sender, indexPath, data) {
        if ($app.env != $env.app) {
          $audio.play({
            id: 1104
          })
          $keyboard.insert(data.charLabel.text)
        } else {
          $clipboard.text = data.charLabel.text
          $ui.toast("Copied")
        }
        historyCache(data.charLabel.text)
      }
    }
  }]
})

function dataPick(index) {
  if (index == 0) {
    $("mainMatrix").data = dataPush(historyChar, "charLabel")
    $ui.title = "Chars Keyboard"
  } else {
    $("mainMatrix").data = dataPush(unicodeChars(unicodeRange[symbols[index]][0], unicodeRange[symbols[index]][1]), "charLabel")
    $ui.title = symbols[index]
  }
}

function unicodeChars(start, end) {
  var code = start
  var unicodeResults = []
  while (code != end + 1) {
    unicodeResults.push(String.fromCodePoint(code))
    code = code + 1
  }
  return unicodeResults
}

function dataPush(data, label) {
  var dataX = []
  for (var i in data) {

    if (label == "nameLabel") {
      dataX.push({
        [label]: {
          text: data[i]
        },
        nameSwitch: {
          on: unicodeSwitch[i],
          info: i
        }
      })
    } else {
      dataX.push({
        [label]: {
          text: data[i]
        }
      })
    }
  }
  return dataX
}

function historyCache(symbol) {
  historyChar.unshift(symbol)
  historyChar = [...new Set(historyChar)]
  if (historyChar.length == 37) {
    historyChar.pop()
  }
  $cache.set("charHistories", {
    history: historyChar
  })
}

function settingView() {
  $ui.push({
    props: {
      title: "Display and Sort"
    },
    events: {
      disappeared: function () {
        if (restart == 1) {
          $addin.restart()
        }
      }
    },
    views: [{
      type: "list",
      props: {
        id: "settingList",
        reorder: true,
        data: dataPush(unicodeNames, "nameLabel"),
        template: {
          props: {
            bgcolor: $color("clear")
          },
          views: [
            {
              type: "view",
              layout: $layout.fill,
              views: [{
                type: "switch",
                props: {
                  id: "nameSwitch",
                  onColor: $color("#4CD762")
                },
                layout: function (make, view) {
                  make.centerY.equalTo(view.super)
                  make.right.inset(15)
                },
                events: {
                  changed: function (sender) {
                    var num = sender.on ? 1 : 0
                    unicodeSwitch.splice(sender.info, 1, num)
                    displaySortSet()
                  }
                }
              }, {
                type: "label",
                props: {
                  id: "nameLabel",
                  align: $align.left,
                  font: $font(".SFUIText", 15),
                  autoFontSize: true
                },
                layout: function (make, view) {
                  make.centerY.equalTo(view.super)
                  make.left.equalTo(15)
                  make.right.equalTo($("nameSwitch").left).inset(10)
                },
                events: {
                  tapped: function (sender) {
                    restart = 0
                    showCharsDetails(sender.text)
                  }
                }
              }]
            }
          ]
        }
      },
      layout: $layout.fill,
      events: {
        reorderMoved: function (fromIndexPath, toIndexPath) {
          reorder(unicodeNames, fromIndexPath.row, toIndexPath.row)
          reorder(unicodeSwitch, fromIndexPath.row, toIndexPath.row)
          displaySortSet()
        }
      }
    }]
  })
}

function displaySortSet() {
  $cache.set("displaySort", {
    display: unicodeSwitch,
    sort: unicodeNames
  })
}

function reorder(arr, index, tindex) {
  if (index > tindex) {
    arr.splice(tindex, 0, arr[index]);
    arr.splice(index + 1, 1)
  }
  else {
    arr.splice(tindex + 1, 0, arr[index]);
    arr.splice(index, 1)
  }
}

function showCharsDetails(name) {
  $ui.push({
    props: {
      title: name
    },
    events: {
      disappeared: function () {
        restart = 1
      }
    },
    views: [{
      type: "matrix",
      props: {
        id: "detailsMatrix",
        columns: 9,
        spacing: 0,
        square: true,
        bgcolor: $color("white"),
        data: dataPush(unicodeChars(unicodeRange[name][0], unicodeRange[name][1]), "charDetailsLabel"),
        template: {
          props: {},
          views: [{
            type: "label",
            props: {
              id: "charDetailsLabel",
              textColor: $color("darkGray"),
              bgcolor: $color("white"),
              align: $align.center,
              font: $font(".SFUIText", 20)
            },
            layout: $layout.fill
          }]
        }
      },
      layout: $layout.fill,
      events: {
        didSelect: function (sender, indexPath, data) {
          if ($app.env != $env.app) {
            $audio.play({
              id: 1104
            })
            $keyboard.insert(data.charDetailsLabel.text)
          } else {
            $clipboard.text = data.charDetailsLabel.text
            $ui.toast("Copied")
          }
        }
      }
    }]
  })
}
