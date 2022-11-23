import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../Store/globalStates";


const AuthGuard = ({user, children}) => {
  let isAllowed = false;
  const { userAuth } = useAuthStore();

  if (userAuth === null) return <Navigate to='/' replace /> ;

  if (userAuth?.account_type === 1 && user === 'admin'){
    isAllowed = true;
  }else if (userAuth?.account_type === 2 && user === 'scholar'){
    isAllowed = true;
  }else {
    isAllowed = false;

  }

  if (!isAllowed) {
      return <Navigate to={'/error/'} replace />;
    }
  
    
      return children ? children : <Outlet />;
}

export default AuthGuard;