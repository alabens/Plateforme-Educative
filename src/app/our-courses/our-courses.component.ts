import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders, HttpParams} from '@angular/common/http';

interface coursData{
  coursId: number;
  coursName: string;
  nbHours: number;
}

interface userData{
  userID: number;
  userName: string;
  userMail: string ;
  userRole: string ;

}

@Component({
  selector: 'app-our-courses',
  templateUrl: './our-courses.component.html',
  styleUrls: ['./our-courses.component.scss']
})
export class OurCoursesComponent implements OnInit {
  courses = new Map();
  url : string ;
  tcode : string;
  ajout : boolean =false ;
  endLoading:boolean =false; 
  delete= new Map() ;
  deleteOs=new Map();
  edit= new Map();
  ajoutImage = new Map();
  closeResult: string;
  cName: string ;
  nbHours : string ;
  image : string;
  checkedImageArray: Array<any> = [];
  allServices : any=[];

  getAllServicesUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/allservices';

  getCourseUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/courses';
  getTeacherUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/teachers';
  getStudentUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/students';
  getNbUsers='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/nbusers';
  getAllCouresUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/allcourses';
  getAllImagesUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/allimages';

  searchCourseUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/searchcourse';

  getAvailableOsUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/availableos';
  coursDetails: any=[];
  teacherDetails: any=[];
  studentDetails: any=[];
  allCourses : any=[];
  nbUsers : any=[];
  availableOs: any=[];
  allImages : any=[]; 

  isLoading: boolean = true;

  error: string ;
  headers= new HttpHeaders().set("content-type","application/json");
  

  constructor(private http: HttpClient   ) { }

  ngOnInit() {
  
    this.getAllCourses() ;
    this.getAllImages();

  }


  
  


  openCourse(course: string){
    try{

    this.getCourse(course);
  

    } catch(e) {alert("try again"); return }
        this.courses.clear();
    this.courses.set(course,true)


  }
  isActif(course :string){
    return this.courses.get(course);
  }
  suspend(course: string){
    this.courses.set(course,false);
  }
  getURL(URL : string){
    return "assets/img/courses/"+URL+".png"; 
  }

  

    onClickCourse(course : string){
      //this.openPopup(course);
      this.openCourse(course);

      
    }


    getAllCourses(){
      this.isLoading=true;

      this.allCourses =[];

    let params= new HttpParams()

      this.http.get(this.getAllCouresUrl,{params}).subscribe(
        res=>{this.allCourses=res; 
          this.isLoading=false;

        },
        err=>{console.log("ERROR! : " +err.message);
        this.isLoading=false;}
      );
    }

    searchCourse(course : string){
      this.isLoading=true;
      this.allCourses =[];

      let params= new HttpParams()
            .set("coursName",course);
  
        this.http.get(this.searchCourseUrl,{params}).subscribe(
          res=>{this.allCourses=res ;      this.isLoading=false;
          },
          err=>{console.log("ERROR! : " +err.message);}
        );
      }

    getCourse(course : string){
      this.isLoading=true ; 

      try{
        this.getTeacher(course,'teacher');
        this.getStudent(course,'student');
        this.getNb(course);
        this.getAvailableOs(course);
      }catch(e){alert("try again");}
      let params= new HttpParams().set("coursName",course);

      
      this.http.get(this.getCourseUrl,{params}).subscribe(
        res=>{this.coursDetails=res; 
          this.isLoading=false ; 

      
        },
        err=>{console.log("ERROR! : " +err.message);
        this.isLoading=false ; 

        }
      );
    }
     
    deleteCourse(course : string){
      this.isLoading=true;

      let params= new HttpParams().set("coursName",course);
      
      this.http.delete(this.getCourseUrl,{params}).subscribe(
        res=>{
          this.isLoading=false;

          alert("deleted successfully!");
          this.inhiberDelete(course);
          this.getAllCourses();


        },
        err=>{
          alert("Error: can not delete this course!");
          this.isLoading=false;}
        

      );
   

    }

