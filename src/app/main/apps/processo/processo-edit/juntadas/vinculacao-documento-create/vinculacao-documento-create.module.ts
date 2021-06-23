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
import {RouterModule, Routes} from '@angular/router';

import {VinculacaoDocumentoCreateStoreModule} from './store/store.module';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import {VinculacaoDocumentoCreateComponent} from './vinculacao-documento-create.component';

import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';
import {CdkVinculacaoDocumentoFormModule} from '@cdk/components/vinculacao-documento/cdk-vinculacao-documento-form/cdk-vinculacao-documento-form.module';
import {CdkSidebarModule} from '@cdk/components';

const routes: Routes = [
    {
        path: ':juntadaHandle',
        component: VinculacaoDocumentoCreateComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/juntadas/juntada-list/vinculacao-documento-create';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        VinculacaoDocumentoCreateComponent
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

        CdkVinculacaoDocumentoFormModule,

        VinculacaoDocumentoCreateStoreModule,
        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        VinculacaoDocumentoService,
        fromGuards.ResolveGuard
    ]
})
export class VinculacaoDocumentoCreateModule {
}
