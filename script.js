"use script";
//SIDEBAR TOGGLE//
const body = document.querySelector("body"),
  sidebar = body.querySelector(".sidebar");
(toggle = body.querySelector(".toggle")),
  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar__close");
  });

// PLAYLIST PART //-
const ad = document.querySelector("#song"),
  play = document.querySelector("#play"),
  previous = document.querySelector("#prev"),
  pause = document.querySelector(".fa fa-pause"),
  next = document.querySelector("#next"),
  progressArea = document.querySelector(".progress-area"),
  progressBar = document.querySelector(".progress-bar"),
  title = document.querySelector("#title"),
  artist = document.querySelector("#artist"),
  trackImage = document.querySelector(".responsive"),
  track2 = document.querySelector(".popup__img"),
  moreMusicBtn = document.querySelector("#chev-down"),
  closeMusicBtn = document.querySelector("#close"),
  musicList = document.querySelector(".tabs"),
  sideNav = document.querySelector(".side-nav"),
  menuIcon = document.querySelector(".menu-button"),
  trackCurrentTime = document.querySelector(".current-time"), //start
  trackDuration = document.querySelector(".duration-time"), //end
  //
  volumeIcon = document.querySelector("#volume-icon"),
  currentVolume = document.querySelector("#volume"),
  //
  musicPlaylist = document.querySelector("#music-playlist"),
  pDiv = document.querySelector(".playlist-div"),
  Playlist = document.querySelector(".album-playlist__div"),
  //
  ranger = document.querySelector(".ranger"),
  rangerThumb = document.querySelector(".ranger-thumb"),
  progress = document.querySelector(".progress"),
  //
  r2Div = document.querySelector(".others"),
  r3Div = document.querySelector(".others2"),
  btnLeft = document.querySelector("#but-left"),
  btnRight = document.querySelector("#but-right"),
  buLeft = document.querySelector("#bu-left"),
  buRight = document.querySelector("#bu-right"),
  btLeft = document.querySelector("#bt-left"),
  btRight = document.querySelector("#bt-right"),
  sliderDiv1 = document.querySelector(".related-scroll"),
  list = document.querySelector(".list"),
  word = document.querySelector(".words"),
  relate = document.querySelector(".relate");

//

function open_p() {
  list.classList.toggle("show");
}
function open_q() {
  word.classList.toggle("show");
}
function open_r() {
  relate.classList.toggle("show");
}

//
btnRight.addEventListener("click", () => {
  sliderDiv1.scrollLeft += 150;
});
btnLeft.addEventListener("click", () => {
  sliderDiv1.scrollLeft -= 150;
});

//
buRight.addEventListener("click", () => {
  r2Div.scrollLeft += 150;
});
buLeft.addEventListener("click", () => {
  r2Div.scrollLeft -= 150;
});
//
btRight.addEventListener("click", () => {
  r3Div.scrollLeft += 150;
});
btLeft.addEventListener("click", () => {
  r3Div.scrollLeft -= 150;
});
// CHANGE //
let timer;
let mainElement;
let audioElement;
let autoplay = 0;
let indexTrack = 0; //currentSongIndex
let songIsPlaying = false;
let track = document.createElement("audio");

// LOAD TRACK //
function loadTrack(indexTrack) {
  clearInterval(timer);
  // resetSlider();
  track.src = trackList[indexTrack].path;
  trackImage.src = trackList[indexTrack].img;
  track2.src = trackList[indexTrack].img;
  title.innerHTML = trackList[indexTrack].name;
  artist.innerHTML = trackList[indexTrack].extra;
  track.load();

  // timer = setInterval(updateSlider, 1000);
}
loadTrack(indexTrack);

// ALL EVENT LISTENERS //

play.addEventListener("click", justPlay);
next.addEventListener("click", nextSong);
previous.addEventListener("click", prevSong);
// autoPlayBtn.addEventListener("click, autoPlayToggle");
volumeIcon.addEventListener("click", muteSound);
currentVolume.addEventListener("change", changeVolume);
// slider.addEventListener("change", changeDuration);
track.addEventListener("timeupdate", songTimeUpdate);
ranger.addEventListener("input", customRangeSlider);

function justPlay() {
  if (songIsPlaying == false) {
    playSong();
  } else {
    pauseSong();
  }
  trackImage.classList.toggle("pulse");
}

// PLAYSONG //
function playSong() {
  track.play();
  songIsPlaying = true;
  play.innerHTML = '<i class="fa fa-pause"></i>';
}
//

// PAUSESONG //
function pauseSong() {
  track.pause();
  songIsPlaying = false;
  play.innerHTML = '<i class="fa fa-play"></i>';
}
//

