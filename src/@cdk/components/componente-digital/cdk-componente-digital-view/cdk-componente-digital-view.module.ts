import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkComponenteDigitalViewComponent} from './cdk-componente-digital-view.component';
import {CdkDocumentoFormModule} from '../../documento/cdk-documento-form/cdk-documento-form.module';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';

@NgModule({
    declarations: [
        CdkComponenteDigitalViewComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkDocumentoFormModule,

        CdkSharedModule,
        PdfJsViewerModule,
    ],
    providers: [
    ],
    exports: [
        CdkComponenteDigitalViewComponent
    ]
})
export class CdkComponenteDigitalViewModule {
}
