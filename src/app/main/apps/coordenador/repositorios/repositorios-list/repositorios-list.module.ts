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
import {RepositoriosListComponent} from './repositorios-list.component';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {RouterModule, Routes} from '@angular/router';
import {RepositoriosListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkRepositorioGridModule} from '@cdk/components/repositorio/cdk-repositorio-grid/cdk-repositorio-grid.module';
import {LoginService} from '../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: RepositoriosListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        RepositoriosListComponent
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
        RepositoriosListStoreModule,
    ],
    providers: [
        RepositorioService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        RepositoriosListComponent
    ]
})
export class RepositoriosListModule {
}
