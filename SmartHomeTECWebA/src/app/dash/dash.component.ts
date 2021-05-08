import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service"
import { JsonService } from "../json.service"

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  private cookieValue: string="";
  public dash:any;

  constructor(private cookieService: CookieService, public json:JsonService) { 
  }

  ngOnInit(): void {
    //cookie
    this.cookieValue = this.cookieService.get("login-info");
    console.log(this.cookieValue);
    //getAPI
    this.json.getJson(1).subscribe((res:any) => {
      console.log(res);
      this.dash=res;
    });
  }

}
