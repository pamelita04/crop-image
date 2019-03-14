import { Component, OnInit, ViewChild } from '@angular/core';
import { CropperComponent } from 'angular-cropperjs';
import { saveAs } from 'file-saver';
// import * as FileSaver from 'file-saver';

import "file-saver";

@Component({
  selector: 'app-cropper-image',
  templateUrl: './cropper-image.component.html',
  styleUrls: ['./cropper-image.component.css']
})
export class CropperImageComponent implements OnInit {

  @ViewChild('angularCropper') public angularCropper: CropperComponent;
  // cropperOptions: any;
  croppedImage = null;

  objectImage: any;
  nameImage: any;
  versionBrowser: any;

  myImage = null;
  scaleValX = 1;
  scaleValY = 1;

  cropperOptions

  title = 'cropImage';
  name = 'Angular 4';
  url = '';

  constructor() {
    this.cropperOptions = {
      dragMode: 'none',
      aspectRatio: 16 / 9,
      autoCropArea: 0.65,
      autoCrop: true,
      movable: true,
      zoomable: true,
      scalable: false,
      cropBoxResizable: false,
      dragCrop: true,
      highlight: false,

      minCropBoxWidth: 800,
      minCropBoxHeight: 450,

    };

    console.log("===============cropperOptions===================== ")
  }

  

  ngOnInit() {
    console.log("===============ngOnInit===================== ")
    this.versionBrowser = this.getBrowser();
    console.log("versionBrowser-------", this.versionBrowser)
  }

  getBrowser() {
    let ua = navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE',version:(tem[1]||'')};
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR|Edge\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
 }

  readyCrop(event) {
    console.log("----ready----", event);
    this.resize();
  }

  onSelectFile(event: any) {

    if (event.target.files && event.target.files[0]) {
      console.log("fileSelect", event.target.files[0].name )
      this.nameImage = event.target.files[0].name 
      if (this.angularCropper) {
        this.reset();
        this.url = '';
      }

      this.objectImage = event.target.files[0];
      console.log("dataImage===================== ", event.target.files[0])
    }

   /*   
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        console.log("url===================== ", this.url)
        // const canvas: any = document.getElementById('canvas');
        // const ctx = canvas.getContext('2d');
        const image = new Image();

        image.src = this.url;
        // ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);

      }*/

    // setTimeout(() => {
    //   console.log("timer===========")
    //   if(this.url){

    //     this.resize();
    //   }
    //  }, 2000);
  }

  resize() {

    this.angularCropper.cropper.setCropBoxData({ height: 450, width: 800 })
    this.angularCropper.cropper.crop();
    // new Cropper(image, {
    // ready() {
    // this.cropper[method](argument1, , argument2, ..., argumentN);
    // this.angularCropper.cropper.move(1, -1);

    // // Allows chain composition
    // this.angularCropper.cropper.move(1, -1).rotate(45).scale(1, -1);
    // },
    // });
  }

  cropperRun() {
    let getCroppedCanvas = this.angularCropper.cropper.getCroppedCanvas();
    console.log("getCroppedCanvas", getCroppedCanvas);

    let imageData = this.angularCropper.cropper.getImageData();
    let getDataImage = this.angularCropper.cropper.getData();
    let cropBoxData = this.angularCropper.cropper.getCropBoxData();
    console.log("getImageData", imageData);
    console.log("getData", getDataImage);
    console.log("cropBoxData", cropBoxData);
  }

  save() {
    console.log("-----click saveeee")
    // let croppedImgB64String: string = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', (100 / 100));
    // this.croppedImage = croppedImgB64String;

    // this.resize();
    // let getDataImage = this.angularCropper.cropper.getData();
    // console.log("cropData x:", getDataImage.x, "cropData y:", getDataImage.y);
    this.saveImage()
    
    // this.cropperRun()
  }

  saveImage() {

    let blob: Blob = new Blob([this.objectImage], { type: 'image/jpg' });
    let filename = this.objectImage.name;
    // let disableAutoBOM = true;
    window.saveAs(blob, filename);

    // saveAs(new Blob([this.objectImage], { type: 'jpg' }), 'newImage.pdf');

    // let FileSaver  : any = require('file-saver');
    // let file = new Blob([this.objectImage], { type: 'jpg'});
    // FileSaver.saveAs(file, 'newImage.jpg');

    // let canvas :any = document.getElementById("my-canvas");
    // canvas.toBlob(function(blob) {
    // saveAs(blob, "pretty image.png");
    // });
  }

  reset() {
    this.angularCropper.cropper.reset();
  }

  clear() {
    this.angularCropper.cropper.clear();
  }

  rotate() {
    this.angularCropper.cropper.rotate(90);
  }

  zoom(zoomIn: boolean) {
    let factor = zoomIn ? 0.1 : -0.1;
    this.angularCropper.cropper.zoom(factor);
  }

  scaleX() {
    this.scaleValX = this.scaleValX * -1;
    this.angularCropper.cropper.scaleX(this.scaleValX);
  }

  scaleY() {
    this.scaleValY = this.scaleValY * -1;
    this.angularCropper.cropper.scaleY(this.scaleValY);
  }

  move(x, y) {
    this.angularCropper.cropper.move(x, y);
  }

}
