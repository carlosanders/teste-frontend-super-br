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

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {SegurancaComponent} from './seguranca.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkSegurancaFormModule} from '@cdk/components/usuario/cdk-seguranca-form/cdk-seguranca-form.module';
import {SegurancaStoreModule} from './store/store.module';
import {LoginService} from '../../../auth/login/login.service';


const routes: Routes = [
    {
        path: '',
        component: SegurancaComponent,
    }
];

@NgModule({
    declarations: [
        SegurancaComponent
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

        CdkSegurancaFormModule,

        SegurancaStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        LoginService
    ]
})
export class SegurancaModule {
}
