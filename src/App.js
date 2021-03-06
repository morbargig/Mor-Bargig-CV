import './App.css';
import React, { Component } from 'react';
import dbHandel from './config/firebase'
require('dotenv').config();


class App extends Component {
  defaultUrl = 'https://firebasestorage.googleapis.com/v0/b/morbargig-a81d2.appspot.com/o/CV%2Fno-photo-available.png?alt=media&token=27b382af-7a35-4551-ade9-5edb5271df6b'
  state = {
    url: this.defaultUrl
  }

  componentDidMount = async () => {
    if (!this.state.isImageUpsate) {
      const data = await dbHandel.getPdf()
      if (data) {
        this.setState({ url: data[data.language], EngPDF: data.EngPDF, HebPDF: data.HebPDF, linkedin: data.linkedin, language: data.language, isImageUpsate: true })
      } else {
        // console.log("new pdf")
        dbHandel.newPdf()
        this.componentDidMount()
      }
    }
    if (this.state.isMobile === undefined) {
      let check = false;
      (function (a) {
          if (
              (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
          ) {
              check = true;
          }
      })(navigator.userAgent || navigator.vendor || window.opera);
    this.setState({ isMobile: check })
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

  handleUpload = async () => {
    const { uploadedImage } = this.state
    if (this.state.uploadedImage === null) {
      alert('Please pick a valid image!')
    }
    else {
      let url = await dbHandel.uplodadPdf(uploadedImage)
      this.setState({
        img: url
      })
      this.updatePdf()
    }
  }


  admin = () => {
    let Password = prompt("Please enter your Admin Password", "Password");
    // console.log(Password)
    if (Password === null || Password === "" || Password === "Password") {
      return null
    }
    if (Password === "bargig123456") {
      this.setState({ changePdf: true })
    }
    if (Password !== "bargig123456") {
      alert("Hi your not my Admin, watch out!! ")
    }
  }

  updatePdf = async () => {
    let answer = prompt("R U Update English PDF", "yes ,no or link");
    let language
    if (answer === null || answer === "" || answer === 'yes ,no or link') {
      alert(" cencel update")
    }
    if (answer === "yes") {
      language = "EngPDF"
    }
    if (answer === "no") {
      language = 'HebPDF'
    }
    if (answer === "link") {
      language = 'linkedin'
    }
    let pdf = this.state.img
    // console.log(pdf)
    let upDate = {
      [language]: pdf,
      language: language
    }
    dbHandel.updatePdf(upDate)
    window.location.reload()
  }

  openMenu = () => {
    let x = this.state.openMenu
    this.setState({ openMenu: !x })
  }

  getPDF = async (e) => {
    let name = e.target.name
    let upDate = {
      language: name
    }
    this.setState({ url: this.state[name], language: name })
    dbHandel.updatePdf(upDate)
  }
  printPdf = () => {
    // for (var i = 0; i < window.frames.length; i++) {
    //   window.frames[i].focus();
    //   window.frames[i].print();
    // }
    // let pdfId = 'pdf'
    // let pdfObject = document.getElementById(pdfId);
    // if (typeof (pdfObject.print) === 'undefined') {
    //   setTimeout(() => { this.printPdf(pdfId); }, 1000);
    // } else {
    //   pdfObject.print();
    // }
  }



  render() {
    let x = this.state.language === 'EngPDF'
    let l = this.state.language === "linkedin"
    let h = this.state.language === "HebPDF"
    return (<div>
      {this.state.changePdf ? <div> <input type="file" onChange={this.handleImage} />
        <button onClick={this.handleUpload}>Upload Image</button>
        {/* <button onClick={this.updatePdf}>update pdf </button> */}
      </div> : null}
      <h2 className="header" > {!h ? "Mor Bargig CV" : ' מור ברגיג קו"ח'} </h2>
      <button className={x ? "disabled" : null} name="EngPDF" style={h ? { float: 'right' } : { float: "left" }} onClick={!x ? this.getPDF : null} > {!h ? 'English' : " אנגלית"} </button>
      <button className={h ? "disabled" : null} name="HebPDF" style={h ? { float: 'right' } : { float: "left" }} onClick={!h ? this.getPDF : null}  > {!h ? 'Hebrew' : "עברית"} </button>
      <button className={l ? "disabled" : null} name="linkedin" style={h ? { float: 'right' } : { float: "left" }} onClick={!l ? this.getPDF : null}  > {!h ? 'linkedin' : "לינקדין"} </button>
      <br></br><br></br>
      <br></br><br></br>

      <div className="topnav">

        <a href="/#" onClick={this.openMenu} className="active">Menu</a>
        {this.state.openMenu ?
          <div id="myLinks">
            <a href={this.state.url} target="blank">pdf</a>
            <a href="https://5d60919cef31b.site123.me/" target="blank">My Web Site</a>
            <a href="https://github.com/morbargig?tab=repositories" target="blank">GitHub</a>
            <a href="https://www.linkedin.com/in/mor-bargig-744854182/" target="blank">LinkedIn</a>
            <a href="tel:+972 52-861-2379" target="blank"> Contact </a>
            <a href="mailto:mobargig@gmail.com" target="blank"> Email</a>
            <a href="/#" onClick={this.admin} className='Admin' >Admin ?</a>
          </div>

          :
          <a
            className="Portfolio"
            href="https://morbargig.github.io/morbargig/" target="blank" style={{ marginTop: 0 + "px" }}>
            Portfolio <span></span>
            <img src="./smallMorBargigSig.png" alt="Javascript"

              style={{ borderRadius: 50 + '%', height: 12 + 'px', width: 12 + 'px' }}
            ></img>
          </a>}
      </div>
      {this.state.isMobile ? <div >
        <iframe title='pdf' id="pdf" name="pdf" src={this.state.url || this.defaultUrl} width="100%" height="600px" frameBorder="0" scrolling="yes">
          <p>It appears your web browser doesn't support iframes.</p>

        </iframe>
        <button type="button" onClick={this.printPdf}>
            Print PDF
        </button>
      </div>
        :
        <div>
          <embed
            id="pdf"
            name="pdf"
            type="application/pdf"
            src={this.state.url}
            width="100%" height="1000px" alt="pdf"
            pluginspage="http://www.adobe.com/products/acrobat/readstep2.html"
            background-color="0xFF525659"
            top-toolbar-height="56"
            full-frame=""
            internalinstanceid="22"
            title="Mor Bargig">

          </embed>
          {/* <button type="button" onClick={this.printPdf}>
            Print PDF
        </button> */}
        </div>
      }
    </div>
    );
  }
}

export default App;
