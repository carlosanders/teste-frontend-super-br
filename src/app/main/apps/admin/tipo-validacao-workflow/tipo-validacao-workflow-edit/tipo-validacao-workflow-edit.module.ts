import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TipoValidacaoWorkflowEditComponent} from './tipo-validacao-workflow-edit.component';
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
import {TipoValidacaoWorkflowEditStoreModule} from './store/store.module';
import {TipoValidacaoWorkflowService} from '@cdk/services/tipo-validacao-workflow.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {CdkTipoValidacaoWorkflowFormModule} from '@cdk/components/tipo-validacao-workflow/cdk-tipo-validacao-workflow-form/cdk-tipo-validacao-workflow-form.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':tipoValidacaoWorkflowHandle',
        component: TipoValidacaoWorkflowEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/tipo-validacao-workflow/tipo-validacao-workflow-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [TipoValidacaoWorkflowEditComponent],
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
        TipoValidacaoWorkflowEditStoreModule,
        CdkTipoValidacaoWorkflowFormModule,
        PathModule

    ],
    providers: [
        ResolveGuard,
        TipoValidacaoWorkflowService,
        ColaboradorService
    ]
})
export class TipoValidacaoWorkflowEditModule {
}
