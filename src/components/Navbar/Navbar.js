import './Navbar.css'
import { Link } from "react-router-dom"
import logo from '../../media/superdrip-logo.png'

export const Navbar = () => {
  

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="" className='logo-img' />
      </div>
      <input type="checkbox" id="check" />
      <label for="check" className="checkbtn">
        <i className="fa fa-bars"></i>
      </label>

      <ul className="list">
        <li id="active"><Link to="/">Home</Link></li>
        <li><Link to="/shop" id="d">Shop</Link></li>
        <li><Link to="/auth" id="d">Sign-in | Sign-up</Link></li>
      </ul>
    </nav>
  )
}