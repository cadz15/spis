import React, { useState } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import CourseForm from '../Components/CourseForm/CourseForm';
import CourseList from '../Components/CourseList/CourseList';
import CoursesEditModal from '../Components/CoursesEditModal/CoursesEditModal';

const AdminCourses = () => {
    const [selectedId, setSelectedId] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = (e) => {
        if(e.currentTarget === e.target) setShowModal(current => !current);
    }

    const handleListSelect = (e) => {
        setShowModal(current => !current);
        setSelectedId(e.currentTarget.tabIndex);
    }

  return (
    <>
        <CoursesEditModal show={showModal} onClose={handleShowModal} data={selectedId} />
        <div className='main-content-bg'>
            <div className='main-content p-4'>
                <div className='breacrumb-container mb-4'>
                    <span className='subtext fs-5'>Scholarship</span>
                    <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                        <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Scholarship</span>
                    </div>
                </div>

                <div className='row'>
                        <div className='col-md-12 col-lg-12'>
                            <div className='row'>
                                <div className='col-sm-12 col-lg-6 col-md-12 mb-3'>
                                    <CourseForm />
                                </div>
                                <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                    <CourseList handleListSelect={handleListSelect} />
                                </div>

                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </>
  )
}

export default AdminCourses;