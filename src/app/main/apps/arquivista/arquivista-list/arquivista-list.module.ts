import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {ArquivistaListComponent} from './arquivista-list.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule, MatProgressSpinnerModule} from '@cdk/angular/material';
import {CdkProcessoListModule} from '@cdk/components/processo/cdk-processo-list/cdk-processo-list.module';
import * as fromGuards from './store/guards';
import {ArquivistaStoreModule} from './store/store.module';
import {ProcessoService} from '@cdk/services/processo.service';
import {ResizableModule} from 'angular-resizable-element';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';


const routes: Routes = [
    {
        path: '',
        component: ArquivistaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [
        ArquivistaListComponent
    ],
    imports: [

        RouterModule.forChild(routes),
        ResizableModule,
        MatIconModule,
        ArquivistaStoreModule,
        TranslateModule,
        CdkProcessoListModule,
        FuseSharedModule,
        FuseSidebarModule,
        MatProgressSpinnerModule,
        InfiniteScrollModule,
    ],
    providers: [
        fromGuards.ResolveGuard,

    ]
})
export class ArquivistaListModule {
}
