import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Location, Character } from "../interface/schema";
// import CharacterCard from "../component/CharacterCard";
import { NavLink } from "react-router-dom";
import { Loader1, Loader2 } from "../component/Loader";
import BackButton from "../component/BackButton";
// import { RiMovieLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
const SingleLocation: React.FC = () => {
  const { locationid } = useParams();
  const location_url: string = `https://rickandmortyapi.com/api/location/${locationid}`;
  const [locationObj, setLocationObj] = useState<Location | null>(null);
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [isLocationLoading, setIsLocationLoading] = useState<boolean>(false);
  const [isCharactersLoading, setIsCharactersLoading] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLocationLoading(true);
        setIsCharactersLoading(true);
        const res = await fetch(location_url);
        const data: any = await res.json();
        setLocationObj(data);
        setTimeout(() => {
          setIsLocationLoading(false);
        }, 900);

        const characterList: any = data.residents;
        const ids = characterList.map((list: string) => {
          const index = list.split("/");
          return index[index.length - 1];
        });
        console.log(ids);
        const charactersPromises = ids.map((id: string) =>
          fetch(`https://rickandmortyapi.com/api/character/${id}`).then((res) =>
            res.json()
          )
        );
        const charactersData: Character[] = await Promise.all(
          charactersPromises
        );
        console.log(charactersData.length);
        setCharacterList(charactersData);
        // console.log(charactersData);
        setTimeout(() => {
          setIsCharactersLoading(false);
        }, 2100);
      } catch (error) {
        setIsLocationLoading(false);
        setIsCharactersLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [location_url]);
  // console.log(locationObj);
  return (
    <>
      <BackButton />
      {isLocationLoading ? (
        <Loader2 />
      ) : !locationObj ? (
        <div>No Location found</div>
      ) : (
        <div className="singleepisodecontainer   pb-8 px-8 bg-gray-100 flex-wrap">
          <h4 className="text-center text-2xl pb-10 w-full underline">
            Location info.
          </h4>
          <div className="flex flex-wrap px-4 gap-6">
            <div className=" pt-6 px-8 py-16 text-center gap-3 border flex flex-col justify-around items-center flex-wrap">
              <div className="">
                <CiLocationOn className="text-9xl" />
              </div>
              <div className="">
                <h4 className="text-3xl font-bold mb-4">{locationObj.name}</h4>
                <div className="mb-4">
                  <span className="">Created: </span>
                  <span>{locationObj.created}</span>
                </div>
                <div className="mb-4">
                  <span className="">Dimension : </span>
                  <span className="mr-2 font-bold">
                    {locationObj.dimension}
                  </span>
                </div>
                <div>
                  <NavLink
                    className="underline"
                    to={`https://rickandmortyapi.com/api/location/${locationObj.id}`}
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
export default SingleLocation;
