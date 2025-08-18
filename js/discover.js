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
  col.classList = "col-sm-6 col-md-4 col-lg-3";

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
  playBtn.addEventListener("click", () => {
    if (queueSongs.length === 0) {
      queueSongs.push(song);
      currentIndex = 0;
      playSong(song);
    } else {
      queueSongs[currentIndex] = song;
      playSong(song);
    }
    queueRender();
  });

  const addBtn = document.createElement("button");
  addBtn.classList = "btn btn-outline-secondary btn-sm";
  addBtn.innerHTML =
    '<i class="fa-solid fa-plus"> Add</i>';
  addBtn.addEventListener("click", () => addSong(song, addBtn));

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

const volumeBar = document.querySelector("#volume-ctrl");
const volumeIcon = document.querySelector('#volume-icon');

const progress = document.querySelector('#progress');
const currentTimeSpan = document.querySelector('#current-time');
const fullTimeSpan = document.querySelector('#full-time');
const audioElement = document.querySelector("audio");

function playSong(song) {
  const audioElement = document.querySelector("audio");
  const sourceElement = audioElement.querySelector("source");

  if (currentSong !== song) {
    sourceElement.src = song.audio;
    audioElement.load();
    audioElement.play();
    footPlayBtn.classList.replace("fa-play", "fa-pause");
  } else {
    audioElement.play();
    footPlayBtn.classList.replace("fa-play", "fa-pause");
  }

  currentSong = song;

  footerImg.src = song.img;
  footerImg.classList.replace("d-none", "d-flex");
  footerArtist.textContent = song.artist;
  footerSong.textContent = song.title;
  volumeBar.classList.add("d-lg-flex");
  volumeIcon.classList.add("d-lg-flex")

    queueRender();
  toggleBtn();
}

audioElement.addEventListener("ended", () => {
    if (currentIndex >= queueSongs.length-1) {
      footPlayBtn.classList.replace("fa-pause", "fa-play");
      return
    }
    currentIndex++;

    playCurrentSong();
  });

footPlayBtn.addEventListener("click", () => {
  const audioElement = document.querySelector("audio");
  if (!currentSong) return;

  if (audioElement.paused) {
    audioElement.play();
    footPlayBtn.classList.replace("fa-play", "fa-pause");
  } else {
    audioElement.pause();
    footPlayBtn.classList.replace("fa-pause", "fa-play");
  }
});

const discoverTab = document.querySelector("#discover-tab");
const playlistTab = document.querySelector("#playlist-tab");
const queueTab = document.querySelector("#queue-tab");

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document
      .querySelectorAll(".nav-link")
      .forEach((a) => a.classList.remove("active-tab"));
    link.classList.add("active-tab");

    document
      .querySelectorAll(".tab-content")
      .forEach((content) => content.classList.add("d-none"));

    const newTabId = link.id.replace("-tab", "-div");
    document.querySelector(`#${newTabId}`).classList.remove("d-none");
  });
});

function minSec(seconds) {
  const min = Math.floor(seconds/60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? 0 : ""}${sec}`;
}

audioElement.addEventListener('loadedmetadata',() => {
  progress.max = Math.floor(audioElement.duration);
  fullTimeSpan.textContent = minSec(audioElement.duration);
})

audioElement.addEventListener('timeupdate', () => {
  const progPercent = (audioElement.currentTime/audioElement.duration) * 100;
  progress.value = Math.floor(audioElement.currentTime);
  progress.style.setProperty('--progress',progPercent + '%');
  currentTimeSpan.textContent = minSec(audioElement.currentTime);
})

progress.addEventListener("input", () => {
  currentTimeSpan.textContent = minSec(progress.value);
});

progress.addEventListener("change", () => {
  audioElement.currentTime = progress.value;
});

volumeBar.addEventListener("input", ()=> {
  const volPercent = (volumeBar.value) * 100
  audioElement.volume = volumeBar.value;
  volumeBar.style.setProperty('--progress',volPercent + '%');
})