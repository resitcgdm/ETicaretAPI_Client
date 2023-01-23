import { Component,OnInit, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import {NgxSpinnerService} from 'ngx-spinner'
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { create_Product } from 'src/app/contracts/create_product';
import { ListComponent } from './list/list.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);

  }
  @ViewChild(ListComponent) listsComponents: ListComponent
  createdProduct(createdProduct: create_Product) {

    this.listsComponents.getProducts();
  }


ngOnInit(): void {
  this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating)

  this.httpClientService.get<create_Product[]>({
    controller:"products"
  }).subscribe(data => {
    console.log(data)});

    // this.httpClientService.post({
    //   controller: "products"

    // },{
    //   name:"Kalem",
    //   stock:100,
    //   price:15
    // }).subscribe();

    // this.httpClientService.put({
    //   controller:"products"
    // },{
    //   id:"12asdab1231ef-43abc-424a-123123abc",
    //   name:"Renkli Kalem",
    //   stock:11,
    //   price:25


    // }).subscribe();
    
    // this.httpClientService.delete({
    //   controller:"products"
    // },"772f9426-f99b-440f-b563-52335632743b").subscribe();


    // this.httpClientService.get({
    //   fullEndPoint:"https://jsonplaceholder.typicode.com/posts"
    // }).subscribe(data=> console.log(data));
}





}
