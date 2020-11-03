import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule, MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {RegrasComponent} from './regras.component';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';
import {RegraService} from '@cdk/services/regra.service';

const routes: Routes = [
    {
        path: '',
        component: RegrasComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./regra-list/regra-list.module').then(m => m.RegraListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./regra-edit/regra-edit.module').then(m => m.RegraEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }

];

const path = 'app/main/apps/coordenador/etiquetas/etiqueta-edit/regras';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RegrasComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
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
        RegraService
    ],
    exports: [
        RegrasComponent
    ]
})
export class RegrasModule {
}
