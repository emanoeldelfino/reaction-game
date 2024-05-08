const playBtn = document.querySelector(".play-btn");
const pageBody = document.querySelector("body");
const adviceText = document.querySelector(".text");
const reactionText = document.querySelector(".reaction");

const hexChars = "0123456789ABCDEF";

function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomElem(arr, num = 1) {
  if (num === 1) {
    return arr[Math.floor(Math.random() * arr.length)];
  } else if (num <= 0) {
    return null;
  } else {
    let elems = [];
    for (i = 0; i < num; i++) {
      elems.push(arr[Math.floor(Math.random() * arr.length)]);
    }
    return elems;
  }
}

let elapsedMsChangeDate;

playBtn.addEventListener("click", () => {
  setTimeout(() => {        
    reactionText.style.display = "none";
    adviceText.style.display = "block";
    playBtn.style.display = "none";

    pageBody.addEventListener("click", clickHandler);

    setTimeout(() => {
      document.body.style.background = "#" + getRandomElem(hexChars, 6).join("");
    
      elapsedMsChangeDate = Date.now();
    }, getRandomRange(1000, 3000));
  }, 500)
});

function clickHandler() {
  if (!elapsedMsChangeDate) { 
    alert("Invalid! Click only after change in color.");
    location.reload();
    return;
  }

  let msReaction = Date.now() - elapsedMsChangeDate;

  adviceText.style.display = "none";
  reactionText.style.display = "block";
  reactionText.innerText = `Your reaction time was ${msReaction}ms.`;
  
  playBtn.value = "Play again";
  playBtn.style.display = "block";

  elapsedMsChangeDate = null;

  pageBody.removeEventListener("click", clickHandler);
}
