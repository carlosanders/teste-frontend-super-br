import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatCardModule, MatCheckboxModule, MatMenuModule,
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
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

        FuseSharedModule,
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
