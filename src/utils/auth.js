import { userUpdate } from "../features/userSlice";
import store from "../app/store";
import { jwtDecode } from "jwt-decode";

const auth = (token) => {
  console.log(`wkrong`);
  if (token) {
    const decoded = jwtDecode(token);
    console.log(`decoded------>`, decoded);
    if (new Date(decoded.exp * 1000) > Date.now()) {
      console.log(`valid`);
      return {
        result: true,
        name: decoded.name,
        email: decoded.email,
        userId: decoded.userId,
      };
    } else {
      localStorage.removeItem("token");
      console.log(`invalid`);
      return { result: false };
    }
  } else {
    console.log(`noooooooooooo`);
    return { result: false };
  }
};

export default auth;
