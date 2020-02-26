import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatCardModule,
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import {CdkComponenteDigitalDocumentoAvulsoCardListComponent} from './cdk-componente-digital-documento-avulso-card-list.component';
import {CdkComponenteDigitalDocumentoAvulsoCardModule} from './cdk-componente-digital-documento-avulso-card/cdk-componente-digital-documento-avulso-card.module';

@NgModule({
    declarations: [
        CdkComponenteDigitalDocumentoAvulsoCardListComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCardModule,
        FuseSharedModule,
        CdkComponenteDigitalDocumentoAvulsoCardModule,
    ],
    providers: [
    ],
    exports: [
        CdkComponenteDigitalDocumentoAvulsoCardListComponent
    ]
})
export class CdkComponenteDigitalDocumentoAvulsoCardListModule {
}
