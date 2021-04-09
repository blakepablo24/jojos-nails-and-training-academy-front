import React, { Component } from 'react';
import classes from './ImageUpload.module.css';
import { BiImageAdd } from "react-icons/bi";

class imageUpload extends Component {
    state = {
        file: '',
        imagePreviewUrl: ''
    }
  
    handleImageChange(e) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file);
      this.getData(file);
    }

    getData = (val) => {
        this.props.sendData(val);
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = <div className={classes.imagePreview} onClick={() => this.fileInput.click()} ><img src={imagePreviewUrl} alt=""/><p>Change Image?</p></div>
      } else {
        $imagePreview = <div className={classes.addImage} onClick={() => this.fileInput.click()} ><BiImageAdd /><p>{this.props.wording}</p></div>
      }
      
      return (
        <div className={classes.ImageUpload}>
            <input
                style={{display: 'none'}}
                type="file"
                accept="image/x-png,image/jpeg"
                name="newImage"
                onChange={(e)=>this.handleImageChange(e)} 
                ref={fileInput => this.fileInput = fileInput}
            />
            {$imagePreview}
        </div>
      )
    }
}

  export default imageUpload