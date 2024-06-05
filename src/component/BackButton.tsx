import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";


const BackButton = () => {
  return (
    <div className="text-6xl pl-[70px] pt-10 bg-gray-100">
        <Link to="/">
            <IoMdArrowRoundBack/>
        </Link>
    </div>
  )
}

export default BackButton
