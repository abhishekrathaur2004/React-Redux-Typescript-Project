import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader1 from "../component/Loader";
import { Episode, Character } from "../component/Schema";

import { NavLink } from "react-router-dom";
// import { CiLocationOn } from "react-icons/ci"
import { RiMovieLine } from "react-icons/ri";

const SingleEpisode = () => {
  const { episodeid } = useParams();
  const episode_url: string = `https://rickandmortyapi.com/api/episode/${episodeid}`;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [episodeobj, setEpisodeObj] = useState<Episode | null>(null);
  const [characterList, setCharacterList] = useState<Character[]>([]);
  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(episode_url);

        if (!res.ok) {
          setIsLoading(false);
          return;
        }

        const data: Episode = await res.json();
        console.log(data);
        setEpisodeObj(data);

        const charactersUrls = data.characters;
        const characterPromises = charactersUrls.map((url) =>
          fetch(url).then((res) => res.json())
        );
        const characterData = await Promise.all(characterPromises);
        // console.log(characterData);
        setCharacterList(characterData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchItem();
  }, [episode_url]);
  if (isLoading) {
    return <Loader1 />;
  }
  if (!episodeobj) {
    return <h3>No episode found... !!!</h3>;
  }
  return (
    <div className="singleepisodecontainer flex flex-col py-8 px-4 bg-gray-100 flex-wrap">
      <h4 className="text-center text-xl w-full">Episode info.</h4>
      <div className="w-full pt-6 px-16 text-center gap-3 flex  items-center flex-wrap">
        <div className="">
          <RiMovieLine className="text-6xl" />
        </div>
        <div className="flex-1">
          <h4 className="text-3xl font-bold">{episodeobj.name}</h4>
          <div className="mb-2">
            <span className="mr-2">Air_date : </span>
            <span>{episodeobj.air_date}</span>
          </div>
          <div className="mb-2">
            <span className="mr-2">Episode : </span>
            <span className="mr-2 font-bold">{episodeobj.episode}</span>
          </div>
          <div>
            <NavLink
              className="pl-12 underline"
              to={`https://rickandmortyapi.com/api/episode/${episodeobj.id}`}
            >
              Know more
            </NavLink>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-center pt-8">List of character</h2>
        <ul className="py-2  h-[40vh] overflow-x-scroll home_section_page1_char  w-screen text-white flex gap-4">
          {characterList.length > 0 ? (
            characterList.map((character, index) => (
              <li key={index}>
                {" "}
                <TempCharacterCard {...character} />
              </li>
            ))
          ) : (
            <h4>No Character Found</h4>
          )}
        </ul>
      </div>
    </div>
  );
};
const TempCharacterCard: React.FC<Character> = (props: Character) => {
  return (
    <article
      key={props.id}
      className="character bg-gray-400 rounded flex min-w-56"
    >
      <div className="character-image flex-1 relative">
        <NavLink to={`/character/${props.id}`}>
          <img src={props.image} alt={props.name} className="rounded" />
          <p className="text-center absolute z-10 bg-slate-400 w-full bottom-0 left-1/2 -translate-x-1/2">
            {props.name}
          </p>
        </NavLink>
      </div>
    </article>
  );
};
export default SingleEpisode;
