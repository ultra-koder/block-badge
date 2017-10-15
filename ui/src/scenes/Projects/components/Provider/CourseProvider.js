import React, { Component } from 'react';
import EthereumExam from '../Exams/CreateExamTemplate';

class CourseProvider extends Component {
    constructor() {
        super();
        this.state = {
            showQuiz: false
        }
    }


    handleClick = (event) => {
        this.setState({ showQuiz: true });
        console.log("state changed");
    }

    render() {
        const { showQuiz } = this.state;

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
                <input type="submit" className="btn btn-primary pull-right" value="Submit" onClick={this.handleClick} />
                <br />
                <br />
                {showQuiz && <EthereumExam />}
            </div>

        );
    }
}

export default CourseProvider;
