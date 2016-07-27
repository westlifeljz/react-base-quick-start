/**
 * Created by luojianzong on 16/5/17.
 */
import React, { PropTypes, Component } from 'react';
import TestContainer from './TestContainer';

export default class TestMain extends Component{
    constructor (){
        super();
    }
    render() {
        const {myData} = this.props;
        return (
            <div>
                <TestContainer>
                    <span>{myData.name} {myData.pwd}</span>
                </TestContainer>
            </div>
        )
    }
}

TestMain.propTypes = {
    myData: PropTypes.object.isRequired
};