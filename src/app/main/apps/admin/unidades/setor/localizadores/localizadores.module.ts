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
import {LocalizadoresComponent} from './localizadores.component';
import {SetorService} from '@cdk/services/setor.service';
import {LocalizadorService} from '@cdk/services/localizador.service';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {RootLocalizadoresStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: LocalizadoresComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./localizadores-list/localizadores-list.module').then(m => m.LocalizadoresListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./localizador-edit/localizador-edit.module').then(m => m.RootLocalizadorEditModule),
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
        LocalizadoresComponent
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

        RootLocalizadoresStoreModule,

        CdkSharedModule,
    ],
    providers: [
        LocalizadorService,
        SetorService,
        fromGuards.ResolveGuard
    ],
    exports: [
        LocalizadoresComponent
    ]
})
export class LocalizadoresModule {
}
