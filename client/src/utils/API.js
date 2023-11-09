// import fetch from 'node-fetch';

// const audioDbRootUrl = 'https://theaudiodb.p.rapidapi.com';

// const audioDbOptions = {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     'X-RapidAPI-Key': process.env.AUDIODB_APIKEY,
//     'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com',
//   },
// };

// export const getAlbumsByArtist = async (artistName) => {
//   try {
//     const searchResult = await fetch(`${audioDbRootUrl}/searchalbum.php?s=${artistName}`, audioDbOptions);
//     const albums = await searchResult.json();
//     return albums;
//   } catch (error) {
//     console.error('Error fetching albums:', error);
//     throw error;
//   }
// };

// export const getAlbumById = async (id) => {
//   try {
//     const response = await fetch(`${audioDbRootUrl}/album.php?m=${id}`, audioDbOptions);
//     const album = await response.json();
//     return album;
//   } catch (error) {
//     console.error('Error fetching album by ID:', error);
//     throw error;
//   }
// };