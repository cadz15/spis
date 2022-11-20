import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom"
import TopBarProgress from "react-topbar-progress-indicator"

const LoadingBar = ({children}) => {
    const [progress, setProgress] = useState(false)
    const [prevLoc, setPrevLoc] = useState("")
    const location = useLocation()

    TopBarProgress.config({
        barColors: {
          "0": "#F05340",
          "1.0": "#F05340"
        },
        shadowBlur: 5
      });
 
    useEffect(() => {
       setPrevLoc(location.pathname)
       setProgress(true)
       if(location.pathname===prevLoc){
           setPrevLoc('')
           //thanks to ankit sahu
       }
    }, [location])
 
    useEffect(() => {
       setProgress(false)
    }, [prevLoc])
 
    return (
       <>
          {progress && <TopBarProgress />}
            {children}
       </>
    )
}

export default LoadingBar;