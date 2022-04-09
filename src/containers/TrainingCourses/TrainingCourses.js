import React, { Component } from 'react';
import classes from './TrainingCourses.module.css';
import Snippet from '../../components/Snippet/Snippet';
import Axios from 'axios';
import CONST from '../../constants/constants';
import Aux from '../../hoc/Auxilary/Auxilary';
import Latest from '../../components/Ui/Navigation/Latest/Latest';
import GoBack from '../../components/Ui/GoBack/GoBack';
import SortBy from '../../components/Ui/SortBy/SortBy';

class TrainingCourses extends Component {

    state = {
        trainingCourses: []
    }

    componentDidMount() {
        Axios.get(CONST.BASE_URL + '/api/all-training-courses').then(response => {
            this.setState({
                trainingCourses: response.data
            });
        })
    };

    changeHandler = (event) => {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    render(){

        let trainingCourses = this.state.trainingCourses.sort((a, b) => a.title.localeCompare(b.title));

        return(
            <Aux>
                <Latest message="Available Training Courses" />
                <div className={classes.TrainingCourses}>
                    <GoBack snippet={true} back={() => this.props.history.goBack()} />
                    <SortBy />
                    {trainingCourses.map(trainingCourse =>
                        <Snippet 
                            title={trainingCourse.title}
                            image={CONST.BASE_URL + "/storage/images/training-course-images/" + "small-" + trainingCourse.image}
                            id={trainingCourse.id}
                            key={trainingCourse.id}
                            price={trainingCourse.price}
                        />
                    )}
                </div>
            </Aux>
        )
    }
}

export default TrainingCourses