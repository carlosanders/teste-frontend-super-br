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
import {NumeroUnicoDocumentoListComponent} from './numero-unico-documento-list.component';
import {RouterModule, Routes} from '@angular/router';
import {NumeroUnicoDocumentoListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {CdkNumeroUnicoDocumentoGridModule} from '@cdk/components/numero-unico-documento/cdk-numero-unico-documento-grid/cdk-numero-unico-documento-grid.module';
import {NumeroUnicoDocumentoService} from '@cdk/services/numero-unico-documento.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

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
        PathModule,
    ],
    providers: [
        NumeroUnicoDocumentoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        NumeroUnicoDocumentoListComponent
    ]
})
export class NumeroUnicoDocumentoListModule {
}
