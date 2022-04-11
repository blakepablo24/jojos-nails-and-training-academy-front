import React, { Component } from 'react';
import classes from './ImageUpload.module.css';
import { BiImageAdd } from "react-icons/bi";

class imageUpload extends Component {

    state = {
        file: '',
        imagePreviewUrl: '',
        flushData: false,
        imageError: ""
    }

    shouldComponentUpdate = (prevProps) => {
      if (this.props.flushData !== prevProps.flushData) {
        this.setState({
          file: "",
          imagePreviewUrl: "",
          imageError: ""
        });
      }
      return true;
    }

    handleImageChange(e) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      
      let imageStatus = !this.isFileImage(file) ? <h4 className="error">Please select a valid image</h4> : ""

      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
          imageError: imageStatus 
        });
      }
      reader.readAsDataURL(file);
      this.getData(file, imageStatus);
    }

    getData = (val, imageStatus) => {
        this.props.sendData(val, imageStatus);
    }

    isFileImage(file) {
      return file && file['type'].split('/')[0] === 'image';
    }
  
    render() {

      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;

      if (imagePreviewUrl) {
        if(this.state.imageError){
          $imagePreview = <div className={classes.imagePreview} onClick={() => this.fileInput.click()} ><BiImageAdd /><p>Select Again</p></div>
        } else {
          $imagePreview = <div className={classes.imagePreview} onClick={() => this.fileInput.click()} ><img src={imagePreviewUrl} alt=""/><p>Change Image?</p></div>
        }
      } else {
        $imagePreview = <div className={classes.addImage} onClick={() => this.fileInput.click()} ><BiImageAdd /><p>{this.props.wording}</p></div>
      }
      
      return (
        <div className={classes.ImageUpload + " selectable"}>
            <input
                style={{display: 'none'}}
                type="file"
                accept="image/x-png,image/jpeg"
                name="newImage"
                onChange={(e)=>this.handleImageChange(e)} 
                ref={fileInput => this.fileInput = fileInput}
            />
            {$imagePreview}
            {this.state.imageError}
        </div>
      )
    }
}

  export default imageUpload