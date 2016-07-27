/**
 * Created by luojianzong on 16/5/31.
 */

import * as Type from "../constants/ActionType.js";

import * as Utils from "../utils/utils";

const initalState = {
    num:0
};

export default function data(state = initalState, action) {
    switch (action.type) {
        case Type.TEST_DATA:
            console.log(state.testData);
            return Utils.assign({}, state, {num:4});
        default:
            return state;
    }
}


//返回的是一个reducer绑定的state下面的对象
export function getData (state) {

    return state.testData1;
}