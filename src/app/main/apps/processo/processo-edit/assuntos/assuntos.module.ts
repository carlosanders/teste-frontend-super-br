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
import {AssuntosComponent} from './assuntos.component';
import {AssuntoService} from '@cdk/services/assunto.service';
import {RouterModule, Routes} from '@angular/router';
import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: AssuntosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./assunto-list/assunto-list.module').then(m => m.AssuntoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./assunto-edit/assunto-edit.module').then(m => m.AssuntoEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/processo/processo-edit/assuntos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AssuntosComponent
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
        AssuntoService,
        AssuntoAdministrativoService
    ],
    exports: [
        AssuntosComponent
    ]
})
export class AssuntosModule {
}
