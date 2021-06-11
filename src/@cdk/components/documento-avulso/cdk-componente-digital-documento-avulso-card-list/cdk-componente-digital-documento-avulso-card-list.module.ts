import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatIconModule,} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
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
        CdkSharedModule,
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
