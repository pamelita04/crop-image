import { Component, OnInit, ViewChild } from '@angular/core';
import { CropperComponent } from 'angular-cropperjs';

@Component({
  selector: 'app-cropper-image',
  templateUrl: './cropper-image.component.html',
  styleUrls: ['./cropper-image.component.css']
})
export class CropperImageComponent implements OnInit {

  @ViewChild('angularCropper') public angularCropper: CropperComponent;
  // cropperOptions: any;
  croppedImage = null;

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
      aspectRatio: NaN,
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
   }

  ngOnInit() {
  }

  readyCrop(event){
    console.log("----ready----", event);
    this.resize();
  }

  

  

  

  onSelectFile(event: any) {

    
    if (event.target.files && event.target.files[0]) {
      if(this.angularCropper){
        this.reset();
        this.url = '';
      }
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        console.log(event);
        this.url = event.target.result;
        // const canvas: any = document.getElementById('canvas');
        // const ctx = canvas.getContext('2d');
        const image = new Image();
       

       


        image.src = this.url;

        

        

    



        
        
        
        

        // ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);

      }
    }
    
    // setTimeout(() => {
    //   console.log("timer===========")
    //   if(this.url){

    //     this.resize();
    //   }
    //  }, 2000);
  }

  resize(){
    // new Cropper(image, {
      // ready() {
        // this.cropper[method](argument1, , argument2, ..., argumentN);
        // this.angularCropper.cropper.move(1, -1);
    
        // // Allows chain composition
        // this.angularCropper.cropper.move(1, -1).rotate(45).scale(1, -1);
        this.angularCropper.cropper.setCropBoxData({ height: 450, width: 800  })
      this.angularCropper.cropper.crop();

      // },
    // });
  }

  cropperRun(){

    let getCroppedCanvas = this.angularCropper.cropper.getCroppedCanvas();
    console.log("getCroppedCanvas", getCroppedCanvas);

      let imageData = this.angularCropper.cropper.getImageData();
      let getDataImage = this.angularCropper.cropper.getData();
      let cropBoxData = this.angularCropper.cropper.getCropBoxData();
      console.log("getImageData", imageData);
      console.log("getData", getDataImage );
      console.log("cropBoxData", cropBoxData );

  }




  ngOnChanges(){
    console.log("--changess----")
    if(this.angularCropper){

    }
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

  save() {
    console.log("-----", this.angularCropper)
    let croppedImgB64String: string = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', (100 / 100));
    this.croppedImage = croppedImgB64String;
    this.cropperRun()
    this.resize();
  }

}
