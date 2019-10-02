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
import {RelacionamentoComponent} from './relacionamento.component';
import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: RelacionamentoComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./relacionamento-list/relacionamento-list.module').then(m => m.RelacionamentoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./relacionamento-edit/relacionamento-edit.module').then(m => m.RelacionamentoEditModule),
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
        RelacionamentoComponent
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
        RelacionamentoPessoalService
    ],
    exports: [
        RelacionamentoComponent
    ]
})
export class RelacionamentoModule {
}
