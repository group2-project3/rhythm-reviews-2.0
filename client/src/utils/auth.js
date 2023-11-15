import * as jwt from 'jwt-decode';

class AuthService {
  getProfile() {
    return jwt.jwtDecode(this.getToken());
  }

  loggedIn() {
    return !!this.getToken() && !this.isTokenExpired();
  }

  isTokenExpired() {
    const token = this.getToken();
    try {
      const decoded = jwt.jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if(decoded.exp < currentTime) {
        this.removeToken();
        return true;
      }
      return false;
    } catch (err) {
      console.log('Error validating token',err);
      this.removeToken();
      return true;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    this.removeToken();
    window.location.assign('/');
  }

  removeToken() {
    localStorage.removeItem('id_token');
  }
}

export default new AuthService();