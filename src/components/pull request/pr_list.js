import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { Button,Modal,ToggleButton,ButtonGroup} from 'react-bootstrap';
import NavBar from '../navbar'


function PRList() {
  const [list, setList] = useState([]);
  const [number,setNumber] = useState(0);
  const [commit,setCommit] = useState('');
  const [show, setShow] = useState(false);
  const [isMerge,setIsMerge] = useState(false)
  const [message,setMessage] = useState('')
  const handleClose = () => {
    window.location.reload(false);
    setShow(false)};
  useEffect(() => {
    Axios({
      url: "http://127.0.0.1:8000/api/prs/",
    })
      .then((response) => {setList(response.data);})
      .catch((error) => {console.log(error);});
  }, [setList]);
  const closePR = async (number) => {
    try {
      const { data } = await Axios.post(
        "http://127.0.0.1:8000/api/prs/1/close_pr/",{number}
      );
      setMessage(data.message)
    } catch (error) {
      console.log(error);
    }
  };
  const mergePR = async (number,commit) => {
    try {
      const { data } = await Axios.post(
        "http://127.0.0.1:8000/api/prs/1/merge_pr/",{
          number,
          commit
        }
      );
      setMessage(data.message)
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <div>
      <NavBar/>
      <div>
        {list.map((item,index) => (
            <div key={index}>
              <p>Title:{item.title} Author:{item.user} Date:{item.created_at} status:{item.state} {(item.state=="open")?
              <>
                <ButtonGroup toggle className="mb-2">
                  <ToggleButton
                    type="checkbox"
                    variant="secondary"
                    value={item.number}
                    onChange={(e) => {
                      setNumber(e.target.value)
                      setShow(true)
                      setIsMerge(true)
                    }}
                  >
                    Merge
                  </ToggleButton>
                  <ToggleButton
                    type="checkbox"
                    variant="secondary"
                    value={item.number}
                    onChange={(e) => {
                      setNumber(e.target.value)
                      setShow(true)
                    }}
                  >
                    Close
                  </ToggleButton>
                </ButtonGroup>
              </>
              :""}</p>
            </div>
          ))}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Mensaje</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              isMerge ? 
              <>
                <label style={{margin:5,fontWeight:'Bold'}}>Commit: 
                  <input 
                    style={{margin:5}}
                    type='text'
                    name='merge'
                    value={commit}
                    onChange={e => setCommit(e.target.value)}
                  />
                </label>
              </>:""
            }
            <p>Mensaje:{message} </p>
          </Modal.Body>
          <Modal.Footer>
            {
              isMerge?
              <Button variant="secondary" onClick={()=>mergePR(number,commit)}>
              MergePR
              </Button>:
              <Button variant="secondary" onClick={()=>closePR(number)}>
              ClosePR
            </Button>
            }
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
export default PRList;
