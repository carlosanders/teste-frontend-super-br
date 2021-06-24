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
import {SetorListComponent} from './setor-list.component';
import {SetorService} from '@cdk/services/setor.service';
import {RouterModule, Routes} from '@angular/router';
import {SetorListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkSetorGridModule} from '@cdk/components/setor/cdk-setor-grid/cdk-setor-grid.module';
import {LoginService} from '../../../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: SetorListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/unidades/setor/setor-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        SetorListComponent
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
        SetorListStoreModule,
        PathModule,
    ],
    providers: [
        SetorService,
        fromGuards.ResolveGuard
    ],
    exports: [
        SetorListComponent
    ]
})
export class SetorListModule {
}
