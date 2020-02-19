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
import {AcaoListComponent} from './acao-list.component';
import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {RouterModule, Routes} from '@angular/router';
import {AcaoListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkAcaoListModule} from '@cdk/components/acao/cdk-acao-list/cdk-acao-list.module';
import {AcaoService} from '../../../../../../../../@cdk/services/acao.service';

const routes: Routes = [
    {
        path: '',
        component: AcaoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        AcaoListComponent
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

        CdkAcaoListModule,

        AcaoListStoreModule,
    ],
    providers: [
        EtiquetaService,
        AcaoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        AcaoListComponent
    ]
})
export class AcaoListModule {
}
