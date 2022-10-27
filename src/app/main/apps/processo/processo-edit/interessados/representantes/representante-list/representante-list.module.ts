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
import {RepresentanteListComponent} from './representante-list.component';
import {RepresentanteService} from '@cdk/services/representante.service';
import {RouterModule, Routes} from '@angular/router';
import {RepresentanteListStoreModule} from 'app/main/apps/processo/processo-edit/interessados/representantes/representante-list/store/store.module';
import {ModalidadeRepresentanteService} from '@cdk/services/modalidade-representante.service';
import * as fromGuards from 'app/main/apps/processo/processo-edit/interessados/representantes/representante-list/store/guards';
import {CdkRepresentanteGridModule} from '@cdk/components/representante/cdk-representante-grid/cdk-representante-grid.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: RepresentanteListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/interessados/representantes/representante-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RepresentanteListComponent
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

        CdkRepresentanteGridModule,

        RepresentanteListStoreModule,
    ],
    providers: [
        RepresentanteService,
        ModalidadeRepresentanteService,
        fromGuards.ResolveGuard
    ],
    exports: [
        RepresentanteListComponent
    ]
})
export class RepresentanteListModule {
}
