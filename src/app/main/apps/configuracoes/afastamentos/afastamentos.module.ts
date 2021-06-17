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
import {AfastamentosComponent} from './afastamentos.component';
import {AfastamentoService} from '@cdk/services/afastamento.service';
import {RouterModule, Routes} from '@angular/router';
import {TemplateService} from '@cdk/services/template.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: AfastamentosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./afastamento-list/afastamento-list.module').then(m => m.AfastamentoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./afastamento-edit/afastamento-edit.module').then(m => m.AfastamentoEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }

];

const path = 'app/main/apps/configuracoes/afastamentos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AfastamentosComponent
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
        AfastamentoService,
        TemplateService
    ],
    exports: [
        AfastamentosComponent
    ]
})
export class AfastamentosModule {
}
