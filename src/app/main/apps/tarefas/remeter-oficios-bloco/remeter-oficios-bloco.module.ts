import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {CdkSidebarModule} from '@cdk/components';
import {
    CdkOficiosCardListModule
} from '@cdk/components/documento-avulso/cdk-oficios-card-list/cdk-oficios-card-list.module';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {CdkSharedModule} from '@cdk/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import * as fromGuard from 'app/main/apps/tarefas/remeter-oficios-bloco/store/guards';
import {modulesConfig} from 'modules/modules-config';

import {RemeterOficiosBlocoComponent} from './remeter-oficios-bloco.component';
import {RemeterOficiosBlocoStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: RemeterOficiosBlocoComponent,
        canActivate: [fromGuard.ResolveGuard],
        children: [
            {
                path       : 'documento',
                loadChildren: () => import('app/main/apps/documento/documento.module').then(m => m.DocumentoModule),
            }
        ],
    }
];

const path = 'app/main/apps/tarefas/remeter-oficios-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RemeterOficiosBlocoComponent
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
        RemeterOficiosBlocoStoreModule,
        TranslateModule,
        CdkSharedModule,
        CdkSidebarModule,
        CdkOficiosCardListModule,
    ],
    providers: [
        DocumentoAvulsoService,
        fromGuard.ResolveGuard
    ]
})
export class RemeterOficiosBlocoModule {
}
