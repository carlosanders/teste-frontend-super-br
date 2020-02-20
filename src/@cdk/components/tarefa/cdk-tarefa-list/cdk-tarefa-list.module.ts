import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSortModule, MatMenuModule, MatAutocompleteModule, MatRippleModule,
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkTarefaListComponent } from './cdk-tarefa-list.component';
import { CdkTarefaListItemComponent } from './cdk-tarefa-list-item/cdk-tarefa-list-item.component';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@cdk/pipes/pipes.module';
import { FuseSidebarModule } from '@fuse/components';
import { CdkTarefaListMainSidebarComponent } from './sidebars/main/main.component';
import { CdkEspecieTarefaAutocompleteModule } from '@cdk/components/especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import { EspecieTarefaService } from '@cdk/services/especie-tarefa.service';
import { ProcessoService } from '@cdk/services/processo.service';
import {CdkProcessoAutocompleteModule} from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import { DndModule } from 'ngx-drag-drop';

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

        FuseSharedModule,
        FuseSidebarModule,
        MatRippleModule,
    ],
    providers: [
        EspecieTarefaService,
        ProcessoService
    ],
    exports: [
        CdkTarefaListComponent
    ]
})
export class CdkTarefaListModule {
}
