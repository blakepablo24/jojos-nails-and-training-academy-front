import { Component } from 'react';
import classes from './AddEditSalonTreatmentCategories.module.css';
import { BiXCircle, BiFolderPlus } from "react-icons/bi";
import axios from 'axios';
import CONST from '../../../constants/constants';
import GoBack from '../../../components/Ui/GoBack/GoBack';
import logoImage from '../../../components/Ui/Navigation/Header/Logo/logo.png';
import FlashMessage from 'react-flash-message';
import ConfirmDelete from '../../../components/Ui/ConfirmDelete/ConfirmDelete';

class AddEditSalonTreatmentCategories extends Component {

    state = {
      values: [],
      courseName: "",
      redirectOnSuccess: "",
      updatedMessage: "",
      confirmDelete: "",
      open: false
    };
    
    handleSubmit = this.handleSubmit.bind(this);
    
    componentDidMount(){
      this.startingValues();
    }

    removeConfirmDeleteHandler = () => {
        this.setState({
            confirmDelete: "",
            open: false
        })
    }

    confirmDeleteHandler = (id) => {
        this.setState({
            open: true,
            confirmDelete: <ConfirmDelete delete={this.deleteHandler.bind(this, id)} clicked={this.removeConfirmDeleteHandler} />
        })
    }

    startingValues(){
        let startingValues = [];
        axios.get(CONST.BASE_URL + '/api/all-salon-treatments').then(response => {
            response.data.forEach(singleItem => {
            startingValues.push({
                title: singleItem.title,
                numberOfTreatments: singleItem.single_salon_treatment.length,
                image: singleItem.image,
                id: singleItem.id
                });
            });
            this.setState({
            values: startingValues,
            courseName: response.data.title,
            })
        })
    }

    imageChangeHandler = (event) => {
        let fd = new FormData();
        fd.append('newImage', event.target.files[0], event.target.files[0].name);
        fd.append('id', event.target.id);

        axios.post(CONST.BASE_URL+'/api/update-salon-treatment-category-image', fd).then(response => {
            console.log(response);
            this.setState({
                updatedMessage: "Successfully Category Image!"
            })
            window.scrollTo(0, 0);
            this.startingValues();
        }).catch(function (error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
        
          });
    }

    createUI(){
       return this.state.values.map((el, i) =>
           <div className={classes.addedCurriculumItemContainer} key={i}>
               <input
                    style={{display: 'none'}}
                    type="file"
                    name="newImage"
                    onChange={this.imageChangeHandler}
                    ref={fileInput => this.fileInput = fileInput}
                    id={el.id}
                />
              <input type="text" placeholder="Enter New Category" value={el.title||''} onChange={this.handleChange.bind(this, i)} />
              {el.image !== "default"
                ? <img src={CONST.BASE_URL + "/storage/images/salon-treatment-images/" + el.image} onClick={() => this.fileInput.click()} alt="" /> 
                :
                (el.id 
                    ? 
                    <img src={logoImage} onClick={() => this.fileInput.click()} alt="" /> 
                    : 
                    <img src={logoImage} alt="" />
                )
              }
              {el.numberOfTreatments
                ? <div className={classes.addedCurriculumItemCannotRemove}><BiXCircle /></div>
                : 
                (el.id 
                    ? 
                    <div className={classes.addedCurriculumItemRemove} onClick={this.confirmDeleteHandler.bind(this, el.id)}><BiXCircle /></div> 
                    : 
                    <div className={classes.addedCurriculumItemRemove} onClick={this.removeClick.bind(this, i)}><BiXCircle /></div>
                )
              }
           </div>          
       )
    }
    
    handleChange(i, event) {
       let values = [...this.state.values];
       values[i].title = event.target.value;
       this.setState({ values });
    }
    
    addClick(){
      this.setState(prevState => ({ values: [...prevState.values,
        {
            id: "",
            title: "",
            image: "default",
            numberOfTreatments: 0
        }
    ]}))
    }
    
    deleteHandler = (id) => {
        axios.defaults.withCredentials = true;
        axios.delete(CONST.BASE_URL + '/api/delete-salon-treatment-category/' + id).then(response => {
            this.setState({
                updatedMessage: "Successfully updated Categories!",
                confirmDelete: "",
                open: false
            })
            window.scrollTo(0, 0);
            this.startingValues();
        })
    }

    removeClick(i){
       let values = [...this.state.values];
       values.splice(i,1);
       this.setState({ values });
    }
    
    handleSubmit(event) {
      event.preventDefault();
      axios.defaults.withCredentials = true;
      axios.post(CONST.BASE_URL + '/api/add-edit-salon-treatment-category/', {categoryItems: this.state.values}).then(response => {
        window.scrollTo(0, 0);
        this.startingValues();
        this.setState({
            updatedMessage: "Successfully updated Categories!"
        })
      })
    }
  
    render() {
        let updatedMessage = "";
        
        if(this.state.updatedMessage){
            updatedMessage = 
                <FlashMessage duration={5000}>
                    <div className="load-msg">
                    <h3 className="success">{this.state.updatedMessage}</h3>
                    </div>
                </FlashMessage>
        }
        return (
            <div className={classes.AddCurriculum}>
                <GoBack back={() => this.props.history.goBack()} />
                <h2>{this.state.courseName} Salon Treatment Categories</h2>
                <div className={classes.newCurriculumItemContainer}>
                {this.state.confirmDelete}
                {updatedMessage}
                {this.createUI()}
                <div className={classes.newCurriculumItem} onClick={this.addClick.bind(this)}><BiFolderPlus /> <h3>Add New</h3></div>
                </div>
                <button className="customButton" onClick={this.handleSubmit}>Finish</button>
            </div>
        );
        }
  }

export default AddEditSalonTreatmentCategories;