// NEXT SONG //
function nextSong() {
  if (indexTrack < trackList.length - 1) {
    indexTrack++;
    loadTrack(indexTrack);
    playSong();
  } else {
    indexTrack = 0;
    loadTrack(indexTrack);
    playSong();
  }

  playingNow();
  trackImage.classList.toggle("round");
}
// PREVIOUS SONG //
function prevSong() {
  if (indexTrack > 0) {
    indexTrack--;
    loadTrack(indexTrack);
    playSong();
  } else {
    indexTrack = trackList.length - 1;
    loadTrack(indexTrack);
    playSong();
  }

  playingNow();
}
//AUTOPLAY //
function autoPlayToggle() {
  if (autoplay == 0) {
    autoplay = 1;
  } else {
    autoplay = 0;
  }
}
// MUTE SOUND //
function muteSound() {
  track.volume = 0;
  currentVolume.value = 0;
}

//CHANGE VOLUME//
function changeVolume() {
  track.volume = currentVolume.value / 100;
}

//CHANGE DURATION //
// function changeDuration() {
//   let sliderPosition = track.duration * (slider.value / 100);
//   track.currentTime = sliderPosition;
// }

// RESET SLIDER //
// function resetSlider() {
//   slider.value = 0;
// }
// UPDATE SLIDER //0
// function updateSlider() {
//   let position = 0;

//   if (!isNaN(track.duration)) {
//     position = track.currentTime * (100 / track.duration);
//     slider.value = position;
//   }
//   if (track.ended) {
//     play.innerHTML = '<i class="fa fa-pause"></i>';
//     if (autoplay == 1 && indexTrack < trackList.length - 1) {
//       indexTrack++;
//       loadTrack(indexTrack);
//       playSong();
//     } else if (autoplay == 1 && indexTrack == trackList.length - 1) {
//       indexTrack = 0;
//       loadTrack(indexTrack);
//       playSong();
//     }
//   }
// }

// UPDATE CURRENT SONG TIME //
function songTimeUpdate() {
  if (track.duration) {
    let curmins = Math.floor(track.currentTime / 60);
    let cursecs = Math.floor(track.currentTime - curmins * 60);
    let durmins = Math.floor(track.duration / 60);
    let dursecs = Math.floor(track.duration - durmins * 60);

    if (dursecs < 10) {
      dursecs = "0" + dursecs;
    }
    if (durmins < 10) {
      durmins = "0" + durmins;
    }
    if (curmins < 10) {
      curmins = "0" + curmins;
    }
    if (cursecs < 10) {
      cursecs = "0" + cursecs;
    }
    trackCurrentTime.innerHTML = curmins + ":" + cursecs;
    trackDuration.innerHTML = durmins + ":" + dursecs;
  } else {
    trackCurrentTime.innerHTML = "00" + ":" + "00";
    trackDuration.innerHTML = "00" + ":" + "00";
  }
}
// DISPLAY TRACKS IN PLAYLIST

//
function displayTracks() {
  for (let i = 0; i < trackList.length; i++) {
    let div = document.createElement("div");
    div.classList.add("album-playlist__div"),
      (div.innerHTML = `
         <ul class= "playlist-ul">
                        <li li-index="${i}" id="playlist-li" onclick="changeColor(this)">
                      <span>
                        <img
                          id="imagesm"
                          src=${trackList[i].img}
                          alt="album 1"
                          class="album-playlist__img"/>
                      </span>
                      <span class="album-playlist__name">
                        <p class="album-playlist__name1">${trackList[i].name}</p>
                        <p class="album-playlist__name2">${trackList[i].singer}</p>
                      </span>
                       <p class="album-playlist__duration">${trackList[i].time}</p>
                          </li>
                     </ul>
    `);
    pDiv.appendChild(div);
  }
  // playFromPlaylist();
}

displayTracks();
//

//
function displayOthers1() {
  for (let i = 0; i < trackUse.length; i++) {
    let div = document.createElement("div");
    div.classList.add("others-div"),
      (div.innerHTML = `
             
                      <ul class="others__ul">
                        <li 
                          class="others__li"
                        >
                        <img src=${trackUse[i].img} alt="" class="others__img">
                        <span class="others__text">
                          <p class="others__text1">${trackUse[i].name}</p>
                          <p class="others__text2">${trackUse[i].sub}</p>
                        </span>
                        </li>
                   
                      </ul>
                  
    `);
    r2Div.appendChild(div);
  }
}
displayOthers1();
//
function displayOthers2() {
  for (let i = 0; i < trackOthers.length; i++) {
    let div = document.createElement("div");
    div.classList.add("others2-div"),
      (div.innerHTML = `
             
     <ul class="others__ul">
                          <li
                            class="others__li"
                          >
                          <img src=${trackOthers[i].img} alt="" class="others2__img">
                          <span class="others2__text">
                            <p class="others2__text1">${trackOthers[i].name}</p>
                            <p class="others2__text2">${trackOthers[i].sub}</p>
                          </span>
                          </li>
                     
                        </ul>
    `);
    r3Div.appendChild(div);
  }
}
displayOthers2();

