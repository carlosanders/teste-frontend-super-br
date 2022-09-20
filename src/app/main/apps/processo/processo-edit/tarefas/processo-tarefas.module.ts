import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {TarefasComponent} from './tarefas.component';
import {TarefaService} from '@cdk/services/tarefa.service';
import {RouterModule, Routes} from '@angular/router';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {modulesConfig} from 'modules/modules-config';

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
                path       : 'atividades',
                loadChildren: () => import('./atividade-list/atividade-list.module').then(m => m.AtividadeListModule),
            },
            {
                path        : 'compartilhamentos',
                loadChildren: () => import('./compartilhamento-list/compartilhamento-list.module').then(m => m.CompartilhamentoListModule)
            },
        ]
    }
];

const path = 'app/main/apps/processo/processo-edit/tarefas';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

routes[0].children.push({
    path: '**',
    redirectTo: 'listar'
});

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
        MatTooltipModule,
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
