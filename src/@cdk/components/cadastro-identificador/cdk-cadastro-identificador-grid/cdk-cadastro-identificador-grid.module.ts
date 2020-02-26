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
import {FuseSharedModule} from '@fuse/shared.module';
import {CdkCadastroIdentificadorGridComponent} from './cdk-cadastro-identificador-grid.component';
import {CdkCadastroIdentificadorGridFilterModule} from './cdk-cadastro-identificador-grid-filter/cdk-cadastro-identificador-grid-filter.module';
import {CdkCadastroIdentificadorMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkCadastroIdentificadorGridComponent,
        CdkCadastroIdentificadorMainSidebarComponent,
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

        CdkCadastroIdentificadorGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [],
    exports: [
        CdkCadastroIdentificadorGridComponent
    ]
})
export class CdkCadastroIdentificadorGridModule {
}
