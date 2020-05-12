$("body").prepend('<div class="txt">Hello World!</div>');

chrome.runtime.onMessage.addListener(function (msg) {
  const url = location.href;
  if (msg.query === "post") {
    if (
      location.href.match(
        /https:\/\/play.google.com\/music\/listen(\?user=\d)*#\/all/
      )
    ) {
      postPlayLists();
    }
  } else if (msg.query === "get") {
    if (
      location.href.match(
        /https:\/\/play.google.com\/music\/listen(\?user=\d)*#\/pl\//
      )
    ) {
      getPlayLists();
    }
  } else if (msg.query === "remove") {
    removeData();
  }
});

async function postPlayLists() {
  if (!isExsistPlayList()) {
    const headerCell = document.createElement("th");
    const headerRow = document.querySelector(".header-row");

    headerCell.innerText = "プレイリスト";
    headerCell.setAttribute("data-col", "playlist");
    headerCell.style.width = "32%";

    headerRow.insertBefore(
      headerCell,
      headerRow.querySelector('[data-col="play-count"]')
    );
  }
  const playlists = await storageGet();
  document.querySelectorAll("tr.song-row").forEach((songRow) => {
    if (songRow.querySelector("[data-col=playlist]") == null) {
      const cell = document.createElement("td");
      var musicInList = [];
      const musicId = songRow.dataset.id;
      Object.keys(playlists).forEach((key) => {
        const list = playlists[key];
        if (list.musicIds.some((item) => item === musicId)) {
          // console.log("push", list.title);
          musicInList.push(list.title);
        }
      });
      if (!musicInList.length) {
        cell.innerText = "-";
      } else {
        cell.innerText = musicInList.join(",  ");
      }
      cell.setAttribute("data-col", "playlist");
      cell.style.width = "32%";
      songRow.insertBefore(
        cell,
        songRow.querySelector('[data-col="play-count"]')
      );
    }
  });
  console.log("postPlayList");
}

async function getPlayLists() {
  const title = document.querySelector(
    "div.title-row.style-scope.gpm-detail-page-header > h2"
  ).innerText;
  let musicIds = [];
  document.querySelectorAll("tr.song-row").forEach((songRow) => {
    musicIds.push(songRow.dataset.id);
  });
  console.log("getPlayList");
  const url = location.href;
  const id = url.slice(url.match(/#\/pl\//).index + 5);
  var obj = {
    title: title,
    musicIds: musicIds,
  };
  const obj2 = (await storageGet())[id];
  if (obj2) {
    const margedIds = obj.musicIds.concat(obj2.musicIds);
    obj.musicIds = margedIds.filter(function (x, i, self) {
      return self.indexOf(x) === i;
    });
    console.log(margedIds);
    removeData(id);
  }
  storageSet(id, obj);
}

function storageSet(id, value) {
  var entity = {};
  entity[id] = value;
  chrome.storage.local.set(entity, function () {
    console.log("stored", entity);
  });
}

function storageGet(key) {
  if (key == null) {
    return new Promise((resolve) =>
      chrome.storage.local.get((items) => resolve(items))
    );
  } else {
    return new Promise((resolve) =>
      chrome.storage.local.get(key, (items) => resolve(items))
    );
  }
}

async function removeData(key) {
  if (key == null) {
    const storageList = await storageGet();
    Object.keys(storageList).forEach((id) => {
      chrome.storage.local.remove(id, function () {
        console.log("removed");
      });
    });
  } else {
    return new Promise((resolve) =>
      chrome.storage.local.get(key, (items) => resolve(items))
    );
  }
}

function isExsistPlayList() {
  const headerRow = document.querySelector(".header-row");
  return headerRow.querySelector('[data-col="playlist"]') != null;
}

// TODO
// コマンドを画面上につける
// 削除プレイリストの設定
// 登録されているプレイリストのリスト+項目数+時刻
// プレイリスト画面で登録されているものを印付ける