import React from 'react';

const AuthUserContext = React.createContext({
  isLogin: null,
  userData: null,
});

export default AuthUserContext;
