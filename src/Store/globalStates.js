import create from "zustand";
import { persist } from 'zustand/middleware';

const authStore = (set)  => ({
    userAuth: null,
    jwt_token: '',
    scholarshipData: null,
    requirementData: null,
    academicYear: null,
    activeAcademicYear: 0,
    printable: null,
    departmentAndCourses: [
        {
           name: 'College of Criminal Justice',
           course : ['BS in Criminology']
        },
        {
           name: 'College of Engineering',
           course : ['BS in Civil Engineering', 'BS in Computer Engineering', 
                                'BS in Electrical Engineering', 'BS in Mechanical Engineering']
        },
        {
           name: 'College of Technology',
           course : ['Bachelor of Industrial Technology Major in Automotive Technology', 'Bachelor of Industrial Technology Major in Drafting Technology',
                                'Bachelor of Industrial Technology Major in Electrical Technology', 'Bachelor of Industrial Technology Major in Electronics Technology',
                                'Bachelor of Industrial Technology Major in Food Preparation and Services Technology', 'Bachelor of Industrial Technology Major in Heating, Ventilation, Air-Conditioning and Refrigeration Technology']
        },
        {
            name: 'College of Computer Studies and Information Technology',
            course : ['BS in Information Technology Major in Programming', 'BS in Information Technology Major in Networking']
        },
        {
            name: 'College of Hospitality and Tourism Management',
            course : ['BS in Hospitality Management', 'BS in Tourism Management', 'BS in Food Technology']
        },
        {
            name: 'Department of Teacher Education',
            course : ['Bachelor of Elementary Education', 'Bachelor of Technology and Livelihood Education Major in Home Economics', 'Bachelor of Technology and Livelihood Education Major in Industrial Arts',
                                'Bachelor of Technology and Livelihood Education Major in Information and Communication Technology']
        }
    ],
    setAcademicYear: (academicYears) => set({academicYear: academicYears}),
    setActiveAcademicYear: (activeAcademicYears) => set({activeAcademicYear: activeAcademicYears}),
    setScholarships: (scholarships) => set({scholarshipData: scholarships}),
    setRequirements: (requirements) => set({requirementData: requirements}),
    setPrintable: (printableData) => set({printable: printableData}),
    removeScholarships: () => set({scholarships: null}),
    removeUser: () => set({userAuth: null}),
    addUser: (user) => set({userAuth: user}),
    setToken: (_token) => set({jwt_token: _token}),
})


const useAuthStore = create(
    persist(authStore, {
        name: 'auth'
    })
)

export default useAuthStore;