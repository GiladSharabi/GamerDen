import instance from "../api/axios.ts";
import { User, Game, NullUser, UserResult } from "../api/types.ts";

export async function signup(user: User): Promise<UserResult> {
  try {
    const response = await instance.post(`/signup`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const errorResult = response.data.error;
    if (errorResult) {
      return errorResult.emailError || errorResult.usernameError || errorResult.error;
    }
    return response.data;
  } catch (e: any) {
    console.log("Error during signup:", e);
    return { error: "Error in signup" };
  }
}

export async function getUser(token: string) {
  try {
    const response = await instance.get("/login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e: any) {
    console.log("Get user Error:", e);
    return { error: "Error in login" };
  }
}

export async function updateUser(user: User) {
  console.log(user);
  try {
    const response = await instance.post(`/users/update`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseError = response.data.error;
    if (responseError) {
      return { success: false, error: responseError };
    }
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      return { success: true, accessToken: response.data.accessToken };
    }
  } catch (e) {
    console.log("Unexpected error in update:", e);
    return { success: false, error: "Error in update" };
  }
}

export async function login(username: string, password: string) {
  try {
    const response = await instance.post("/login", {
      username,
      password,
    });

    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      return { success: true, accessToken: response.data.accessToken };
    } else {
      return { success: false, error: response.data.error };
    }
  } catch (e) {
    console.log("Unexpected error in login:", e);
    return { success: false, error: "Error in login" };
  }
}

export async function getGames(limit?: number): Promise<Game[]> {
  try {
    const response = await instance.get(`/games/${limit}`);
    if (!response) {
      console.log("error in getgames");
    }
    return response.data;
  } catch (e) {
    console.log("Get games error:", e);
    return [];
  }
}

export function logout() {
  localStorage.removeItem("accessToken");
}

export async function getUserByToken(): Promise<User> {
  try {
    const token = localStorage.getItem("accessToken");
    if (token) {
      return getUser(token);
    }
  } catch (e) {
    console.log("Error in getUserByToken: " + e);
  }
  return NullUser;
}
