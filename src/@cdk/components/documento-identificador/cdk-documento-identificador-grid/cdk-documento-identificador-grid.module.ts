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
} from '@cdk/angular/material';

import {FuseSidebarModule} from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { CdkDocumentoIdentificadorGridComponent} from './cdk-documento-identificador-grid.component';
import { CdkDocumentoIdentificadorGridFilterModule } from './cdk-documento-identificador-grid-filter/cdk-documento-identificador-grid-filter.module';
import {CdkDocumentoIdentificadorMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkDocumentoIdentificadorGridComponent,
        CdkDocumentoIdentificadorMainSidebarComponent,
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
        FuseSidebarModule,
    ],
    providers: [
        
    ],
    exports: [
        CdkDocumentoIdentificadorGridComponent
    ]
})
export class CdkDocumentoIdentificadorGridModule {
}
