import { Directive,ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {  SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from 'src/app/services/common/dialog.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective  {

  constructor( private element: ElementRef, 
               private _renderer: Renderer2,
               private httpClientService : HttpClientService,
               private spinner: NgxSpinnerService,
               public dialog: MatDialog,
               private alertify: AlertifyService,
               private dialogService : DialogService

               
              
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
    @Input() controller: string;
    @Output() callback : EventEmitter<any> = new  EventEmitter();

    @HostListener("click") //nesneye tıklanıldığında devreye girer
    async onclick() {
      this.dialogService.openDialog({
        componentType:DeleteDialogComponent,
        data: DeleteState.Yes,
        afterClosed: async () => {
          this.spinner.show(SpinnerType.BallScaleMultiple)
          const td : HTMLTableCellElement = this.element.nativeElement;
          // await this.productService.delete(this.id);
          this.httpClientService.delete({
            controller: this.controller
  
          },this.id).subscribe(data=> {
  
            $(td.parentElement).animate({
              opacity:0,
              left:"+=50",
              height:"toogle",
  
             },700, () =>{
              this.callback.emit();
              this.alertify.message("Ürün başarılı şekilde silinmiştir",{
                dismissOthers:true,
                messageType:MessageType.Success,
                position:Position.TopRight
              })
  
             });
  
          },(errorResponse: HttpErrorResponse) => {
            this.spinner.hide(SpinnerType.BallScaleMultiple)
            this.alertify.message("Ürün silinirken beklenmeyen bir hatayla karşılaşılmıştır.",{
              dismissOthers:true,
              messageType:MessageType.Error,
              position:Position.TopRight
            })
  
          });
  
            
             
            
  
        }
      });
     

    }

    // openDialog(afterClosed: any): void {
    //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
    //     data: DeleteState.Yes,
    //   });
  
    //   dialogRef.afterClosed().subscribe(result => {
    //     if(result == DeleteState.Yes) {
    //         afterClosed();
    //     }
    //   });
    // }


}
