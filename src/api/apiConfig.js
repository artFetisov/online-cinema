export const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: 'afc690d6298c0dc43b36e62989b549eb',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}
