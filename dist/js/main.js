const clientId = "724e85097212417aaf90064b7dd1e82c";
const clientSecret = "1cb9c660c7954094806a93f6d845016f";
const artistID = "5dyTDm9MPLkLvRLLbIkeZb"; // Replace with your client ID
const albumID = "63M3KdnyUatLfSMz2yHiMK";


const getUserProfile = (artistID, accessToken) => {
  $.ajax({
    url: `https://api.spotify.com/v1/artists/${artistID}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    success: function(response) {
      console.log('User profile:', response);
      // You can now use the access token to make API requests on behalf of the user
    },
    error: function(error) {
      console.error('Error fetching access token', error);
    }
  });
}

const getAlbum = (albumID, accessToken) => {
  $.ajax({
    url: `https://api.spotify.com/v1/albums/${albumID}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    success: function(response) {
      //console.log('Album:', response.tracks.items);
      let tracksContainer = $('.hero-album-tracks');
      tracksContainer.html('');
      
      let tracks = response.tracks.items;
      for (const track of tracks.slice(0,4)) {
        tracksContainer.append(`<li class="hero-album-song nav-item p-0 bg-white border-1 border-primary rounded-1 mb-2">
                                  <a href="#" class="nav-link p-2">
                                    <i class="fi fi-br-play-circle mx-1"></i>
                                    <span>${track.name}</span>
                                  </a>
                                </li>`);  
        }
        // You can now use the access token to make API requests on behalf of the user
      },
      error: function(error) {
        console.error('Error fetching access token', error);
      }
    });
  }


  if (sessionStorage.getItem('access_token') !== null) {
  getAlbum(albumID, sessionStorage.getItem('access_token'));
} else {
  $.ajax({
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    },
    success: function(response) {
      //console.log('Access Token:', response.access_token);
      //getUserProfile(artistID, response.access_token);
      sessionStorage.setItem('access_token', response.access_token);
      getAlbum(albumID, response.access_token);
      // You can now use the access token to make API requests on behalf of the user
    },
    error: function(error) {
      console.error('Error fetching access token', error);
    }
  });
}
  
  
  