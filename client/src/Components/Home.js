import React, {useRef, useEffect, useState} from "react";
import '../App.css';
import Modal from 'react-modal'
// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'
import { Provider,connect } from 'react-redux'
import { addActiveNav } from '../redux'
import store from '../redux/store'
import LoginContainer from './LoginContainer'
function Home(props) {
  
  
  //const [modalOpenArray, setModalOpenArray] = useState({'activated':'none'})
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  Modal.setAppElement('#root');

  useEffect(() => {
    fetch('/api/test').then( response => response.json()).then( data => console.log(data))
  },[])
  function handleItemClick (data){ 
    props.addActiveNav(data)
  }
    function getOpenModal(array){
      switch(array){
        case 'login':
          return <LoginContainer/>;
        default:
          return <h1>Error</h1>
      }
    }
    return (
    
    <div>
      
        <div className="fullWidth">          
          <h1>Hello World</h1>
          
          <Modal isOpen={props.activeNav!=='none'}>
          
            {getOpenModal(props.activeNav)}
            <div className="vertical-center">
              <button type="button" className="btn btn-danger btn-lg" onClick={() => handleItemClick('none')}>Close</button>
            </div>
           
          </Modal>
          
        </div>
    </div>
    )
  }
  const mapStateToProps = state => {
    return {
      isAuthenticated: state.usersFromRootReducer.isAuthenticated,
      activeNav: state.usersFromRootReducer.activeNav,
    }
  }
  
const mapDispatchToProps = dispatch => {
return {
    addActiveNav: (x) => dispatch(addActiveNav(x)),
    
}
}
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)