// Define the options for the select field
const options: string[] = ["Characters", "Locations", "Episodes"];
import { useDispatch } from "react-redux";

import { setSelectedType } from "../feature/dataSlice";
const SelectForm: React.FC = () => {
    
    const dispatch = useDispatch();
    
    function handleChange(e : any){
        // setSelectedItem(e.target.value)
        dispatch(setSelectedType(e.target.value))
    }
    

    return (
        <form className="text-center " >
            <label className="mr-6" htmlFor="mySelect">Choose an option:</label>
            <select className="text-black"  id="mySelect" onChange={handleChange}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </form>
    );
};

export default SelectForm;
