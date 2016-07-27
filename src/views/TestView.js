/**
 * Created by luojianzong on 16/5/18.
 */
import React, { Component, PropTypes } from 'react';
import TestHeader from '../components/TestHeader';
import TestMain from '../components/TestMain';
import * as TestAction from '../actions/TestAction';

import TestDataInput from '../components/TestDataInput';
import TestDataShow from "../components/TestDataShow";

import { getData } from "../reducers/testdata";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class TestView extends Component {
    render() {
        const { actions, myData, testData } = this.props;
        return (
            <div>
                <TestHeader  onclick={actions.clickHandler} />
                <TestMain myData={myData}/>


                <br/>

                <TestDataInput clickHandler={actions.testData}/>
                <TestDataShow testData={testData}/>
                <button onClick={actions.testAjax} >ajax</button>
                <div>{myData.ajaxData?myData.ajaxData.length: 0}</div>
            </div>
        )
    }
}

TestView.propTypes = {
    myData: PropTypes.object,
    testData1: PropTypes.object,
    actions: PropTypes.object,
}



function mapStateToProps(state) {
    return {
        myData: state.myData,
        testData : getData(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(TestAction, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestView)
