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
    MatSortModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkTarefaListComponent} from './cdk-tarefa-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {CdkSidebarModule} from '../..';
import {CdkEspecieTarefaAutocompleteModule} from '@cdk/components/especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {ProcessoService} from '@cdk/services/processo.service';
import {CdkProcessoAutocompleteModule} from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {DndModule} from 'ngx-drag-drop';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {AssuntoService} from '@cdk/services/assunto.service';
import {CdkTarefaFilterModule} from '../sidebars/cdk-tarefa-filter/cdk-tarefa-filter.module';
import {MatSelectModule} from '@angular/material/select';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {RouterModule} from '@angular/router';
import {CdkTarefaListItemModule} from './cdk-tarefa-list-item/cdk-tarefa-list-item.module';
import {MatTableModule} from '@angular/material/table';
import {
    CdkVinculacaoEtiquetaChipsModule
} from '../../vinculacao-etiqueta/cdk-vinculacao-etiqueta-chips/cdk-vinculacao-etiqueta-chips.module';
import {
    CdkTipoDocumentoAutocompleteModule
} from '../../tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {
    CdkComponenteDigitalCardListModule
} from '../../componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {TableDefinitionsService} from '../../table-definitions/table-definitions.service';
import {DirectivesModule} from '../../../directives/directives';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
    declarations: [
        CdkTarefaListComponent,
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
        CdkTarefaListItemModule,
        MatTableModule,
        CdkVinculacaoEtiquetaChipsModule,
        CdkTipoDocumentoAutocompleteModule,
        CdkComponenteDigitalCardListModule,
        MatPaginatorModule,
        DirectivesModule,
        MatDividerModule,
        MatSlideToggleModule,
    ],
    providers: [
        EspecieTarefaService,
        ProcessoService,
        AssuntoService,
        TableDefinitionsService,
    ],
    exports: [
        CdkTarefaListComponent
    ]
})
export class CdkTarefaListModule {
}
