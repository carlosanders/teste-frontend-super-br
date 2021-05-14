import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalidadeOrgaoCentralEditComponent} from './modalidade-orgao-central-edit.component';
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
import {ModalidadeOrgaoCentralEditStoreModule} from './store/store.module';
import {ModalidadeOrgaoCentralService} from '@cdk/services/modalidade-orgao-central.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {CdkModalidadeOrgaoCentralFormModule} from '@cdk/components/modalidade-orgao-central/cdk-modalidade-orgao-central-form/cdk-modalidade-orgao-central-form.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':modalidadeOrgaoCentralHandle',
        component: ModalidadeOrgaoCentralEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/modalidade-orgao-central/modalidade-orgao-central-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [ModalidadeOrgaoCentralEditComponent],
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
        ModalidadeOrgaoCentralEditStoreModule,
        CdkModalidadeOrgaoCentralFormModule,
        PathModule

    ],
    providers: [
        ResolveGuard,
        ModalidadeOrgaoCentralService,
        ColaboradorService
    ]
})
export class ModalidadeOrgaoCentralEditModule {
}
