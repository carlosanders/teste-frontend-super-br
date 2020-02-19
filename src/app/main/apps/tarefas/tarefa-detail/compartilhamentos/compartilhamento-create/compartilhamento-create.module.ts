import {NgModule} from '@angular/core';
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
    MatProgressSpinnerModule, MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {CompartilhamentoCreateComponent} from './compartilhamento-create.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkCompartilhamentoFormModule} from '@cdk/components/compartilhamento/cdk-compartilhamento-form/cdk-compartilhamento-form.module';
import {CompartilhamentoCreateStoreModule} from './store/store.module';
import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {LoginService} from 'app/main/auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: CompartilhamentoCreateComponent
    }
];

@NgModule({
    declarations: [
        CompartilhamentoCreateComponent
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

        CdkCompartilhamentoFormModule,

        CompartilhamentoCreateStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        CompartilhamentoService,
        LoginService,
    ]
})
export class CompartilhamentoCreateModule {
}
