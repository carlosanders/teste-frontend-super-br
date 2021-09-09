import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VincularPessoaComponent} from './vincular-pessoa.component';
import {RouterModule, Routes} from '@angular/router';
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
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: VincularPessoaComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./vinculacao-pessoa-usuario-list/vinculacao-pessoa-usuario-list.module').then(m => m.VinculacaoPessoaUsuarioListModule),
            },
            {
                path: ':vinculacaoPessoaUsuarioHandle',
                loadChildren: () => import('./vinculacao-pessoa-usuario-edit/vinculacao-pessoa-usuario-edit.module').then(m => m.VinculacaoPessoaUsuarioEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ],
    }
];

const path = 'app/main/apps/admin/usuarios-externos/vinculacao-pessoa-usuario';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [VincularPessoaComponent],
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
    providers: []
})
export class VincularPessoaModule {
}
