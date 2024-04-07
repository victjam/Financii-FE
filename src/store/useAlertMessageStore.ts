import { create } from 'zustand';

interface Alert {
  enabled: boolean;
  message: string;
}

export interface AlertMessageStoreState {
  alert: Alert;
  setAlert: (alert: Alert) => void;
}

export const useAlertMessageStore = create<AlertMessageStoreState>((set) => ({
  alert: {
    enabled: false,
    message: '',
  },
  setAlert: (alert: Alert) => {
    set({ alert });
    setTimeout(() => {
      set({ alert: { enabled: false, message: '' } });
    }, 3000);
  },
}));
