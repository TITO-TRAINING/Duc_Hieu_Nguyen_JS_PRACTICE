function LoginForm() {
  return `
    <div class="login-form-wrap wrapper" >
      <form class="login-form" autocomplete="off" action="javascript:void(0)">
          <div class="wrap-input">
            <label for="email" class="form-label">Email address</label>
            <input type="text"
            placeholder="Email"
            name="email"
            class="form-input login-email">
          </div>
          <div class="wrap-input">
            <label for="password"
            class="form-label">
            Password
            </label>
            <input
            type="password"
            placeholder="Password"
            name="password"
            class="form-input login-password">
          </div>
          <button class="btn login-btn">
          Login
          </button>

          <p class="redirect">
              You don't have an account?
              <span class="register-link">Register</span>
          </p>
      </form>
    </div>
  `
}

export default LoginForm ;
