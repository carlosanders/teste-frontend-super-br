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
import {AdminAfastamentosComponent} from './admin-afastamentos.component';
import {AdminAfastamentosStoreModule} from './store/store.module';
import {AfastamentoService} from '@cdk/services/afastamento.service';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Routes = [
    {
        path: '',
        component: AdminAfastamentosComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./afastamentos-list/admin-afastamentos-list.module').then(m => m.AdminAfastamentosListModule),
            },
            {
                path: 'editar',
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
        AdminAfastamentosComponent,
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

        AdminAfastamentosStoreModule,

        CdkSharedModule,
        MatTooltipModule,
    ],
    providers: [
        AfastamentoService,
        UsuarioService,
        fromGuards.ResolveGuard
    ],
    exports: [
        AdminAfastamentosComponent
    ]
})
export class AdminAfastamentosModule {
}
