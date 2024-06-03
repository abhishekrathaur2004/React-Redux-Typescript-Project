import { Link } from "react-router-dom"
const NotFound = () => {
  return (
    <div className="notfoundpage pt-36  px-20 text-center">
      <h4 className="text-8xl mb-20">404! Page not found</h4>
      <Link
        to='/home'>
            <button className="px-10 mb-5 py-3 text-lg underline">Go Back</button>
      </Link>
    </div>
  )
}

export default NotFound
