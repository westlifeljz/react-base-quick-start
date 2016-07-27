/**
 * Created by luojianzong on 16/5/31.
 */
import React, { PropTypes, Component } from 'react';

export default class TestDataShow extends Component{
    constructor (){
        super();
    }
    render() {
        let {testData} = this.props;
        console.log(this.props.testData);
        let num = testData ? testData.num : 10;
        return (
            <div>
                <span>{num}</span>
            </div>
        )
    }
}
//
//TestDataShow.propTypes = {
//    testData: PropTypes.number.isRequired
//};