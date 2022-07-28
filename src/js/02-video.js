import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';
let currentTime = 0;

getPlaybackTime();
setTime(currentTime);

player.on('timeupdate', throttle(savePlaybackTime, 1000));

function savePlaybackTime({ seconds }) {
  localStorage.setItem(STORAGE_KEY, seconds);
}

function getPlaybackTime() {
  dataJson = Number(localStorage.getItem(STORAGE_KEY));
  if (dataJson) {
    currentTime = dataJson;
  }
}

function setTime(time) {
  player
    .setCurrentTime(time)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
