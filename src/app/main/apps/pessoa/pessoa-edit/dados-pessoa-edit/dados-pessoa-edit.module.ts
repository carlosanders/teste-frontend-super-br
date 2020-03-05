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

import {DadosPessoaEditComponent} from './dados-pessoa-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkPessoaFormModule} from '@cdk/components/pessoa/cdk-pessoa-form/cdk-pessoa-form.module';
import {DadosPessoaEditStoreModule} from './store/store.module';
import {PessoaService} from '@cdk/services/pessoa.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: '',
        component: DadosPessoaEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        DadosPessoaEditComponent
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

        CdkPessoaFormModule,

        DadosPessoaEditStoreModule,

        TranslateModule,

        CdkSharedModule
    ],
    providers: [
        PessoaService,
        fromGuards.ResolveGuard
    ]
})
export class DadosPessoaEditModule {
}
