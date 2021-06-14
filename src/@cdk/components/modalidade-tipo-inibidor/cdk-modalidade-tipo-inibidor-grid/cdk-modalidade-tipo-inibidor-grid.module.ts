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
import {ModalidadeTipoInibidorService} from '@cdk/services/modalidade-tipo-inibidor.service';
import {CdkModalidadeTipoInibidorGridComponent} from './cdk-modalidade-tipo-inibidor-grid.component';
import {CdkModalidadeTipoInibidorAutocompleteModule} from '@cdk/components/modalidade-tipo-inibidor/cdk-modalidade-tipo-inibidor-autocomplete/cdk-modalidade-tipo-inibidor-autocomplete.module';
import {CdkModalidadeTipoInibidorFilterModule} from '../sidebars/cdk-modalidade-tipo-inibidor-filter/cdk-modalidade-tipo-inibidor-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeTipoInibidorGridComponent,
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

        CdkModalidadeTipoInibidorAutocompleteModule,
        CdkModalidadeTipoInibidorFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeTipoInibidorService,
    ],
    exports: [
        CdkModalidadeTipoInibidorGridComponent
    ]
})
export class CdkModalidadeTipoInibidorGridModule {
}
