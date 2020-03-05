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

import {FuseSharedModule} from '@fuse/shared.module';
import {NumeroUnicoDocumentoListComponent} from './numero-unico-documento-list.component';
import {RouterModule, Routes} from '@angular/router';
import {NumeroUnicoDocumentoListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {CdkNumeroUnicoDocumentoGridModule} from '@cdk/components/numero-unico-documento/cdk-numero-unico-documento-grid/cdk-numero-unico-documento-grid.module';
import {NumeroUnicoDocumentoService} from '@cdk/services/numero-unico-documento.service';

const routes: Routes = [
    {
        path: '',
        component: NumeroUnicoDocumentoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

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

        FuseSharedModule,

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
