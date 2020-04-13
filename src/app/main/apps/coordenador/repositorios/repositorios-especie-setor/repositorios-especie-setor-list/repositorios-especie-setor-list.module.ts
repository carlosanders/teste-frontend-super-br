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
import {RepositoriosEspecieSetorListComponent} from './repositorios-especie-setor-list.component';
import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {CdkVinculacaoRepositorioGridModule} from '@cdk/components/vinculacao-repositorio/cdk-vinculacao-repositorio-grid/cdk-vinculacao-repositorio-grid.module';
import {RepositoriosEspecieSetorListStoreModule} from './store/store.module';
import {LoginService} from '../../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: RepositoriosEspecieSetorListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        RepositoriosEspecieSetorListComponent
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

        RepositoriosEspecieSetorListStoreModule,
        CdkVinculacaoRepositorioGridModule
    ],
    providers: [
        VinculacaoRepositorioService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        RepositoriosEspecieSetorListComponent
    ]
})
export class RepositoriosEspecieSetorListModule {
}
