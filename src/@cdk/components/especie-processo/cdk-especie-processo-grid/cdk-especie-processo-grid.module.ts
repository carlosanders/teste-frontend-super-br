import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieProcessoService} from '@cdk/services/especie-processo.service';
import {CdkEspecieProcessoGridComponent} from './cdk-especie-processo-grid.component';
import {CdkEspecieProcessoAutocompleteModule} from '@cdk/components/especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-autocomplete.module';
import {CdkEspecieProcessoFilterModule} from '../sidebars/cdk-especie-processo-filter/cdk-especie-processo-filter.module';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkGeneroProcessoAutocompleteModule} from '../../genero-processo/cdk-genero-processo-autocomplete/cdk-genero-processo-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';

@NgModule({
    declarations: [
        CdkEspecieProcessoGridComponent,
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,

        CdkSharedModule,
        CdkSidebarModule,

        CdkEspecieProcessoAutocompleteModule,
        CdkGeneroProcessoAutocompleteModule,
        CdkUsuarioAutocompleteModule,
        CdkEspecieProcessoFilterModule,
        MatTooltipModule,
    ],
    providers: [
        EspecieProcessoService,
    ],
    exports: [
        CdkEspecieProcessoGridComponent
    ]
})
export class CdkEspecieProcessoGridModule {
}
