import { Component, OnInit } from '@angular/core';
import { JsonService } from "../json.service"

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
//DashComponent contains all overview info of the devices and a lst of them
export class DashComponent implements OnInit {
  //Variable dash used to save the information of the get of the dash
  public dash:any;

  constructor(public json:JsonService) { 
  }
//nGOnInit method that executes when you open the Dash view and pull the dash information from the API with the getJson Method
  ngOnInit(): void {
    //getAPI
    this.json.getJson(1).subscribe((res:any) => {
      console.log(res);
      this.dash=res;
    });
  }

}
