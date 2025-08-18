const queueSongs = [];
let currentIndex = -1;

const delQueueBtn = document.querySelector("#del-queue-btn");

const queueUl = document.querySelector("#queue-ul");
function queueRender() {
  queueUl.innerHTML = "";

  queueSongs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.classList.add("list-group-item","py-2","mb-2");
    if (index === currentIndex) {
      li.classList.add("playing");
    }
    queueUl.appendChild(li);
  });
  updateQueueUI();
}

function addSong(song, addBtn) {
  if (addBtn) {
    addBtn.innerHTML = '<i class="fa-solid fa-check"> Added</i>';
    setTimeout(() => {
      addBtn.innerHTML = '<i class="fa-solid fa-plus"> Add</i>';
    }, 2000);
  }

  queueSongs.push(song);
  queueRender();

  if (currentIndex === -1) {
    currentIndex = 0;
    playCurrentSong();
  }
}

function playCurrentSong() {
  if (currentIndex < 0 || currentIndex >= queueSongs.length) return;

  const song = queueSongs[currentIndex];
  playSong(song);
  audioElement.currentTime = 0;
  footPlayBtn.classList.replace("fa-play", "fa-pause");

  queueRender();
}

function updateQueueUI() {
  queueUl.querySelectorAll("li").forEach((li, index) => {
    li.classList.toggle("playing", index === currentIndex);

    if (index < currentIndex) {
      li.classList.add("d-none");
    } else {
      li.classList.remove("d-none");
    }
  });
}

function toggleBtn() {
  if (queueSongs.length === 0) {
    delQueueBtn.disabled = true;
    delQueueBtn.style.cursor = "not-allowed";
  } else {
    delQueueBtn.disabled = false;
    delQueueBtn.classList.add("btn");
    delQueueBtn.style.cursor = "pointer";
  }
}

delQueueBtn.addEventListener("click", () => {
  queueSongs.splice(0, queueSongs.length);
  currentSong = null;
  currentButton = null;
  currentIndex = -1;
  footerImg.src = "";
  footerImg.classList.replace("d-flex", "d-none");
  footerArtist.textContent = "";
  footerSong.textContent = "";
  volumeIcon.classList.remove("d-lg-flex");
  volumeBar.classList.remove("d-lg-flex");
  audioElement.pause();
  footPlayBtn.classList.replace("fa-pause", "fa-play");
  audioElement.currentTime = 0;
  toggleBtn();
  queueRender();
});

document.querySelector(".fa-backward").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    playCurrentSong();
  }
});

document.querySelector(".fa-forward").addEventListener("click", () => {
  if (currentIndex < queueSongs.length - 1) {
    currentIndex++;
    playCurrentSong();
  }
});