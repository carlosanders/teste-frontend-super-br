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

import * as fromGuards from './store/guards';
import {CdkSharedModule} from '@cdk/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {UsuarioService} from '@cdk/services/usuario.service';
import {CoordenadorAfastamentosComponent} from './coordenador-afastamentos.component';
import {AfastamentosStoreModule} from './store/store.module';
import {AfastamentoService} from '@cdk/services/afastamento.service';

const routes: Routes = [
    {
        path: '',
        component: CoordenadorAfastamentosComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./afastamentos-list/coordenador-afastamentos-list.module').then(m => m.CoordenadorAfastamentosListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./afastamento-edit/afastamento-edit.module').then(m => m.AfastamentoEditModule),
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
        CoordenadorAfastamentosComponent,
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

        AfastamentosStoreModule,

        CdkSharedModule,
    ],
    providers: [
        AfastamentoService,
        UsuarioService,
        fromGuards.ResolveGuard
    ],
    exports: [
        CoordenadorAfastamentosComponent
    ]
})
export class CoordenadorAfastamentosModule {
}
