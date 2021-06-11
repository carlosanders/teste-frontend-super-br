import {NgModule} from '@angular/core';
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

import {DadosPessoaEditComponent} from './dados-pessoa-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkPessoaFormModule} from '@cdk/components/pessoa/cdk-pessoa-form/cdk-pessoa-form.module';
import {DadosPessoaEditStoreModule} from './store/store.module';
import {PessoaService} from '@cdk/services/pessoa.service';

import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: DadosPessoaEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/pessoa/pessoa-edit/dados-pessoa-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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
