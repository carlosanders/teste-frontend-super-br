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

import {CdkSharedModule} from '@cdk/shared.module';
import {RelacionamentoComponent} from './relacionamento.component';
import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';

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

const path = 'app/main/apps/pessoa/pessoa-edit/relacionamentos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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

        CdkSharedModule,
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
