import { Component} from '@angular/core';
import * as XLSX from 'xlsx';

import { JsonService } from "../json.service"

import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-eshop',
  templateUrl: './eshop.component.html',
  styleUrls: ['./eshop.component.css']
})
//Eshop component User view to upload an Excel file and manage the devices available in the Eshop 
export class EshopComponent {
  willDownload = false;
  public isError = false
  public dataString :any
  constructor(public json:JsonService,private router: Router, private location: Location) { }

//onFilechange detect the new file and send ot to the API after converting the file to JSON
  onFileChange(ev:any) {
    let workBook:any = null;
    let jsonData:any = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial:any, name:any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.dataString = jsonData;
      console.log(this.dataString);
      
    }
      //this.setDownload(this.dataString);
    reader.readAsBinaryString(file);
  }

  onSend() {
    this.json.postJson(4,this.dataString).subscribe((res:any) => {
      console.log(res);
    });
  }
//Method used to provide the user a template at can use to download an example file and then fill it with the information
  
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

}
