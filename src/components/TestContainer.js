/**
 * Created by luojianzong on 16/5/25.
 */
import React, { PropTypes, Component } from 'react';

export default class TestContainer extends Component {

    render (){
        return (<div>
            <span>TestContainer</span>
            {this.props.children}
        </div>);
    }
}