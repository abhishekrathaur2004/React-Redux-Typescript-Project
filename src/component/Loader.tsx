import { ColorRing, ThreeDots } from "react-loader-spinner";
import { Loaderprops } from "../interface/schema";

const Loader1: React.FC<Loaderprops> = ({
  bgColor = "bg-gray-100",
  color = "singlepages",
}) => {
  const colorOption = {
    option1: ["#1f2937", "#1f2937", "#1f2937", "#1f2937", "#1f2937"],
    option2: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  };
  return (
    <div className={`${bgColor} flex justify-center text-center`}>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={
          color === "singlepages"
            ? (colorOption.option1 as any)
            : (colorOption.option2 as any)
        }
      />
    </div>
  );
};
const Loader2 = () => {
  return (
    <div className="bg-gray-100 flex justify-center text-center">
      <ThreeDots
        visible={true}
        height="180"
        width="180"
        color=" #1f2937"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export { Loader1, Loader2 };
