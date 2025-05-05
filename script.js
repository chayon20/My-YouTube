let videos = [];
let currentIndex = 0;
const pageSize = 8;
let currentFilter = 'all';

// Load video data from JSON file
fetch("video_data.json")
  .then(response => response.json())
  .then(data => {
    videos = data;
    renderVideos(currentFilter);
  });

function renderVideos(filter) {
  const container = document.getElementById("video-list");
  container.innerHTML = '';

  let filtered = videos.filter(video => {
    const isCompleted = localStorage.getItem(video.video_id) === "true";
    if (filter === "completed") return isCompleted;
    if (filter === "uncompleted") return !isCompleted;
    return true;
  });

  const visibleVideos = filtered.slice(0, currentIndex + pageSize);

  visibleVideos.forEach((video) => {
    const isCompleted = localStorage.getItem(video.video_id) === "true";

    const div = document.createElement("div");
    div.className = "video-entry";

    div.innerHTML = `
      <iframe loading="lazy" src="https://www.youtube.com/embed/${video.video_id}" frameborder="0" allowfullscreen></iframe>
      <label>
        <input type="checkbox" ${isCompleted ? "checked" : ""} onchange="toggleComplete('${video.video_id}')">
        Completed
      </label>
    `;

    container.appendChild(div);
  });

  // Show "Load More" if more videos remain
  const loadMoreBtn = document.getElementById("load-more");
  if (filtered.length > visibleVideos.length) {
    loadMoreBtn.style.display = "block";
  } else {
    loadMoreBtn.style.display = "none";
  }
}

function toggleComplete(videoId) {
  const current = localStorage.getItem(videoId) === "true";
  localStorage.setItem(videoId, !current);
}

function filterVideos(type) {
  currentIndex = 0;
  currentFilter = type;
  renderVideos(type);
}

function loadMore() {
  currentIndex += pageSize;
  renderVideos(currentFilter);
}
