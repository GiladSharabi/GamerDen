import instance from "../api/axios.ts";
import { UserResult, User, Game } from "../api/types.ts";
import { convertDateOfBirthToISO } from "../api/api.utils.ts";
import { FormValues } from "../pages/SignUpPage.tsx";

export async function getUserById(userID: number): Promise<UserResult> {
  try {
    const response = await instance.get(`/users/id/${userID}`);
    const user: User = response.data;
    if (response) {
      return { error: "User doesn't exist, Please try again" };
    }
    return { user };
  } catch (e: any) {
    console.log(e);
    return { error: e };
  }
}

export async function signup(formValues: FormValues) {
  const dobISO: string | null = convertDateOfBirthToISO(formValues.dob);
  if (dobISO) {
    const user: Omit<User, "id" | "created_at"> = {
      email: formValues.email,
      password: formValues.password,
      username: formValues.username,
      dob: new Date(dobISO),
      country: formValues.country,
      gender: formValues.gender,
      languages: formValues.languages,
    };

    try {
      const response = await instance.post(`/signup`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Error during signup:", error);
    }
  } else {
    console.log("Invalid date of birth:", formValues.dob);
  }
}

export async function getUser(token: string) {
  try {
    const response = await instance.get("/api/login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function updateUser(user: User) {
  try {
    const response = await instance.post(`/api/users/update`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.error("Error updating user:", e);
  }
}

export async function login(username: string, password: string) {
  try {
    const response = await instance.post("/api/login", {
      username: username,
      password: password,
    });

    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log("Login successful");
    } else {
      console.log("Login failed:", response.data.error);
    }
  } catch (e: any) {
    //console.log(response?.data.error);
    console.log("unexpected error in login" + e);
  }
}

export async function getGames(limit: number): Promise<Game[]> {
  try {
    const response = await instance.get(`/api/games/${limit}`);
    if (!response) {
      console.log("error in getgames");
    }
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export function logout() {
  localStorage.removeItem("accessToken");
  // navigate to homepage
}
