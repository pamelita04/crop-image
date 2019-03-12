import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularCropperjsModule } from 'angular-cropperjs';
import { CropperImageComponent } from './cropper-image/cropper-image.component';

@NgModule({
  declarations: [
    AppComponent,
    CropperImageComponent
  ],
  imports: [
    BrowserModule,
    AngularCropperjsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
