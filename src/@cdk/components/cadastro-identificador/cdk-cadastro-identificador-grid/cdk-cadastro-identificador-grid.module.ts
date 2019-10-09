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

import {FuseSharedModule} from '@fuse/shared.module';
import {CdkCadastroIdentificadorGridComponent} from './cdk-cadastro-identificador-grid.component';
import {CdkCadastroIdentificadorGridFilterModule} from './cdk-cadastro-identificador-grid-filter/cdk-cadastro-identificador-grid-filter.module';

@NgModule({
    declarations: [
        CdkCadastroIdentificadorGridComponent
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
    ],
    providers: [],
    exports: [
        CdkCadastroIdentificadorGridComponent
    ]
})
export class CdkCadastroIdentificadorGridModule {
}