    getAvailableOs(course : string){


      let params= new HttpParams()
          .set("coursName",course)

      this.http.get(this.getAvailableOsUrl,{params}).subscribe(
        res=>{this.availableOs=res;            
          
        },
        err=>{console.log("ERROR! : " +err.message);
        }
      );
    }


    getTeacher(course : string , role : string){

      let params= new HttpParams()
          .set("coursName",course)
          .set("userRole",role);

      this.http.get(this.getTeacherUrl,{params}).subscribe(
        res=>{this.teacherDetails=res;

        },
        err=>{console.log("ERROR! : " +err.message);
        this.isLoading=false;}
      );
    }

    getStudent(course : string , role : string){

      let params= new HttpParams()
          .set("coursName",course)
          .set("userRole",role);

      this.http.get(this.getStudentUrl,{params}).subscribe(
        res=>{this.studentDetails=res;


        },
        err=>{console.log("ERROR! : " +err.message);
        }
      );
    }


    deleteTeacher(coursName : string, teacherName : string){
      this.isLoading=true;

      let params= new HttpParams().set("coursName",coursName)
      .set("userName",teacherName);
      this.http.delete(this.getTeacherUrl,{params}).subscribe(
        res=>{
          this.isLoading=false;

          alert("Deleted successfully!");
          this.inhiberDelete(coursName);

          this.getTeacher(coursName,'teacher');
          this.getNb(coursName);
        },
        err=>{
          alert("Error: can not delete this teacher!");
          this.isLoading=false;}

      );
 


    }


    deleteStudent(coursName : string, teacherName : string){
      this.isLoading=true;

      let params= new HttpParams().set("coursName",coursName)
      .set("userName",teacherName);
      this.http.delete(this.getStudentUrl,{params}).subscribe(
        res=>{  
          this.isLoading=false;


          alert("Deleted successfully!");
          this.inhiberDelete(coursName);
          this.getStudent(coursName,'student');
          this.getNb(coursName);

        },
        err=>{
          alert("Error: can not delete this teacher!");
          this.isLoading=false;}

      );


    }
    addCourse(cours: string , nb : string){
      this.isLoading=true;

      this.http.post(this. getAllCouresUrl,{"cours_name":cours, "nb_hours":nb},
      ).subscribe(
        res => { 

          this.addAvailableCourse(cours );
          this.isLoading=false;

          alert("Added Successfuly!");
          this.inhiberAjout();
          this.getAllCourses();
        
        },
        err=>{
          alert("Error: Can not add this Course!");
          this.isLoading=false;
        }
      

      );
this.checkedImageArray=[];
    }

    addAvailableCourse(cours :string){ 

      for (var os of this.checkedImageArray){

        this.http.post(this. getAllImagesUrl,{"cours_name":cours.toString(), "image_name":os.toString()},
        ).subscribe(
          res => { 
            this.ngOnInit();
          
          }
  
        );
  
      }

    }

    getSelectedImage(event : any)
{ this.image= event.target.value ;}
getImageInput(){
  return this.image;
}



    addImagetoCourse(cours :string,image: string){ 

      this.isLoading=true;

        this.http.post(this. getAvailableOsUrl,{"cours_name":cours.toString(), "image_name":image.toString()},
        ).subscribe(
          res => { 
            try{
            for (var teacher of this.teacherDetails){
              this.addService(cours,teacher.username,image);

            }
            for (var student of this.studentDetails){
              this.addService(cours,student.username,image);
              
            }
          }catch (e){alert("try again"); return}
          this.isLoading=false;

            this.inhiberDeleteOs(image);
            this.getAvailableOs(cours);
            this.inhiberAjoutImage(cours);
          
          },
          err=>{
            alert("Can not add "+ image + "from " + cours + "!" );
            this.isLoading=false;
          }
  
        );
  
      

    }



    
    getNb(course : string ){

      let params= new HttpParams()
          .set("coursName",course)

      this.http.get(this.getNbUsers,{params}).subscribe(
        res=>{this.nbUsers=res;

        },
        err=>{console.log("ERROR! : " +err.message);
   }
      );
    }
    initialiser(course : string){
      this.isLoading=true;

      this.suspend(course);
      this.coursDetails=[];
      this.teacherDetails=[];
      this.studentDetails=[];
      this.nbUsers =[];
      this.isLoading=false;

    }


