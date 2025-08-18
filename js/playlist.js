const playlistUl = document.querySelector("#playlist-ul");
const playlistOverlay = document.getElementById("playlist-overlay");
const overlaySongList = document.getElementById("overlay-song-list");
const playlistNameInput = document.getElementById("playlist-name");
const cancelPlaylistBtn = document.getElementById("cancel-playlist");
const savePlaylistBtn = document.getElementById("save-playlist");

let playlists = JSON.parse(localStorage.getItem("playlists")) || [];
let editingPlaylistIndex = 0;

playlistUl.querySelector("li").addEventListener("click", () => {
  editingPlaylistIndex = null;
  playlistNameInput.value = "";
  openPlaylistOverlay();
});

cancelPlaylistBtn.addEventListener("click", () => {
  playlistOverlay.classList.add("d-none");
});

function openPlaylistOverlay() {
  overlaySongList.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `
                    <input type="checkbox" class="btn-check" data-index="${index}" id="song-${index}" autocomplete="off">
                    <label class="btn btn-outline-dark w-100 text-start" for="song-${index}">
                        ${song.title} - ${song.artist}
                    </label>
`;

    if (
      editingPlaylistIndex !== null &&
      playlists[editingPlaylistIndex].songs.some((s) => s.title === song.title)
    ) {
      li.querySelector("input").checked = true;
    }
    overlaySongList.appendChild(li);
  });
  playlistOverlay.classList.remove("d-none");
}

savePlaylistBtn.addEventListener("click", () => {
  const name = playlistNameInput.value.trim();
  if (!name) {
    playlistNameInput.placeholder = "Name required!";
    playlistNameInput.classList.add("is-invalid");
    return;
  }

  const selectedSongIndexes = Array.from(
    overlaySongList.querySelectorAll("input[type=checkbox]")
  )
    .filter((input) => input.checked)
    .map((input) => Number(input.dataset.index));

  const selectedSongs = selectedSongIndexes.map((i) => songs[i]);

  if (editingPlaylistIndex !== null) {
    playlists[editingPlaylistIndex] = { name, songs: selectedSongs };
  } else {
    playlists.push({ name, songs: selectedSongs });
  }

  localStorage.setItem("playlists", JSON.stringify(playlists));
  renderPlaylists();
  playlistOverlay.classList.add("d-none");
});

function renderPlaylists() {
  playlistUl.innerHTML = `
        <li class="list-group-item card d-flex align-items-center justify-content-center btn btn-light" style="height: 200px">
            <i class="fa-solid">Make A New Playlist</i>
        </li>
    `;

  playlists.forEach((pl, index) => {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "border",
      "border-black",
      "rounded",
      "my-3"
    );
    li.innerHTML = `
            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                <span class="fa-solid p-3">${pl.name} (${pl.songs.length} songs)</span>
                <div class="p-3">
                    <button class="btn btn-md btn-light border-black fa-solid fa-play play-playlist"></button>
                    <button class="btn btn-md btn-secondary border-black edit-playlist fa-solid fa-pen"></button>
                    <button class="btn btn-md btn-dark delete-playlist border-black fa-solid fa-trash"></button>
                </div>
            </div>
            <ul class="song-list my-2"></ul>
        `;
    playlistUl.appendChild(li);

    const songListUl = li.querySelector(".song-list");
    pl.songs.forEach((song) => {
      const songLi = document.createElement("li");
      songLi.textContent = `${song.title} - ${song.artist}`;
      songLi.classList.add("small", "text-muted", "d-flex", "p-2");
      songListUl.appendChild(songLi);
    });

    li.querySelector(".play-playlist").addEventListener("click", () => {
      queueSongs.splice(0, queueSongs.length);
      currentIndex = 0;

      pl.songs.forEach((song) => queueSongs.push(song));

      playCurrentSong();

      queueRender();
    });

    li.querySelector(".edit-playlist").addEventListener("click", () => {
      editingPlaylistIndex = index;
      playlistNameInput.value = pl.name;
      openPlaylistOverlay();
    });

    li.querySelector(".delete-playlist").addEventListener("click", () => {
      playlists.splice(index, 1);
      localStorage.setItem("playlists", JSON.stringify(playlists));
      renderPlaylists();
    });
  });

  playlistUl.querySelector("li").addEventListener("click", () => {
    editingPlaylistIndex = null;
    playlistNameInput.value = "";
    openPlaylistOverlay();
  });
}

renderPlaylists();
