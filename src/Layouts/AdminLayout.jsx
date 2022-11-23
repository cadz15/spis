import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Sidebar from '../Components/Sidebar/Sidebar';
import useAuthStore from '../Store/globalStates';
import AuthGuard from '../Utils/AuthGuard';

const AdminLayout = ({children, user}) => {
  const [isMini, setIsMini] = useState(false);
  const [miniSidebar, setMiniSidebar] = useState('');
  const [preventHoverInSmallScreen, setPreventHoverInSmallScreen] = useState(false);
  const { jwt_token, removeUser } = useAuthStore();
  const navigate = useNavigate();

  const handleHoverMenuToggle = (e) => {    
    if( isMini && !preventHoverInSmallScreen ){
      if (miniSidebar !== ''){
        setMiniSidebar('')
      }else {        
        setMiniSidebar('mini-navbar')
      }
    }
  }

  const handleMenuToggle = () => {
		if (miniSidebar !== '' ){
      setIsMini(false);
      setMiniSidebar('')
    }else {
      setIsMini(true);
      setMiniSidebar('mini-navbar')
    }
	}

  const handleLogout = () => {
    
    axios.post(`http://slsu_spis.localtest/api/auth/login`, {token: jwt_token}, {headers: {Authorization: "Bearer " + jwt_token}})
    .then((response) => {
      removeUser();
      navigate('/');
    });
  }



  //Read screen size

  useEffect(() => {
    function handleWindowResize() {

      if (window.innerWidth < 576){
        setPreventHoverInSmallScreen(true);
      }else {
        setPreventHoverInSmallScreen(false);
      }
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <AuthGuard user={user}>
      <div className='admin-layout'>
        <Header handleMenuToggle= {handleMenuToggle}  />
        <div className='content'>
            <div className='sidebar'>
                <Sidebar miniNavbar={miniSidebar} isMini= {isMini} handleHoverMenuToggle= {handleHoverMenuToggle} handleLogout={handleLogout} />
            </div>
            <div className='main-content-container'>
                {children}
            </div>
        </div>
    </div>      
    </AuthGuard>
  )
}

export default AdminLayout;