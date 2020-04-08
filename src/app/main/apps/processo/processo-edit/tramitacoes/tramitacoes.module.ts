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
import {TramitacoesComponent} from './tramitacoes.component';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {RouterModule, Routes} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Routes = [
    {
        path: '',
        component: TramitacoesComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./tramitacao-list/tramitacao-list.module').then(m => m.TramitacaoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./tramitacao-edit/tramitacao-edit.module').then(m => m.TramitacaoEditModule),
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
        TramitacoesComponent
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
        MatTooltipModule,
    ],
    providers: [
        TramitacaoService
    ],
    exports: [
        TramitacoesComponent
    ]
})
export class TramitacoesModule {
}
