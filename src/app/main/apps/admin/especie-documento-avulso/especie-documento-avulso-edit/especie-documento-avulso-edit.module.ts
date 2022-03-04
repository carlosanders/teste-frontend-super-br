import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EspecieDocumentoAvulsoEditComponent} from './especie-documento-avulso-edit.component';
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
import {EspecieDocumentoAvulsoEditStoreModule} from './store/store.module';
import {EspecieDocumentoAvulsoService} from '@cdk/services/especie-documento-avulso.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {CdkEspecieDocumentoAvulsoFormModule} from '@cdk/components/especie-documento-avulso/cdk-especie-documento-avulso-form/cdk-especie-documento-avulso-form.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':especieDocumentoAvulsoHandle',
        component: EspecieDocumentoAvulsoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/especie-documento-avulso/especie-documento-avulso-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [EspecieDocumentoAvulsoEditComponent],
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
        EspecieDocumentoAvulsoEditStoreModule,
        CdkEspecieDocumentoAvulsoFormModule,
        PathModule

    ],
    providers: [
        ResolveGuard,
        EspecieDocumentoAvulsoService,
        ColaboradorService
    ]
})
export class EspecieDocumentoAvulsoEditModule {
}
