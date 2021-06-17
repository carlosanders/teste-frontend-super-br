import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '@cdk/angular/material';
import {CdkUploadComponent} from './cdk-upload.component';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        CdkUploadComponent
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
        CdkUploadComponent
    ]
})
export class CdkUploadModule
{

}
