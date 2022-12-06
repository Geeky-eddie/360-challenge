const img = document.querySelector("#img");
const playPause = document.querySelector("#playpause");
const playPauseBtn = document.querySelector("#playpause-btn");
const audio = document.querySelector("#audio");
const title = document.querySelector("#title");
// const artist = document.querySelector("#artist");
const prevBtn = document.querySelector("#prevbtn");
const nextBtn = document.querySelector("#nextbtn");
const progress = document.querySelector("#progress");
const progressBar = document.querySelector(".progress-bar");
const currTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".duration-time");
const volume = document.querySelector("#volume");
const layer = document.querySelector(".layer");
const volBar = document.querySelector(".bar");
const progressLine = document.querySelector(".progress-line");
const volumeRange = document.querySelector(".volumerange");
const repeatBtn = document.querySelector("#repeat");
const likeBtn = document.querySelector("#like");
const likeIcon = document.querySelector("#likeicon");
const songListBtn = document.querySelector("#list");
const songList = document.querySelector("#songs-list");
const listCloseBtn = document.querySelector("#listclose");
// songs array

const songs = [
  {
    path: 'https://kngdomboiz.com/wp-content/uploads/2019/02/DrPastor_Paul_Enenche_-_Oh_Prince_Of_Peace.mp3',
    displayName: 'Oh prince of peace',
    artist: 'dr paul',
    cover: "https://kingdomboiz.com/wp-content/uploads/2019/02/oh-prince-of-peace-by-pastor-paul-enenche1311640555..jpg",
  },
  {
    path: 'https://gospelmetrics.com/wp-content/uploads/2022/04/Dr-Paul-Enenche-In-Might-He-Reigns-Gospelmetrics.com-c7.mp3',
    displayName: 'In might he reigns',
    artist: 'dr paul',
    cover: "https://kingdomboiz.com/wp-content/uploads/2019/02/oh-prince-of-peace-by-pastor-paul-enenche1311640555..jpg",
  },
  {
    path: 'https://gospelmetrics.com/wp-content/uploads/2022/04/dr-paul-enenche-centre-of-my-life-Gospelmetrics.com-pc.mp3',
    displayName: 'Center of my life',
    artist: 'dr paul',
    cover: "https://kingdomboiz.com/wp-content/uploads/2019/02/oh-prince-of-peace-by-pastor-paul-enenche1311640555..jpg",
  },
  {
    path: 'https://gospelmetrics.com/wp-content/uploads/2022/04/Dr-Paul-Enenche-You-Are-Mighty-Dear-Lord-Gospelmetrics.com-wv.mp3',
    displayName: 'You are mighty dear lord',
    artist: 'dr paul',
    cover: "https://kingdomboiz.com/wp-content/uploads/2019/02/oh-prince-of-peace-by-pastor-paul-enenche1311640555..jpg",
  },
  {
    path: 'https://gospelmetrics.com/wp-content/uploads/2022/04/Dr-Paul-Enenche-Agaba-Idu-Gospelmetrics.com-no.mp3',
    displayName: 'Agaba idu',
    artist: 'Dr paul',
    cover: "https://kingdomboiz.com/wp-content/uploads/2019/02/oh-prince-of-peace-by-pastor-paul-enenche1311640555..jpg",
  },
  {
    path: 'https://cdn.trendybeatz.com/audio/Asake-Joha-(TrendyBeatz.com).mp3',
    displayName: 'Joha',
    artist: 'Asake',
    cover: "https://kingdomboiz.com/wp-content/uploads/2019/02/oh-prince-of-peace-by-pastor-paul-enenche1311640555..jpg",
  },
  {
    path: 'https://cdn.trendybeatz.com/audio/Asake-Sunmomi-(TrendyBeatz.com).mp3',
    displayName: 'Sunmomi',
    artist: 'Asake',
    cover: "https://kingdomboiz.com/wp-content/uploads/2019/02/oh-prince-of-peace-by-pastor-paul-enenche1311640555..jpg",
  },
  {
    path: 'https://cdn.trendybeatz.com/audio/Asake-Ft-Burna-Boy-Sungba-Remix-(TrendyBeatz.com).mp3',
    displayName: 'Sungba',
    artist: 'Asake',
    cover: "https://kingdomboiz.com/wp-content/uploads/2019/02/oh-prince-of-peace-by-pastor-paul-enenche1311640555..jpg",
  },
];

// deafult song index 

let songIndex = 0;

// song default state

let isPlaying = false;

// song pause function

function playSong(){
  isPlaying = true;
  playPauseBtn.classList.replace("fa-play","fa-pause");
  audio.play();
}

// song play function

function pauseSong(){
  isPlaying = false;
  playPauseBtn.classList.replace("fa-pause","fa-play");
  audio.pause();
}

// loading songs

function loadSong(song){
    img.src = song.cover;
    title.textContent = song.displayName;
    audio.src = song.path;
};

// function loadSong(song){
//     img.src = song.cover;
//     artist.textContent = song.artist;
//     audio.src = song.path;
// };

// previous song 

function prevSong(){
  songIndex--;
  if(songIndex < 0){
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// next song

function nextSong(){
  songIndex++;
  if(songIndex > songs.length-1){
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// progress bar function
console.log(audio.duration);

function updateProgress(e){
  if (isPlaying) {
    const { duration, currentTime } = e.target;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;
    progressLine.style.width = `${progressPercent}%`;
    if(progressPercent==100){
      return nextSong();
    }
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      totalDuration.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currTime.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function progressSlide(e){
  const { value } = e.target;
  const progressTime = Math.ceil((audio.duration / 100) * value);
  audio.currentTime = progressTime;
  console.log(progressTime);
    if(!isPlaying) {
      progressLine.style.width = `${value}%`;    
   }
}

function volumeBar(){
  layer.classList.toggle('hide');
  setTimeout(()=>{
    if(layer.classList.contains("hide")){
      layer.classList.remove("hide");
    }
  }, 5000);
}

function setVolume(){
  audio.volume = volumeRange.value;
  const barWidth = (volumeRange.value/1)*100;
  volBar.style.width = `${barWidth}%`;
}

function repeat(){
  repeatBtn.classList.toggle('color');
  const repeatBtnState = repeatBtn.classList.contains("color");
  if(repeatBtnState){
    audio.loop = true;
    loadSong();
  }else{
    audio.loop = false;
    loadSong();
  }
  
}

// function like(){
//   likeBtn.classList.toggle('color');
//   if(likeBtn.classList.contains("color")){
//   likeIcon.classList.replace("far","fas");
// }else{
//   likeIcon.classList.replace("fas","far");
// }}

function like() {
  if (likeBtn.classList.toggle('color')) {
    likeIcon.classList.replace('far', 'fas');
  } else {
    likeIcon.classList.replace('fas', 'far');
  }
}

function musicList(){
  songList.classList.toggle("showlist");
  listCloseBtn.addEventListener("click",()=>{
    songList.classList.remove("showlist");
  })
}


playPause.addEventListener("click", () => (isPlaying ? pauseSong() : playSong())); 
prevBtn.addEventListener("click",prevSong);
nextBtn.addEventListener("click",nextSong);
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("input", progressSlide);
volume.addEventListener("click", volumeBar);
volumeRange.addEventListener("input",setVolume);
repeatBtn.addEventListener("click", repeat);
likeBtn.addEventListener("click", like);
songListBtn.addEventListener("click",musicList);