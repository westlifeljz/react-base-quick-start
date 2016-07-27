/**
 * Created by luojianzong on 16/5/17.
 */
import * as Type from "../constants/ActionType.js";
import * as HttpRequest from "../infrastructure/js/utils/HttpRequest";


export function clickHandler (name,pwd) {
    console.log("test");
    return {
        type:Type.TEST_ACTION,
        name,pwd
    };
}


export function testData (data) {
    return {
        type: Type.TEST_DATA,
        data
    }
}

export function dispathcAjaxType (data) {
    return {
        type: Type.TEST_AJAX,
        data
    }
}


export function testAjax () {

    return (dispatch, getState) => {
        HttpRequest.post ({
            url: "http://localhost:30000/h5/op_query_financial_product_list.json"
        }).then(function(result) {
            console.log(result);
            return dispatch(dispathcAjaxType(result));
        });


    }
}