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
import {InteressadosComponent} from './interessados.component';
import {InteressadoService} from '@cdk/services/interessado.service';
import {RouterModule, Routes} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: InteressadosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./interessado-list/interessado-list.module').then(m => m.InteressadoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./interessado-edit/interessado-edit.module').then(m => m.InteressadoEditModule),
            },
            {
                path       : ':interessadoHandle/representantes',
                loadChildren: () => import('./representantes/representantes.module').then(m => m.RepresentantesModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/processo/processo-edit/interessados';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        InteressadosComponent
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
        InteressadoService
    ],
    exports: [
        InteressadosComponent
    ]
})
export class InteressadosModule {
}
