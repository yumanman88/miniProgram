// @flow weak

import React, { Component, PropTypes } from 'react';

import PaginationDot from './PaginationDot';


export default class Pagination extends Component {
  static propTypes = {
    dots: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    onChangeIndex: PropTypes.func.isRequired,
  };

  handleClick = (event, index) => {
    this.props.onChangeIndex(index);
  };

  render() {


    const {
      index,
      dots,
    } = this.props;

    const styles = {
      root: {
        bottom: 8,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        right: '50%',
        marginRight: -12*dots/2,
      },
    };

    const children = [];

    for (let i = 0; i < dots; i += 1) {
      children.push(
        <PaginationDot
          key={i}
          index={i}
          active={i === index}
          onClick={this.handleClick}
        />,
      );
    }

    return (
      <div style={styles.root}>
        {children}
      </div>
    );
  }
}
