export type SearchProps = {
  platforms: Platform[];
  isVoice: boolean;
  soloOrGroup: SoloOrGroup;
  prefGender: Gender;
  region: string;
  teammatePlatform: Platform[];
  ageRange: {
    minAge: number;
    maxAge: number;
  };
};

export enum Gender {
  None = "None",
  Male = "Male",
  Female = "Female",
  Both = "Both",
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

export type Game = {
  id: number;
  name: string;
  cover: string;
};

export type UserPreferences = {
  region?: string;
  voice?: boolean;
  platform?: Platform[];
  teammatePlatform?: Platform[];
  prefGender?: Gender;
  ageRange?: number[];
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
