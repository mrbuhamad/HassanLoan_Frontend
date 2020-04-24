import { decorate, observable } from "mobx";
import { AsyncStorage } from "react-native";
import jwt_decode from "jwt-decode";
import { instance } from "./instance";
import HomeScreen from "../components/HomeScreen";

class AuthStore {
  user = null;
  userData = {};
  is_vender = null;
  userID = null;

  setUser = async (token) => {
    if (token) {
      // Save token to localStorage
      await AsyncStorage.setItem("myToken", token);
      // Set token to Auth header
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      // Set current user
      this.user = jwt_decode(token);
    } else {
      await AsyncStorage.removeItem("myToken");
      await AsyncStorage.removeItem("is_vender");
      await AsyncStorage.removeItem("userID");
      await AsyncStorage.removeItem("userData");

      delete instance.defaults.headers.common.Authorization;
      this.user = null;
      this.userData = {};
      this.is_vender = null;
      this.userID = null;
    }
  };

  login = async (userData, navigation) => {
    try {
      const res = await instance.post("login/", userData);
      const user = res.data;
      console.log("User logged in", user);
      this.userData = {
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      };

      console.log(" this.userData", this.userData);
      this.is_vender = res.data.is_vender;
      this.userID = res.data.user_id;
      await AsyncStorage.setItem("is_vender", JSON.stringify(this.is_vender));
      await AsyncStorage.setItem("userID", JSON.stringify(this.userID));
      await AsyncStorage.setItem("userData", JSON.stringify(this.userData));
      await this.setUser(user.access);

      // goback is not going to home screen
      // navigation.goBack();
      //I know so I changed it to navigate to "Home"

      navigation.goBack();
    } catch (err) {
      console.log(err);
      console.log("something went wrong logging in");
    }
  };

  register = async (userData, navigation) => {
    try {
      const res = await instance.post("register/", userData);
      const data = res.data;
      console.log("User registered", data);
      await this.setUser(data.access);
      navigation.navigate("Login");
      this.login(userData, navigation);
    } catch (error) {
      console.error(error);
    }
  };

  logout = async () => {
    await this.setUser();
    AsyncStorage.clear();
  };

  checkForToken = async () => {
    const token = await AsyncStorage.getItem("myToken");
    const is_vender = JSON.parse(await AsyncStorage.getItem("is_vender"));
    const userID = JSON.parse(await AsyncStorage.getItem("userID"));
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));

    if (token) {
      const currentTime = Date.now() / 1000;
      // Decode token and get user info
      const user = jwt_decode(token);
      // Check token expiration
      if (user.exp >= currentTime) {
        // Set auth token header
        await this.setUser(token);
        this.is_vender = is_vender;
        this.userID = userID;
        this.userData = userData;
        console.log(this.userID);
      } else {
        this.setUser();
      }
    }
  };
}

decorate(AuthStore, {
  user: observable,
  userData: observable,
  is_vender: observable,
  userID: observable,
});

const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
