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
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeAlvoInibidorService} from '@cdk/services/modalidade-alvo-inibidor.service';
import {CdkModalidadeAlvoInibidorGridComponent} from './cdk-modalidade-alvo-inibidor-grid.component';
import {CdkModalidadeAlvoInibidorAutocompleteModule} from '@cdk/components/modalidade-alvo-inibidor/cdk-modalidade-alvo-inibidor-autocomplete/cdk-modalidade-alvo-inibidor-autocomplete.module';
import {CdkModalidadeAlvoInibidorGridFilterModule} from './cdk-modalidade-alvo-inibidor-grid-filter/cdk-modalidade-alvo-inibidor-grid-filter.module';
import {CdkModalidadeAlvoInibidorMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeAlvoInibidorGridComponent,
        CdkModalidadeAlvoInibidorMainSidebarComponent,
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

        CdkModalidadeAlvoInibidorAutocompleteModule,
        CdkModalidadeAlvoInibidorGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        ModalidadeAlvoInibidorService,
    ],
    exports: [
        CdkModalidadeAlvoInibidorGridComponent
    ]
})
export class CdkModalidadeAlvoInibidorGridModule {
}
