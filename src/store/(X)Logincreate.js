import { applyMiddleware, createStore } from "redux"
import {composeWithDevTools} from 'redux-devtools-extension';
import Loginreducer from "./modules/Loginreducer";

const Logincreate = () => {
    const store = createStore(Loginreducer, composeWithDevTools(applyMiddleware()))

    return store;
};

export default Logincreate;