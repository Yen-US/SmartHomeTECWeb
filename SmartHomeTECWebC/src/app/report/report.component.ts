import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { JsonService } from "../json.service"
import { NgForm } from '@angular/forms';
import { CookieService } from "ngx-cookie-service"
import jsPDF from 'jspdf';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake"

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  private cookieValue: string="";
  public isError = false
  public R1:any;
  rep:any;
  cRep=0;
  constructor(public json:JsonService, private router: Router,private cookieService: CookieService) { }
  title = 'htmltopdf';
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  
  public downloadAsPDF() {
    const doc = new jsPDF();
   
    const pdfTable = this.pdfTable.nativeElement;
   
    var html = htmlToPdfmake(pdfTable.innerHTML);
     
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
     
  }

  ngOnInit(): void {
    this.cookieValue=this.cookieService.get("login-info");
  }
  
  public onProfile(form: NgForm){
    if (form.valid) {
      if (form.value.report === "1"){
        this.R1={
          "Correo":this.cookieValue,
          "mes":form.value.date,
        }
        console.log(this.R1);
        this.json.postJson(5,this.R1).subscribe((res:any) => {
          console.log(res);
          this.rep=res;
          this.cRep=1;
        });
      }
      if (form.value.report === "2"){
        this.json.getJson(2).subscribe((res:any) => {
          console.log(res);
          this.rep=res;
          this.cRep=2;
        });
      }
      if (form.value.report === "3"){
        this.json.getJson(3).subscribe((res:any) => {
          console.log(res);
          this.rep=res;
          this.cRep=3;
        });
      }
       
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
