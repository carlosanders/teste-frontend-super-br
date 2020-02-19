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

import {FuseSharedModule} from '@fuse/shared.module';
import {LotacoesComponent} from './lotacoes.component';
import {LotacaoService} from '@cdk/services/lotacao.service';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: LotacoesComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./lotacao-list/lotacao-list.module').then(m => m.LotacaoListModule),
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
        LotacoesComponent
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
        LotacaoService
    ],
    exports: [
        LotacoesComponent
    ]
})
export class LotacoesModule {
}
