import { createSelectorHooks } from 'auto-zustand-selectors-hook';

import { create } from 'zustand';
import { produce } from 'immer';

type AuthStoreType = {
  user: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: string) => void;
  logout: () => void;
  stopLoading: () => void;
};

const useAdminStoreBase = create<AuthStoreType>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: (user) => {
    localStorage.setItem('adminToken', user);
    set(
      produce<AuthStoreType>((state) => {
        state.isAuthenticated = true;
        state.user = user;
      }),
    );
  },
  logout: () => {
    localStorage.removeItem('adminToken');
    set(
      produce<AuthStoreType>((state) => {
        state.isAuthenticated = false;
      }),
    );
  },
  stopLoading: () => {
    set(
      produce<AuthStoreType>((state) => {
        state.isLoading = false;
      }),
    );
  },
}));

const useAdminStore = createSelectorHooks(useAdminStoreBase);

export default useAdminStore;
