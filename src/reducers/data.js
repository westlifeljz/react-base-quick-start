/**
 * Created by luojianzong on 16/5/17.
 */
import * as Type from "../constants/ActionType.js";
import * as Utils from "../utils/utils";

const initalState = {
    name:"ljz",
    pwd:"test"
};


export default function data(state = initalState, action) {
    switch (action.type) {
        case Type.TEST_ACTION:
            return Utils.assign({}, state, {name: action.name, pwd:action.pwd});
        case Type.TEST_AJAX :
            return Utils.assign({}, state, {ajaxData: action.data});
        default:
            return state;
    }
}