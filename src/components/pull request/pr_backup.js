import React, { useState, useEffect } from 'react';
import Axios from "axios";
import NavBar from '../navbar'


function PRBackup() {
  const [list, setList] = useState([]);
  useEffect(() => {
    Axios({
      url: "http://127.0.0.1:8000/api/backup/",
    })
      .then((response) => {setList(response.data);})
      .catch((error) => {console.log(error);});
  }, [setList]);

  return(
    <div>
      <NavBar/>
      <div>
        {list.map((item,index) => (
          <div key={index}>
            <p>{index+1} Title:{item.title} Author: {item.author} Body:{item.description} Status:{item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default PRBackup;



