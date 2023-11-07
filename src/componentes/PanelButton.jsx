import React from 'react';
import '../hojas-de-estilos/PanelButton.css';
import { Link } from 'react-router-dom';
import { BsDot } from 'react-icons/bs';

function PanelButton(props) {



  return (
    <li className="nav-item my-1">
        <Link className="nav-link active footer-link panel-button" to={props.link} onClick={props.onclick} >
            <BsDot/>
            {props.tittle}
        </Link>
    </li>
  )
}


export default PanelButton