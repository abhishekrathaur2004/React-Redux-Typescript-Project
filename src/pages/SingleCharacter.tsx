import { useEffect, useState } from "react";
import { Character, Episode } from '../interface/schema'
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { PiTelevisionLight } from "react-icons/pi";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import Loader1 from "../component/Loader";


const SingleCharacter = () => {

  const { characterid } = useParams<{ characterid: string }>();
  const [characterObj, setCharacterObj] = useState<Character | null>(null);
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEpisodesLoading, setIsEpisodesLoading] = useState<boolean>(false);
  const [locationId, setLocationId] = useState<string | null>(null)

  const character_url: string = `https://rickandmortyapi.com/api/character/${characterid}`;

  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true);
      setIsEpisodesLoading(true);
      try {
        const res = await fetch(character_url);
        setIsLoading(false);
        if (!res.ok) {
          setIsLoading(false);
          return;
        }
        const data: Character = await res.json();
        let locationTempId: string[] | string = data.url.split('/');
        locationTempId = locationTempId[locationTempId.length - 1];
        setLocationId(locationTempId);
        setCharacterObj(data);
        const episodeUrls = data.episode;
        const episodePromises = episodeUrls.map((url) =>
          fetch(url).then((res) => res.json())
        );
        const episodeData = await Promise.all(episodePromises);
        setIsEpisodesLoading(false);
        console.log(episodeData);
        setEpisodeList(episodeData);
        
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchItem();
  }, [character_url]);

  if (isLoading) {
    return <Loader1/>
  }

  if (!characterObj) {
    return <div>No character found</div>;
  }
  return (
    <div className="singlecharactercontainer flex py-8 px-4 bg-gray-100 flex-wrap border rounded">
      <div className="characterdetail w-full">
        <h4 className="text-center pb-4 text-2xl underline">Character Info</h4>
        <div className="w-full px-16 text-center gap-3 flex  items-center flex-wrap">
          <div className="flex">
            <img src={`${characterObj.image}`} className="" alt="" />
          </div>
          <div className="flex-1">
            <h4 className="text-3xl hover:text-orange-600">{characterObj.name}</h4>
            <div className="mb-2">
              <span>
                <FaCircle className= {`text-center mr-2 inline ${characterObj.status === 'Alive' && 'text-green-600'} ${characterObj.status === 'Dead' && 'text-red-600'} ${characterObj.status === 'Unknown' && 'text-gray-200'}` }  />
              </span>
              <span>{characterObj.status} - {characterObj.species}</span>
            </div>
            {
              characterObj.type && <div className="mb-2">
              <span className="mr-2">{characterObj.type}</span>
            </div>
            }
            
            <div className="mb-2">
              
              <span className="mr-2">{characterObj.gender === 'Male' && <FaMale className= {`text-center inline text-xl`}/>} {characterObj.gender === 'Female' && <FaFemale className= {`text-center inline text-xl`}/>}</span>
              <span className="">{characterObj.gender}</span>
            </div>
            <div className="mb-2">
              {/* <span className="mr-2"></span> */}
              {/* <span className="mr-2">{characterObj.location.name}</span> */}
              {locationId &&<span className="block text-lg hover:text-orange-600"><NavLink to={`/location/${locationId}`} >Location : {characterObj.location.name}</NavLink></span> }
            </div>
            <div >
              <span className="mr-2">Created at : </span>
              <span className="">{characterObj.created}</span>
            </div>
            
          </div>
        </div>
      </div>
      <div className="episodes px-2 pt-14 bg-gray-100 w-full ">
        <h4 className="text-center text-xl">List of episodes</h4>
        <section>
          {/* {characters.map((character,index) => (index < 6 ? (<Characters {...character} />) : null))} */}
          { isEpisodesLoading ? <Loader1/> : 
          episodeList.length > 0 ? (
            <ul className="py-2 px-4 h-[35vh] overflow-x-scroll overflow-y-hidden home_section_page1_char  text-white flex gap-4">
              {episodeList.map((episodeinfo) => (
                <TempEpisodeCard
                  bgColor="bg-gray-200"
                  fontColor="text-black"
                  {...episodeinfo}
                />
              ))}
            </ul>
          ) : (
            <p className="text-center">No episodes found</p>
          )}
        </section>
      </div>
    </div>
  );
};

const TempEpisodeCard: React.FC<any> = (props: any) => {
  
  return (
    <article
      key={props.id}
      className={`episode ${props.bgColor || "bg-gray-100"} ${
        props.fontColor || "text-bllack"
      } px-8 min-w-64   rounded flex items-center`}
    >
      <NavLink className="flex flex-col p-6 items-center justify-center text-center h-64" to={`/episode/${props.id}`}>
        <div className="min-w-4 text-center">
          <PiTelevisionLight className="w-full  h-32" />
        </div>
        <div className="flex flex-col h-full text-center ">
    
          <h4 className="mb-3 text-xl font-bold hover:text-orange-500">
            {props.name}
          </h4>
          <h4 className="mb-3 text-xl">{props.episode}</h4>
        </div>
      </NavLink>
    </article>
  );
};
export default SingleCharacter;
