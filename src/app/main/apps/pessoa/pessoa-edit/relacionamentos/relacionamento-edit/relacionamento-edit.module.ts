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
import {CdkSidebarModule} from '@cdk/components';

import {RelacionamentoEditComponent} from './relacionamento-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkRelacionamentoPessoalFormModule} from '@cdk/components/relacionamento-pessoal/cdk-relacionamento-pessoal-form/cdk-relacionamento-pessoal-form.module';
import {RelacionamentoEditStoreModule} from './store/store.module';
import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';

import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: ':relacionamentoHandle',
        component: RelacionamentoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/pessoa/pessoa-edit/relacionamentos/relacionamento-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RelacionamentoEditComponent
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

        CdkRelacionamentoPessoalFormModule,

        RelacionamentoEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        RelacionamentoPessoalService,
        fromGuards.ResolveGuard
    ]
})
export class RelacionamentoEditModule {
}
