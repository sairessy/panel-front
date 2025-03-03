const api_url =
  window.location.protocol !== "https:"
    ? "https://api.advancedtechspace.com"
    : "http://localhost:5500";

const video = document.getElementById("video");

video.onended = () => {
  getClips();
};

video.addEventListener("error", function (event) {
  console.log(event);
  video.src = "ats-banner.mp4";
  video.play();
});

getClips();

async function getClips() {
  try {
    const res = await fetch(api_url + "/panel/videos/v");
    const videos = await res.json();

    if (videos.length > 0) {
      const pos = Math.round(Math.random() * (videos.length - 1));
      video.src = videos[pos].url;
    } else {
      video.src = "ats-banner.mp4";
      return;
    }

    video.play();
  } catch (error) {
    console.log("Error fetching videos.");
    console.log(error);
  }
}
