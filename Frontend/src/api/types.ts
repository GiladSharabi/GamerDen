export enum Gender {
  None = "None",
  Male = "Male",
  Female = "Female",
  Both = "Both",
}
export enum Platform {
  PC = "PC",
  Xbox = "Xbox",
  Playstation = "Playstation",
}

export type Game = {
  id: number;
  name: string;
  cover: string;
};

export type UserPreferences = {
  region: string;
  voice: boolean;
  platform: Platform[];
  teammate_platform: Platform[];
  preferred_gender: Gender;
  min_age: number,
  max_age: number,
  games: Game[];
};

export type User = {
  email: string;
  password: string;
  username: string;
  dob: Date;
  created_at?: Date;
  country: string;
  gender: Gender;
  languages: string[];
  bio?: string;
  avatar?: string;
  rating?: number;
  rating_count?: number;
  preferences: UserPreferences;
};

export type UserResult = {
  user?: User;
  error?: string;
};

export const NullUserPreferences: UserPreferences = {
  region: "",
  voice: false,
  platform: [],
  preferred_gender: Gender.None,
  min_age: 18,
  max_age: 100,
  teammate_platform: [],
  games: [],
};

export const NullUser: User = {
  email: "",
  password: "",
  username: "",
  dob: new Date(0),
  created_at: new Date(),
  country: "",
  gender: Gender.None,
  languages: [],
  bio: "",
  avatar: "",
  rating: 0,
  rating_count: 0,
  preferences: NullUserPreferences,
};
