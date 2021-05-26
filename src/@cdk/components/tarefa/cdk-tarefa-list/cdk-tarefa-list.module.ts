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
import {CdkTarefaListComponent} from './cdk-tarefa-list.component';
import {CdkTarefaListItemComponent} from './cdk-tarefa-list-item/cdk-tarefa-list-item.component';
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
import {CdkTarefaListService} from './cdk-tarefa-list.service';
import {MatSelectModule} from '@angular/material/select';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        CdkTarefaListComponent,
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
        RouterModule
    ],
    providers: [
        EspecieTarefaService,
        ProcessoService,
        AssuntoService,
        CdkTarefaListService
    ],
    exports: [
        CdkTarefaListComponent
    ]
})
export class CdkTarefaListModule {
}
