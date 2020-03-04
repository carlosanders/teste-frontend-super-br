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

import {FuseSharedModule} from '@fuse/shared.module';
import {SetorListComponent} from './setor-list.component';
import {SetorService} from '@cdk/services/setor.service';
import {RouterModule, Routes} from '@angular/router';
import {SetorListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkSetorGridModule} from '@cdk/components/setor/cdk-setor-grid/cdk-setor-grid.module';
import {LoginService} from '../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: SetorListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

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
        FuseSharedModule,
        CdkSetorGridModule,
        SetorListStoreModule,
    ],
    providers: [
        SetorService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        SetorListComponent
    ]
})
export class SetorListModule {
}
