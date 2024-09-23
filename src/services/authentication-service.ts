export default class AuthenticationService {
  static isAuthenticated: boolean = false;

  static login(userName: string, password: string): Promise<boolean> {
    const isAuthenticated = (userName == 'pikachu' && password == 'pikachu');

    return new Promise(resolve => {
      setTimeout(() => {
        this.isAuthenticated = isAuthenticated;
        resolve(isAuthenticated);
      }, 1000);
    });
  }
}