addDiscover();

function addDiscover() {
  const displaySong = document.querySelector("#discover");
  songs.forEach((song) => {
    const card = createSongCard(song);
    displaySong.appendChild(card);
  });
}

function createSongCard(song) {
  const col = document.createElement("div");
  col.classList = "col-12 col-sm-6 col-md-4 col-lg-3";

  const card = document.createElement("div");
  card.classList = "card h-100 d-flex flex-column";

  const img = document.createElement("img");
  img.classList.add("album-art", "card-img-top");
  img.src = song.img;

  const cardBody = document.createElement("div");
  cardBody.classList = "card-body d-flex flex-column";

  const title = document.createElement("h5");
  title.classList = "card-title";
  title.textContent = song.title;

  const artist = document.createElement("p");
  artist.classList = "card-text text-muted";
  artist.textContent = song.artist;

  const btnContainer = document.createElement("div");
  btnContainer.classList = "d-flex justify-content-between mt-auto";

  const playBtn = document.createElement("button");
  playBtn.classList = "btn btn-dark btn-sm";
  playBtn.innerHTML = '<i class="fa-solid fa-play"> Play</i>';
  playBtn.addEventListener("click", () => playSong(song, playBtn));

  const addBtn = document.createElement("button");
  addBtn.classList = "btn btn-outline-secondary btn-sm";
  addBtn.innerHTML =
    '<i class="fa-solid fa-plus"> <span class="d-lg-none">Add</span></i>';
  addBtn.addEventListener("click", () => addSong(song));

  btnContainer.appendChild(playBtn);
  btnContainer.appendChild(addBtn);

  cardBody.appendChild(title);
  cardBody.appendChild(artist);
  cardBody.appendChild(btnContainer);

  card.appendChild(img);
  card.appendChild(cardBody);

  col.appendChild(card);

  return col;
}

let currentButton = null;
let currentSong = null;

const footerImg = document.querySelector("#footer-img");
const footerArtist = document.querySelector("#footer-artist");
const footerSong = document.querySelector("#footer-song");
const footPlayBtn = document.querySelector("#foot-play-btn");

const volume = document.querySelector("#volume");

function playSong(song, playBtn) {
  const audioElement = document.querySelector("audio");
  const sourceElement = audioElement.querySelector("source");

  sourceElement.src = song.audio;

  if (currentButton === playBtn) {
    if (audioElement.paused) {
      audioElement.play();
      playBtn.innerHTML = '<i class="fa-solid fa-pause"> Pause</i>';
      footPlayBtn.classList.replace("fa-play", "fa-pause");
    } else {
      audioElement.pause();
      playBtn.innerHTML = '<i class="fa-solid fa-play">Play</i>';
      footPlayBtn.classList.replace("fa-pause", "fa-play");
    }
    return;
  }

  if (currentButton) {
    currentButton.innerHTML = '<i class="fa-solid fa-play">Play</i>';
  }

  audioElement.load();
  audioElement.play();

  playBtn.innerHTML = '<i class="fa-solid fa-pause"> Pause</i>';
  footPlayBtn.classList.remove("fa-play");
  footPlayBtn.classList.add("fa-pause");

  currentButton = playBtn;
  currentSong = song;

  footerImg.src = currentSong.img;
  footerImg.classList.replace("d-none", "d-flex");
  footerArtist.textContent = currentSong.artist;
  footerSong.textContent = currentSong.title;
  volume.classList.add("d-lg-flex");
}

footPlayBtn.addEventListener("click", () => {
  if (!currentButton || !currentSong) return;
  playSong(currentSong, currentButton);
});
