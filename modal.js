/* ============================================================
   FULL GAME DATA SET (YOUR 54 ENTRIES)
   ============================================================ */

const gameData = {
  /* ------------------ 18 POEM GAMES ------------------ */
  poem1:{ type:"digital", title:"Fireworks Across Time", play:"https://sudhakar-g.itch.io/fireworks-across-time", screenshots:["img/Game Poems/Fireworks Across the Sky/Screenshot1.png","img/Game Poems/Fireworks Across the Sky/Screenshot2.png","img/Game Poems/Fireworks Across the Sky/Screenshot3.png"], description:"“Fireworks Across Time” is an emotional journey.\nAs the player grows older, friends fade...\nThis reflective experience captures the bittersweet truth of Diwali." },

  poem2:{ type:"digital", title:"Windows of Light", play:"https://sagarsigroha.itch.io/diwali-game-poem", screenshots:["img/GamePoemSagar/ss1.png","img/GamePoemSagar/ss2.png"], description:"Windows of Light unfolds as a gentle exploration.\nMove with arrow keys.\nClick glowing windows to reveal memories." },

  poem3:{ type:"digital", title:"Soul Ascend", play:"https://sagarsigroha.itch.io/soul-ascend", screenshots:["img/GamePoemSagar/ss5.png","img/GamePoemSagar/ss6.png"], description:"In Soul Ascend, you guide a glowing soul.\nAvoid distractions.\nRise upward as chakras awaken." },

  /* (… keep all your remaining poem, pong, nondig entries …) */

  pong1:{ type:"digital", title:"Casualism", play:"https://sudhakar-g.itch.io/pong-casualism", screenshots:["img/Pong/Casualism/Screenshot1.png","img/Pong/Casualism/Screenshot2.png","img/Pong/Casualism/Screenshot3.png"], description:"This isn’t ordinary Pong — chaos, randomness, shifting paddles.\nEvery rally is unpredictable.\nYou can't master chance — flow with it." },

  /* NON-DIGITAL EXAMPLE */
  nondig1:{ type:"nondigital", title:"ND 1", description:"ND 1 short description.", screenshots:["/mnt/data/website.png","/mnt/data/website.png"], video:"video/nondigital/Comp 1.mp4", rulebook:"pdf/nondigital/Play Maxx v2.pdf" }
};



/* ============================================================
   STATE: screenshot control
   ============================================================ */
let modal, modalTitle, modalDescription, modalPlay;
let modalVideo, modalPDF, videoTitle, pdfTitle;
let modalScreenshot, prevShot, nextShot;

let currentScreens = [];
let currentShotIndex = 0;


/* ============================================================
   GLOBAL — HTML onclick="" can access this
   ============================================================ */
function openGameModal(key) {

  const data = typeof key === "string" ? gameData[key] : key;
  if (!data) return;

  modal.style.display = "flex";

  modalTitle.textContent = data.title || "";

  /* ------- Handle screenshots ------- */
  currentScreens = data.screenshots || [];
  currentShotIndex = 0;
  updateScreenshot();


  /* ============================================================
       DIGITAL
     ============================================================ */
  if (data.type === "digital") {

    modalPlay.style.display = "inline-block";
    modalPlay.href = data.play;

    modalDescription.style.display = "block";
    modalDescription.innerHTML = (data.description || "").replace(/\n/g, "<br>");

    modalVideo.style.display = "none";
    modalPDF.style.display = "none";
    videoTitle.style.display = "none";
    pdfTitle.style.display = "none";
  }

  /* ============================================================
       NON-DIGITAL
     ============================================================ */
  else if (data.type === "nondigital") {

    modalPlay.style.display = "none";

    modalDescription.style.display = "block";
    modalDescription.innerHTML = (data.description || "").replace(/\n/g, "<br>");

    // VIDEO
    if (data.video) {
      modalVideo.src = data.video;
      modalVideo.style.display = "block";
      videoTitle.style.display = "block";
    } else {
      modalVideo.style.display = "none";
      videoTitle.style.display = "none";
    }

    // RULEBOOK
    if (data.rulebook) {
      modalPDF.src = data.rulebook;
      modalPDF.style.display = "block";
      pdfTitle.style.display = "block";
    } else {
      modalPDF.style.display = "none";
      pdfTitle.style.display = "none";
    }
  }
}


/* ============================================================
   SCREENSHOT UPDATE
   ============================================================ */
function updateScreenshot() {
  if (!currentScreens.length) {
    modalScreenshot.src = "";
    return;
  }
  modalScreenshot.src = currentScreens[currentShotIndex];
}


/* ============================================================
   NEXT / PREVIOUS screenshot
   ============================================================ */
function nextScreenshot() {
  if (currentScreens.length === 0) return;
  currentShotIndex = (currentShotIndex + 1) % currentScreens.length;
  updateScreenshot();
}

function prevScreenshot() {
  if (currentScreens.length === 0) return;
  currentShotIndex = (currentShotIndex - 1 + currentScreens.length) % currentScreens.length;
  updateScreenshot();
}



/* ============================================================
   INITIALIZE — runs after DOM loads
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  modal = document.getElementById("gameModal");

  modalTitle = document.getElementById("modalTitle");
  modalDescription = document.getElementById("modalDescription");
  modalPlay = document.getElementById("modalPlay");

  modalVideo = document.getElementById("modalVideo");
  modalPDF = document.getElementById("modalPDF");

  videoTitle = document.getElementById("videoTitle");
  pdfTitle = document.getElementById("pdfTitle");

  modalScreenshot = document.getElementById("modalScreenshot");
  prevShot = document.getElementById("prevShot");
  nextShot = document.getElementById("nextShot");

  /* BUTTON EVENTS */
  prevShot.addEventListener("click", prevScreenshot);
  nextShot.addEventListener("click", nextScreenshot);

  /* KEYBOARD EVENTS */
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex") {
      if (e.key === "ArrowLeft") prevScreenshot();
      if (e.key === "ArrowRight") nextScreenshot();
      if (e.key === "Escape") closeModal();
    }
  });

  /* CLOSE BUTTON */
  document.querySelector(".close-modal").addEventListener("click", closeModal);

  /* CLICK OUTSIDE TO CLOSE */
  modal.addEventListener("click", (e) => {
    if (!document.querySelector(".modal-content").contains(e.target)) {
      closeModal();
    }
  });
});


/* ============================================================
   CLOSE MODAL
   ============================================================ */
function closeModal() {
  modal.style.display = "none";
  modalVideo.pause();
}
