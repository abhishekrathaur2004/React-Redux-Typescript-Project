
import { Location} from "./Schema";
import { NavLink } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoMdArrowRoundForward } from "react-icons/io";
const LocationCard: React.FC<any> = (props : Location) => {

    // console.log(props)
   
    // console.log(episodeName)
  return (
    
    <article key={props.id} className={`episode ${props.bgColor || `bg-neutral-600`} rounded flex items-center px-8`}>
       <div>
       <CiLocationOn className="w-full  h-32" />
       </div>
       <div className="flex flex-1 pl-7 py-6 flex-col ">
            
            <h3 className="mb-3 text-gray-200">Name</h3>
            <h4 className="mb-3 text-2xl hover:text-orange-400">{props.name}</h4>
            <h3 className="mb-3 text-gray-200 ">Dimension</h3>
            <h4 className="mb-3 text-2xl">{props.dimension}</h4>
            
       </div>
       <div>
       <NavLink to={`/location/${props.id}`}>
                <button className="py-2 px-5 hover:underline hover:text-green-400"><IoMdArrowRoundForward/></button>
            </NavLink>
       </div>
    </article>
  )
}

export default LocationCard