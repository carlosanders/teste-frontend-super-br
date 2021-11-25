import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {MinutasComponent} from './minutas.component';
import {RouterModule, Routes} from '@angular/router';

import {MinutasStoreModule} from './store/store.module';

import {DocumentoService} from '@cdk/services/documento.service';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {MatCardModule} from '@angular/material/card';
import {PipesModule} from '@cdk/pipes/pipes.module';
import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';
import {CdkMinutasCardListModule} from '@cdk/components/documento/cdk-minutas-card-list/cdk-minutas-card-list.module';

const routes: Routes = [
    {
        path: '',
        component: MinutasComponent,
        children: [
            {
                path       : 'documento',
                loadChildren: () => import('app/main/apps/documento/documento.module').then(m => m.DocumentoModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/tarefas/minutas';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        MinutasComponent
    ],
    imports: [

        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatListModule,
        MatCardModule,

        MinutasStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkDocumentoCardListModule,
        PipesModule,
        CdkMinutasCardListModule
    ],
    providers: [
        DocumentoService,
        fromGuards.ResolveGuard
    ]
})
export class MinutasModule {
}
