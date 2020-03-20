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
import {VinculacoesUsuariosComponent} from './vinculacoes-usuarios.component';
import {VinculacaoUsuarioService} from '@cdk/services/vinculacao-usuario.service';
import {RouterModule, Routes} from '@angular/router';
import {UsuarioService} from '@cdk/services/usuario.service';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Routes = [
    {
        path: '',
        component: VinculacoesUsuariosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./vinculacao-usuario-list/vinculacao-usuario-list.module').then(m => m.VinculacaoUsuarioListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./vinculacao-usuario-edit/vinculacao-usuario-edit.module').then(m => m.VinculacaoUsuarioEditModule),
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

        CdkSharedModule,
        MatTooltipModule,
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
