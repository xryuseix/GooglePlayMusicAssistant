$("body").prepend('<div class="txt">Hello World!</div>');
chrome.runtime.onMessage.addListener(function () {
  testStorage();
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
});

function getPlayLists() {
  const title = document.querySelector(
    "div.title-row.style-scope.gpm-detail-page-header > h2"
  ).innerText;
  let musicIds = [];
  document.querySelectorAll("tr.song-row").forEach((songRow) => {
    musicIds.push(songRow.dataset.id);
  });
  return [title, musicIds];
}

function testStorage() {
  chrome.storage.local.set({ key: "334" }, function () {
    console.log("stored");
  });
  test2();
}

function test2() {
  chrome.storage.local.get("key", function (value) {
    var value_data = value.key;
    console.log(value_data);
  });
}
