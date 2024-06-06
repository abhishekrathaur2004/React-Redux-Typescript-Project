//imports

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";


const CharacterCard: React.FC<any> = (props: any) => {

  //state for setting episode name because we don't have a episode , we have url with us

  const [episodeName, setEpisodeName] = useState("");

  //getting episdode url 

  const episode_url: string | null = props.episode.length > 0 ? props.episode[0] : null;
  
  // variable for storing episode id

  const epi: any = episode_url?.split("/");
  const episodeId: string = epi[epi.length - 1];

  //variable for storing location id

  let locationId : string = props.location.url.split('/');
  locationId = locationId[locationId.length-1];
 
  useEffect(() => {

    // if episode url is null 
    if (!episode_url) return;


    try {

      // fetcing episode name 
      const fetchEpisodeName: () => any = async () => {
        const res: any = await fetch(episode_url);
        const { name }: any = await res.json();


        // setting episode name
        setEpisodeName(`${name}`);
      };


      // fetching is made by calling the above function 
      fetchEpisodeName();
    } catch (error) {

      console.log(error);
    }
  }, [episode_url]);
  
  return (
    <article
      key={props.id}
      className={`${
        props.bgColor || `bg-neutral-700`
      } characte  rounded flex items-center lg:gap-7 min-w-56 animate-slideIn`}
      
    >
      <div className="character-image flex-1 h-full justify-center">
        <img
          src={props.image}
          alt={props.name}
          className=" object-cover h-full rounded"
        />
      </div>
      <div className="character-desc flex-1 flex h-full flex-col py-4 pl-2 text-xl">
        <div className="character_name mb-4">
          <NavLink to={`/character/${props.id}`}>
            <h2 className=" hover:text-orange-400 cursor-pointer text-3xl font-bold">
              {props.name}
            </h2>
          </NavLink>
          <span>
            <FaCircle
              className={`text-center mr-2 inline ${
                props.status === "Alive" && "text-green-600"
              } ${props.status === "Dead" && "text-red-600"} ${
                props.status === "Unknown" && "text-gray-200"
              }`}
            />
          </span>
          <span className="text-lg">
            {props.status} - {props.species}{" "}
          </span>
        </div>
        <div className="character_location mb-4">
          <h2 className="text-zinc-400 text-lg">Last known location:</h2>
          <NavLink to={`/location/${locationId}`}>
            <h4 className=" hover:text-orange-400  cursor-pointer">
              {props.location.name}
            </h4>
          </NavLink>
        </div>
        <div className="character_episode">
          <h2 className="text-zinc-400 text-lg">First seen in : </h2>
          <NavLink to={`/episode/${episodeId}`}>
            <h4 className=" cursor-pointer hover:text-orange-400">
              {episodeName ? episodeName : "null"}
            </h4>
          </NavLink>
        </div>
      </div>
    </article>
  );
};

export default CharacterCard;
