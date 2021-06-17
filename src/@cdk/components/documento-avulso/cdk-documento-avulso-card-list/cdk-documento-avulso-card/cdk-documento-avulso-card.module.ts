import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkDocumentoAvulsoCardComponent} from './cdk-documento-avulso-card.component';

@NgModule({
    declarations: [
        CdkDocumentoAvulsoCardComponent,
    ],
    imports: [

        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,

        CdkSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkDocumentoAvulsoCardComponent
    ]
})
export class CdkDocumentoAvulsoCardModule {
}
