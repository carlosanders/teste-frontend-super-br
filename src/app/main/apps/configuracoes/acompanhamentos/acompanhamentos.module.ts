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
import {AcompanhamentosComponent} from './acompanhamentos.component';
import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: AcompanhamentosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./acompanhamento-list/acompanhamento-list.module').then(m => m.AcompanhamentoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./acompanhamento-edit/acompanhamento-edit.module').then(m => m.AcompanhamentoEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/configuracoes/acompanhamentos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AcompanhamentosComponent
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
        AcompanhamentoService,
    ],
    exports: [
        AcompanhamentosComponent
    ]
})
export class AcompanhamentosModule {
}
