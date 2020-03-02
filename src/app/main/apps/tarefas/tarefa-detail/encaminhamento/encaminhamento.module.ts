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
    MatProgressSpinnerModule, MatTooltipModule, MatRadioModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {EncaminhamentoComponent} from './encaminhamento.component';
import {RouterModule, Routes} from '@angular/router';
import {EncaminhamentoStoreModule} from './store/store.module';
import {CdkEncaminhamentoFormModule} from '@cdk/components/tarefa/cdk-encaminhamento-form/cdk-encaminhamento-form.module';

const routes: Routes = [
    {
        path: '',
        component: EncaminhamentoComponent
    }
];

@NgModule({
    declarations: [
        EncaminhamentoComponent
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

        CdkEncaminhamentoFormModule,

        TranslateModule,

        EncaminhamentoStoreModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
    ]
})
export class EncaminhamentoModule {
}
