import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrOptions, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $:any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor () {
    
  }

}
// $.get("https://localhost:7149/api/products", data => { //jquery ile 
//   console.log(data);
// });

