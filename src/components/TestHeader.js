/**
 * Created by luojianzong on 16/5/17.
 */
import React, { PropTypes, Component } from 'react';

export default class TestHeader extends Component {
    constructor (){
        super();
        this.btnClickHandler = this.btnClickHandler.bind(this);
    }
    render() {
        return (
            <div>
                <input ref="inputName" type="text"/>
                <input ref="inputPwd" type="text"/>
                <button value="testBtn" onClick={this.btnClickHandler}>testBtn</button>
            </div>
        )
    }
    btnClickHandler () {
        this.props.onclick(this.refs["inputName"].value, this.refs["inputPwd"].value);
    }
}

TestHeader.propTypes = {
    onclick: PropTypes.func.isRequired
};


