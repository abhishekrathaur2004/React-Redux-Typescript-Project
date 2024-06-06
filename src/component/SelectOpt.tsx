// Define the options for the select field
const options: string[] = ["Characters", "Locations", "Episodes"];
import {useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setSelectedType } from "../feature/dataSlice";
const SelectForm: React.FC = () => {
    
    const selectedItem = useSelector((state : RootState) => state.dataSet.selectedType)
    const dispatch = useDispatch();
    
    function handleChange(e : any){
        // setSelectedItem(e.target.value)
        window.localStorage.setItem('currentPage', '1');
        dispatch(setSelectedType(e.target.value))
    }
    

    return (
        <form className="text-center flex flex-col" >
            <label className="mr-4" htmlFor="mySelect">Choose an option:</label>
            <select className="text-black px-2 py-1 border rounded focus:outline-0"  id="mySelect" onChange={handleChange} value={selectedItem}>
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
