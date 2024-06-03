// Define the options for the select field
const options: string[] = ["Characters", "Locations", "Episodes"];

const SelectForm: React.FC = ({setSelectedItem} : any) => {
    
    function handleChange(e : any){
        setSelectedItem(e.target.value)
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
