import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkSharedModule} from '../../../shared.module';
import {CdkUploadDialogComponent} from './cdk-upload-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {RouterModule} from '@angular/router';
import {CdkDocumentoCardListModule} from '../cdk-documento-card-list/cdk-documento-card-list.module';
import {CdkComponenteDigitalCardListModule} from '../../componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';

@NgModule({
    declarations: [
        CdkUploadDialogComponent
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatDialogModule,
        MatProgressBarModule,
        MatMenuModule,

        CommonModule,
        CdkSharedModule,
        RouterModule,
        CdkDocumentoCardListModule,
        CdkComponenteDigitalCardListModule,
    ],
    entryComponents: [
        CdkUploadDialogComponent,
    ],
    exports: [
        CdkUploadDialogComponent
    ]
})
export class CdkUploadDialogModule {
}
