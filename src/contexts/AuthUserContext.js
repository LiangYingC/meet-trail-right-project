import { createContext } from 'react';

const AuthUserContext = createContext({
  isLogin: null,
  userData: null,
});

export default AuthUserContext;
