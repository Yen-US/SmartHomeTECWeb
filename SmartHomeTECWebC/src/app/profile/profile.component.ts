import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor() { }

  public isError = false

  public OnInit(){}
//metodo onLogin verifica si el form del html es valida, envia el username y password al metodo post y espera respuesta del API
  public onProfile(form: NgForm){
    if (form.valid) {
      //this.json.postJson(1,form.value).subscribe((res:any) => {
        /*console.log(res);
        if(res=="Ok"){
          this.router.navigate(['/home']);
          this.isError = false;
        }else{
          this.isError = true;
        }
      }); */
          console.log(form.value)
          window.location.reload();
          
          
          
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
