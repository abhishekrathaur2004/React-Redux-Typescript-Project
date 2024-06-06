import { NavLink } from "react-router-dom";
import { PiTelevisionLight } from "react-icons/pi";
import { IoMdArrowRoundForward } from "react-icons/io";


const EpisodeCard: React.FC<any> = (props : any) => {

  return (
    
    <article key={props.id} className={`episode ${props.bgColor || "bg-neutral-600"} ${props.fontColor || "text-bllack"} px-8 min-w-64  animate-slideIn  rounded justify-center flex items-center`}>
      <div className="min-w-8"> 
        <PiTelevisionLight className="w-full  h-32"/>
      </div>
       <div className="flex flex-1 pl-7 py-6 flex-col  ">
            <h3 className="mb-3 text-gray-100">Name : </h3>
            <h4 className="mb-3 text-3xl font-bold hover:text-orange-500">{props.name}</h4>
            <h3 className="mb-3 ">Episode : </h3>
            <h4 className="mb-3 text-xl">{props.episode}</h4>            
       </div>
      <div className="flex">
        <NavLink to={`/episode/${props.id}`}>
            <button className="py-2 px-5 text-5xl hover:text-green-400 "><IoMdArrowRoundForward/></button>
        </NavLink>
      </div>
    </article>
  )
}

export default EpisodeCard
