import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service"

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  private cookieValue: string="";
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.cookieValue = this.cookieService.get("login-info");
    console.log(this.cookieValue);
  }

  

}
