import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {ArquivistaOperacoesBlocoComponent} from './arquivista-operacoes-bloco.component';
import {RouterModule, Routes} from '@angular/router';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkProcessoGridModule} from "../../../../../@cdk/components/processo/cdk-processo-grid/cdk-processo-grid.module";

const routes: Routes = [
    {
        path: '',
        component: ArquivistaOperacoesBlocoComponent
    }
];

@NgModule({
    declarations: [
        ArquivistaOperacoesBlocoComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatTooltipModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkProcessoGridModule
    ],
    providers: [
        ProcessoService
    ]
})
export class ArquivistaOperacoesBlocoModule {
}
