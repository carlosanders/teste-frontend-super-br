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
import {EspecieSetorComponent} from './especie-setor.component';
import {EspecierSetorStoreModule} from './store/store.module';
import {EspecieSetorService} from '@cdk/services/especie-setor.service';

const routes: Routes = [
    {
        path: ':modeloHandle',
        component: EspecieSetorComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./especie-setor-list/especie-setor-list.module').then(m => m.EspecieSetorListModule),
            },
            {
                path       : 'vincular',
                loadChildren: () => import('./especie-setor-edit/especie-setor-edit.module').then(m => m.EspecieSetorEditModule),
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
        EspecieSetorComponent
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

        EspecierSetorStoreModule,

        CdkSharedModule,
    ],
    providers: [
        EspecieSetorService,
        UsuarioService,
        fromGuards.ResolveGuard
    ],
    exports: [
        EspecieSetorComponent
    ]
})
export class EspecieSetorModule {
}
