import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader1, Loader2 } from "../component/Loader";
import { Episode, Character } from "../interface/schema";

import { NavLink } from "react-router-dom";
// import { CiLocationOn } from "react-icons/ci"
import { RiMovieLine } from "react-icons/ri";
import BackButton from "../component/BackButton";

const SingleEpisode = () => {
  const { episodeid } = useParams();
  const episode_url: string = `https://rickandmortyapi.com/api/episode/${episodeid}`;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [episodeobj, setEpisodeObj] = useState<Episode | null>(null);
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [isCharactersLoading, setIsCharactersLoading] =
    useState<boolean>(false);
  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true);
      setIsCharactersLoading(true);
      try {
        const res = await fetch(episode_url);
        setTimeout(() => {
          setIsLoading(false);
        }, 900);
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
        const characterData: Character[] = await Promise.all(characterPromises);
        // setIsCharactersLoading(false);
        // console.log(characterData);
        setTimeout(() => {
          setIsCharactersLoading(false);
        }, 2100);
        setCharacterList(characterData);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchItem();
  }, [episode_url]);
  return (
    <>
      <BackButton />
      {isLoading ? (
        <Loader2 />
      ) : !episodeobj ? (
        <h3>No episode found... !!!</h3>
      ) : (
        <div className="singleepisodecontainer   pb-8 px-8 bg-gray-100 flex-wrap">
          <h4 className="text-center text-2xl pb-10 w-full underline">
            Episode info.
          </h4>
          <div className="flex flex-wrap px-4 gap-6">
            <div className=" pt-6 px-8 py-16 text-center gap-3 border flex flex-col justify-around items-center flex-wrap">
              <div className="">
                <RiMovieLine className="text-9xl" />
              </div>
              <div className="">
                <h4 className="text-3xl font-bold">{episodeobj.name}</h4>
                <div className="mb-4">
                  <span className="mr-2">Air_date : </span>
                  <span>{episodeobj.air_date}</span>
                </div>
                <div className="mb-4">
                  <span className="mr-2">Episode : </span>
                  <span className="mr-2 font-bold">{episodeobj.episode}</span>
                </div>
                <div>
                  <NavLink
                    className="underline"
                    to={`https://rickandmortyapi.com/api/episode/${episodeobj.id}`}
                  >
                    Know more
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="flex-1">
              {isCharactersLoading ? (
                <>
                  <Loader1 />
                  <h2 className="text-md text-center">
                    List of characters loading
                  </h2>
                </>
              ) : characterList && characterList.length > 0 ? (
                <>
                  
                  <ul className="overflow-y-scroll  h-[60vh] px-auto home_section_page1_char w-full flex justify-center flex-wrap text-white  gap-4">
                    {characterList.map((character, index) => (
                      <li key={index}>
                        {" "}
                        <TempCharacterCard {...character} />
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-center text-2xl">No Character Found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
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
