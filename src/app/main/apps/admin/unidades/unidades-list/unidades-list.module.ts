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
import {UnidadesListComponent} from './unidades-list.component';
import {SetorService} from '@cdk/services/setor.service';
import {RouterModule, Routes} from '@angular/router';
import {UnidadesListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkSetorGridModule} from '@cdk/components/setor/cdk-setor-grid/cdk-setor-grid.module';
import {LoginService} from '../../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: UnidadesListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/unidades/unidades-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        UnidadesListComponent
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
        CdkSetorGridModule,
        UnidadesListStoreModule
    ],
    providers: [
        SetorService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        UnidadesListComponent
    ]
})
export class UnidadesListModule {
}
