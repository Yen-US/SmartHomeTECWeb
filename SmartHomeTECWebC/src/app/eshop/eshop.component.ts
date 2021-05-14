import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { JsonService } from "../json.service"
import { DatePipe } from '@angular/common';
import { CookieService } from "ngx-cookie-service"

@Component({
  selector: 'app-eshop',
  templateUrl: './eshop.component.html',
  styleUrls: ['./eshop.component.css'],
  providers: [DatePipe]
})
//Eshop component displays the available to pusrchase devices and allow the users to buy them
export class EshopComponent implements OnInit{
  myDate = new Date();
  private cookieValue: string="";
  public isError = false
  constructor(private datePipe: DatePipe,private cookieService: CookieService, public json:JsonService, private router: Router, private location: Location) { 
  }
  public colors = ['primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark','primary', 'secondary', 'success','info', 'danger', 'warning','dark'];
  devices:any;
  buy:any

  public ngOnInit(){
    this.cookieValue=this.cookieService.get("login-info")
  }
  //Onregion method receive the region info by the user and updates the devices list with the ones available to purchase
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
  
  //method onIsError used to trigger the error message and timeout the same after displaying 
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

//Method to buy devices cretes the JSON to send to the API and POST it to the same
  onBuy(dev:any): void {

this.buy={

  Serie:dev.Serie,
  Correo:this.cookieValue,
  fecha_compra:this.myDate.getFullYear()+"-"+this.myDate.getMonth()+"-"+this.myDate.getDate()+"T"+this.myDate.getHours()+":"+this.myDate.getMinutes()+":"+this.myDate.getSeconds(),
  dispositivo:dev.Nombre,
  Precio:dev.Precio,
  Marca:dev.Marca
}
console.log(this.buy);
    this.json.postJson(6,this.buy).subscribe((res:any) => {
      console.log(res);
    }); 
    

  }
}
