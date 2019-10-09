import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkDocumentoIdentificadorGridComponent} from './cdk-documento-identificador-grid.component';
import { CdkDocumentoIdentificadorGridFilterModule } from './cdk-documento-identificador-grid-filter/cdk-documento-identificador-grid-filter.module';

@NgModule({
    declarations: [
        CdkDocumentoIdentificadorGridComponent
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkDocumentoIdentificadorGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        
    ],
    exports: [
        CdkDocumentoIdentificadorGridComponent
    ]
})
export class CdkDocumentoIdentificadorGridModule {
}
