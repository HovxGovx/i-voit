import React, { Component } from 'react'
import "./NavbarStyles.css"
import logo from '../Assets/Icons/covoiturage.png'
import voyage from '../Assets/Icons/covoiturage(1).png'
import ajout from '../Assets/Icons/utilisateur-du-cercle.png'
class Navbar extends Component{
    state = {clicked: false }
    HandleClick  = () =>{
        this.setState({
            clicked: !this.state.clicked
        })
    }
    render(){
  return (
    <div>
      <nav id='trois'>
        <a href="#trois">
            <img src={logo} 
            id='logo-15'
            width='59'
            height='58'
            viewBox="0 0 59 58"
            fill="none"
            alt='noalt'/>
        </a>
            <div>
                <ul id="navbar">
                    <li>
                        <a href="#trois" className="active">
                            Trajet</a>
                        </li>
                    <li>
                        <a href="#trois" className="trois">
                            Partager</a>
                        </li>
                        <li>
                        <a href="#trois" className="trois">
                            Compte</a>
                        </li>
                    
                </ul>
            </div>
            
            <div className="navbar">
                <div className="dropdown">
                    <button className="dropbtn">
                        <img src={ajout} 
                        id='logo-15'
                        width='39'
                        height='39'
                        viewBox="0 0 39 39"
                        fill="none"
                        alt='noalt'/>
                        <i className="fa fa-caret-down test" />
                    </button>
                    <div className="dropdown-content">
                        <a href="#">Connexion <i className="fa fa-caret-right test2" /></a>
                        <a href="#">Inscription <i className="fa fa-caret-right test2" /></a>
                        <div className="esthe">
                            <a href="#">Trajet <i className="fa fa-caret-right test3" /></a>
                            <a href="#">Compte <i className="fa fa-caret-right  test4" /></a>
                            <a href="#">Partager <i className="fa fa-caret-right test5" /></a>
                        </div>
                        
                    </div>
                </div>
            </div>
           
    </nav>
    </div>
  )
}
}
export default Navbar;