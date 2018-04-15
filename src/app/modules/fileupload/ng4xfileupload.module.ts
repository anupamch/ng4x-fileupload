import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng4xfileuploadComponent } from './ng4xfileupload/ng4xfileupload.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [Ng4xfileuploadComponent],
  exports: [
    Ng4xfileuploadComponent // <-- this!
  ]
})
export class Ng4xFileuploadModule { }
