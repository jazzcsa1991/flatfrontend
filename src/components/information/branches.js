import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import NavBar from '../navbar'


function Branches() {
  const [list, setList] = useState([]);
  useEffect(() => {
    Axios({url: "http://127.0.0.1:8000/api/branches/",})
      .then((response) => {setList(response.data);})
      .catch((error) => {console.log(error);});
  }, [setList]);

  return(
    <div>
      <NavBar/>
      <div>
        {list.map((item,index) => (
          <div key={index}>
            <Link to = {{pathname:'/commit',
                         aboutProps:{item:item.branch}
            }}>
            <p>{index+1} <span className="font-weight-light">{item.branch}</span></p>
            </Link>
          </div>
        ))}
      </div> 
    </div>
    
  );
}
export default Branches;



