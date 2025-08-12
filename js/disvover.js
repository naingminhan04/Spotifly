addDiscover();

function addDiscover() {
    const displaySong = document.querySelector('#discover');
    songs.forEach(song => {
        const card = createSongCard(song);
        displaySong.appendChild(card);
    });
}

function createSongCard(song) {
    const col = document.createElement('div');
    col.classList = 'col-12 col-sm-6 col-md-4 col-lg-3;'

    const card = document.createElement('div');
    card.classList = 'card';

    const img = document.createElement('img');
    img.src = song.img;
    
    const cardBody = document.createElement('div');
    cardBody.classList = 'card-body';

    const title = document.createElement('h5');
    title.classList = 'card-title';
    title.textContent = song.title;

    const artist = document.createElement('p');
    artist.classList = 'card-text text-muted';
    artist.textContent = song.artist;

    const btnContainer = document.createElement('div');
    btnContainer.classList = 'd-flex justify-content-between align-items-center';

    const playBtn = document.createElement('button');
    playBtn.classList = 'btn btn-dark btn-sm';
    playBtn.innerHTML = '<i class="fa-solid fa-play"> Play</i>';
    
    const addBtn = document.createElement('button');
    addBtn.classList = 'btn btn-outline-secondary btn-sm';
    addBtn.innerHTML = '<i class="fa-solid fa-plus"> Add</i>';

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