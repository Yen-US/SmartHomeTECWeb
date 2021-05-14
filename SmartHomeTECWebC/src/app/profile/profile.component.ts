import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CookieService } from "ngx-cookie-service"
import { JsonService } from "../json.service"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
//User view that allows to edit all the infomation of the user profile excepting the user email, displas the actual information and after entering the new one and hi dave it changes the info of the user
export class ProfileComponent implements OnInit{

  constructor(public json:JsonService, private router: Router, private location: Location,private cookieService: CookieService) { }

  private cookieValue: string="";
  public isError = false
  public profile:any

  public profileCorreo = {
    "Correo":""
  };
//ngOnInit method exectues every time you open this view, and pulls the value of the cookie that storage the email of the user, and them make a POST to the API to request the user information to display
  public ngOnInit(){
    this.cookieValue=this.cookieService.get("login-info");

    this.profileCorreo.Correo=this.cookieValue
    this.json.postJson(3,this.profileCorreo).subscribe((res:any) => {
      this.profile=res[0];
      console.log(this.profile);
    });
  }

//OnProfile method receive the input rom the user and verify that the inormation changed if so send it to the API after replacing the same on the profile info 
  public onProfile(form: NgForm){
    if (form.valid) {
      if(form.value.Nombre!=""){
        this.profile.Nombre=form.value.Nombre
      }if(form.value.Apellido!=""){
        this.profile.Apellido=form.value.Apellido
      }if(form.value.Continente!=""){
        this.profile.Continente=form.value.Continente
      }if(form.value.Pais!=""){
        this.profile.Pais=form.value.Pais
      }if(form.value.Direccion!=""){
        this.profile.Direccion=form.value.Direccion
      }if(form.value.Contrasena1!=""){
        if(form.value.Contrasena2!="" && form.value.Contrasena1===form.value.Contrasena2){
          this.profile.Contrasena=form.value.Contrasena1
        }else{
          this.onIsError();
        }
      }
      console.log(this.profile)
      this.json.postJson(4,this.profile).subscribe((res:any) => {
        console.log(res);
        if(res=="El Perfil ha sido actualizado "){
          this.isError = false;
          window.location.reload();
        }else{
          this.isError = true;
        }
      }); 
          console.log(form.value)
          
    } else {
      this.onIsError();
    }
    
  }
  //method onIsError used to trigger the error message and timeout the same after displaying 
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

}
