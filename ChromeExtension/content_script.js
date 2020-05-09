chrome.runtime.onMessage.addListener(function () {
  $(".header-row").append(
    '<th data-col="playlist">プレイリスト</th>'
  );
  $('.song-table [data-col="playlist"]').css("width", "32%");
  $('.song-table th[data-col="playlist"]').css("text-align", "left");
});

