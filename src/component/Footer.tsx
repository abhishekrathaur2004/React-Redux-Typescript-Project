const Footer = () => {
  
  return (
    <section className="text-center py-20 text-white footer  bg-gray-900 ">
        {/* <ul className="flex justify-center text-zinc-400 gap-6 ">
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
        </ul> */}
        <div className="py-2">
          <span className=" text-zinc-600 mr-3">{`<>`} by </span>
          <span className="text-xl  hover:text-orange-500 ">Abhishek Krishnan Rathaur</span>
        </div>
        <h4>SERVER STATUS : ONLINE</h4>
    </section>
  )
}

export default Footer
