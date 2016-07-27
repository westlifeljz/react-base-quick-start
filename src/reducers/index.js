import { combineReducers } from 'redux';
import myData from './data';
import testData1 from './testdata';

const rootReducer = combineReducers({
    // 名字必须和之前mapStateToProps 的匹配
    myData,
    testData1
});

export default rootReducer
