import { NgModule } from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule, MatTooltipModule, MatListModule
} from '@cdk/angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkSidebarModule } from '@cdk/components';

import { ResponderComplementarCreateBlocoComponent } from './responder-complementar-create-bloco.component';
import { RouterModule, Routes } from '@angular/router';
import { AtividadeService } from '@cdk/services/atividade.service';
import { LoginService } from 'app/main/auth/login/login.service';
import { CdkComponenteDigitalCardListModule } from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';

const routes: Routes = [
    {
        path: '',
        component: ResponderComplementarCreateBlocoComponent
    }
];

@NgModule({
    declarations: [
        ResponderComplementarCreateBlocoComponent
    ],
    imports: [

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
        MatListModule,

        CdkComponenteDigitalCardListModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        AtividadeService,
        LoginService,
    ]
})
export class ResponderComplementarCreateBlocoModule {
}