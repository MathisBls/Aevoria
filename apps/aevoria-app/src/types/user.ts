export interface User {
  id_user: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar_url: string;
  banner_url: string;
  bio: string;
  country_code: string;
  discord_link: string;
  facebook_link: string;
  google_link: string;
  steam_link: string;
  verified: boolean;
  created_at: string;
}


export interface AuthContextType {
  user: User | null;
  login: (userData: { user: User; token: string }) => void;
  logout: () => void;
  isLoading: boolean;
}