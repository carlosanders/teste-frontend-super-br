import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TipoAcaoWorkflowEditComponent} from './tipo-acao-workflow-edit.component';
import {RouterModule, Routes} from '@angular/router';
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
import {MatStepperModule} from '@angular/material/stepper';
import * as fromGuards from './store/guards';
import {ResolveGuard} from './store/guards';
import {TipoAcaoWorkflowEditStoreModule} from './store/store.module';
import {TipoAcaoWorkflowService} from '@cdk/services/tipo-acao-workflow.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {CdkTipoAcaoWorkflowFormModule} from '@cdk/components/tipo-acao-workflow/cdk-tipo-acao-workflow-form/cdk-tipo-acao-workflow-form.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':tipoAcaoWorkflowHandle',
        component: TipoAcaoWorkflowEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/tipo-acao-workflow/tipo-acao-workflow-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [TipoAcaoWorkflowEditComponent],
    imports: [
        CommonModule,
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


        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatStepperModule,
        TipoAcaoWorkflowEditStoreModule,
        CdkTipoAcaoWorkflowFormModule,
        PathModule

    ],
    providers: [
        ResolveGuard,
        TipoAcaoWorkflowService,
        ColaboradorService
    ]
})
export class TipoAcaoWorkflowEditModule {
}
