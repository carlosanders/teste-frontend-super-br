import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule, MatSortModule,
    MatTableModule
} from '@cdk/angular/material';
import { CdkModeloUploadComponent } from './cdk-modelo-upload.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        CdkModeloUploadComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    exports: [
        CdkModeloUploadComponent
    ]
})
export class CdkModeloUploadModule
{

}
