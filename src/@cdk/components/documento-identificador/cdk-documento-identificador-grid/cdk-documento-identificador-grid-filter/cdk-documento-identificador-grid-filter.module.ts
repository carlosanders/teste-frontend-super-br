import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkDocumentoIdentificadorGridFilterComponent } from './cdk-documento-identificador-grid-filter.component';

@NgModule({
    declarations: [
        CdkDocumentoIdentificadorGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [

    ],
    exports: [
        CdkDocumentoIdentificadorGridFilterComponent
    ]
})
export class CdkDocumentoIdentificadorGridFilterModule {
}
