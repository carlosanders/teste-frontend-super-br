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
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacoesProcessosComponent} from './vinculacoes-processos.component';
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {RouterModule, Routes} from '@angular/router';
import {ModalidadeVinculacaoProcessoService} from '@cdk/services/modalidade-vinculacao-processo.service';

const routes: Routes = [
    {
        path: '',
        component: VinculacoesProcessosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./vinculacao-processo-list/vinculacao-processo-list.module').then(m => m.VinculacaoProcessoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./vinculacao-processo-edit/vinculacao-processo-edit.module').then(m => m.VinculacaoProcessoEditModule),
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
        VinculacoesProcessosComponent
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
        VinculacaoProcessoService,
        ModalidadeVinculacaoProcessoService
    ],
    exports: [
        VinculacoesProcessosComponent
    ]
})
export class VinculacoesProcessosModule {
}
