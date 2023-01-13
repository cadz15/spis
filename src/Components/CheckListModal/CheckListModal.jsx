import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '../../Store/globalStates';

const CheckListModal = (props) => {
    const [yearSelected, setYearSelected] = useState(props?.year);
    const [semesterSelected, setSemesterSelected] = useState(props?.semester);
    const { jwt_token, academicYear } = useAuthStore();

    const onChangeYear = (e) => {
        setYearSelected(e.target.value);
    }

    const onChangeSemester = (e) => {
        setSemesterSelected(e.target.value);
    }

    const doQualify = async () =>  {

        await axios.post(`${process.env.REACT_APP_API_LINK}/scholars/qualify`,
            {year: yearSelected, semester: semesterSelected, scholar_history_id: props?.scholar_history_id?.scholar_history_id, year_prev: props.year, semester_prev: props.semester, token: jwt_token},
            {headers: {
                "Authorization" : `Bearer ${jwt_token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'withCredentials': 'true'
                }
                }
            )
            .then((response) => {
                console.log(response);
                if(response.status){
                    toast.success('Scholar successfully qualified!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    props.forceClose();
                }else{
                    toast.danger('Connection error!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    props.forceClose();
                }
                // console.log(response.data);
            })
            .catch((error) => {
                // console.log(error);
                // console.log(jwt_token);
            })
    }


  if (!props.show) return null;

  return (
    <>
        <div className="modal " onClick={props.onClose}>
        <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                  <h1 className="modal-title fs-5">Qualify Scholar</h1>
                  <button type="button" className="btn-close" onClick={props.onClose}></button>
              </div>
            <div className="modal-body">
               <div className='search-box col-sm-12 col-md-12'>
                        <div className="form-floating mb-3">
                            
                            <select className="form-select" id='floatingAcademicYear' defaultValue={props.year} onChange={onChangeYear} >
                                {academicYear?.length > 0 ? academicYear?.map((academicYearListData) => 
                                    (<option key={academicYearListData.id} value={academicYearListData.academic_year}>{academicYearListData.academic_year}</option>)
                                    ) 
                                    : 
                                    ''
                                }
                            </select>
                            <label htmlFor="floatingAcademicYear">Academic Year</label>
                        </div>
                    </div> 
                    <div className='search-filter d-md-block d-sm-none col-md-12'>
                        <div className="form-floating mb-3">
                            <select className="form-select" id='floatingSemester' defaultValue={props.semester} onChange={onChangeSemester}>
                                <option value={`1st Semester`}>1st Semester</option> 
                                <option value={`2nd Semester`}>2nd Semester</option> 
                            </select>
                            <label htmlFor="floatingSemester">Semester</label>
                        </div>
                    </div>
                </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={props.onClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={doQualify}>Qualify and Create</button>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default CheckListModal;