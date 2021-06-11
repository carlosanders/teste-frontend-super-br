import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkComponenteDigitalDocumentoAvulsoCardComponent} from './cdk-componente-digital-documento-avulso-card.component';

@NgModule({
    declarations: [
        CdkComponenteDigitalDocumentoAvulsoCardComponent,
    ],
    imports: [

        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,

        CdkSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkComponenteDigitalDocumentoAvulsoCardComponent
    ]
})
export class CdkComponenteDigitalDocumentoAvulsoCardModule {
}
