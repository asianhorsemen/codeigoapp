lucide.createIcons();

window.onload = function () {
  window.scrollTo(0, document.body.scrollHeight);
  showSection('video');
};

const videoPlayer = document.getElementById('videoPlayer');
const videoSource = document.getElementById('videoSource');
const lessonButtons = document.querySelectorAll('.video-button button');
const lockIcons = document.querySelectorAll('.lock-icon');
const playIcons = document.querySelectorAll('.play-icon');

let currentLesson = 0;

function changeVideo(videoFile) {
  videoSource.src = videoFile;
  videoPlayer.load();
  videoPlayer.play();
}

videoPlayer.addEventListener('ended', () => {
  if (currentLesson < lessonButtons.length - 1) {
    currentLesson++;
    lessonButtons[currentLesson].removeAttribute('disabled');
    lockIcons[currentLesson].classList.add('hidden'); 
    const playIcon = lessonButtons[currentLesson].querySelector('.play-icon');
    playIcon.classList.remove('hidden'); 
  }
});

lessonButtons[0].removeAttribute('disabled');
lockIcons[0].classList.add('hidden'); 
const firstPlayIcon = lessonButtons[0].querySelector('.play-icon');
firstPlayIcon.classList.remove('hidden'); 