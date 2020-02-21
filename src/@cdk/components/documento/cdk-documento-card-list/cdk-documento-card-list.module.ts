import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatCardModule, MatCheckboxModule, MatMenuModule,
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import {CdkDocumentoCardListComponent} from './cdk-documento-card-list.component';
import {CdkDocumentoCardModule} from './cdk-documento-card/cdk-documento-card.module';

@NgModule({
    declarations: [
        CdkDocumentoCardListComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCardModule,

        CdkDocumentoCardModule,

        FuseSharedModule,
        MatCheckboxModule,
        MatMenuModule,
    ],
    providers: [
    ],
    exports: [
        CdkDocumentoCardListComponent
    ]
})
export class CdkDocumentoCardListModule {
}
