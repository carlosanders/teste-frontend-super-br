import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EspecieAtividadeEditComponent} from './especie-atividade-edit.component';
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
import {EspecieAtividadeEditStoreModule} from './store/store.module';
import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {CdkEspecieAtividadeFormModule} from '@cdk/components/especie-atividade/cdk-especie-atividade-form/cdk-especie-atividade-form.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':especieAtividadeHandle',
        component: EspecieAtividadeEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/especie-atividade/especie-atividade-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [EspecieAtividadeEditComponent],
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
        EspecieAtividadeEditStoreModule,
        CdkEspecieAtividadeFormModule,
        PathModule

    ],
    providers: [
        ResolveGuard,
        EspecieAtividadeService,
        ColaboradorService
    ]
})
export class EspecieAtividadeEditModule {
}
