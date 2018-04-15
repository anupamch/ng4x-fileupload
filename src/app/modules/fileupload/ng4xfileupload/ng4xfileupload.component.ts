import { Input,ViewChild,Component } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'ng4x-fileupload',
  templateUrl: './ng4xfileupload.component.html',
  styleUrls: ['./ng4xfileupload.component.css']
})
export class Ng4xfileuploadComponent {

  @ViewChild('fileInput') fileInput;
  @Input() isMultiple:boolean=false;
  @Input() accept_mime:string;
  image_array=[];
  file_object_array:any=[];
  constructor(private http:HttpClient) { }

 
  onChange($event){
    let fileBrowser =  this.fileInput.nativeElement;
    let files = $event.target.files;
    
    if(files && files[0])
    {
     
       //let reader = new FileReader();
       for(let i=0;i<files.length;i++){
        if(this.file_object_array.length==0 || this.isMultiple==false)
           this.file_object_array[i]=fileBrowser.files[i]; 
        else
            this.file_object_array.push(fileBrowser.files[i]) 

            
        if(files[i].type=='image/jpeg' || files[i].type=='image/png' || files[i].type=='image/gif')
        {
          if(this.image_array.length==0 || this.isMultiple==false) 
              this.image_array[0]=URL.createObjectURL(files[i])
          else
              this.image_array.push(URL.createObjectURL(files[i]))     
        }
             
         
       } 
        
    } 
    
    
  }
  // sanitize(url:string){
  //   return this.sanitizer.bypassSecurityTrustUrl(url);
  // }

  removefile(index:number){
    this.file_object_array.splice(index,1)
    if(this.image_array[index]!==undefined)
         this.image_array.splice(index,1)

  }

  getFileSelectCount(){
     return this.file_object_array.length;
  }
  
  fileSave(url:string,extra_param:any){
    let fileBrowser = this.fileInput.nativeElement;
    const formData = new FormData();
    
    let headers = new HttpHeaders();
    headers=headers.set('X-Custom-Header',JSON.stringify(extra_param))
    //formData.append('file',fileBrowser.file[0]); 
   
    if (this.file_object_array.length>0) {
      
     for(let i=0;i<this.file_object_array.length;i++)
        formData.append('file',this.file_object_array[i],this.file_object_array[i].name); 
      
    }
    this.file_object_array=[];
    this.image_array=[];
    return this.http.post(url,formData,{headers:headers})
    
  }

}
