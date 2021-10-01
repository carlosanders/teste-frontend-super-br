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

import * as fromGuards from './store/guards';
import {CdkSharedModule} from '@cdk/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {UsuarioService} from '@cdk/services/usuario.service';
import {CoordenadoresComponent} from './coordenadores.component';
import {AdminCoordenadoresStoreModule} from './store/store.module';
import {CoordenadorService} from '@cdk/services/coordenador.service';

const routes: Routes = [
    {
        path: '',
        component: CoordenadoresComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./coordenadores-list/coordenadores-list.module').then(m => m.CoordenadoresListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./coordenador-edit/coordenador-edit.module').then(m => m.CoordenadorEditModule),
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
        CoordenadoresComponent,
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

        AdminCoordenadoresStoreModule,

        CdkSharedModule,
    ],
    providers: [
        CoordenadorService,
        UsuarioService,
        fromGuards.ResolveGuard
    ],
    exports: [
        CoordenadoresComponent
    ]
})
export class CoordenadoresModule {
}
