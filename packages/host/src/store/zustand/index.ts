import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IState {
    count: number;
}

const useStore = create<IState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increase: (by: number) => set((state) => ({ count: state.count + by })),
      }),
      {
        name: 'zustand-storage',
        storage: createJSONStorage(() => AsyncStorage)
      }
    )
  )
);

export type TUseStore = typeof useStore;

export default useStore;
