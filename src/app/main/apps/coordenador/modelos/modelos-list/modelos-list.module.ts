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
import {ModelosListComponent} from './modelos-list.component';
import {ModeloService} from '@cdk/services/modelo.service';
import {RouterModule, Routes} from '@angular/router';
import {ModelosListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkModeloGridModule} from '@cdk/components/modelo/cdk-modelo-grid/cdk-modelo-grid.module';
import {LoginService} from '../../../../auth/login/login.service';
import {TemplateService} from '@cdk/services/template.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: ModelosListComponent,
        children: [
            {
                path       : 'documento',
                loadChildren: () => import('app/main/apps/documento/documento.module').then(m => m.DocumentoModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/coordenador/modelos/modelos-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ModelosListComponent
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
        CdkModeloGridModule,
        ModelosListStoreModule,
        PathModule,
    ],
    providers: [
        ModeloService,
        TemplateService,
        fromGuards.ResolveGuard
    ],
    exports: [
        ModelosListComponent
    ]
})
export class ModelosListModule {
}
