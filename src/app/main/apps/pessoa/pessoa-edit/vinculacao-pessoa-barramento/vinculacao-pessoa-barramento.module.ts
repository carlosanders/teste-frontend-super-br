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
import {VinculacaoPessoaBarramentoComponent} from './vinculacao-pessoa-barramento.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: VinculacaoPessoaBarramentoComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./vinculacao-pessoa-barramento-list/vinculacao-pessoa-barramento-list.module').then(m => m.VinculacaoPessoaBarramentoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./vinculacao-pessoa-barramento-edit/vinculacao-pessoa-barramento-edit.module').then(m => m.VinculacaoPessoaBarramentoEditModule),
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
        VinculacaoPessoaBarramentoComponent
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
    ],
    providers: [
    ],
    exports: [
        VinculacaoPessoaBarramentoComponent
    ]
})
export class VinculacaoPessoaBarramentoModule {
}
