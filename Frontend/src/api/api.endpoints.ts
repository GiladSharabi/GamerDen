import instance from "../api/axios.ts";
import { User, Game, UserResult } from "../api/types.ts";

export async function signup(user: User): Promise<UserResult> {
  try {
    const response = await instance.post(`/signup`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data;
      if (responseData.error) {
        return {
          error: responseData.error,
          emailError: responseData.emailError,
          usernameError: responseData.usernameError,
        };
      }
    }
    console.log("signup error: ", error);
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
  } catch (error: any) {
    console.log("Get user Error:", error);
    return { error: "Error in login" };
  }
}

export async function updateUser(user: User): Promise<UserResult> {
  try {
    const response = await instance.post(`/users/update`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }

    return response.data;
  } catch (error: any) {
    console.error('Error updating user:', error);
    if (error.response) {
      const errorData = error.response.data;
      if (errorData) {
        return { emailError: errorData.emailError };
      }
    }
    return { error: "Error in user update" };
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
  } catch (error: any) {
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
  } catch (error: any) {
    console.log("Get games error: ", error);
    return [];
  }
}

export function logout() {
  localStorage.removeItem("accessToken");
}