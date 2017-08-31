import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Pagination from '../pagination/Pagination';
import {autoPlay, virtualize, bindKeyboard} from 'react-swipeable-views-utils';
import {mod} from 'react-swipeable-views-core';
import {imgUrl} from '../../imgUrl';

const AutoPlaySwipeableViews = SwipeableViews;

const styles = {
    root: {
      position: 'relative',
    },
    itemsImg: {
        height: '5.09rem',
        width: '9.2rem',
        border: 0
    }
};

class Hoc extends React.Component {
    state = {
        index: 0
    };

    handleChangeIndex = (index) => {
        this.setState({
            index
        });
    };

    // <img style={styles.itemsImg} src={imgsUrl[0]} />
    // <img style={styles.itemsImg} src={imgsUrl[1]} />
    // <img style={styles.itemsImg} src={imgsUrl[2]} />

    render() {
        const {index} = this.state;
        const imgsUrl = this.props.imgs;
        return (
            <div style={styles.root}>
                <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
                    {
                        imgsUrl.map(function(obj, idx) {
                            return <img style={styles.itemsImg} src={`${imgUrl}${imgsUrl[idx]}`} key={idx} />
                        })
                    }
                </AutoPlaySwipeableViews>
                <Pagination dots={imgsUrl.length} index={index} onChangeIndex={this.handleChangeIndex}/>
            </div>
        );
    }
}

export default Hoc;
