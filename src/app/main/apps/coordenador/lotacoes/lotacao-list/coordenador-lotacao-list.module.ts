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
import {CoordenadorLotacaoListComponent} from './coordenador-lotacao-list.component';
import {LotacaoService} from '@cdk/services/lotacao.service';
import {RouterModule, Routes} from '@angular/router';
import {LotacaoListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkLotacaoGridModule} from '@cdk/components/lotacao/cdk-lotacao-grid/cdk-lotacao-grid.module';
import {LoginService} from '../../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '../../../../../../@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: CoordenadorLotacaoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/coordenador/lotacoes/lotacao-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        CoordenadorLotacaoListComponent
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

        CdkLotacaoGridModule,

        LotacaoListStoreModule,
        PathModule,
    ],
    providers: [
        LotacaoService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        CoordenadorLotacaoListComponent
    ]
})
export class CoordenadorLotacaoListModule {
}
