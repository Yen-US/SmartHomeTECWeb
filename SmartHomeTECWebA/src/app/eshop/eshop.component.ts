import { Component} from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-eshop',
  templateUrl: './eshop.component.html',
  styleUrls: ['./eshop.component.css']
})
export class EshopComponent {
  willDownload = false;
  constructor() { }


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
      const dataString = JSON.stringify(jsonData);
      this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }


  setDownload(data:any) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      if(el===null){console.log("null")}
      else{
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');}
      
    }, 1000)
  }
}
