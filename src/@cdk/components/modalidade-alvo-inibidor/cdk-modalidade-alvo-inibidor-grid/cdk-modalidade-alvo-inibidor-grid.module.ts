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
import {ModalidadeAlvoInibidorService} from '@cdk/services/modalidade-alvo-inibidor.service';
import {CdkModalidadeAlvoInibidorGridComponent} from './cdk-modalidade-alvo-inibidor-grid.component';
import {CdkModalidadeAlvoInibidorAutocompleteModule} from '@cdk/components/modalidade-alvo-inibidor/cdk-modalidade-alvo-inibidor-autocomplete/cdk-modalidade-alvo-inibidor-autocomplete.module';
import {CdkModalidadeAlvoInibidorFilterModule} from '../sidebars/cdk-modalidade-alvo-inibidor-filter/cdk-modalidade-alvo-inibidor-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeAlvoInibidorGridComponent,
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
        CdkModalidadeAlvoInibidorFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
