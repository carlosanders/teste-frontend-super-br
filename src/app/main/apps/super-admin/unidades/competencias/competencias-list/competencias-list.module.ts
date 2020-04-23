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
import {CompetenciasListComponent} from './competencias-list.component';
import {VinculacaoSetorMunicipioService} from '@cdk/services/vinculacao-setor-municipio.service';
import {RouterModule, Routes} from '@angular/router';
import {CompetenciasListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkVinculacaoSetorMunicipioGridModule} from '@cdk/components/vinculacao-setor-municipio/cdk-vinculacao-setor-municipio-grid/cdk-vinculacao-setor-municipio-grid.module';

const routes: Routes = [
    {
        path: '',
        component: CompetenciasListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        CompetenciasListComponent
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
        CompetenciasListStoreModule,
        CdkVinculacaoSetorMunicipioGridModule
    ],
    providers: [
        VinculacaoSetorMunicipioService,
        fromGuards.ResolveGuard
    ],
    exports: [
        CompetenciasListComponent
    ]
})
export class CompetenciasListModule {
}
