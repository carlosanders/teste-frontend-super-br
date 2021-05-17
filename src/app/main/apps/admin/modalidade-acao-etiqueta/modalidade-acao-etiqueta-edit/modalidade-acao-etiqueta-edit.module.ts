import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalidadeAcaoEtiquetaEditComponent} from './modalidade-acao-etiqueta-edit.component';
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
import {ModalidadeAcaoEtiquetaEditStoreModule} from './store/store.module';
import {ModalidadeAcaoEtiquetaService} from '@cdk/services/modalidade-acao-etiqueta.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {CdkModalidadeAcaoEtiquetaFormModule} from '@cdk/components/modalidade-acao-etiqueta/cdk-modalidade-acao-etiqueta-form/cdk-modalidade-acao-etiqueta-form.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':modalidadeAcaoEtiquetaHandle',
        component: ModalidadeAcaoEtiquetaEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/modalidade-acao-etiqueta/modalidade-acao-etiqueta-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [ModalidadeAcaoEtiquetaEditComponent],
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
        ModalidadeAcaoEtiquetaEditStoreModule,
        CdkModalidadeAcaoEtiquetaFormModule,
        PathModule

    ],
    providers: [
        ResolveGuard,
        ModalidadeAcaoEtiquetaService,
        ColaboradorService
    ]
})
export class ModalidadeAcaoEtiquetaEditModule {
}
