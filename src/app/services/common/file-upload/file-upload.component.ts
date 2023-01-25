import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileSystemFileEntry } from 'ngx-file-drop/ngx-file-drop/dom.types';
import { NgxFileDropEntry } from 'ngx-file-drop/ngx-file-drop/ngx-file-drop-entry';
import { BaseDialog } from 'src/app/dialogs/base/base-dialog';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService,
              private alertifyService: AlertifyService,
              private customToastrService: CustomToastrService,
              private dialog: MatDialog,
              private dialogService : DialogService
              
               
              ) {  }

  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>; //input olarak gelecek veriyi object olarak alabilmek icin partial ile işaretliyoruz.

  public selectedFiles(files: NgxFileDropEntry[]) {
    






    this.files = files;
    
    const fileData : FormData = new FormData();

    for(const file of files) 
    {
        (file.fileEntry as FileSystemFileEntry).file((_file:File)=> {
          fileData.append(_file.name,_file,file.relativePath)
        });

    }
    
   

    
     
    
 
    
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.httpClientService.post({
          controller:this.options.controller,
          action:this.options.action,
          queryString:this.options.queryString,
          headers:new HttpHeaders({"responseType":"blob"})
         },fileData).subscribe(data=> {
    
          const message: string ="Dosyalar başarıyla yüklenmiştir.";
    
            if(this.options.isAdminPage) {
              this.alertifyService.message(message,{
    
                dismissOthers:true,
                messageType:MessageType.Success,
                position:Position.TopRight
              })
    
            }
            else {
              this.customToastrService.message(message,"Başarılı", {
                messageType:ToastrMessageType.Success,
                position:ToastrPosition.TopRight
              });
    
            }
    
         },(errorResponse: HttpErrorResponse)=> {
    
          const message2: string = "Dosyalar yüklenirken beklenmeyen bir hatayla karşılaşılmıştır";
          if(this.options.isAdminPage) {
              this.alertifyService.message(message2,{
    
                dismissOthers:true,
                messageType:MessageType.Error,
                position:Position.TopRight
              })
    
            }
            else {
              this.customToastrService.message(message2,"Başarısız", {
                messageType:ToastrMessageType.Error,
                position:ToastrPosition.TopRight
              })
    
            }
    
         });
  
      }
    });
 
           }
          //  openDialog(afterClosed: any) : void {
          //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
          //     data: FileUploadDialogState.Yes,
          //   });
        
          //   dialogRef.afterClosed().subscribe(result => {
          //     if(result == FileUploadDialogState.Yes) {
          //         afterClosed();
          //     }
          //   });
          // }
          
      
  
}
  export class FileUploadOptions 
  {
      controller?: string;
      action?: string;
      queryString?: string;
      explanation?: string;
      accept?: string;
      isAdminPage?: boolean = false;

  }

function openDialog(afterClosed: any, any: any) {
  throw new Error('Function not implemented.');
}

