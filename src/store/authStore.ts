import { create } from "zustand";
import axios from "axios";

interface AuthStore {
  user: any;
}

export const useAuthStore = create<AuthStore>(() => ({
  user: null,
}));

export const fetchUser = async () => {
  try {
    const result = await axios.get("http://localhost:5205/me", { withCredentials: true });
    useAuthStore.setState({ user: JSON.parse(result.data.user) });
  } catch (err) {
    console.log(err);
  }
};
