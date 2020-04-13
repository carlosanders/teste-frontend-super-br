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
import {ModelosEspecieSetorListComponent} from './modelos-especie-setor-list.component';
import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {CdkVinculacaoModeloGridModule} from '@cdk/components/vinculacao-modelo/cdk-vinculacao-modelo-grid/cdk-vinculacao-modelo-grid.module';
import {ModelosEspecieSetorListStoreModule} from './store/store.module';
import {LoginService} from '../../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: ModelosEspecieSetorListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        ModelosEspecieSetorListComponent
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

        ModelosEspecieSetorListStoreModule,
        CdkVinculacaoModeloGridModule
    ],
    providers: [
        VinculacaoModeloService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        ModelosEspecieSetorListComponent
    ]
})
export class ModelosEspecieSetorListModule {
}
