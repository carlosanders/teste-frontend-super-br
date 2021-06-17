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
import {CoordenadorAfastamentosListComponent} from './coordenador-afastamentos-list.component';
import {AfastamentoService} from '@cdk/services/afastamento.service';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {CdkAfastamentoGridModule} from '@cdk/components/afastamento/cdk-afastamento-grid/cdk-afastamento-grid.module';
import {CoordenadorAfastamentosListStoreModule} from './store/store.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: CoordenadorAfastamentosListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/coordenador/afastamentos/afastamentos-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        CoordenadorAfastamentosListComponent
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

        CoordenadorAfastamentosListStoreModule,
        CdkAfastamentoGridModule,
        PathModule,
    ],
    providers: [
        AfastamentoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        CoordenadorAfastamentosListComponent
    ]
})
export class CoordenadorAfastamentosListModule {
}
