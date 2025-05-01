const hook = document.getElementById("hook");
const line = document.getElementById("line");
const alphabet = document.getElementById("alphabet");
let isDragging = false;
let startY = 0;
let currentOffsetY = 0;
let swayX = 0;
let released = false;

hook.addEventListener("mousedown", (e) => {
  if (released) return;
  isDragging = true;
  startY = e.clientY;
  hook.style.transition = "none";
  line.style.transition = "none";
  hook.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (released) return;

  const centerX = window.innerWidth / 2;
  swayX = (e.clientX - centerX) / 100;

  if (isDragging) {
    const dragY = e.clientY - startY;
    if (dragY > 0 && dragY < 300) {
      currentOffsetY = dragY;
      hook.style.transform = `translateY(${dragY}px) rotate(${swayX}deg)`;
      line.style.height = `${200 + dragY}px`;
  
      const tensionPercent = Math.min((dragY / 300) * 100, 100);
      document.getElementById("tension-fill").style.height = `${tensionPercent}%`;
    }
  }
  
});

document.addEventListener("mouseup", () => {
  if (released) return;
  if (!isDragging) return;

  isDragging = false;

  if (currentOffsetY >= 250) {
    released = true;

    hook.style.transition = "transform 0.4s ease, opacity 0.8s ease";
    line.style.transition = "height 0.4s ease, background-color 0.8s ease, opacity 0.8s ease";
  
    hook.style.opacity = "0";
    line.style.opacity = "0"; 
    line.style.height = `${200 + currentOffsetY}px`;
  
    document.body.classList.add("inverse");
    document.body.classList.add("inverse");

  setTimeout(() => {
    document.getElementById("alphabet").classList.add("show");
  }, 1000);


  } else {
    hook.style.transition = "transform 0.4s cubic-bezier(0.25, 1.5, 0.5, 1)";
    line.style.transition = "height 0.4s cubic-bezier(0.25, 1.5, 0.5, 1)";
    currentOffsetY = 0;
    hook.style.transform = `translateY(0px) rotate(${swayX}deg)`;
    line.style.height = `200px`;
    hook.style.cursor = "grab";
  }
  
});
hook.addEventListener("mouseenter", (e) => {
  document.body.classList.add("ripple");
});

hook.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  document.body.style.setProperty('--ripple-x', `${x}px`);
  document.body.style.setProperty('--ripple-y', `${y}px`);
});

hook.addEventListener("mouseleave", () => {
  document.body.classList.remove("ripple");
});
setTimeout(() => {
  document.getElementById("alphabet").classList.add("show");
  document.body.classList.add("show-title");
}, 3000);

const alphabetSpans = document.querySelectorAll("#alphabet span");
const alphabetContainer = document.getElementById("alphabet");

alphabetSpans.forEach((span) => {
  span.addEventListener("click", () => {
    alphabetContainer.classList.add("focused");

    alphabetSpans.forEach((s) => s.classList.remove("focus-target"));
    span.classList.add("focus-target");
  });
});
const resetBtn = document.getElementById("reset-view");

alphabetSpans.forEach((span) => {
  span.addEventListener("click", () => {
    document.body.classList.add("zoomed-in");
  });
});

resetBtn.addEventListener("click", () => {
  document.body.classList.remove("zoomed-in");
  alphabetContainer.classList.remove("focused");
  alphabetSpans.forEach((s) => s.classList.remove("focus-target"));
});
if (isDragging) {
  const dragY = e.clientY - startY;
  if (dragY > 0 && dragY < 300) {
    currentOffsetY = dragY;
    hook.style.transform = `translateY(${dragY}px) rotate(${swayX}deg)`;
    line.style.height = `${200 + dragY}px`;

    const tensionPercent = Math.min((dragY / 300) * 100, 100);
    document.getElementById("tension-fill").style.height = `${tensionPercent}%`;
  }
}


const hookGameBtn = document.getElementById("hook-game-button");
const hookGameArea = document.getElementById("hook-game");

hookGameBtn.addEventListener("click", () => {
  document.body.classList.add("hook-game-mode");
  hookGameArea.classList.add("active");
  startHookGame();
});

function startHookGame() {
  hookGameArea.innerHTML = '';

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  letters.forEach(letter => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style.position = 'absolute';
    span.style.fontFamily = 'custom-font';
    span.style.fontSize = '48px';
    span.style.color = 'white';
    span.style.top = `${Math.random() * 80 + 10}%`;
    span.style.left = `${Math.random() * 80 + 10}%`;
    span.style.cursor = 'pointer';
    span.style.transition = 'transform 0.3s ease';

    span.addEventListener('mouseenter', () => {
      span.style.transform = 'scale(1.8)';
    });

    span.addEventListener('mouseleave', () => {
      span.style.transform = 'scale(1)';
    });

    span.addEventListener('click', () => {
      span.style.color = 'red';
      span.textContent = '🎯';
    });

    hookGameArea.appendChild(span);
  });
}

