import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatRippleModule, MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {ProcessoViewComponent} from './processo-view.component';
import {JuntadaService} from '@cdk/services/juntada.service';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {ProcessoViewMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {ProcessoViewStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CdkTipoDocumentoAutocompleteModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {CdkVolumeAutocompleteModule} from '@cdk/components/volume/cdk-volume-autocomplete/cdk-volume-autocomplete.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: ProcessoViewComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path       : 'capa',
                loadChildren: () => import('../processo-capa/processo-capa.module').then(m => m.ProcessoCapaModule)
            }
        ]
    }
];

const path = 'app/main/apps/processo/processo-view';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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
        MatTooltipModule,

        InfiniteScrollModule,

        CdkTipoDocumentoAutocompleteModule,

        TranslateModule,

        ProcessoViewStoreModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatRippleModule,
        CdkVolumeAutocompleteModule
    ],
    providers: [
        JuntadaService,
        ComponenteDigitalService,
        fromGuards.ResolveGuard
    ]
})
export class ProcessoViewModule {
}
