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
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
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
