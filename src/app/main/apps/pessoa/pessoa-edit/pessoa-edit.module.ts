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
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {PessoaEditComponent} from './pessoa-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkPessoaFormModule} from '@cdk/components/pessoa/cdk-pessoa-form/cdk-pessoa-form.module';
import {PessoaEditStoreModule} from './store/store.module';
import {PessoaService} from '@cdk/services/pessoa.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':pessoaHandle',
        component: PessoaEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        PessoaEditComponent
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

        PessoaEditStoreModule,

        TranslateModule,

        FuseSharedModule
    ],
    providers: [
        PessoaService,
        fromGuards.ResolveGuard
    ]
})
export class PessoaEditModule {
}
