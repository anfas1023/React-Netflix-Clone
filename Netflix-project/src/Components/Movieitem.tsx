import { createImageUrl } from "../Services/moviesServices";
import { Movie } from "../interfaces/movies";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { useState } from "react";
import { userAuth } from "../context/AuthContext";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../Services/firebase";

type Props = {
  movie: Movie;
};

const Movieitem = ({ movie }: Props) => {
  const { title, backdrop_path, poster_path } = movie;
  const [like, setLike] = useState<boolean>(false);

  const auth = userAuth();

  if (!auth) {
    throw new Error("Undefined value here");
  }

  const { user } = auth;

  const handeLike = async () => {
    const userEmail = user?.email;

    if (userEmail) {
      const userDoc = doc(db, "users", userEmail);
      setLike(!like);

      await updateDoc(userDoc, {
        favShow: arrayUnion({ ...movie }),
      });
    }
  };

  return (
    <div className=" relative overflow-y-hidden w-[160px]  sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg cursor-pointer m-2 scrollbar-hide ">
      <img
        className="h-40 object-cover object-top"
        src={createImageUrl(
          backdrop_path ? backdrop_path : poster_path,
          "w500"
        )}
        alt={title}
      />

      <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
        <p className="  text-xs md:text-sm flex justify-center items-center h-full font-Nsans-Bold ">
          {title}
        </p>
        <p onClick={handeLike}>
          {like ? (
            <FaHeart
              size={20}
              className="absolute top-2  left-2 text-gray-300"
            />
          ) : (
            <FaRegHeart
              size={20}
              className="absolute top-0 left-0  text-gray-300 "
            />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movieitem;
