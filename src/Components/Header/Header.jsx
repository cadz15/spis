import React from 'react';
import { MdOutlineLogout } from 'react-icons/md';
import { RiMenu2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = (props) => {

  return (
    <div className='header px-2'>
        <div className='logo'>
          <Link to={`/`}>
            Scholar Profiling
          </Link>
        </div>
        <RiMenu2Line className='menu-toggle transparent' />
        <Link to="/logout" className=' header-logout d-sm-block d-md-none header-logout'>
          <MdOutlineLogout className='' />
          Logout
        </Link>
    </div>
  )
}

export default Header;