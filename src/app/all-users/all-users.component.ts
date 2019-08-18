import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders, HttpParams} from '@angular/common/http';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {



  getAllUsersUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/allusers';
  getAllInscriptionsUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/courses';
  getAllServicesUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/allservices';
  getAvailableOsUrl= 'https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/availableos';


  subscribedCoursesUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/subscribedcourses';

  searchStudentUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/searchstudent';
  getAllStudentsUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/allstudents';
  getAllTeachersUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/allteachers';
  getAllCoursesUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/allcourses';
  searchTeacherUrl='https://09dlqrql5k.execute-api.eu-west-1.amazonaws.com/dev/searchstudent';
  error: string ;
  headers= new HttpHeaders().set("content-type","application/json");
  allUsers : any=[];
  allCourses : any=[];
  subscribedCourses = new Map() ;


  allServices: any=[];
  availableOs:any=[];
  users = new Map();

  students : string;
  teachers : string ;
  ajout : boolean =false ;
  delete= new Map() ;
  edit= new Map() ;
  getCourses = new Map();
  isLoading: boolean = true;


  inscription: boolean= false ; 

  name: string ; 
  mail : string ; 
  role: string ; 
  coursName;
  




  constructor( private http: HttpClient) { }

  ngOnInit() {
    this.getAllUsers();


  }
  getAllUsers(){
    this.isLoading=true; 

    this.allUsers =[];

  let params= new HttpParams()

    this.http.get(this.getAllUsersUrl,{params}).subscribe(
      res=>{this.allUsers=res
        try{
        for (var user of this.allUsers)
        { 
          this.getsubscribedCourses(user.username) ;
        }}catch(e){alert("try again"); return;} ;
        this.isLoading=false; 
      },
      
      err=>{    
        alert("try again");
        this.isLoading=false; 
    }
    );



  }

  getsubscribedCourses(user: string ){
    this.isLoading=true; 

    let params= new HttpParams()
    .set("userName",user)
    this.http.get(this.subscribedCoursesUrl,{params}).subscribe(
      res=>{this.subscribedCourses.set(user ,res);    this.isLoading=false; 
      },
      err=>{console.log("ERROR! : " +err.message);    this.isLoading=false; 
    }
    );
  }




 



    getAllCourses(){
      this.isLoading=true; 

      this.allCourses =[];

    let params= new HttpParams()

      this.http.get(this.getAllCoursesUrl,{params}).subscribe(
        res=>{this.allCourses=res;
          this.isLoading=false; 

      },
        err=>{console.log("ERROR! : " +err.message);
        this.isLoading=false; 
      }
      );
    }
 
 
 deleteUser(name : string, id: string){
  this.isLoading=true; 

  let params= new HttpParams()
    .set("userName",name)
    .set("userId", id);

  
  this.http.delete(this.getAllUsersUrl,{params}).subscribe(
    res=>{

      alert("Deleted successfully!");
      this.getAllUsers();
      this.isLoading=false; 


    },
      err=>{
      alert("Error: Can not delete this user!");
      this.isLoading=false; 

    }

  );

  


}
searchStudent(name: string){    
  this.isLoading=true; 

  this.allUsers =[];

  let params= new HttpParams().set("userName",name)
  .set("userRole","student");

    this.http.get(this.searchStudentUrl ,{params}).subscribe(
      res=>{this.allUsers=res ;       this.isLoading=false; 
      },
      err=>{console.log("ERROR! : " +err.message);
      this.isLoading=false; 
    }
    );

}

searchTeacher(name: string ){    
  this.isLoading=true; 

  this.allUsers =[];

  let params= new HttpParams().set("userName",name)
    .set("userRole","teacher");

    this.http.get(this.searchStudentUrl ,{params}).subscribe(
      res=>{this.allUsers=res ;      this.isLoading=false; 
      },
      err=>{console.log("ERROR! : " +err.message);      this.isLoading=false; 
    }
    );

}
onSubmitTeachers() {

  return this.teachers;
}

onSubmitStudents() {

  return this.students;
}


getAllStudents(){
  this.isLoading=true; 

  this.allUsers =[];

  let params= new HttpParams()

    this.http.get(this.getAllStudentsUrl,{params}).subscribe(
      res=>{this.allUsers=res;      this.isLoading=false; 
      },
      err=>{console.log("ERROR! : " +err.message);      this.isLoading=false; 
    }
    );
}

getAllTeachers(){
  this.isLoading=true; 

  this.allUsers =[];

  let params= new HttpParams()

    this.http.get(this.getAllTeachersUrl,{params}).subscribe(
      res=>{this.allUsers=res;       this.isLoading=false; 
      },
      err=>{console.log("ERROR! : " +err.message);      this.isLoading=false; 
    }
    );
}
autouriserAjout(){

  
  this.ajout=true;

}
inhiberAjout(){
  this.ajout=false;

}
isAddAutorized(){

  return this.ajout ;

}



autoriserInscription(user: string){
  this.users.clear() ;
  this.users.set(user,true)

  this.getAllCourses();
}


inhiberInscription(user : string){
  this.users.set(user,false) ;
}

isInscriptionAutorized(user : string){

  return this.users.get(user) ;

}







getNameInput()
{ return this.name ;}
getMailInput()
{ return this.mail ;}
getSelectedRole(event : any)
{ this.role= event.target.value ;}

getRoleInput(){
  return this.role;
}


addUser(Name: string , Mail : string , Role : string){
  this.isLoading=true; 


  this.http.post(this. getAllUsersUrl,{"user_name":Name,"user_mail":Mail,"user_role":Role}).subscribe(
    res => { 
      this.isLoading=false; 

      alert("Added Succesfully!");
      this.getAllUsers();
    
    },
    err=>{
      alert("Error: Can not add this User!");
      this.isLoading=false; 

    }

  );


}

getSelectedCourse(event : any)
{ this.coursName= event.target.value ;}

getCourseNameInput()
{
  return this.coursName;
}

getAvailableOs(course : string){
  this.isLoading=true; 

  this.availableOs=[];
  let params= new HttpParams()
      .set("coursName",course)

  this.http.get(this.getAvailableOsUrl,{params}).subscribe(
    res=>{this.availableOs=res;
      this.isLoading=false; 

    },
  );
}


addInscription(user: string , cours:string ){
  this.isLoading=true; 

  this.getAvailableOs(cours);
  this.http.post(this. getAllInscriptionsUrl,{"username":user,"cours_name":cours}).subscribe(
    res => { 
      try{
      this.addService(user,cours);
      } catch(e) {alert("try again"); return;}
      this.isLoading=false; 

      alert("Added  Successfully!");
      this.getAllUsers();


    },
    err=>{
      alert("Error: Can not subscribe "+user+ " to "+ cours);
      this.isLoading=false; 

    }

  );


}

addService(user: string , cours:string) {
  this.isLoading=true; 

  for (var image of this.availableOs ){
    this.isLoading=true; 

  this.http.post(this. getAllServicesUrl,{"username":user,"cours_name":cours,"image_name":image.image_name}).subscribe(
    res => {
      this.isLoading=false; 

      this.allServices=res;

    },
    err=>{
      
      alert("can not add service !");
      this.isLoading=false; 


    }
  
  );

}
}

autoriserDelete(cours : string){
  this.delete.clear();
  this.delete.set(cours,true)



}
inhiberDelete(cours:string){
  this.delete.set(cours,false);
}
toDeleteUser(course :string){
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
EditUser(name : string , usermail: string, userrole:string){
  this.isLoading=true; 

  this.http.put(this. getAllUsersUrl,{"user_name":name, "user_mail":usermail, "user_role":userrole},
  ).subscribe(
    res => { 
      this.isLoading=false; 

      this.inhiberEdit(name);
      this.getAllUsers() ;
    
    },
    err=>{
      alert("Error: Can not edit this User!");
      this.isLoading=false; 

    }

  );


  }


}