    onSubmitSearch() {
      return this.tcode;
    
    }

isAddAutorized(){

  return this.ajout ;

}

isNotAddAutorized(){

  return this.ajout ;

}
autouriserAjout(){
  this.checkedImageArray=[];

  this.ajout=true;
  this.getAllCourses();
  this.getAllImages();

}
inhiberAjout(){
  this.ajout=false;

}


getAllImages(){

  this.allCourses =[];

let params= new HttpParams()

  this.http.get(this.getAllImagesUrl,{params}).subscribe(
    res=>{this.allImages=res; 
    },
    err=>{console.log("ERROR! : " +err.message);
    this.isLoading=false;}
  );
}

onCheckImage(image:string, isChecked: boolean) {
  if(isChecked) {
    this.checkedImageArray.push(image);
  } else {
    let index = this.checkedImageArray.indexOf(image);
    this.checkedImageArray.splice(index,1);
  }
}


autoriserDelete(cours : string){
  this.delete.clear();
  this.delete.set(cours,true)



}
inhiberDelete(cours:string){
  this.delete.set(cours,false);
}
toDeleteCourse(course :string){
  return this.delete.get(course);
}

autoriserEdit(cours : string){
  this.edit.clear();
  this.edit.set(cours,true)
}

inhiberEdit(cours:string){
  this.edit.set(cours,false);
}

isEditable(course :string){
  return this.edit.get(course);
}


editCourse(cours:string ,nb :String){
  this.isLoading=true;

  this.http.put(this. getCourseUrl,{"cours_name":cours, "nb_hours":nb},
  ).subscribe(
    res => { 
      this.isLoading=false;

      this.inhiberEdit(cours);
      this.getCourse(cours) ;
    
    },
    err=>{
      alert("Error: Can not edit this Course!");
      this.isLoading=false;
    }

  );


  }


  autoriserAjoutImage(cours : string){
    this.ajoutImage.clear();
    this.ajoutImage.set(cours,true)
  }
  
  inhiberAjoutImage(cours:string){
    this.ajoutImage.set(cours,false);
  }
  
  isAjoutImage(course :string){
    return this.ajoutImage.get(course);
  }


  deleteAvailableImage(course : string , image: string){
    this.isLoading=true;

    let params= new HttpParams().set("coursName",course)
    .set("imageName",image);
    
    this.http.delete(this.getAvailableOsUrl,{params}).subscribe(
      res=>{          this.isLoading=false;

        alert("deleted successfully!");

        this.getAvailableOs(course);
      },
      err=>{
        alert("Error: can not delete " + image +"from " + course+ "!");
        this.isLoading=false;}
      

    );
 

  }



  
autoriserDeleteOs(cours : string){
  this.deleteOs.clear();
  this.deleteOs.set(cours,true)



}
inhiberDeleteOs(cours:string){
  this.deleteOs.set(cours,false);
}
toDeleteCourseOs(course :string){
  return this.deleteOs.get(course);
}


addService(cours: string , user : string , image: string){
  this.isLoading=true;


  this.http.post(this. getAllServicesUrl,{"cours_name":cours, "username":user, "image_name" : image},
  ).subscribe(
    res => { 
      this.isLoading=false;

      alert("Added Successfuly!");
    
    },
    err=>{
      alert("Error: Can not add this service!");
      this.isLoading=false;
    }

  );

}


  
}




