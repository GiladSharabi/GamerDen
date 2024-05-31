import instance from "../api/axios.ts";
import { UserResult, User, Game } from "../api/types.ts";

export async function getUserById(userID: number): Promise<UserResult> {
  try {
    const response = await instance.get(`/users/id/${userID}`);
    const user: User = response.data;
    if (!user) {
      return { error: "User doesn't exist, Please try again" };
    }
    return { user };
  } catch (e: any) {
    return { error: "An error occurred while fetching user data" };
  }
}

export async function signup(user: Partial<User>) {
  try {
    const response = await instance.post(`/signup`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (e: any) {
    console.log("Error during signup:", e);
    return { error: e };
  }
}

export async function getUser(token: string) {
  try {
    const response = await instance.get("/login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data) {
      return response.data;
    }
  } catch (e: any) {
    console.log("Get user Error:", e);
    return { error: e };
  }
}

export async function updateUser(user: Partial<User>) {
  try {
    const response = await instance.post(`/users/update`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  } catch (e) {
    console.error("Error updating user:", e);
    return { error: e };
  }
}

export async function login(username: string, password: string) {
  try {
    const response = await instance.post("/login", {
      username: username,
      password: password,
    });

    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log("Login successful");
      console.log(response.data.accessToken);
    } else {
      console.log("Login failed:", response.data.error);
    }
  } catch (e: any) {
    console.log("unexpected error in login:", e);
    return { error: e };
  }
}

export async function getGames(limit?: number): Promise<Game[]> {
  try {
    const response = await instance.get(`/games/${limit}`);
    if (!response) {
      console.log("error in getgames");
    }
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log("Get games error:", e);
    return [];
  }
}

export function logout() {
  localStorage.removeItem("accessToken");
  // navigate to homepage
}
