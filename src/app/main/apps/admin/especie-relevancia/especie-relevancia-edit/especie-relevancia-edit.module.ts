import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EspecieRelevanciaEditComponent} from './especie-relevancia-edit.component';
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
import {EspecieRelevanciaEditStoreModule} from './store/store.module';
import {EspecieRelevanciaService} from '@cdk/services/especie-relevancia.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {CdkEspecieRelevanciaFormModule} from '@cdk/components/especie-relevancia/cdk-especie-relevancia-form/cdk-especie-relevancia-form.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':especieRelevanciaHandle',
        component: EspecieRelevanciaEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/especie-relevancia/especie-relevancia-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [EspecieRelevanciaEditComponent],
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
        EspecieRelevanciaEditStoreModule,
        CdkEspecieRelevanciaFormModule,
        PathModule

    ],
    providers: [
        ResolveGuard,
        EspecieRelevanciaService,
        ColaboradorService
    ]
})
export class EspecieRelevanciaEditModule {
}
