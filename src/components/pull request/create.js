import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { Button,Modal} from 'react-bootstrap';
import Select from 'react-select'
import NavBar from '../navbar'


const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    return {
      values,
      handleChange: (e) => {
        if(e.target.type==='checkbox'){
          console.log(e.target)
          setValues({
            ...values,
            [e.target.name]: e.target.checked,
           });
         }
         else{
           console.log(e.target)
           setValues({
             ...values,
             [e.target.name]: e.target.value,
           });
         }
       },
      reset: () => setValues(initialValues),
   };
 };

function Create() {
    const [list, setList] = useState([]);
    const [branch1,setBranch1] = useState('')
    const [branch2,setBranch2] = useState('')
    const [show, setShow] = useState(false);
    const [message,setMessage] = useState('')
    const {values,handleChange,reset } = useForm({body:'',merge:false,title:'',commit:''});
    const handleClose = () => {
        window.location.reload(false);
        setShow(false)};
    useEffect(() => {
        Axios({
        url: "http://127.0.0.1:8000/api/branches/",
        })
        .then((response) => {
            setList(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [setList]);

    const fetchData = async (base, body, compare,merge,title,commit) => {
        try {
          const { data } = await Axios.post(
            "http://127.0.0.1:8000/api/prs/",
            {
              base,
              body,
              compare,
              merge,
              title,
              commit
            }
          );
          setShow(true)
          setMessage(data.message)
        } catch (error) {
          console.log(error);
        }
      };
    let list_branch = []
    for (var i = 0; i < list.length; i++) {
      list_branch.push({value:list[i].branch,label:list[i].branch});
    }    
    const options = list_branch
 
    return(
      <div>
        <NavBar/>
        <div>
          <Select options={options}
          onChange={(selected)=>{
              setBranch1(selected.value)
            }}
          />
          <Select options={options} 
            onChange={(selected)=>{
              setBranch2(selected.value)
            }}/>
            <label style={{margin:5,fontWeight:'Bold'}}>Body: 
              <input 
                type='text'
                name='body'
                placeholder='body'
                onChange={handleChange}
                value={values.body}
              />
            </label>
            <label style={{margin:5,fontWeight:'Bold'}}>Title: 
                <input 
                  type='text'
                  name='title'
                  placeholder='title'
                  onChange={handleChange}
                  value={values.title}
                />
            </label>
            <label style={{margin:5,fontWeight:'Bold'}}>Commit: 
                <input 
                  type='text'
                  name='commit'
                  placeholder='commit'
                  onChange={handleChange}
                  value={values.commit}
                />
            </label>
            <label style={{margin:5,fontWeight:'Bold'}}>Just create: 
                <input 
                  style={{margin:5}}
                  type='checkbox'
                  name='created'
                  checked 
                  disabled
                />
            </label> 
            <label style={{margin:5,fontWeight:'Bold'}}>Merge: 
                <input 
                  style={{margin:5}}
                  type='checkbox'
                  name='merge'
                  onChange={handleChange}
                  value={values.merge}
                />
            </label>
            <Button variant="secondary" onClick={()=>{
              fetchData(branch1,values.body,branch2,values.merge,values.title,values.commit)
            }}>
            Create
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Mensaje</Modal.Title>
              </Modal.Header>
              <Modal.Body>Mensaje: {message}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
        </div>
      </div>
    );
}
export default Create;
