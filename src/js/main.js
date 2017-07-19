/* global */
import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import 'babel-polyfill'

import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import PropTypes from 'prop-types'

// index.html ファイルをコピーする
require('file-loader?name=../../dist/[name].[ext]!../index.html');

//-----------------------------------
// Action creators (Actionを返す)
//-----------------------------------

const additionAction = (value) => {
  return {
    type: 'ADD_VALUE',
    value
  }
}
const clearAdditionAction = () => {
  return {
    type: 'CLEAR_VALUE',
  }
}

//-----------------------------------
// Reducer
//-----------------------------------

const additionReducer = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_VALUE':
      return state + action.value
    case 'CLEAR_VALUE':
      return 0;
    default:
      return state
  }
}

//-----------------------------------
// Component
//-----------------------------------

class AdditionComponent extends React.Component {
  render() {
    const { total, onClickToAdd, onClickToClear } = this.props;
    let textInput;
    return (
      <div>
          <label>足し算</label>
          <input type="text"
            placeholder="10"
            defaultValue="100"
            ref={(input) => { textInput = input; }}
          />
          <button onClick={() => onClickToAdd(textInput.value) }>足す</button>
          <button onClick={onClickToClear}>クリア</button>
          <span className="result">合計：{total}</span>
      </div>
    );
  }
}

AdditionComponent.propTypes = {
  total: PropTypes.number.isRequired,
  onClickToAdd: PropTypes.func.isRequired,
  onClickToClear: PropTypes.func.isRequired
};

//-----------------------------------
// Container
//-----------------------------------

const AdditionContainer = (() => {

  const mapStateToProps = (state/*, ownProps*/) => {
    const props = {
      total: state
    };
    return props;
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onClickToAdd: (value) => {
        const val = parseInt(value);
        if (_.isNaN(val)) {
          //
        } else {
          dispatch(additionAction(val));
        }
      },
      onClickToClear: () => {
        dispatch(clearAdditionAction());
      }
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdditionComponent);

})();

//-----------------------------------
// Store
//-----------------------------------

const store = createStore(additionReducer)

//-----------------------------------
// 画面に表示する
//-----------------------------------

render(
  <Provider store={store}>
    <AdditionContainer />
  </Provider>,
  document.getElementById('root')
)

