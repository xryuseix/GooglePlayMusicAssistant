chrome.runtime.onMessage.addListener(function () {
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
