import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatCardModule,
} from '@angular/material';

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
    ],
    providers: [
    ],
    exports: [
        CdkDocumentoCardListComponent
    ]
})
export class CdkDocumentoCardListModule {
}
