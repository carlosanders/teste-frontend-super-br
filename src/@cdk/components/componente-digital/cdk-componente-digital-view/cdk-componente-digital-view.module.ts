import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, MatProgressBarModule,
} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkComponenteDigitalViewComponent} from './cdk-componente-digital-view.component';
import {CdkDocumentoFormModule} from '../../documento/cdk-documento-form/cdk-documento-form.module';

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
    ],
    providers: [
    ],
    exports: [
        CdkComponenteDigitalViewComponent
    ]
})
export class CdkComponenteDigitalViewModule {
}
