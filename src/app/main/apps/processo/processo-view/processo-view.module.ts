import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {ProcessoViewComponent} from './processo-view.component';
import {JuntadaService} from '@cdk/services/juntada.service';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {ProcessoViewMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {ProcessoViewStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CdkTipoDocumentoAutocompleteModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';

const routes: Routes = [
    {
        path: '',
        component: ProcessoViewComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        ProcessoViewComponent,
        ProcessoViewMainSidebarComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatInputModule,

        InfiniteScrollModule,

        CdkTipoDocumentoAutocompleteModule,

        TranslateModule,

        ProcessoViewStoreModule,

        FuseSharedModule,
        FuseSidebarModule
    ],
    providers: [
        JuntadaService,
        ComponenteDigitalService,
        fromGuards.ResolveGuard
    ]
})
export class ProcessoViewModule {
}
