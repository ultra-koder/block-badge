import React, { Component } from 'react';
import CourseSubmitted from './CourseSubmitted';
import logo from './logo.png'
class CreateExamTemplate extends Component {

    constructor() {
        super();
        this.state = {
            showCourse: true,
            hide: false
        }

    }

    handleClick = (event) => {
        this.setState({ showQuiz: false });
        console.log("state changed");

    }
    handleChildClick = (event) => {
        this.setState({ hide: true });
    }
    render() {
        const { showCourse } = this.state;
        const { hide } = this.state;
        if (hide) {
            return (
                <div className="container">
                    <div className="alert alert-success">
                    <strong>Success!</strong> Your have successfully created a Course: <strong>Ethereum 101!</strong>
                    <img src={logo} alt="eth-image" className="pull-right"/>
                </div>
                </div>
                
            );
        }
        else {
            return (
                <div className="container" id="test">
                    <h3>Ethereum 101 Course</h3>
                    
                    <div className="row">
                        <label for="">Is ETH a?</label>
                        <div class="radio">
                            <label><input type="radio" name="optradio1" /> Distributed Network</label>
                        </div>
                        <div class="radio">
                            <label><input type="radio" name="optradio1" /> Decentralized Network</label>
                        </div>
                    </div>

                    <div className="row">
                        <label for="">What is the correct way to state the version while writing solidity?</label>
                        <div class="radio">
                            <label><input type="radio" name="optradio2" /> pragma solidity ^0.4.13;</label>
                        </div>
                        <div class="radio">
                            <label><input type="radio" name="optradio2" /> pragma solidity 0.4.13^;</label>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-primary pull-right" value="Publish" onClick={this.handleChildClick} />

                </div>
            );
        }

    }
}

export default CreateExamTemplate;
