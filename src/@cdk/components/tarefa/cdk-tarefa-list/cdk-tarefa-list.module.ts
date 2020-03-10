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

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkTarefaListComponent } from './cdk-tarefa-list.component';
import { CdkTarefaListItemComponent } from './cdk-tarefa-list-item/cdk-tarefa-list-item.component';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@cdk/pipes/pipes.module';
import { CdkSidebarModule } from '@cdk/components/index';
import { CdkTarefaListMainSidebarComponent } from './sidebars/main/main.component';
import { CdkEspecieTarefaAutocompleteModule } from '@cdk/components/especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import { EspecieTarefaService } from '@cdk/services/especie-tarefa.service';
import { ProcessoService } from '@cdk/services/processo.service';
import {CdkProcessoAutocompleteModule} from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import { DndModule } from 'ngx-drag-drop';
import {MatTooltipModule} from "@angular/material/tooltip";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { AssuntoService } from '@cdk/services/assunto.service';

@NgModule({
    declarations: [
        CdkTarefaListComponent,
        CdkTarefaListItemComponent,
        CdkTarefaListMainSidebarComponent
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
        MatExpansionModule
    ],
    providers: [
        EspecieTarefaService,
        ProcessoService,
        AssuntoService
    ],
    exports: [
        CdkTarefaListComponent
    ]
})
export class CdkTarefaListModule {
}
