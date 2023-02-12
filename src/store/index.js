import { combineReducers } from "redux";
import main from "./modules/main";
import mate from "./modules/mate";
import challenge from "./modules/challenge";
import mypage from "./modules/mypage";
import recommendation from "./modules/recommendation";

export default combineReducers({
  main,
  mate,
  challenge,
  mypage,
  recommendation,
});
