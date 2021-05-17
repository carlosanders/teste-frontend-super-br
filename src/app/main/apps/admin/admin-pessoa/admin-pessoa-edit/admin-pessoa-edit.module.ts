import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminPessoaEditComponent} from './admin-pessoa-edit.component';
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
import {PessoaEditStoreModule} from './store/store.module';
import {PessoaService} from '@cdk/services/pessoa.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {CdkPessoaFormModule} from '@cdk/components/pessoa/cdk-pessoa-form/cdk-pessoa-form.module';
import {modulesConfig} from 'modules/modules-config';
import {CdkAdminPessoaFormModule} from '@cdk/components/pessoa/cdk-admin-pessoa-form/cdk-admin-pessoa-form.module';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':pessoaHandle',
        component: AdminPessoaEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/admin-pessoa/admin-pessoa-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [AdminPessoaEditComponent],
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
        PessoaEditStoreModule,
        CdkPessoaFormModule,
        CdkPessoaFormModule,
        CdkAdminPessoaFormModule,
        PathModule

    ],
    providers: [
        ResolveGuard,
        PessoaService,
        ColaboradorService
    ]
})
export class AdminPessoaEditModule {
}
