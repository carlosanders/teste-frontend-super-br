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
    MatTableModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {GrupoContatoComponent} from './grupo-contato.component';
import {GrupoContatoService} from '@cdk/services/grupo-contato.service';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: GrupoContatoComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./grupo-contato-list/grupo-contato-list.module').then(m => m.GrupoContatoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./grupo-contato-edit/grupo-contato-edit.module').then(m => m.GrupoContatoEditModule),
            },
            {
                path       : ':grupoContatoHandle/contato',
                loadChildren: () => import('./contato/contato.module').then(m => m.ContatoModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/configuracoes/grupo-contato';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        GrupoContatoComponent
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
        MatTooltipModule,

        TranslateModule,

        CdkSharedModule,
    ],
    providers: [
        GrupoContatoService
    ],
    exports: [
        GrupoContatoComponent
    ]
})
export class GrupoContatoModule {
}
