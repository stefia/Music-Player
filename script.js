const song = document.getElementById('song');

const songName = document.querySelector('.song_name');
const songAuthor = document.querySelector('.song_author');
const songImg = document.querySelector('.song_img');

const backButton = document.querySelector('.back');
const playButton = document.querySelector('.player');
const nextButton = document.querySelector('.next');

const progressBar = document.getElementById('progress');
const currentTime = document.querySelector('.current-time');
const songDuration = document.querySelector('.song-duration');



let currentSongIndex = 0;

const songs = [
  {
    title: "Lost in the City Lights",
    author: "Cosmo Sheldrake",
    src: "forest-lullaby-110624",
    img: "cover-1",
  },
  {
    title: "Forest Lullaby",
    author: "Lesfm",
    src: "lost-in-city-lights-145038",
    img: "cover-2",
  },
];

function playPause() {
  // Add pause button implementation
  if (playButton.classList.contains('pause')) {
    song.pause();
    playButton.classList.remove('pause');
    playButton.classList.add('play');
  } else {
    song.play();
    playButton.classList.remove('play');
    playButton.classList.add('pause');
  }
}
function nextSong() {
  // Add next button implementation
  if (currentSongIndex >= songs.length-1) {
    currentSongIndex = 0;
  } else {
    currentSongIndex++;
  }
  loadSong(currentSongIndex);
  playButton.click();
}

function prevSong() {
  // Add previous button implementation
  if (currentSongIndex === 0) {
    currentSongIndex = songs.length-1;
  } else {
    currentSongIndex--;
  }
  loadSong(currentSongIndex);
  playButton.click();
}

function changeSong(chooseSide) {
  switch (chooseSide) {
    case "next": 
    nextSong.call(this);
    break;
    case "prev": 
    prevSong.call(this);
    break;
  }
}


function loadSong(index) {
  // Add load song implementation
  progressBar.value = 0;
  let songCurrent = songs[index];
  song.src = `resources/${songCurrent.src}.mp3`;
  songImg.src = `resources/${songCurrent.img}.jpg`;
  songName.innerHTML = songCurrent.title;
  songAuthor.innerHTML = songCurrent.author;
  currentTime.innerHTML = '00:00';
  song.addEventListener('loadedmetadata', function Load() {
    progressBar.max = song.duration;
    songDuration.innerHTML = formatTime(song.duration);
    song.removeEventListener('loadedmetadata', Load);
    // console.log('loadedmetadata');
  });
}
function formatTime(time) {
  let min = Math.floor(time/60);
  if (min < 10) {
    min = `0${min}`;
  } 
  let sec = Math.floor(time%60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`;
}

function updateProgressBar() {
  // Handle when progress bar is updated
  progressBar.value = song.currentTime;
  currentTime.innerHTML = formatTime(song.currentTime);
}


// nextButton.addEventListener("click", nextSong);
// backButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", () => changeSong("next"));
backButton.addEventListener("click", () => changeSong("prev"));

playButton.addEventListener("click", playPause);
song.addEventListener("timeupdate", updateProgressBar);
progressBar.addEventListener("change", function () {
  song.currentTime = progressBar.value;
});

// Initial load
loadSong(currentSongIndex);