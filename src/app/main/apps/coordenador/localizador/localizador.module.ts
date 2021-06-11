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
import {LocalizadorComponent} from './localizador.component';
import {SetorService} from '@cdk/services/setor.service';
import {LocalizadorService} from '@cdk/services/localizador.service';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: LocalizadorComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./localizador-list/localizador-list.module').then(m => m.LocalizadorListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./localizador-edit/localizador-edit.module').then(m => m.LocalizadorEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/coordenador/localizador';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        LocalizadorComponent
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
        LocalizadorService,
        SetorService,
    ],
    exports: [
        LocalizadorComponent
    ]
})
export class LocalizadorModule {
}
