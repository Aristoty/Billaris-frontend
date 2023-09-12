import axios, { AxiosResponse } from "axios";

export class AuthService {
  getCurrentUser() {
    throw new Error("Method not implemented.");
  }

  private readonly baseUrl = "http://localhost:8081";
  
  

  public login(email: string, password: string): Promise<AxiosResponse<any>> {
    const data = {
      email,
      password,
    };

    return axios.post(`${this.baseUrl}/auth/login`, data);
  }


  public signup(authRequest: any){
    return axios({
        'method':'POST',
        'url':`${this.baseUrl}/auth/signIn`,
        'data':authRequest
    })
}

  public logout = () => {
   return window.localStorage.removeItem("token");
  }

  public isAuthenticated(): boolean {
    return window.localStorage.getItem("token") !== null;
  }

  public getAccessToken(): string | null {
    const token = window.localStorage.getItem("token");
  
    if (token !== null) {
      return token;
    } else {
      return null;
    }
  }

  public getCurrentId(): string | null {
    const userId = window.localStorage.getItem("userId");
  
    if (userId !== null) {
      return userId;
    } else {
      return null;
    }
  }

  public getUserProfile(): Promise<AxiosResponse<any >> {
    const token = this.getAccessToken();

    return axios.get(`${this.baseUrl}/home/current-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}



//for use


