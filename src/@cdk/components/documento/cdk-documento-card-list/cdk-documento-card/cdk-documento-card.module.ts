import {NgModule} from '@angular/core';
import {
    MatButtonModule, MatCheckboxModule, MatIconModule,
    MatMenuModule, MatProgressSpinnerModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkDocumentoCardComponent } from './cdk-documento-card.component';

@NgModule({
    declarations: [
        CdkDocumentoCardComponent,
    ],
    imports: [

        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,

        FuseSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkDocumentoCardComponent
    ]
})
export class CdkDocumentoCardModule {
}
