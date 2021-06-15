import React, {useRef, useEffect, useState} from "react";
import '../App.css';
import Modal from 'react-modal'

function Home() {
  
  
  //const [modalOpenArray, setModalOpenArray] = useState({'activated':'none'})
  const [test1,setTest1] = useState('')
  Modal.setAppElement('#root');

  useEffect(() => {
    fetch('/api/test')
  .then(response => response.json())
  .then(data => console.log(data));
  },[])
    
    // function getOpenModal(array){
    //   switch(array['activated']){
    //     case 'LSU':
    //       return <LSU/>;
    //     case 'BC':
    //       return <BC/>;
    //     case 'UT':
    //       return <UT/>;
    //     case 'stonk':
    //       return <Stonk/>;
    //     case 'git':
    //       return <Github/>;
    //     case 'twitter':
    //       return <Twitter/>;
    //     case 'linked':
    //       return <Linkedin/>;
    //     case 'freelance':
    //       return <Freelance/>;
    //     case 'RDS':
    //       return <RDS/>;
    //     case 'expo':
    //       return <Kinnickinick/>;
    //     case 'columbine':
    //       return <Columbine/>;
    //     case 'personal':
    //       return <Personal/>; 
    //     case 'physics':
    //       return <Physics/>; 
    //     case 'pi':
    //       return <Raspberry/>;
    //     case 'bridge':
    //       return <Bridge/>;
    //     default:
    //       return <h1>Error</h1>
    //   }
    // }
    return (
    
    <div>
      
        <div className="flexContainer">
          
          <div className="flexside">
            <h3>Objective Deck</h3>
          </div>
          <div className="flexmiddle"></div>
          <div className="flexsideHeader">
            <h4>Menu</h4>
          </div>
        </div>
        <div className="fullWidth">          
          <h1>Hello World</h1>
          {/* <Modal isOpen={modalOpenArray['activated']!=='none'}>
            {getOpenModal(modalOpenArray)}
            <div className="vertical-center">
              <button type="button" className="btn btn-danger btn-lg" onClick={() => setModalOpenArray({'activated':'none'})}>Close</button>
            </div>
          </Modal> */}
          
        </div>
    </div>
    )
  }

export default Home