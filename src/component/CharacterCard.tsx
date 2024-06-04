import { useEffect, useState } from "react"
// import { Character} from "./Schema";
import { NavLink } from "react-router-dom";

const CharacterCard: React.FC<any> = (props : any) => {
    const [episodeName, setEpisodeName] = useState('');
    // console.log(props);
    const episode_url : string | null = props.episode.length > 0 ? props.episode[0] : null;
    const epi : any = episode_url?.split('/');
    const episodeId : string = epi [epi.length-1];
    useEffect(()=>{
        if(!episode_url) return ;
        try {
            const fetchEpisodeName:()=> any = async ()=>{
                const res:any = await fetch(episode_url);
                const {name}: any = await res.json();
        
                setEpisodeName(`${name}`);
            }
            fetchEpisodeName();
        } catch (error) {
            console.log(error)
        }
        
    },[episode_url])
    // console.log(episodeName)
  return (
    
    <article key={props.id} className={`${props.bgColor || `bg-neutral-700`} characte  rounded flex min-w-56`}>
      
       <div className="character-image flex-1 ">
            
            <img src={props.image} alt={props.name} className=" object-contain rounded"/>
       </div>
       <div className="character-desc flex-1 flex flex-col pt-4 pl-2 text-xl">
            <div className="character_name mb-4">
                <NavLink to={`/character/${props.id}`}>
                    <h2 className=" hover:text-orange-400 cursor-pointer text-3xl font-bold">{props.name}</h2>
                </NavLink>
                <span>{props.status} - {props.species} </span>
            </div>
            <div className="character_location mb-4">
                <h2 className="text-zinc-500">Last known location:</h2>
                <NavLink to={`/location/${props.id}`}>
                    <h4 className=" hover:text-orange-400  cursor-pointer">{props.location.name}</h4>
                </NavLink>
            </div>
            <div className="character_episode">
                <h2 className="text-zinc-500">First seen in : </h2>
                <NavLink to={`/episode/${episodeId}`}>
                    <h4 className=" cursor-pointer hover:text-orange-400">{episodeName ? episodeName : 'null'}</h4>
                </NavLink>
            </div>
       </div>
    </article>
  )
}

export default CharacterCard
