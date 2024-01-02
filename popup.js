const redirect_uri = chrome.identity.getRedirectURL("oauth2");
const client_id = "<client-id>";
const client_secret = "<client-secret>";
const scopes = ["user-library-read", "user-read-playback-state"];
const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(
  redirect_uri
)}&scope=${scopes.join("%20")}&response_type=code`;

document.addEventListener("DOMContentLoaded", function () {
  authorize().then((token) => {
    getSong(token);
  });
});

const authorize = () =>
  new Promise((resolve, reject) => {
    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true,
      },
      (redirectURL) => {
        const params = new URLSearchParams(new URL(redirectURL).search);
        const code = params.get("code");
        return fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(client_id + ":" + client_secret),
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri,
          }),
        }).then((resp) => {
          resp.json().then((respText) => {
            const accessToken = respText.access_token;
            chrome.storage.local.set({ accessToken }).then(() => {
              resolve(accessToken);
            });
          });
        });
      }
    );
  });

const getSong = (accessToken) => {
  fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const trackId = data.item.id;
      getTempo(trackId, accessToken);
    });
};

const getTempo = (songId, accessToken) => {
  const apiUrl = `https://api.spotify.com/v1/audio-features?ids=${songId}`;

  fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const tempo = data.audio_features[0].tempo;
      document.getElementById("getBpmBtn").innerHTML = tempo;
    });
};
