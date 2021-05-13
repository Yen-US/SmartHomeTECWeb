import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { JsonService } from "../json.service"

@Component({
  selector: 'app-eshop',
  templateUrl: './eshop.component.html',
  styleUrls: ['./eshop.component.css']
})
export class EshopComponent implements OnInit {
  public isError = false
  constructor(public json:JsonService, private router: Router, private location: Location) { }
  colors = ['primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark'];
  devices:any;
  ngOnInit(): void {
     
  }
  public onRegion(form: NgForm){
    if (form.valid) {
      this.json.getJson(4).subscribe((res:any) => {
        console.log(res);
      
      if(form.value.region==="America"){
        this.devices=res.America;
      }
      if(form.value.region==="Asia"){
        this.devices=res.Asia
      }
      if(form.value.region==="Africa"){
        this.devices=res.Africa
      }
      if(form.value.region==="Europa"){
        this.devices=res.Europa
      }
      if(form.value.region==="Oceania"){
        this.devices=res.Oceania
      }
      console.log(this.devices);
    });
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
