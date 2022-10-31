import './Navbar.css'
import { Link } from "react-router-dom"
import logo from '../../media/superdrip-logo.png'
import {Button} from '../Button/Button'
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { CartIcon } from '../CartIcon/CartIcon';
import {CartDropdown} from '../CartDropdown/CartDropdown'
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { ToggleCartContext } from '../../App';

export const Navbar = () => {
  const currentUser = useSelector((state)=>state.user.currentUser)
  const {isCartOpen} = useContext(ToggleCartContext)
  const signOutHandler = async()=>{
      await signOutUser();
  }

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="" className='logo-img' />
      </div>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fa fa-bars"></i>
      </label>

      <ul className="list">
        <li id="active"><Link to="/">Home</Link></li>
        <li><Link to="/shop" id="d">Shop</Link></li>
        {!currentUser ? <li><Link to="/auth" id="d">Sign-in</Link></li> : <li><Button title="signout" id="signout" onClick={signOutHandler}/></li> }
        <CartIcon/>
      </ul>
      {isCartOpen ? <CartDropdown/> : null}
    </nav>
  )
}