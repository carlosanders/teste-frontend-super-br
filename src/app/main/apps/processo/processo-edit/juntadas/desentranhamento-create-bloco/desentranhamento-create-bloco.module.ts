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
    MatProgressSpinnerModule, MatTooltipModule, MatListModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {DesentranhamentoCreateBlocoComponent} from './desentranhamento-create-bloco.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkDesentranhamentoFormModule} from '@cdk/components/desentranhamento/cdk-desentranhamento-form/cdk-desentranhamento-form.module';
import {DesentranhamentoCreateBlocoStoreModule} from './store/store.module';
import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';

const routes: Routes = [
    {
        path: '',
        component: DesentranhamentoCreateBlocoComponent
    }
];

@NgModule({
    declarations: [
        DesentranhamentoCreateBlocoComponent
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

        CdkDesentranhamentoFormModule,

        DesentranhamentoCreateBlocoStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        DesentranhamentoService
    ]
})
export class DesentranhamentoCreateBlocoModule {
}
