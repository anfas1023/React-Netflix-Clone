import { useEffect, useState } from "react";
import { userAuth } from "../context/AuthContext";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../Services/firebase";
// import Movieitem from "../Components/Movieitem";
import { Movie } from "../interfaces/movies";
import { AiOutlineDelete } from "react-icons/ai";
import { createImageUrl } from "../Services/moviesServices";

const Profile = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const auth = userAuth();
  if (!auth) {
    throw new Error("Not defined");
  }

  const { user } = auth;

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.exists()) {
          setMovies(doc.data().favShow);
        }
      });
    }
  }, [user?.email]);

  const handleDelete = async (movie: Movie) => {
    if (user) {
      const userDoc = doc(db, "users", `${user.email}`);

      await updateDoc(userDoc, {
        favShow: arrayRemove(movie),
      });
    }
  };

  return (
    <>
      <div className="w-full h-[550px]">
        <img
          className="w-full h-[550px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/2e07bc25-8b8f-4531-8e1f-7e5e33938793/e4b3c14a-684b-4fc4-b14f-2b486a4e9f4e/IN-en-20240219-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        ></img>
        <div className=" w-full h-[550px] absolute top-0  bg-black/70"></div>
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="font-bold text-gray-400 text-3xl">My shows</h1>
          <p className="font-Nsans-light text-gray-400 text-lg">
            {user?.email}
          </p>
        </div>

        {/* moviesRor */}

        <h2 className="font-sans md:text-xl p-4 capitalize">List shows</h2>
        <div className="w-full h-full  overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide ">
          {movies.map((movie) => (
            <div className="   lg:w-[280px] ml-3 h-[200px] inline-block  rounded-lg sm:w-[200px] md:w-[240px]   ">
              <p onClick={()=>handleDelete(movie)} className="relative top-9  opacity-0 hover:opacity-100  ">
                <AiOutlineDelete size={30} className="text-gray-300 " />
              </p>
              <img
                className="h-40 w-[80%] object-cover object-top"
                src={createImageUrl(
                  movie.backdrop_path ? movie.backdrop_path : movie.poster_path,
                  "w500"
                )}
                alt="//"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
