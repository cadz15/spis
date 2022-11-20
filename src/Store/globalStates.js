import create from "zustand";
import { persist } from 'zustand/middleware';

const authStore = (set)  => ({
    userAuth: [],
    removeUser: () => set({userAuth: null}),
})


const useAuthStore = create(
    persist(authStore, {
        name: 'auth'
    })
)

export default useAuthStore;