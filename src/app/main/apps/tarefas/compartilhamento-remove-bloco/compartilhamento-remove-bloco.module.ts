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
    CdkCompartilhamentoFormModule
} from '@cdk/components/compartilhamento/cdk-compartilhamento-form/cdk-compartilhamento-form.module';
import {
    CdkCompartilhamentoGridModule
} from '@cdk/components/compartilhamento/cdk-compartilhamento-grid/cdk-compartilhamento-grid.module';
import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';

import {CdkSharedModule} from '@cdk/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import * as fromGuard from 'app/main/apps/tarefas/compartilhamento-remove-bloco/store/guards';
import {modulesConfig} from 'modules/modules-config';

import {CompartilhamentoRemoveBlocoComponent} from './compartilhamento-remove-bloco.component';
import {CompartilhamentoRemoveBlocoStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: CompartilhamentoRemoveBlocoComponent,
        canActivate: [fromGuard.ResolveGuard]
    }
];

const path = 'app/main/apps/tarefas/compartilhamento-remove-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        CompartilhamentoRemoveBlocoComponent
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

        CdkCompartilhamentoFormModule,

        CompartilhamentoRemoveBlocoStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkCompartilhamentoGridModule,
    ],
    providers: [
        CompartilhamentoService,
        fromGuard.ResolveGuard
    ]
})
export class CompartilhamentoRemoveBlocoModule {
}
