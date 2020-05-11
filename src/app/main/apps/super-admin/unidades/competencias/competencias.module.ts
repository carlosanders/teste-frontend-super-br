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
import {CompetenciasComponent} from './competencias.component';
import {SetorService} from '@cdk/services/setor.service';
import {VinculacaoSetorMunicipioService} from '@cdk/services/vinculacao-setor-municipio.service';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {CompetenciasStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: CompetenciasComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./competencias-list/competencias-list.module').then(m => m.CompetenciasListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./competencia-edit/competencia-edit.module').then(m => m.CompetenciaEditModule),
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
        CompetenciasComponent
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

        CompetenciasStoreModule,

        CdkSharedModule,
    ],
    providers: [
        VinculacaoSetorMunicipioService,
        SetorService,
        fromGuards.ResolveGuard
    ],
    exports: [
        CompetenciasComponent
    ]
})
export class CompetenciasModule {
}
