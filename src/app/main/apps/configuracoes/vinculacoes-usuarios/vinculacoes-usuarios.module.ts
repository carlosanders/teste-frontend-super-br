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
import {VinculacoesUsuariosComponent} from './vinculacoes-usuarios.component';
import {VinculacaoUsuarioService} from '@cdk/services/vinculacao-usuario.service';
import {RouterModule, Routes} from '@angular/router';
import {UsuarioService} from '@cdk/services/usuario.service';

const routes: Routes = [
    {
        path: '',
        component: VinculacoesUsuariosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: './vinculacao-usuario-list/vinculacao-usuario-list.module#VinculacaoUsuarioListModule',
            },
            {
                path       : 'editar',
                loadChildren: './vinculacao-usuario-edit/vinculacao-usuario-edit.module#VinculacaoUsuarioEditModule',
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
        VinculacoesUsuariosComponent
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
        VinculacaoUsuarioService,
        UsuarioService
    ],
    exports: [
        VinculacoesUsuariosComponent
    ]
})
export class VinculacoesUsuariosModule {
}
