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

import {ProcessoViewVinculacaoDocumentoStoreModule} from './store/store.module';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import {VinculacaoDocumentoComponent} from './vinculacao-documento.component';

import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';
import {CdkVinculacaoDocumentoFormModule} from '@cdk/components/vinculacao-documento/cdk-vinculacao-documento-form/cdk-vinculacao-documento-form.module';
import {CdkSidebarModule} from '@cdk/components';

const routes: Routes = [
    {
        path: ':juntadaHandle',
        component: VinculacaoDocumentoComponent,
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path: ':juntadaHandle/:juntadaVinculadaHandle',
        component: VinculacaoDocumentoComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-view/vinculacao-documento';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        VinculacaoDocumentoComponent
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

        ProcessoViewVinculacaoDocumentoStoreModule,
        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        VinculacaoDocumentoService,
        fromGuards.ResolveGuard
    ]
})
export class VinculacaoDocumentoModule {
}
