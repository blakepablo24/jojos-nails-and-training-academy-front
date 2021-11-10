import { Component } from 'react';
import classes from './AddCurriculum.module.css';
import { BiXCircle, BiFolderPlus } from "react-icons/bi";
import axios from 'axios';
import CONST from '../../../constants/constants';
import GoBack from '../../../components/Ui/GoBack/GoBack';
import { Redirect } from 'react-router';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Latest from '../../../components/Ui/Navigation/Latest/Latest';

class AddCurriculum extends Component {

    state = {
      values: [],
      courseName: "",
      redirectOnSuccess: ""
    };
    
    handleSubmit = this.handleSubmit.bind(this);
    
    componentDidMount(){
      let startingValues = [];
      axios.get(CONST.BASE_URL + '/api/single-training-course/' + this.props.match.params.id).then(response => {
        response.data.course_curriculum.forEach(singleItem => {
          startingValues.push(singleItem.course_curriculum_item);
        });
        this.setState({
          values: startingValues,
          courseName: response.data.title
        })
      })
    }

    createUI(){
       return this.state.values.map((el, i) => 
           <div className={classes.addedCurriculumItemContainer} key={i}>
              <div className={classes.addedCurriculumItemNumber}><h3>{i}</h3></div>
              <input type="text" placeholder="Enter New Curriculum Item" value={el||''} onChange={this.handleChange.bind(this, i)} />
              <div className={classes.addedCurriculumItemRemove} onClick={this.removeClick.bind(this, i)}><BiXCircle /></div>
           </div>          
       )
    }
    
    handleChange(i, event) {
       let values = [...this.state.values];
       values[i] = event.target.value;
       this.setState({ values });
    }
    
    addClick(){
      this.setState(prevState => ({ values: [...prevState.values, '']}))
    }
    
    removeClick(i){
       let values = [...this.state.values];
       values.splice(i,1);
       this.setState({ values });
    }
    
    handleSubmit(event) {
      event.preventDefault();
      axios.defaults.withCredentials = true;
      axios.post(CONST.BASE_URL + '/api/add-new-curriculum/' + this.props.match.params.id, {curriculumItems: this.state.values}).then(response => {
        this.setState({
          redirectOnSuccess: <Redirect to={{
              pathname: '/single-training-course/' + this.props.match.params.id,
              state: { fromRedirect: "Curriculum Successfully Updated" }
            }}                  
        />
      })
      })
    }
  
    render() {

      let buttonShown = "";

      if(this.state.values.length > 1){
        buttonShown = <button className="customButton" onClick={this.handleSubmit}>Finish</button>;
      }

      return (
        <Aux>
          <Latest message={this.state.courseName + " Curriculum"} />
          <div className={classes.AddCurriculum}>
              {this.state.redirectOnSuccess}
              <GoBack back={() => this.props.history.goBack()} />
              <div className={classes.newCurriculumItemContainer}>
                {this.createUI()}
                <div className={classes.newCurriculumItem + " selectable"} onClick={this.addClick.bind(this)}><BiFolderPlus /> <h3>Add New</h3></div>
              </div>
              {buttonShown}
          </div>
        </Aux>
      );
    }
  }

export default AddCurriculum;