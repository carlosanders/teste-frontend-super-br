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
import {ModalidadeTipoInibidorService} from '@cdk/services/modalidade-tipo-inibidor.service';
import {CdkModalidadeTipoInibidorGridComponent} from './cdk-modalidade-tipo-inibidor-grid.component';
import {CdkModalidadeTipoInibidorAutocompleteModule} from '@cdk/components/modalidade-tipo-inibidor/cdk-modalidade-tipo-inibidor-autocomplete/cdk-modalidade-tipo-inibidor-autocomplete.module';
import {CdkModalidadeTipoInibidorGridFilterModule} from './cdk-modalidade-tipo-inibidor-grid-filter/cdk-modalidade-tipo-inibidor-grid-filter.module';
import {CdkModalidadeTipoInibidorMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeTipoInibidorGridComponent,
        CdkModalidadeTipoInibidorMainSidebarComponent,
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
        CdkModalidadeTipoInibidorGridFilterModule,

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
