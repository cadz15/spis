import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Sidebar from '../Components/Sidebar/Sidebar';
import useAuthStore from '../Store/globalStates';
import AuthGuard from '../Utils/AuthGuard';

const AdminLayout = ({children, user}) => {
  const { jwt_token, removeUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    
    axios.post(`http://slsu_spis.localtest/api/auth/login`, {token: jwt_token}, {headers: {Authorization: "Bearer " + jwt_token}})
    .then((response) => {
      removeUser();
      navigate('/');
    });
  }



  return (
    <AuthGuard user={user}>
      <div className='admin-layout'>
        <Header  />
        <div className='content'>
            <div className='sidebar'>
                <Sidebar handleLogout={handleLogout} />
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