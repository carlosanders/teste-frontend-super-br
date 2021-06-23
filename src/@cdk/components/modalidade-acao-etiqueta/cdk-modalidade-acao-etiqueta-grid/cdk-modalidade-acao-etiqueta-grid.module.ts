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
import {ModalidadeAcaoEtiquetaService} from '@cdk/services/modalidade-acao-etiqueta.service';
import {CdkModalidadeAcaoEtiquetaGridComponent} from './cdk-modalidade-acao-etiqueta-grid.component';
import {CdkModalidadeAcaoEtiquetaAutocompleteModule} from '@cdk/components/modalidade-acao-etiqueta/cdk-modalidade-acao-etiqueta-autocomplete/cdk-modalidade-acao-etiqueta-autocomplete.module';
import {CdkModalidadeAcaoEtiquetaFilterModule} from '../sidebars/cdk-modalidade-acao-etiqueta-filter/cdk-modalidade-acao-etiqueta-filter.module';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkGeneroProcessoAutocompleteModule} from '../../genero-processo/cdk-genero-processo-autocomplete/cdk-genero-processo-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';

@NgModule({
    declarations: [
        CdkModalidadeAcaoEtiquetaGridComponent,
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

        CdkModalidadeAcaoEtiquetaAutocompleteModule,
        CdkGeneroProcessoAutocompleteModule,
        CdkUsuarioAutocompleteModule,
        CdkModalidadeAcaoEtiquetaFilterModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeAcaoEtiquetaService,
    ],
    exports: [
        CdkModalidadeAcaoEtiquetaGridComponent
    ]
})
export class CdkModalidadeAcaoEtiquetaGridModule {
}
