import './App.css';
import React, { Component } from 'react';
// import firebase from 'firebase';
import firebase from './config/firebase';
import axios from 'axios'
import route from './config/route'


class App extends Component {
  constructor() {
    super()
    this.state = {
      // changePdf: true,
      // openMenu : true,
      // url: 'https://firebasestorage.googleapis.com/v0/b/morbargig-a81d2.appspot.com/o/BargigShopUsers%2FMor%20Bargig%20CV.pdf?alt=media&token=f6881d50-a3f8-494f-a715-791709b555f4'
    }
  }

  componentDidMount = async () => {
    if (!this.state.isImageUpsate) {
      const res = await axios.get(`${route}getPdf`)
      let pdf = res.data[0].pdf
      this.setState({ url: pdf, isImageUpsate: true })
    }
  }

  handleImage = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      this.setState({
        uploadedImage: image
      })
    }
  }

  handleUpload = () => {
    console.log("kjgjyfjukguyv")
    const { uploadedImage } = this.state
    if (this.state.uploadedImage === null) {
      alert('Please pick a valid image!')
    }
    else {
      const uploadTask = firebase.storage().ref(`/MorBargigPdf/${uploadedImage.name}`).put(uploadedImage)
      uploadTask.on('state_changed',
        (snapshot) => {
          // progress function
        },
        (error) => {
          console.log(error)
        },
        () => {
          firebase.storage().ref('MorBargigPdf').child(uploadedImage.name).getDownloadURL().then(url => {
            this.setState({
              img: url
            })
            console.log(this.state.img)

          })
        }
      )
    }
    console.log(this.state)
  }

  // updateImage = () => {
  //   let image = prompt('Please enter your', 'image')
  //   if (image === null || image === "" || image === "image") {
  //     console.log("jhvjhv")
  //   }
  // }


  admin = () => {
    let Password = prompt("Please enter your Admin Password", "Password");
    console.log(Password)
    if (Password === null || Password === "" || Password === "Password") {
      return null
    }
    if (Password === "bargig123456") {
      console.log("kjsjkbkjb")
      this.setState({ changePdf: true })
      // this.updateImage()
    }
    if (Password !== "bargig123456") {
      alert("Hi your not my Admin, watch out!! ")
    }
  }

  updatePdf = async () => {
    let pdf = this.state.img
    console.log(pdf)
    let upDate = {
      pdf: pdf
    }
    await axios.put(`${route}upDatePdf/`, upDate)
    window.location.reload()
  }

  openMenu = () => {
    let x = this.state.openMenu
    this.setState({ openMenu: !x })
  }

  render() {
    return (<div>
      {/* <a> */}
      {this.state.changePdf ? <div> <input type="file" onChange={this.handleImage} />
        <button onClick={this.handleUpload}>Upload Image</button><button onClick={this.updatePdf}>update pdf </button></div> : null}
      <h2 className="header">Mor Bargig CV  </h2>

      <div className="topnav">

        <a onClick={this.openMenu} className="active">menu</a>
        {this.state.openMenu ?
          <div id="myLinks">
            <a href={this.state.url} >pdf</a>
            <a href="https://5d60919cef31b.site123.me/">My Web Site</a>
            <a href="https://github.com/morbargig?tab=repositories">GitHub</a>
            <a href="https://www.linkedin.com/in/mor-bargig-744854182/">LinkedIn</a>
            <a href="tel:+972 52-861-2379"> Contact </a>
            <a href="mailto:mobargig@gmail.com"> Email</a>
            <a onClick={this.admin} className='Admin' >Admin ?</a>
          </div>
          : <a className="Portfolio" href="https://5d60919cef31b.site123.me/">Portfolio</a>}
      </div>

      <embed type="application/pdf"
        src={this.state.url}
        width="100%" height="650px" alt="pdf"
        pluginspage="http://www.adobe.com/products/acrobat/readstep2.html"
        background-color="0xFF525659"
        top-toolbar-height="56"
        full-frame=""
        internalinstanceid="22"
        title="Mor Bargig"></embed>
    </div>
    );
  }
}

export default App;
