import React, { useState, useEffect } from 'react';
import Axios from "axios";
import NavBar from '../navbar'
import { Link } from 'react-router-dom';


function Commits(props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await Axios({
            url: `http://127.0.0.1:8000/api/branches/"${props.location.aboutProps.item}"/`,
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
            <p> 
              <Link  to = {{pathname:'/detail',
                          aboutProps:{
                            item:props.location.aboutProps.item,
                            commit:item.commit,
                          }
              }}>commit:<span className="font-weight-light">{item.commit}</span>
            </Link> 
            mensaje:{item.message} autor: {item.author} fecha:{item.date}
            </p> 
          </div>
        ))}
      </div>
    </div>
  );
}
export default Commits;
