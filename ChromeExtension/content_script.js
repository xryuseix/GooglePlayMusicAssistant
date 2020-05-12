$("body").prepend('<div class="txt">Hello World!</div>');

chrome.runtime.onMessage.addListener(function (msg) {
  const url = location.href.slice(0, 41);
  if (msg.query === "post") {
    if (url == "https://play.google.com/music/listen#/all") {
      postPlayLists();
    }
  } else if (msg.query === "get") {
    if (url == "https://play.google.com/music/listen#/pl/") {
      getPlayLists();
    }
  }
});

function postPlayLists() {
  const headerCell = document.createElement("th");
  const headerRow = document.querySelector(".header-row");

  headerCell.innerText = "プレイリスト";
  headerCell.setAttribute("data-col", "playlist");
  headerCell.style.width = "32%";

  headerRow.insertBefore(
    headerCell,
    headerRow.querySelector('[data-col="play-count"]')
  );

  document.querySelectorAll("tr.song-row").forEach((songRow) => {
    const cell = document.createElement("td");
    cell.innerText = "hoge"; // ここでプレイリストの情報を入れる
    cell.setAttribute("data-col", "playlist");
    cell.style.width = "32%";
    songRow.insertBefore(
      cell,
      songRow.querySelector('[data-col="play-count"]')
    );
  });
  console.log("postPlayList");
}

function getPlayLists() {
  const title = document.querySelector(
    "div.title-row.style-scope.gpm-detail-page-header > h2"
  ).innerText;
  let musicIds = [];
  document.querySelectorAll("tr.song-row").forEach((songRow) => {
    musicIds.push(songRow.dataset.id);
  });
  console.log("getPlayList");
  return [title, musicIds];
}

function storageSet(value) {
  chrome.storage.local.set(value, function () {
    console.log("stored", value);
  });
}

function storageGet(key) {
  chrome.storage.local.get(function (value) {
    return value[key];
  });
}