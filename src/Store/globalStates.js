import create from "zustand";
import { persist } from 'zustand/middleware';

const authStore = (set)  => ({
    userAuth: null,
    jwt_token: '',
    scholarshipData: null,
    setScholarships: (scholarships) => set({scholarshipData: scholarships}),
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