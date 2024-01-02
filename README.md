## Chrome Extension to show BPM of currently playing song on Spotify

## Setup

0. Download this repo.
1. Go to Extensions (chrome://extensions/).
2. Enable the "Developer Mode" toggle on the top right.
3. Hit "Load Unpack" on the top left and select this folder.
4. Go to [Spotify](https://developer.spotify.com/dashboard).
5. Create new App.
6. Enter a Redirect URI "https://\<app-id\>.chromiumapp.org/oauth2". Replace "\<app-id\>" with the id found on the chrome-extension added in step 3.
7. Replace `client_id` and `client_secret` in popup.js with the values from your new App.
8. Hit reload on the chrome-extension.
