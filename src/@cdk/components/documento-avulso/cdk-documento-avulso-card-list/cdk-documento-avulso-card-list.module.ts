import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatMenuModule,} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkDocumentoAvulsoCardListComponent} from './cdk-documento-avulso-card-list.component';
import {CdkDocumentoAvulsoCardModule} from './cdk-documento-avulso-card/cdk-documento-avulso-card.module';

@NgModule({
    declarations: [
        CdkDocumentoAvulsoCardListComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCardModule,

        CdkDocumentoAvulsoCardModule,

        CdkSharedModule,
        MatCheckboxModule,
        MatMenuModule,
    ],
    providers: [
    ],
    exports: [
        CdkDocumentoAvulsoCardListComponent
    ]
})
export class CdkDocumentoAvulsoCardListModule {
}
