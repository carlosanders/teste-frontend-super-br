import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {TarefasComponent} from './tarefas.component';
import {TarefaService} from '@cdk/services/tarefa.service';
import {RouterModule, Routes} from '@angular/router';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';

const routes: Routes = [
    {
        path: '',
        component: TarefasComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: './tarefa-list/processo-tarefa-list.module#ProcessoTarefaListModule',
            },
            {
                path       : 'editar',
                loadChildren: './tarefa-edit/processo-tarefa-edit.module#ProcessoTarefaEditModule',
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }

];

@NgModule({
    declarations: [
        TarefasComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        TranslateModule,

        FuseSharedModule,
    ],
    providers: [
        TarefaService,
        EspecieTarefaService
    ],
    exports: [
        TarefasComponent
    ]
})
export class ProcessoTarefasModule {
}
