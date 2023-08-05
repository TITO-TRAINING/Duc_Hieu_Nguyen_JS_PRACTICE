import api from "../api/api";
import Auth from "../model/auth.model";
import { createToast } from "../views/components/handleToast";

class AuthService {
  constructor() {
    this.isAuth = JSON.parse(localStorage.getItem('isAuth')) || false;
    this.users = [];
    this.getAllUsers();
  }

  async registerAuth(user) {
    try {
      const {data} = await api.post('/users',new Auth(user));
      if(data) {
        createToast('info','Register success!');
        return data
      }
    } catch(error) {
      createToast({msg: error});
      return null;
    }
  }

  async getAllUsers() {
    try {
      let {data} = await api.get(`/users`);
      data = data.map((user) => new Auth(user))
      this.users = data;
    }
    catch(error){
      createToast('error', error);
      return null;
    }
  }

  checkAuth({email, password}) {
    const result = this.users.find((user) => user.email === email && user.password === password );
    if(result) {
      localStorage.setItem('isAuth', true);
      localStorage.setItem('authId', result.id);
    }
    return result;
  }
}

export default AuthService;
