import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { JsonService } from "../json.service"
import { CookieService } from "ngx-cookie-service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private cookieValue: string="";

  constructor(public json:JsonService, private router: Router, private location: Location, private cookieService: CookieService) {}
  
  public isError = false

  public ngOnInit(){
    this.cookieService.set("login-info","");
  }
//metodo onLogin verifica si el form del html es valida, envia el username y password al metodo post y espera respuesta del API
  public onLogin(form: NgForm){
    if (form.valid) {
      this.json.postJson(1,form.value).subscribe((res:any) => {
        console.log(res);
        if(res=="Correcto"){
          this.router.navigate(['/dash']);
          this.isError = false;
          this.cookieService.set("login-info",form.value.Correo);
        }else{
          this.isError = true;
        }
      });
          console.log(form.value)
    } else {
      this.onIsError();
    }
  }
  
  //metodo onIsError si la form no es valida presenta un component que indica error
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

}

