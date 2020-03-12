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
import {UsuarioService} from '@cdk/services/usuario.service';
import {RouterModule, Routes} from '@angular/router';
import {UsuarioComponent} from "./usuario.component";

const routes: Routes = [
    {
        path: '',
        component: UsuarioComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./usuario-list/usuario-list.module').then(m => m.UsuarioListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./usuario-edit/usuario-edit.module').then(m => m.UsuarioEditModule),
            },
            {
                path       : ':usuarioHandle/lotacoes',
                loadChildren: () => import('app/main/apps/admin/lotacoes/admin-lotacoes.module').then(m => m.AdminLotacoesModule),
            },
            {
                path       : ':usuarioHandle/afastamentos',
                loadChildren: () => import('app/main/apps/admin/afastamentos/admin-afastamentos.module').then(m => m.AdminAfastamentosModule),
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
        UsuarioComponent
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
        UsuarioService
    ],
    exports: [
        UsuarioComponent
    ]
})
export class UsuarioModule {
}