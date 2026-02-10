window.addEventListener("load", initFlowchart);

function initFlowchart() {
  const flowImg = document.getElementById("flowImg");
  const hotspots = document.querySelectorAll(".hotspot");
  const overlay = document.getElementById("overlay");
  const overlayImg = document.getElementById("overlay-img");
  const closeBtn = document.getElementById("closeBtn");
  const backBtn = document.getElementById("backBtn");

  // Wait for image to fully load before positioning
  if (!flowImg.complete) {
    flowImg.addEventListener("load", positionHotspots);
  } else {
    positionHotspots();
  }

  window.addEventListener("resize", positionHotspots);

  function positionHotspots() {
    hotspots.forEach(hs => {
      const left = parseFloat(hs.dataset.left);
      const top = parseFloat(hs.dataset.top);
      const width = parseFloat(hs.dataset.width);
      const height = parseFloat(hs.dataset.height);
      hs.style.left = `${left}%`;
      hs.style.top = `${top}%`;
      hs.style.width = `${width}%`;
      hs.style.height = `${height}%`;
    });
  }

  // Open overlay and load the linked image
  hotspots.forEach(hs => {
    hs.addEventListener("click", () => {
      const target = hs.dataset.target;
	  overlayImg.src = `${target}.png`;

      // reset scaling between openings
      overlayImg.style.maxWidth = "96vw";
      overlayImg.style.maxHeight = "96vh";

      overlay.classList.add("active");
    });
  });

  // Close overlay
  closeBtn.addEventListener("click", closeOverlay);
  backBtn.addEventListener("click", closeOverlay);
  overlay.addEventListener("click", e => {
    if (e.target === overlay) closeOverlay();
  });

  function closeOverlay() {
    overlay.classList.remove("active");
    setTimeout(() => {
      overlayImg.src = "";
    }, 300);
  }
}
