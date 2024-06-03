

import {NavLink } from "react-router-dom"


const Footer = () => {
  
  return (
    <section className="text-center py-32 text-white footer  bg-gray-900 ">
        <ul className="flex justify-center text-zinc-400 gap-6 ">
          <li className="hover:text-orange-500">
            <NavLink to='/'>
              Chararacters : 826
            </NavLink>
          </li>
          <li className="hover:text-orange-500">
            <NavLink to='/'>
              Locations : 126
            </NavLink>
          </li>
          <li className = "hover:text-orange-500">
            <NavLink to='/'>
              Episodes : 51
            </NavLink>
          </li>
        </ul>
        <div className="my-5">
          <span className=" text-zinc-600 mr-3">{`<>`} by </span>
          <span className="text-xl  hover:text-orange-500 ">Abhishek Krishnan Rathaur</span>
        </div>
    </section>
  )
}

export default Footer
