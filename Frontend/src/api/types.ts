export type SearchProps = {
  platforms: string[];
  isVoice: boolean;
  soloOrGroup: SoloOrGroup;
  prefGender: Gender;
  region: string;
  teammatePlatform: string[];
  ageRange: {
    minAge: number;
    maxAge: number;
  };
};

export enum Gender {
  Male = "Male",
  Female = "Female",
  Both = "Both",
  None = "None",
}
export enum SoloOrGroup {
  Solo = "Solo",
  Group = "Group",
  None = "None",
}

export enum Platform {
  PC = "PC",
  Xbox = "Xbox",
  Playstation = "Playstation",
}

export enum Weekday {
  Sunday = "Sunday",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
}

export type Game = {
  id: number;
  name: string;
  cover: string;
};

export type UserPreferences = {
  region?: string;
  voice?: boolean;
  group_play?: boolean;
  platform?: Platform[];
  weekday?: Weekday[];
  age_range?: number[];
  games?: Game[];
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
  preferences?: UserPreferences;
};

export type UserResult = {
  user?: User;
  error?: string;
};
