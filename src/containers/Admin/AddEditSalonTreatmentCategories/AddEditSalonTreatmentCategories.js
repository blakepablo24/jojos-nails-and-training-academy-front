import { Component } from 'react';
import classes from './AddEditSalonTreatmentCategories.module.css';
import { BiXCircle, BiFolderPlus } from "react-icons/bi";
import axios from 'axios';
import CONST from '../../../constants/constants';
import GoBack from '../../../components/Ui/GoBack/GoBack';
import logoImage from '../../../components/Ui/Navigation/Header/Logo/logo.png';
import FlashMessage from 'react-flash-message';
import ConfirmDelete from '../../../components/Ui/ConfirmDelete/ConfirmDelete';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Latest from '../../../components/Ui/Navigation/Latest/Latest';
import FUNCTIONS from '../../../functions/functions';
import Loading from '../../../components/Ui/Loading/Loading';


class AddEditSalonTreatmentCategories extends Component {

    state = {
      values: [],
      courseName: "",
      redirectOnSuccess: "",
      updatedMessage: "",
      confirmDelete: "",
      open: false,
      loading: <Loading />
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

    startingValues(message){
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
                loading: "",
                values: startingValues,
                courseName: response.data.title,
                updatedMessage: message ?   <div className={classes.updateMessageContainer}>
                                                <FlashMessage duration={5000}>
                                                    <div className="load-msg">
                                                        <h3 className="success">{message}</h3>
                                                    </div>
                                                </FlashMessage>
                                            </div>
                                        : ""
            })
        })
    }

    imageChangeHandler = (event) => {
        this.setState({
            loading: <Loading />,
            updatedMessage: ""
        })
        let fd = new FormData();
        fd.append('newImage', event.target.files[0], event.target.files[0].name);
        fd.append('id', event.target.id);

        axios.post(CONST.BASE_URL+'/api/update-salon-treatment-category-image', fd).then(response => {
            FUNCTIONS.scrollToTop();
            this.startingValues("Category Image Updated!");
        })
    }

    createUI(){
       return this.state.values.map((el, i) =>
        <div key={i}>
           <div className={classes.addedCurriculumItemContainer}>
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
                ? <img className="selectable" src={CONST.BASE_URL + "/storage/images/salon-treatment-images/" + "small-" + el.image} onClick={() => this.fileInput.click()} alt="" /> 
                :
                (el.id 
                    ? 
                    <img className="selectable" src={logoImage} onClick={() => this.fileInput.click()} alt="" /> 
                    : 
                    <img className="selectable" src={logoImage} alt="" />
                )
              }
              {el.numberOfTreatments
                ? <div className={classes.addedCurriculumItemCannotRemove}><BiXCircle /></div>
                : 
                (el.id 
                    ? 
                    <div className={classes.addedCurriculumItemRemove + " selectable"} onClick={this.confirmDeleteHandler.bind(this, el.id)}><BiXCircle /></div> 
                    : 
                    <div className={classes.addedCurriculumItemRemove + " selectable"} onClick={this.removeClick.bind(this, i)}><BiXCircle /></div>
                )
              }
           </div>          
           <p>{i}Hello</p>
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
            FUNCTIONS.scrollToTop();
            this.setState({
                confirmDelete: "",
                open: false,
                loading: <Loading />,
                updatedMessage: ""
            })
            this.startingValues("Category Successfully Removed");
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
      axios.post(CONST.BASE_URL + '/api/add-edit-salon-treatment-category', {categoryItems: this.state.values}).then(response => {
        FUNCTIONS.scrollToTop();
        this.setState({
            loading: <Loading />,
            updatedMessage: ""
        })
        this.startingValues("Successfully updated Categories!");
      })
    }
  
    render() {
        return (
            <Aux>
                <Latest message={"Salon Treatment Categories"}/>
                {this.state.confirmDelete}
                <div className={classes.AddCurriculum}>
                    <GoBack back={() => this.props.history.goBack()} />
                    <div className={classes.newCurriculumItemContainer}>
                    {this.state.updatedMessage}
                    {this.state.loading}
                    {this.createUI()}
                    </div>
                    <div className={classes.newCurriculumItem + " selectable"} onClick={this.addClick.bind(this)}><BiFolderPlus /> <h3>Add New</h3></div>
                    <button className="customButton" onClick={this.handleSubmit}>Finish</button>
                </div>
            </Aux>
        );
        }
  }

export default AddEditSalonTreatmentCategories;