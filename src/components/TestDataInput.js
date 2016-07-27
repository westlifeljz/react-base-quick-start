/**
 * Created by luojianzong on 16/5/31.
 */
import React, { PropTypes, Component } from 'react';

export default class TestDataInput extends Component {
    constructor () {
        super();
        this.innerClickHandler = this.innerClickHandler.bind(this);
    }

    render () {
        return (<div>
            <input type="text" ref="testInputId"/>
            <button onClick={this.innerClickHandler}>testData</button>
        </div>);
    }

    innerClickHandler () {
        let val = this.refs["testInputId"].value;
        this.props.clickHandler(val);
    }
}

TestDataInput.propTypes = {
    clickHandler : PropTypes.func.isRequired
};