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
import {EtiquetaListComponent} from './etiqueta-list.component';
import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {RouterModule, Routes} from '@angular/router';
import {EtiquetaListStoreModule} from './store/store.module';
import {ModalidadeEtiquetaService} from '@cdk/services/modalidade-etiqueta.service';
import * as fromGuards from './store/guards';
import {CdkEtiquetaGridModule} from '@cdk/components/etiqueta/cdk-etiqueta-grid/cdk-etiqueta-grid.module';
import {LoginService} from '../../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: EtiquetaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/configuracoes/etiquetas/etiqueta-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        EtiquetaListComponent
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

        CdkEtiquetaGridModule,

        EtiquetaListStoreModule,
        PathModule,
    ],
    providers: [
        EtiquetaService,
        ModalidadeEtiquetaService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        EtiquetaListComponent
    ]
})
export class EtiquetaListModule {
}
