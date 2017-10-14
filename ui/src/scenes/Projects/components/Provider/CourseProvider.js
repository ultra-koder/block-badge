import React, { Component } from 'react';

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

                <input type="submit" className="btn btn-primary pull-right" value="Submit" />
            </div>
           
        );
    }
}

export default CourseProvider;
