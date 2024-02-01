export const getAcessToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  export const getUserInfo = () => {
    const userInfoStorage = localStorage.getItem("userInfo");
    const userInfo = userInfoStorage ? JSON.parse(userInfoStorage) : null;
    return {
      ...userInfo
    
    };
  };