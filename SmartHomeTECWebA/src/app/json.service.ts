import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
//Serice to implement the Httplient to make calls to the API such as Get and Post
export class JsonService {
  apiPort="49429"
  header={headers:{'Access-Control-Allow-Origin':'http://localhost:4200','Access-Control-Allow-Methods': 'POST', "Access-Control-Allow-Headers": "Content-Type, Authorization"}}
  public ruta=0
  //URLs to connect definition
  urlVer='http://localhost:'+this.apiPort+'/api/login/verificar';
  urlDash='http://localhost:'+this.apiPort+'/api/Dashboard/All';
  urlLDisp='http://localhost:'+this.apiPort+'/api/general/ListaDispositivos';
  urlADisp='http://localhost:'+this.apiPort+'/api/general/AgregarDispositivo';
  urlEDisp='http://localhost:'+this.apiPort+'/api/general/EditarDispositivoAdmin';
  

  constructor(private http: HttpClient) { }
   //GetJson method implements .get of httpclient, just requires the route number
  getJson(ruta:number){
    if(ruta==1){
      return this.http.get(this.urlDash,this.header)
    }
    if(ruta==2){
      return this.http.get(this.urlLDisp,this.header)
    }
    else{
      console.log(ruta)
      return this.http.get(this.urlDash,this.header)
    }

      
  }
  //PostJson method implements .post of httpclient, just requires the route number and the objest to get posted in most cases a JSON
  postJson(ruta:number,obj:any){
    if(ruta==1){
      return this.http.post(this.urlVer,obj,this.header);
    }
    if(ruta==2){
      return this.http.post(this.urlADisp,obj,this.header);
    }
    if(ruta==3){
      return this.http.post(this.urlEDisp,obj,this.header);
    }
    else{
      return this.http.post(this.urlVer,obj,this.header);
    }
}
}
