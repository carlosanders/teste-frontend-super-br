import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSortModule,
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkProcessoListComponent} from './cdk-processo-list.component';
import {CdkProcessoListItemComponent} from './cdk-processo-list-item/cdk-processo-list-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {CdkSidebarModule} from '@cdk/components';
import {CdkEspecieProcessoAutocompleteModule} from '@cdk/components/especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-autocomplete.module';
import {EspecieProcessoService} from '@cdk/services/especie-processo.service';
import {ProcessoService} from '@cdk/services/processo.service';
import {CdkProcessoAutocompleteModule} from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {DndModule} from 'ngx-drag-drop';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkAssuntoAdministrativoAutocompleteModule} from '../../assunto-administrativo/cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CdkEtiquetaAutocompleteModule} from '../../etiqueta/cdk-etiqueta-autocomplete/cdk-etiqueta-autocomplete.module';
import {CdkInteressadoAutocompleteModule} from '../../interessado/cdk-interessado-autocomplete/cdk-interessado-autocomplete.module';
import {CdkInteressadoGridsearchModule} from '../../interessado/cdk-interessado-autocomplete/cdk-interessado-gridsearch/cdk-interessado-gridsearch.module';
import {CdkProcessoFilterModule} from '../sidebars/cdk-processo-filter/cdk-processo-filter.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';

@NgModule({
    declarations: [
        CdkProcessoListComponent,
        CdkProcessoListItemComponent,
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatMenuModule,
        MatAutocompleteModule,

        DndModule,

        CdkEspecieProcessoAutocompleteModule,
        CdkProcessoAutocompleteModule,

        TranslateModule,

        PipesModule,
        MatTooltipModule,
        InfiniteScrollModule,
        CdkSharedModule,
        CdkSidebarModule,
        MatRippleModule,
        MatExpansionModule,
        CdkUsuarioAutocompleteModule,
        CdkAssuntoAdministrativoAutocompleteModule,
        MatDatetimepickerModule,
        MatDialogModule,

        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatRadioModule,
        MatDatepickerModule,
        CdkEtiquetaAutocompleteModule,
        CdkInteressadoAutocompleteModule,
        CdkInteressadoGridsearchModule,
        CdkProcessoFilterModule,
        NgxUpperCaseDirectiveModule,
    ],
    providers: [
        EspecieProcessoService,
        ProcessoService
    ],
    exports: [
        CdkProcessoListComponent
    ]
})
export class CdkProcessoListModule {
}
