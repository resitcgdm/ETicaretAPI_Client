import { Directive,ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {  SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective  {

  constructor( private element: ElementRef, 
               private _renderer: Renderer2,
               private productService : ProductService,
               private spinner: NgxSpinnerService

               
              
    ) 
    {
     

      const img = _renderer.createElement("img");
      img.setAttribute("src","../../../../../assets/delete.png");
      img.setAttribute("style","cursor:pointer");
      img.width=40;
      img.height=40;
      _renderer.appendChild(element.nativeElement,img);

    }

    @Input() id: string;
    @Output() callback : EventEmitter<any> = new  EventEmitter();

    @HostListener("click") //nesneye tıklanıldığında devreye girer
    async onclick() {
      this.spinner.show(SpinnerType.BallScaleMultiple)
      const td : HTMLTableCellElement = this.element.nativeElement;
      await this.productService.delete(this.id);
         $(td.parentElement).fadeOut(300, () => {
           this.callback.emit();
         });

    }


}
