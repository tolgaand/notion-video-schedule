const videosEl = document.querySelector("#videos");
const loadingEl = document.querySelector("#loading");
let loading = false;

const getVideosFromBackend = async () => {
  loading = true;
  const res = await fetch("http://localhost:5000/videos");
  const data = res.json();
  loading = false;
  return data;
};

const addVideosToDom = async () => {
  const videos = await getVideosFromBackend();
  if (!loading) loadingEl.style.display = "none";

  videos.forEach((video) => {
    const div = document.createElement("div");
    div.className = "col-12 col-md-4";
    div.innerHTML = `
        <div class='card'>
            <img class='card-img-top' src='${video.img}' />
            <div class='card-body'>
                <h5 class='card-title'> ${video.title}</h5>
                <p class='card-text'>${video.description}</p>
                <small>Tags: ${video.tags}</small>
                <p class='card-date'>
                    <i class="fas fa-calendar-alt"></i>
                    <span>${video.date}</span>
                </p>
            </div>
        </div>
        `;

    videosEl.appendChild(div);
  });
};

addVideosToDom();
