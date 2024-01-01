document.addEventListener("DOMContentLoaded", function () {
  getSong();
});

const getSong = () => {
  fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: "Bearer <Replace with your access token>",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const trackId = data.item.id;
      getTempo(trackId);
    });
};

function getTempo(songId) {
  const apiUrl = `https://api.spotify.com/v1/audio-features?ids=${songId}`;

  fetch(apiUrl, {
    headers: {
      Authorization: "Bearer <Replace with your access token>",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const tempo = data.audio_features[0].tempo;
      document.getElementById("getBpmBtn").innerHTML = tempo;
    });
}
