import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {RepositorioListComponent} from './repositorio-list.component';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {RouterModule, Routes} from '@angular/router';
import {RepositorioListStoreModule} from './store/store.module';
import {ModalidadeRepositorioService} from '@cdk/services/modalidade-repositorio.service';
import * as fromGuards from './store/guards';
import {CdkRepositorioGridModule} from '@cdk/components/repositorio/cdk-repositorio-grid/cdk-repositorio-grid.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: RepositorioListComponent,
        children: [
            {
                path       : 'documento',
                loadChildren: () => import('app/main/apps/documento/documento.module').then(m => m.DocumentoModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/configuracoes/repositorios/repositorio-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RepositorioListComponent
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

        CdkRepositorioGridModule,

        RepositorioListStoreModule,
    ],
    providers: [
        RepositorioService,
        ModalidadeRepositorioService,
        fromGuards.ResolveGuard
    ],
    exports: [
        RepositorioListComponent
    ]
})
export class RepositorioListModule {
}
