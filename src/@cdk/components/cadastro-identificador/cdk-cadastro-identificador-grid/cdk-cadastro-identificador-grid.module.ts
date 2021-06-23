import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkCadastroIdentificadorGridComponent} from './cdk-cadastro-identificador-grid.component';
import {CdkCadastroIdentificadorFilterModule} from '../sidebars/cdk-cadastro-identificador-filter/cdk-cadastro-identificador-filter.module';

@NgModule({
    declarations: [
        CdkCadastroIdentificadorGridComponent,
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

        CdkCadastroIdentificadorFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [],
    exports: [
        CdkCadastroIdentificadorGridComponent
    ]
})
export class CdkCadastroIdentificadorGridModule {
}
