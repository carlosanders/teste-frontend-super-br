import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkVinculacaoPessoaUsuarioGridComponent} from './cdk-vinculacao-pessoa-usuario-grid.component';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule
} from '../../../angular/material';
import {CdkSharedModule} from '../../../shared.module';
import {CdkSidebarModule} from '../..';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkVinculacaoPessoaUsuarioFilterModule} from '../sidebars/cdk-vinculacao-pessoa-usuario-filter/cdk-vinculacao-pessoa-usuario-filter.module';


@NgModule({
    declarations: [CdkVinculacaoPessoaUsuarioGridComponent],
    imports: [
        CommonModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSortModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
        CdkVinculacaoPessoaUsuarioFilterModule,
        MatTableModule,
    ],
    exports: [
        CdkVinculacaoPessoaUsuarioGridComponent
    ]
})
export class CdkVinculacaoPessoaUsuarioGridModule {
}
