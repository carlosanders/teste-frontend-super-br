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
import {NumeroUnicoDocumentoListComponent} from './numero-unico-documento-list.component';
import {RouterModule, Routes} from '@angular/router';
import {NumeroUnicoDocumentoListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {CdkNumeroUnicoDocumentoGridModule} from '@cdk/components/numero-unico-documento/cdk-numero-unico-documento-grid/cdk-numero-unico-documento-grid.module';
import {NumeroUnicoDocumentoService} from '@cdk/services/numero-unico-documento.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: NumeroUnicoDocumentoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/coordenador/numero-unico-documento/numero-unico-documento-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        NumeroUnicoDocumentoListComponent
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

        NumeroUnicoDocumentoListStoreModule,
        CdkNumeroUnicoDocumentoGridModule,
    ],
    providers: [
        NumeroUnicoDocumentoService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        NumeroUnicoDocumentoListComponent
    ]
})
export class NumeroUnicoDocumentoListModule {
}
