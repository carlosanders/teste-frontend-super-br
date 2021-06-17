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
import {VinculacoesUsuariosComponent} from './vinculacoes-usuarios.component';
import {VinculacaoUsuarioService} from '@cdk/services/vinculacao-usuario.service';
import {RouterModule, Routes} from '@angular/router';
import {UsuarioService} from '@cdk/services/usuario.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {modulesConfig} from 'modules/modules-config';

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

const path = 'app/main/apps/configuracoes/vinculacoes-usuarios';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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
