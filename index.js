const api_url =
  window.location.protocol === "https:"
    ? "https://api.advancedtechspace.com"
    : "http://localhost:5500";

const video = document.getElementById("video");

video.onended = () => {
  getClips();
};

video.addEventListener("error", function (event) {
  video.src = "ats-banner.mp4";
  video.play();
});

getClips();

let index = 0;

async function getClips() {
  try {
    const res = await fetch(api_url + "/panel/videos/v");
    const videos = await res.json();

    if (videos.length > 0) {
      video.src = videos[index].url;
    } else {
      video.src = "ats-banner.mp4";
      return;
    }

    video.play();

    index++;

    if (index >= videos.length) {
      index = 0;
    }
  } catch (error) {
    console.log("Error fetching videos.");
    console.log(error);
  }
}
