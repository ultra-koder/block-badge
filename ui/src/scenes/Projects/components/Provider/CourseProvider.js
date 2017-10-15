import React, { Component } from 'react';
import EthereumExam from '../Exams/EthereumExam';
const isShowing = false;

class CourseProvider extends Component {
   
    render() {
        return (

                <div className="container">
                    <div className="row">

                        <div className="col-md-6 label">
                            <label for="inputCourse">
                                <h2>
                                    <span class="label label-primary">Course Name</span>
                                </h2>
                            </label>
                        </div>
                        <div className="col-md-6 label">
                            <input name="inputCourse" className="form-control" />
                        </div>
                    </div>
                    {/* <input type="submit" className="btn btn-primary pull-right" value="Submit" /> */}

                    <input type="submit" className="btn btn-primary pull-right" value="Submit" onClick={this.setState(isShowing==true)} /> 
                    <div className="row">
                     {isShowing && <EthereumExam/>}
                     {!isShowing && <EthereumExam/>}
                    </div> 
                </div>
                
        );
    }
}

export default CourseProvider;
