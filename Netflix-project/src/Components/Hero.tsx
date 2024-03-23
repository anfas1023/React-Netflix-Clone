import axios, { AxiosError, AxiosResponse } from "axios";
import { ReactNode, useEffect, useState } from "react";
import endpoints,  {createImageUrl}  from "../Services/moviesServices";

const Hero = () => {
  type moviesType = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    title: string;
    release_date: string;
    overview: string;
  };
  const [movie, setMovies] = useState<moviesType | null>(null);

  useEffect(() => {
    axios
      .get(endpoints.popular)
      .then((response: AxiosResponse) => {
        const movies = response.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovies(randomMovie);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  if (!movie) {
    return (
      <>
        <p>Fetching Movies...</p>
      </>
    );
  }

  const { title, backdrop_path, release_date, overview } = movie;


  const truncate = (str: string, length: number): string => {
    return str.length > length ? str.slice(0, length) + '...' : str;
}


  return (
    <div className="w-full h-[550px] lg:h-[650px]">
      <div className="w-full h-full">
        <div className="absolute-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black">
          <img
            className="w-full h-[550px] object-cover object-top"
            src={createImageUrl(backdrop_path,"orginal")}
            alt={title}
          />
          <div className="absolute w-full top-[20%] lg:[35%] p-4 md:p-8 ">
            <h1 className="text-xl md:text-6xl font-medium">{title}</h1>
            <div className="mt-8 mb-4">
              <button className="capitalize border-2 bg-gray-300 text-black py-2 px-5 ml-5  ">Play</button>
              <button className="capitalize border-2 border-gray-300 py-2 px-5 ml-5  ">Watch later</button>
            </div>
            <p className="text-gray-400 text-sm">{release_date}</p>
            <p className="w-full md:max-[70%] xl:w-[35%]">{truncate(overview,165)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
