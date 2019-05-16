import React from 'react';
import * as firebase from 'firebase';
import {withRouter} from 'react-router-dom'

//SERVICES
import ImageService from './ImageServices';


class Upload extends React.Component {

  saveImage = (url) => {
    const date = Date();

    ImageService.saveImage(url, date)
  
  }

  handleFileInput = async (e) => {
    const firstFile = e.target.files[0];
    const email = firebase.auth().currentUser.email
    const root = firebase.storage().ref()
    const newImage = root.child(`/${email}/`+firstFile.name);

    newImage.put(firstFile)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL()
      })
      .then((url) => {
        console.log(url)
        this.saveImage(url);
      })

    try {
      const snapshot = await newImage.put(firstFile);
      const url = await snapshot.ref.getDownloadURL();
      this.saveImage(url);
    }
    catch(err) {
      console.log(err);
    }
    
  }

  render() {

    return (
        <div className="input-group">
          <div className="custom-file">
            <input type="file" className="custom-file-input" onChange={this.handleFileInput} />
            <label className="custom-file-label">Upload Your Profile Photo and Join The Movement</label>
          </div>
        </div>
    );
  }
}

export default withRouter(Upload)