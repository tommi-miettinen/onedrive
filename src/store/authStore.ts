import { create } from "zustand";
import axios from "axios";

interface AuthStore {
  user: User | null;
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

export const redirectToLogin = () => {
  window.location.href = "http://localhost:5205/login-microsoft";
};

export const login = () => {
  window.location.href = "http://localhost:5205/login-microsoft";
};

export const logout = () => {
  window.location.href = "http://localhost:5205/logout";
};
