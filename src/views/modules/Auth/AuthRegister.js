function RegisterForm() {
  return `
    <div class="register-form-wrap wrapper">
      <form class="register-form" autocomplete="off" action="javascript:void(0)">
          <div class="wrap-input">
              <label for="email" class="form-label">Email address</label>
              <input type="text"
              placeholder="Email"
              name="email"
              autocomplete="off"
              class="form-input register-email">
          </div>
          <div class="wrap-input">
            <label for="password" class="form-label">Password</label>
              <input
              type="password"
              placeholder="Password"
              name="password"
              autocomplete="off"
              class="form-input register-password">
          </div>
          <button class="btn register-btn">
          Register
          </button>

          <p class="redirect">
              You don't have an account?
              <span class="login-link">Login</span>
          </p>
      </form>
    </div>
  `
}

export default RegisterForm ;
