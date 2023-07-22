import { create } from "zustand";
import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

interface UserResponse {
  user: string;
}

interface AuthStore {
  user: User | null;
}

export const useAuthStore = create<AuthStore>(() => ({
  user: null,
}));

export const fetchUser = async () => {
  try {
    const result = await axios.get<UserResponse>(`${baseUrl}/me`, { withCredentials: true });
    useAuthStore.setState({ user: JSON.parse(result.data.user) as User });
  } catch (err) {
    console.log(err);
  }
};

export const redirectToLogin = () => login();

export const login = () => (window.location.href = `${baseUrl}/login-microsoft?redirect=${encodeURIComponent(window.location.origin)}`);

export const logout = () => (window.location.href = `${baseUrl}/logout?redirect=${encodeURIComponent(window.location.origin)}`);
