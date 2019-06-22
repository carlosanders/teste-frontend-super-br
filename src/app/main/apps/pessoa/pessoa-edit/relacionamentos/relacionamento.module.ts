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
                loadChildren: './relacionamento-list/relacionamento-list.module#RelacionamentoListModule',
            },
            {
                path       : 'editar',
                loadChildren: './relacionamento-edit/relacionamento-edit.module#RelacionamentoEditModule',
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
