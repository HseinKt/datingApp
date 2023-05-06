import Header from "../../components/search_page/header";
import SearchInput from "../../components/search_page/search_input";
import { useEffect, useState } from "react";
import Dropdown from "../../components/search_page/dropdown";
import Cards from "../../components/search_page/card";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SearchPage = () => {
    const [value, setValue] = useState('');
    const [token, setToken] = useState("");
    const [results, setResults] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const myToken = localStorage.getItem('token');
        if(!myToken) {
            navigate("/login");
        }
        else {
            setToken(myToken);
            try {
                axios.get("http://localhost:8000/api/v0.0.1/get_all_users", {
                    headers : {
                        'Authorization' : "Bearer " + myToken
                    }
                })
                .then(response => {
                    console.log(response.data);
                    setResults(response.data.users)
                })
                .catch (error => {
                    console.log("axios error: " + error);
                })
            } catch (error) {
                console.log("Catcher error: " + error);
            }
        }
    }, [])

    const handleChange = (e)=> {
        e.preventDefault();
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleOptionClick = (optionId) => {
        setSelectedOption(optionId);
        console.log(selectedOption);
    }

    return ( 
        <div>
            <Header />
            <div className="search-container">
                <div className="search-dropdown">
                    <Dropdown selectedOption={selectedOption} handleOptionClick={handleOptionClick}/>
                </div>
                <div className="search">
                    <SearchInput value={value} searchBy={selectedOption} handleChange={handleChange} handleSubmit={handleSubmit} />
                </div>
            </div>
            <div className="cards">
                {results.map((user, index) => (
                    <div>
                        <Cards data={user}/>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default SearchPage;