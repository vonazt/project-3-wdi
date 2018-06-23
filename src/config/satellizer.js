function Auth($authProvider) {
  $authProvider.loginUrl = '/api/login';
  $authProvider.signupUrl = '/api/register';
}

export default Auth;
