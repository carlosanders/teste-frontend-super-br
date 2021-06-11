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
import {InteressadoListComponent} from './interessado-list.component';
import {InteressadoService} from '@cdk/services/interessado.service';
import {RouterModule, Routes} from '@angular/router';
import {InteressadoListStoreModule} from 'app/main/apps/processo/processo-edit/interessados/interessado-list/store/store.module';
import {ModalidadeInteressadoService} from '@cdk/services/modalidade-interessado.service';
import * as fromGuards from 'app/main/apps/processo/processo-edit/interessados/interessado-list/store/guards';
import {CdkInteressadoGridModule} from '@cdk/components/interessado/cdk-interessado-grid/cdk-interessado-grid.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: InteressadoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/interessados/interessado-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        InteressadoListComponent
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

        CdkInteressadoGridModule,

        InteressadoListStoreModule,
    ],
    providers: [
        InteressadoService,
        ModalidadeInteressadoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        InteressadoListComponent
    ]
})
export class InteressadoListModule {
}
