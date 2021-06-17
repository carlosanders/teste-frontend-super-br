import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssuntoAdministrativoEditComponent} from './assunto-administrativo-edit.component';
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
import {AssuntoAdministrativoEditStoreModule} from './store/store.module';
import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {CdkAssuntoAdministrativoFormModule} from '@cdk/components/assunto-administrativo/cdk-assunto-administrativo-form/cdk-assunto-administrativo-form.module';
import {PathModule} from '@cdk/components/path/path.module';


const routes: Routes = [
    {
        path: ':assuntoAdministrativoHandle',
        component: AssuntoAdministrativoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [AssuntoAdministrativoEditComponent],
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
        AssuntoAdministrativoEditStoreModule,
        CdkAssuntoAdministrativoFormModule,
        PathModule

    ],
    providers: [
        fromGuards.ResolveGuard,
        AssuntoAdministrativoService,
        ColaboradorService
    ]
})
export class AssuntoAdministrativoEditModule {
}
