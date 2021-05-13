import { Component, OnInit } from '@angular/core';
import { JsonService } from "../json.service"
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  public listaDisp:any;
  public postEdit:any;
  constructor(public json:JsonService, private router: Router) { }
  public isError = false
  colors = ['primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark'];
  ngOnInit(): void {
    this.json.getJson(2).subscribe((res:any) => {
      console.log(res);
      this.listaDisp=res;
    });
  }

  public onNew(form: NgForm){
    if (form.valid) {
      this.json.postJson(2,form.value).subscribe((res:any) => {
        console.log(res);
        if(res=="El dispositivo se ha agregado exitosamente"){
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
  public onEdit(form: NgForm, disp:any){
    if (form.valid) {
      if(form.value.Marca!=""){
        disp.Marca=form.value.Marca
      }if(form.value.Consumo_Electrico!=""){
        disp.Consumo_Electrico=form.value.Consumo_Electrico
      }if(form.value.Aposento!=""){
        disp.Aposento=form.value.Aposento
      }if(form.value.Tiempo_Garantia!=""||form.value.Tiempo_Garantia!=0){
        disp.Tiempo_Garantia=form.value.Tiempo_Garantia
      }if(form.value.Nombre!=""){
        disp.Nombre=form.value.Nombre
      }if(form.value.Decripcion!=""){
        disp.Decripcion=form.value.Decripcion
      }
      console.log(disp)
      this.json.postJson(3,disp).subscribe((res:any) => {
        console.log(res);
        if(res=="El dispositivo ha sido actualizado "){
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
  
  //metodo onIsError si la form no es valida presenta un component que indica error
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
}
