const key = import.meta.env.VITE_TMDB_KEY;

const baseUrl = 'https://api.themoviedb.org/3';

const endpoints = {
  popular: `${baseUrl}/movie/popular?api_key=${key}`,
  topRated: `${baseUrl}/movie/top_rated?api_key=${key}`,
  trending: `${baseUrl}/movie/popular?api_key=${key}&language=en-US&page=2`,
  comedy: `${baseUrl}/search/movie?api_key=${key}&language=en_US&query=comedy&page=1&include_adult=false`,
  upcoming: `${baseUrl}/movie/upcoming?api_key=${key}`,
  key:key
};
type UrlType={
    createImageUrl:(filename:string,size:string)=> string
}

// type mathType=(filename:string,size:string)=>string
 export const createImageUrl: UrlType['createImageUrl'] = (filename, size) => {
    return `https://image.tmdb.org/t/p/original/${filename}/${size}`;
  }
  



export default endpoints