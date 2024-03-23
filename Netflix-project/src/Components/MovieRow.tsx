import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Movieitem from "./Movieitem";
import { Movie } from "../interfaces/movies";
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'

type MoviesDetailsProps = {
  title: string;
  url: string;
};

const MovieRow = ({ title, url }: MoviesDetailsProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axios.get(url).then((response: AxiosResponse) => {
      setMovies(response.data.results);
    });
  }, [url]);
  
  return (
    <>
      <h2 className="font-sans md:text-xl p-4 capitalize">{title}</h2>
   
      <div className="flex items-center">
      <MdChevronLeft size={30} className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10"/>
        <div className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide ">
          {movies.map((movie) => (
            <Movieitem key={movie.id} movie={movie} />
          ))}
        </div>
        <MdChevronRight size={30} className="bg-white rounded-full absolute right-2  opacity-80 text-gray-700 z-10 " />
      </div>
      
    </>
  );
};

export default MovieRow;
