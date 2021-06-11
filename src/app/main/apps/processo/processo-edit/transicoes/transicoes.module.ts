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
import {TransicoesComponent} from './transicoes.component';
import {TransicaoService} from '@cdk/services/transicao.service';
import {RouterModule, Routes} from '@angular/router';
import {ModalidadeTransicaoService} from '@cdk/services/modalidade-transicao.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: TransicoesComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./transicao-list/transicao-list.module').then(m => m.TransicaoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./transicao-edit/transicao-edit.module').then(m => m.TransicaoEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }

];

const path = 'app/main/apps/processo/processo-edit/transicoes';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        TransicoesComponent
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
        TransicaoService,
        ModalidadeTransicaoService
    ],
    exports: [
        TransicoesComponent
    ]
})
export class TransicoesModule {
}
