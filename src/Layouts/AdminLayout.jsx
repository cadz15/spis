import React, { useEffect, useState } from 'react';
import Header from '../Components/Header/Header';
import Sidebar from '../Components/Sidebar/Sidebar';

const AdminLayout = ({children}) => {
  const [isMini, setIsMini] = useState(false);
  const [miniSidebar, setMiniSidebar] = useState('');
  const [preventHoverInSmallScreen, setPreventHoverInSmallScreen] = useState(false);

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
    <div className='admin-layout'>
        <Header handleMenuToggle= {handleMenuToggle}  />
        <div className='content'>
            <div className='sidebar'>
                <Sidebar miniNavbar={miniSidebar} isMini= {isMini} handleHoverMenuToggle= {handleHoverMenuToggle} />
            </div>
            <div className='main-content-container'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default AdminLayout;