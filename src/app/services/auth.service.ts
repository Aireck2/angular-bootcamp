import { Injectable } from "@angular/core";

interface LoginParams {
  email: string;
  password: string;
}
interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}
  users: User[] = [
    {
      id: "1",
      name: "Erick",
      lastname: "Escriba",
      email: "erick@test.com",
      password: "123456",
    },
  ];

  login(params: LoginParams): boolean {
    console.log(params);
    const user = this.users.find(
      (user) => user.email === params.email && user.password === params.password
    );
    if (user) {
      localStorage.setItem("token", `${user}`);
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  logout(): void {
    localStorage.removeItem("token");
  }
}
