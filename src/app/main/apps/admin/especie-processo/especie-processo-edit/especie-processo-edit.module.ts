import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EspecieProcessoEditComponent} from './especie-processo-edit.component';
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
import {EspecieProcessoEditStoreModule} from './store/store.module';
import {EspecieProcessoService} from '@cdk/services/especie-processo.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {CdkEspecieProcessoFormModule} from '@cdk/components/especie-processo/cdk-especie-processo-form/cdk-especie-processo-form.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':especieProcessoHandle',
        component: EspecieProcessoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/especie-processo/especie-processo-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [EspecieProcessoEditComponent],
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
        EspecieProcessoEditStoreModule,
        CdkEspecieProcessoFormModule,
        PathModule

    ],
    providers: [
        ResolveGuard,
        EspecieProcessoService,
        ColaboradorService
    ]
})
export class EspecieProcessoEditModule {
}
