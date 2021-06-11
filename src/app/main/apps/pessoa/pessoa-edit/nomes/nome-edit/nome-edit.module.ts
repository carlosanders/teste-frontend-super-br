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

import {NomeEditComponent} from './nome-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkNomeFormModule} from '@cdk/components/nome/cdk-nome-form/cdk-nome-form.module';
import {NomeEditStoreModule} from './store/store.module';
import {NomeService} from '@cdk/services/nome.service';

import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: ':nomeHandle',
        component: NomeEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/pessoa/pessoa-edit/nomes/nome-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        NomeEditComponent
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

        CdkNomeFormModule,

        NomeEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        NomeService,
        fromGuards.ResolveGuard
    ]
})
export class NomeEditModule {
}
