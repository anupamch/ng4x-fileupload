# Description
    Easy file upload module for angular 4 and next versions. 
    Single or multiple file can upload with mime type selection control. 
    Please read the description carefully.
# Installation
    npm i ng4x-fileupload --save

# How to use
  After installation import it into your app.module.ts

     import {Ng4xFileuploadModule} from 'ng4x-fileupload'

  After that import the FileUploadComponent from 'ng4x-fileupload' into your component.

     import {Ng4xfileuploadComponent} from 'ng4x-fileupload'

  Add the ng4x-fileupload component tag into your html file.

     <ng4x-fileupload #ng4fileupload></ng4x-fileupload>

*You should import HttpClientModule in your app.module.ts

     import {HttpClientModule} from '@angular/common/http'

you should add an id for the ng4x-fileupload component tag  in your html. By this tag you can access respective function of ng4x-fileupload module.You can add any id in this tag.
Now add this line in your component:

     @ViewChild('ng4fileupload') ng4xfileupload:Ng4xfileuploadComponent;

For multiple file upload you need to add a input variable into tag:

     <ng4x-fileupload #ng4fileupload [isMultiple]="bool_multiple"></ng4x-fileupload>

'isMultiple' variable name cannot be change and it is a boolean variable. You can give 'bool_multiple' variable name and it should be boolean.So in your component:
     bool_multiple:boolean=true/false

For specific file type you want to upload tag will be:

  <ng4x-fileupload #ng4fileupload [isMultiple]="bool_multiple" [accept_mime]="my_mime"></ng4x-fileupload>

'accept_mime' variable name cannot be change and it is a accept mimetype value like image/png,application/pdf etc. You can give 'my_mime' variable name and it should a string type. So in your component:
   my_mime:string='image/*'

# Function Description
 For validation:
        getFileSelectCount() : It return file count selected by user. 

example:
     <ng4x-fileupload #ng4fileupload [isMultiple]="bool_multiple" [accept_mime]="my_mime"></ng4x-fileupload>
in component:
     @ViewChild('ng4fileupload') ng4xfileupload:Ng4xfileuploadComponent;

     let count_file=this.ng4xfileupload.getFileSelectCount()

For file upload:
fileSave(url:string,extra_param:object): For save file in your server. It takes two parameter.
1. url: your server router url for file upload. It is string type.
2. extra_param: It is an object type variable. You can send extra parameter like id, file name etc.
   let extra_param={id:1,age:23}. If no extra param just send an empty object. 
   It returns an Observable. In server you can get this variable value by:

        var extra_param=req.headers['x-custom-header']
        if(typeof extra_param!=="undefined")
                extra_param=JSON.parse(extra_param)


example:                                         
        <ng4x-fileupload #ng4fileupload [isMultiple]="bool_multiple" [accept_mime]="my_mime"></ng4x-fileupload>

in component:
        @ViewChild('ng4fileupload') ng4xfileupload:Ng4xfileuploadComponent;
        let url=<server url for file upload>
        let extra_param={}
        let count_file=this.ng4xfileupload.fileSave(url,extra_param).subscribe(todo=>{});

#Node server code example
In your node server you can use multer.
In this example how upload image and resize it. You can set your version. 
        var multer = require('multer');
        var Jimp = require("jimp");
        var filepath=__dirname.substr(0,__dirname.indexOf("operation")-1)
        var storage = multer.diskStorage({ //multers disk storage settings

                                        destination: function (req, file, cb) {

                                            cb(null, filepath+'/public/deal_upload/');

                                        },

                                        filename: function (req, file, cb) {

                                            var datetimestamp = Date.now();
                                            var randomnumber = Math.floor(Math.random() * (9999999999 - 1111111111 + 1)) + 1111111111;
                                            cb(null, file.fieldname + '-' + randomnumber + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);

                                        }

                 });

    var upload = multer({ //multer settings

                                storage: storage

                            }).single('file');


    obj.ImageUpload=function(req, res) {
                            var fs=require('fs');
                            var extra_param=req.headers['x-custom-header'];
                            if(typeof extra_param!=="undefined")
                               extra_param=JSON.parse(extra_param)
                              
                            upload(req,res,function(err){
                                     
                                Jimp.read((req.file).path).then(function (lenna) {
                                  
                                    lenna.clone()
                                         .quality(60)
                                         .write((req.file).destination+"/banner/"+extra_param.id+".jpg");
                                    
                                    lenna.resize(569, Jimp.AUTO, Jimp.RESIZE_BEZIER)            // resize 
                                         .quality(60)                 // set JPEG quality 
                                         //.greyscale()                 // set greyscale 
                                         .write((req.file).destination+extra_param.id+".jpg"); // save 

                                    lenna.resize(272, Jimp.AUTO, Jimp.RESIZE_BEZIER)            // resize 
                                         .quality(60)                 // set JPEG quality 
                                         //.greyscale()                 // set greyscale 
                                         .write((req.file).destination+"/small_box/"+extra_param.id+".jpg"); // save     
                                    fs.unlink((req.file).path)     
                                }).catch(function (err) {
                                    console.error(err);
                                });
                
                                if(err){
                                     console.log(err)  
                                     res.json({error_code:1,err_desc:err});
                    
                                     return;
                    
                                }
                    
                                 res.json({error_code:0,err_desc:null});
                    
                            });
                    
    } 

#Further support
  Comming soon    


