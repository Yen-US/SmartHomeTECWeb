import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
//Servicio definido para implementar los POST Y GET del API
export class JsonService {
  apiPort="56275"
  header={headers:{'Access-Control-Allow-Origin':'http://localhost:4200','Access-Control-Allow-Methods': 'POST', "Access-Control-Allow-Headers": "Content-Type, Authorization"}}
  public ruta=0
  //Definicion de los URLS de conexion
  urlVer='http://localhost:'+this.apiPort+'/api/login/verificar';
  urlReg='http://localhost:'+this.apiPort+'/api/login/registrar';
  urlPerf='http://localhost:'+this.apiPort+'/api/login/PerfilUsuario';
  urlEPerf='http://localhost:'+this.apiPort+'/api/login/EditarPerfil';
  

  constructor(private http: HttpClient) { }
   //Metodo get implementa .get de httpclient
   getJson(ruta:number){
    if(ruta==1){
      return this.http.get(this.urlPerf,this.header)
    }
    else{
      console.log(ruta)
      return this.http.get(this.urlPerf,this.header)
    }

      
  }
  //Metodo post implementa .post de httpclient
  postJson(ruta:number,obj:any){
    if(ruta==1){
      return this.http.post(this.urlVer,obj,this.header);
    }if(ruta==2){
      return this.http.post(this.urlReg,obj,this.header);
    }if(ruta==3){
      return this.http.post(this.urlPerf,obj,this.header);
    }if(ruta==4){
      return this.http.post(this.urlEPerf,obj,this.header);
    }else{
      return this.http.post(this.urlVer,obj,this.header);
    }
}
}
