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
import {UnidadesOrgaoCentralListComponent} from './unidades-list.component';
import {SetorService} from '@cdk/services/setor.service';
import {RouterModule, Routes} from '@angular/router';
import {UnidadesOrgaoCentralListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkSetorGridModule} from '@cdk/components/setor/cdk-setor-grid/cdk-setor-grid.module';
import {LoginService} from '../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: UnidadesOrgaoCentralListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        UnidadesOrgaoCentralListComponent
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
        UnidadesOrgaoCentralListStoreModule
    ],
    providers: [
        SetorService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        UnidadesOrgaoCentralListComponent
    ]
})
export class UnidadesListModule {
}
