import React, { useState, useEffect } from 'react';
import Axios from "axios";
import NavBar from '../navbar'


function CommitsDetail(props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await Axios({
            url: `http://127.0.0.1:8000/api/branches/"${props.location.aboutProps.item}"/commit/?commit="${props.location.aboutProps.commit}"`,
          });
  
          setList(response.data);
        } catch (error) {
          console.log(error);
        }
    };
    fetchData();
  }, [setList]);

  return(
    <div>
      <NavBar/>
      <div>
        {list.map((item,index) => (
          <div key={index}>
            <p>Mensaje: {item.message}</p>
            <p>fecha: {item.date}</p>
            <p>archivos modificados: {item.files}</p>
            <p>nombre autor: {item.author}</p>
            <p>mail autor: {item.mail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CommitsDetail;
