import React, { useState, useEffect, useContext } from 'react';
import { ApiContext } from '../App';
import './MultiSelectDropdown.css';
import { RxCross1 } from "react-icons/rx";

const MultiSelectDropdown = () => {
  const { apiEndpoint } = useContext(ApiContext);
  const [apiData,setApiData] = useState([])
  const [searchTerm,setSearchTerm] = useState("");
  const [selectedOptions,setSelectedOptions] = useState([]);
  const [filteredData,setFilteredData] = useState([]);
  const [isDropdownOpen,setIsDropDownOpen] = useState(false);
  console.log(apiData);

  useEffect(()=>{

    fetch(apiEndpoint)
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      
      setApiData(data)
    })
    .catch((err)=>{
      console.log("Error fetching data",err);
    })

  },[apiEndpoint])

  useEffect(()=>{
    const filtered_data = apiData.filter(item =>item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(filtered_data);

  },[searchTerm,apiData])

  const handleSearchChange = (e) =>{
    setSearchTerm(e.target.value);
    setIsDropDownOpen(true);
  }
  
  const handleOptionClick =(option) =>{
    if(!selectedOptions.includes(option)){
      setSelectedOptions([...selectedOptions,option]);
    }
    setSearchTerm("");
    setIsDropDownOpen(false);
  }

  const handleRemoveOption = (option)=>{
    const removeOption = selectedOptions.filter(item => item !== option);
    setSelectedOptions(removeOption);
  }

  const handleClearAll =()=>{
    setSelectedOptions([]);
  }

  return (
    <div className="multi-select-dropdown">
        <div className="search-bar">
          {
            selectedOptions.map((option)=>{
              return <div className="tag">
                {option.name}
                <span onClick={()=> handleRemoveOption(option)} className="remove-tag">
                  <RxCross1 />
                </span>
              </div>
            })
          }
          <input 
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={()=>setIsDropDownOpen(true)}
                placeholder='Search...'
          />
          {
            selectedOptions.length > 0 && (
              <button onClick={handleClearAll} className="clear-all" ><RxCross1 /></button>
            )
          }
          
        </div>
        {
          isDropdownOpen && filteredData.length >0 &&(
            <ul className="dropdown-list">
              {
                filteredData.map((item,index) =>{
                  return <li
                         key={item.id}
                         className='dropdown-item'
                         onClick={()=>handleOptionClick(item)} 
                  >
                          {item.name}
                  </li>
                })

              }
            </ul>
          )
        }
    </div>
  );
};

export default MultiSelectDropdown;
