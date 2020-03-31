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
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {TarefasComponent} from './tarefas.component';
import {ProcessosService} from 'src/@cdk/services/processos.service';
import {RouterModule, Routes} from '@angular/router';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';

const routes: Routes = [
    {
        path: '',
        component: TarefasComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./tarefa-list/processo-tarefa-list.module').then(m => m.ProcessoTarefaListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./tarefa-edit/processo-tarefa-edit.module').then(m => m.ProcessoTarefaEditModule),
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

        CdkSharedModule,
    ],
    providers: [
        ProcessosService,
        EspecieTarefaService
    ],
    exports: [
        TarefasComponent
    ]
})
export class ProcessoTarefasModule {
}
