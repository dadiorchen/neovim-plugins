const child_process = require("child_process");

const google = {
  translate: function(text){
//    child_process.exec(`open "https://translate.google.cn/#view=home&op=translate&sl=auto&tl=zh-CN&text=${text}"`);
  },
}

module.exports = google;
