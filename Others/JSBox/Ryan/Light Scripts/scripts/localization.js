const _strings = $app.strings
const language = $app.info.locale

function l10n(key) {
  try {
    return _strings[language][key]
  } catch (error) {
    return _strings["en"][key] || key
  }
}

function locale() {
  var lan = language.replace(/-.+/, "")
  if (lan == "zh") return "zh"
  else return "en"
}

module.exports = {
  l10n: l10n,
  locale: locale()
}