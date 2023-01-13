import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import SMSBlastForm from '../Components/SMSBlastForm/SMSBlastForm';
import useAuthStore from '../Store/globalStates';
import useTitle from '../Utils/useTitle';

const AdminSMSBlast = () => {
    useTitle('SMS Blast'); // PAGE TITLE

    const [recipientList, setRecipientList] = useState([]);
    const { jwt_token, activeAcademicYear } = useAuthStore();

    const getRecipientList = async() => {
        await axios.get(`${process.env.REACT_APP_API_LINK}/scholars/recipient?academic_year=${activeAcademicYear[0].academic_year}`,
        {headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
            }
        )
        .then((response) => {
            setRecipientList([{
                display_name: 'All',
                id: 0,
                scholarship_name: 'All' 
            }, ...response.data]);
            // setRecipientList(response.data);
        })
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        getRecipientList();
        console.log(recipientList);
    },[]);

  return (
    <div className='main-content-bg'>
        <div className='main-content p-4'>
            <div className='breacrumb-container mb-4'>
                <span className='subtext fs-5'>SMS Blast</span>
                <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                    <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> SMS Blast</span>
                </div>
            </div>

            <div className='row'>
                <SMSBlastForm recipientList={recipientList} />            
            </div>
        </div>
    </div>
  )
}

export default AdminSMSBlast;