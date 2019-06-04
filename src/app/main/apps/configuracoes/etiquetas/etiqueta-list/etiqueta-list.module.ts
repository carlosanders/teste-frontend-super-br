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
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {EtiquetaListComponent} from './etiqueta-list.component';
import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {RouterModule, Routes} from '@angular/router';
import {EtiquetaListStoreModule} from './store/store.module';
import {ModalidadeEtiquetaService} from '@cdk/services/modalidade-etiqueta.service';
import * as fromGuards from './store/guards';
import {CdkEtiquetaGridModule} from '@cdk/components/etiqueta/cdk-etiqueta-grid/cdk-etiqueta-grid.module';
import {LoginService} from '../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: EtiquetaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

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

        FuseSharedModule,

        CdkEtiquetaGridModule,

        EtiquetaListStoreModule,
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
