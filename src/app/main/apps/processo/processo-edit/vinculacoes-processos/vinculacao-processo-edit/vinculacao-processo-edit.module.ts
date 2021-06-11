import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
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

import {VinculacaoProcessoEditComponent} from './vinculacao-processo-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkVinculacaoProcessoFormModule} from '@cdk/components/vinculacao-processo/cdk-vinculacao-processo-form/cdk-vinculacao-processo-form.module';
import {VinculacaoProcessoEditStoreModule} from './store/store.module';
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';

import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: ':vinculacaoProcessoHandle',
        component: VinculacaoProcessoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/vinculacoes-processos/vinculacao-processo-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        VinculacaoProcessoEditComponent
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

        CdkVinculacaoProcessoFormModule,

        VinculacaoProcessoEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        VinculacaoProcessoService,
        fromGuards.ResolveGuard
    ]
})
export class VinculacaoProcessoEditModule {
}
