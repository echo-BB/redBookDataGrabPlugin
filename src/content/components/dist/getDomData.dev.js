"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var handleHendMsg = function handleHendMsg(sendMsg) {
  chrome.runtime.sendMessage({
    data: sendMsg
  }, function (response) {
    console.log("response:", response);
    console.log(response.reply);
  });
};

var domDataFun = function domDataFun(isDom) {
  if (!isDom) {
    var noteContainer = document.getElementById("noteContainer");
    var detailTitle = noteContainer.querySelector("#detail-title");
    var detailDesc = noteContainer.querySelector("#detail-desc");
    var username = noteContainer.querySelector('div.info a.name span');
    var likeCount = noteContainer.querySelector('.like-wrapper span.count');
    var collectCount = noteContainer.querySelector('.collect-wrapper span.count');
    var chatCount = noteContainer.querySelector('.chat-wrapper span.count');
    var imgContainer = noteContainer.querySelectorAll('.swiper-slide');
    var tagContainer = noteContainer.querySelectorAll('div.desc span.tag');
    var imgList = [];
    var tagList = [];

    for (var index = 1; index < imgContainer.length - 1; index++) {
      var computedStyle = getComputedStyle(imgContainer[index]);
      var backgroundImage = computedStyle.getPropertyValue('background-image').split('?')[0].substring(5); // console.log(backgroundImage);

      imgList.push(backgroundImage);
    }

    for (var _index = 0; _index < tagContainer.length; _index++) {
      var tagStr = tagContainer[_index]['textContent'].substring(1);

      tagList.push(tagStr);
    }

    handleHendMsg({
      dropTag: true,
      username: username['textContent'] || "",
      detailTitle: detailTitle['textContent'] || "",
      detailDesc: detailDesc['textContent'] || "",
      collectWrapper: collectCount['textContent'] || "",
      chatWrapper: chatCount['textContent'] || "",
      likeWrapper: likeCount['textContent'] || "",
      imgList: imgList || [],
      originUrl: window.location.href || ""
    });
  } else {
    handleHendMsg({
      dropTag: false
    });
  }
};

var _default = domDataFun;
exports["default"] = _default;