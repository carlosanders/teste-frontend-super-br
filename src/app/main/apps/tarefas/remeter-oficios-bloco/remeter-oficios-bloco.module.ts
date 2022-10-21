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
    CdkDocumentoAvulsoGridModule
} from '@cdk/components/documento-avulso/cdk-documento-avulso-grid/cdk-documento-avulso-grid.module';
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
        canActivate: [fromGuard.ResolveGuard]
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
        CdkDocumentoAvulsoGridModule,
    ],
    providers: [
        DocumentoAvulsoService,
        fromGuard.ResolveGuard
    ]
})
export class RemeterOficiosBlocoModule {
}
