import { Component, OnInit } from '@angular/core';

import {HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  courses = new Map();
  url : string ;
  ajout : boolean =false ;
  isLoading: boolean = true;

  tcode : string;

  searchServiceUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/searchservice';

  getCourseUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/courses';
  getTeacherUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/teachers';
  getStudentUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/students';
  getNbUsers='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/nbusers';
  getAllCouresUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/allcourses';
  getAllUsersUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/allusers';
  getAllImagesUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/allimages';


  getAllServicesUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/allservices';

  searchCourseUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/searchcourse';
  coursDetails: any=[];
  teacherDetails: any=[];
  studentDetails: any=[];
  allCourses : any=[];
  allServices : any=[];
  allUsers : any=[];
  allImages : any=[];


  nbUsers : any=[];
  coursname : string ; 
  username : string ;
  imagename : string ;
  coursid : string ; 
  userid : string ;
  imageid : string ;




  error: string ;
  headers= new HttpHeaders().set("content-type","application/json");
  

  constructor( private http: HttpClient  ) { }

  ngOnInit() {
    this.getAllServices();

  }

    searchService(search : string){
      this.isLoading=true;

      this.allServices =[];

      let params= new HttpParams()
            .set("search",search);
  
        this.http.get(this.searchServiceUrl,{params}).subscribe(
          res=>{this.allServices=res;
            this.isLoading=false;
          },
          err=>{console.log("ERROR! : " +err.message);  
                this.isLoading=false;
        }
        );

      }

    onSubmitSearch() {

      return this.tcode;
    }
    //-------------------------------------

    getAllServices(){
      this.isLoading=true;

    this.allServices=[];

    let params= new HttpParams()

      this.http.get(this.getAllServicesUrl,{params}).subscribe(
        res=>{this.allServices=res;this.isLoading=false;},
        err=>{console.log("ERROR! : " +err.message);this.isLoading=false;}
      );

    }

    deleteService(user_id:string,username:string,cours_id:string,cours_name:string,image_id:string,image_name:string){ 
      let params= new HttpParams().set("userId",user_id)
      .set("userName",username)
      .set("coursId",cours_id)
      .set("coursName",cours_name)
      .set("imageId",image_id)
      .set("imageName",image_name);

      this.http.delete(this.getAllServicesUrl,{params}).subscribe(
        res=>{     this.getAllServices();
          this.getAllServices();},
        err=>{
          alert("error!");}

      );
    }
    getAllUsers(){
      this.allUsers =[];
  
    let params= new HttpParams()
  
      this.http.get(this.getAllUsersUrl,{params}).subscribe(
        res=>{this.allUsers=res},
        err=>{console.log("ERROR! : " +err.message);}
      );
    }

     getAllImages(){
      this.allUsers =[];
  
    let params= new HttpParams()
  
      this.http.get(this.getAllImagesUrl,{params}).subscribe(
        res=>{this.allImages=res},
        err=>{console.log("ERROR! : " +err.message);}
      );
    }
  
  


    getAllCourses(){
      this.allCourses =[];

    let params= new HttpParams()

      this.http.get(this.getAllCouresUrl,{params}).subscribe(
        res=>{this.allCourses=res; },
        err=>{console.log("ERROR! : " +err.message);}
      );
    }

    autouriserAjout(){
      
      this.ajout=true;
      this.getAllCourses();
      this.getAllUsers() ;
      this.getAllImages() ;
    
    }
    inhiberAjout(){
      this.ajout=false;
    
    }
    isAddAutorized(){

      return this.ajout ;
    
    }


    getSelectedUser(event : any)
    { this.username= event.target.value ;}
    getSelectedCourse(event : any)
    { this.coursname= event.target.value ;}
    getSelectedImage(event : any)
    { this.imagename= event.target.value ;}

getUserNameInput()
{ return this.username ;}
getCoursNameInput()
{ return this.coursname ;}
getImageNameInput()
{ return this.imagename ;}
getUserIdInput(){return this.userid;}
getCoursIdInput(){return this.coursid;}
getImageIdInput(){return this.imageid;}











}


