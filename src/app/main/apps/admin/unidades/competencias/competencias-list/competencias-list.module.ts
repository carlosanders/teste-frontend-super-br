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
import {CompetenciasListComponent} from './competencias-list.component';
import {VinculacaoSetorMunicipioService} from '@cdk/services/vinculacao-setor-municipio.service';
import {RouterModule, Routes} from '@angular/router';
import {CompetenciasListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkVinculacaoSetorMunicipioGridModule} from '@cdk/components/vinculacao-setor-municipio/cdk-vinculacao-setor-municipio-grid/cdk-vinculacao-setor-municipio-grid.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: CompetenciasListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/unidades/competencias/competencias-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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
        CdkVinculacaoSetorMunicipioGridModule,
        PathModule
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
