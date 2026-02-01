// ---- Typewriter for "about-me" ----
function changeAboutMeText(){
  const aboutMeTexts = [
    "An Entry-Level Data Analyst ",
    "Skilled in Python, SQL & Data Visualization",
    "Passionate About Data-Driven Insights",
    "Aspiring Machine Learning Engineer"
  ]; // from your original list, cleaned up wording  :contentReference[oaicite:2]{index=2}

  const typingSpeed = 90, eraseSpeed = 80, pauseTime = 2000;
  const el = document.querySelector(".about-me");
  let i = 0, j = 0, deleting = false;

  function tick(){
    const t = aboutMeTexts[i];

    if(!deleting && j < t.length){
      el.textContent += t[j++];
      return setTimeout(tick, typingSpeed);
    }
    if(deleting && j > 0){
      el.textContent = t.substring(0, --j);
      return setTimeout(tick, eraseSpeed);
    }
    deleting = !deleting;
    if(!deleting) i = (i + 1) % aboutMeTexts.length;
    setTimeout(tick, pauseTime);
  }
  tick();
}

// ---- Progress bars on view ----
function animateBarsOnView(){
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const bar = entry.target.querySelector(".progress-bar");
        const progress = bar.dataset.progress;
        bar.style.setProperty("--progress", `${progress}%`);
        bar.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.4});

  document.querySelectorAll("#languages .skill").forEach(s=>observer.observe(s));
}

// ---- Dark mode (with localStorage) ----
function setupDarkMode(){
  const btn = document.getElementById("dark-mode-toggle");
  const pref = localStorage.getItem("krishna-theme");
  if(pref === "dark"){ document.documentElement.classList.add("dark-mode"); btn.innerHTML = '<i class="fas fa-sun"></i>'; }

  btn.addEventListener("click", ()=>{
    const root = document.documentElement;
    const dark = root.classList.toggle("dark-mode");
    btn.innerHTML = dark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem("krishna-theme", dark ? "dark" : "light");
  });
}

// ---- Mobile nav toggle ----
function setupNav(){
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  toggle.addEventListener("click", ()=>{
    const open = nav.style.display === "block";
    nav.style.display = open ? "none" : "block";
    toggle.setAttribute("aria-expanded", String(!open));
  });
  // Close menu after clicking a link
  document.querySelectorAll(".site-nav a").forEach(a=>{
    a.addEventListener("click", ()=>{ if(getComputedStyle(toggle).display !== "none"){ nav.style.display = "none"; toggle.setAttribute("aria-expanded","false"); }});
  });
}

// ---- Footer year ----
function setYear(){
  document.getElementById("year").textContent = new Date().getFullYear();
}

// Init
document.addEventListener("DOMContentLoaded", ()=>{
  changeAboutMeText();
  animateBarsOnView();
  setupDarkMode();
  setupNav();
  setYear();
});






