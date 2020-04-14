import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {EspecieTarefaComponent} from './especie-tarefa.component';
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
} from '../../../../../@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '../../../../../@cdk/shared.module';
import {LoginService} from '../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: EspecieTarefaComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./especie-tarefa-list/especie-tarefa-list.module').then(m => m.EspecieTarefaListModule),
            },
            // {
            //     path       : 'editar',
            //     loadChildren: () => import('./usuario-edit/usuario-edit.module').then(m => m.UsuarioEditModule),
            // },
            // {
            //     path       : ':usuarioHandle/lotacoes',
            //     loadChildren: () => import('app/main/apps/admin/lotacoes/admin-lotacoes.module').then(m => m.AdminLotacoesModule),
            // },
            // {
            //     path       : ':usuarioHandle/afastamentos',
            //     loadChildren: () => import('app/main/apps/admin/afastamentos/admin-afastamentos.module').then(m => m.AdminAfastamentosModule),
            // },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];


@NgModule({
    declarations: [EspecieTarefaComponent],
    imports: [
        CommonModule,
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
        LoginService
    ]
})
export class EspecieTarefaModule {
}
