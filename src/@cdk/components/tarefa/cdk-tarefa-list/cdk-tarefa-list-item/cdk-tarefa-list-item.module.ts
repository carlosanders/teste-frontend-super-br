import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSortModule, MatMenuModule, MatAutocompleteModule, MatRippleModule,
    MatExpansionModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkTarefaListItemComponent} from './cdk-tarefa-list-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {CdkSidebarModule} from '../../..';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatSelectModule} from '@angular/material/select';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {RouterModule} from '@angular/router';
import {CdkEspecieTarefaAutocompleteModule} from '../../../especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {CdkProcessoAutocompleteModule} from '../../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkTarefaFilterModule} from '../../sidebars/cdk-tarefa-filter/cdk-tarefa-filter.module';
import {DndModule} from 'ngx-drag-drop';
import {
    CdkVinculacaoEtiquetaChipsModule
} from '../../../vinculacao-etiqueta/cdk-vinculacao-etiqueta-chips/cdk-vinculacao-etiqueta-chips.module';
import {
    CdkComponenteDigitalCardListModule
} from '../../../componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {
    CdkTipoDocumentoAutocompleteModule
} from "../../../tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
    declarations: [
        CdkTarefaListItemComponent
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
        CdkEspecieTarefaAutocompleteModule,
        CdkProcessoAutocompleteModule,
        TranslateModule,
        PipesModule,
        CdkSharedModule,
        CdkSidebarModule,
        MatRippleModule,
        MatTooltipModule,
        InfiniteScrollModule,
        MatExpansionModule,
        CdkTarefaFilterModule,
        MatSelectModule,
        NgxUpperCaseDirectiveModule,
        MatSelectModule,
        RouterModule,
        DndModule,
        CdkVinculacaoEtiquetaChipsModule,
        CdkComponenteDigitalCardListModule,
        CdkTipoDocumentoAutocompleteModule,
        MatProgressBarModule
    ],
    providers: [
    ],
    exports: [
        CdkTarefaListItemComponent
    ]
})
export class CdkTarefaListItemModule {
}
