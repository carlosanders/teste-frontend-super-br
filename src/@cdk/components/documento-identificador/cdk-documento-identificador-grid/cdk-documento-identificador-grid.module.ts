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

import {CdkSidebarModule} from '@cdk/components/index';
import { CdkSharedModule } from '@cdk/shared.module';
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

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        
    ],
    exports: [
        CdkDocumentoIdentificadorGridComponent
    ]
})
export class CdkDocumentoIdentificadorGridModule {
}