// PLAY SONG FROM THE PLAYLIST //
// function playFromPlaylist() {
//   pDiv.addEventListener("click", (e) => {
//     if (e.target.classList.contains("album-playlist__duration")) {
//       const indexNum = trackList.findIndex((item, index) => {
//         if (item.time === e.target.innerHTML) {
//           return true;
//         }
//       });
//       loadTrack(indexNum);
//       justPlay();
//     }
//   });
// }

// function playChange() {
//   pDiv.addEventListener("click", (e) => {
//     if (e.target.classList.contains("album-playlist__duration")) {
//       e.target.innerHTML = '<i class="bx bx-pause"></i>';
//       const indexNum = trackList.findIndex((item, index) => {
//         if (item.time === e.target.innerHTML) {
//           return true;
//         } else {
//           return false;
//         }
//       });
//       loadTrack(indexNum);
//       playSong();
//     }
//   });
// }

// CUSTOM SLIDER //
function customRangeSlider() {
  const value = (ranger.value / ranger.max) * 100 + "%";
  console.log(value);
  progress.style.width = value;
  rangerThumb.style.cssText = `left:${value};  transform: translate(-${value}, -50%);`;
}

//UPDATE PROGRESS BAR WIDTH ACCORDING TO TIMER//
track.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;
});

//UPDATE PLAYING SONG CURRENT TIME ACC
progressArea.addEventListener("click", (e) => {
  let progressWidthval = progressArea.clientWidth;
  let clickedOffSetX = e.offsetX;
  let songDuration = track.duration;
  track.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
  playSong();
});

// REPEAT AND SHUFFLE SONG //
// const repeatBtn = document.querySelector(".play-all");
// repeatBtn.addEventListener("click", () => {
//   let getText = repeatBtn.innerText;
//   switch (getText) {
//     case "repeat":
//       repeatBtn.innerText = "repeat_one";
//       repeatBtn.setAttribute("title", "Song looped");
//       break;
//     case "repeat_one":
//       repeatBtn.innerText = "shuffle";
//       repeatBtn.setAttribute("title", "Playback shuffle");
//       break;
//     case "shuffle":
//       repeatBtn.innerText = "repeat";
//       repeatBtn.setAttribute("title", "Playlist looped");
//       break;
//   }
// });

// ad.addEventListener("ended", () => {
//   let getText = repeatBtn.innerText;
//   switch (getText) {
//     case "repeat":
//       nextSong();
//       break;
//     case "repeat_one":
//       ad.currentTime = 0;
//       loadTrack(indexTrack);
//       playSong();
//       break;
//     case "shuffle":
//       let randIndex = Math.floor(Math.random() * trackList.length + 1);
//       do {
//         randIndex = Math.floor(Math.random() * trackList.length + 1);
//       } while (indexTrack == randIndex);
//       indexTrack = randIndex;
//       loadTrack(indexTrack);
//       playSong();
//       break;
//   }
// });

//

const allLiTags = document.querySelectorAll("#playlist-li");
function playingNow() {
  for (let j = 0; j < allLiTags.length; j++) {
    let audioTag = allLiTags[j].querySelector(".album-playlist__duration");
    if (allLiTags[j].classList.contains("change")) {
      allLiTags[j].classList.remove("change");
      audioTag.innerHTML = "";
    }

    if (allLiTags[j].getAttribute("li-index") == indexTrack) {
      allLiTags[j].classList.add("change");
      audioTag.innerHTML = '<i class="bx bx-play"></i>';
    }
  }
  allLiTags[j].setAttribute("onclick", "changeColor(this)");
}
console.log(allLiTags);

function changeColor(element) {
  let getLiIndex = element.getAttribute("li-index");
  indexTrack = getLiIndex;
  loadTrack(indexTrack);
  playSong();
  playingNow();
}

// to show and hide music for phone media query //
moreMusicBtn.addEventListener("click", () => {
  musicList.classList.toggle("see");
});
closeMusicBtn.addEventListener("click", () => {
  moreMusicBtn.click();
});

// menuIcon.addEventListener("click", () => {
//   sideNav.classList.toggle("see2");
// });
