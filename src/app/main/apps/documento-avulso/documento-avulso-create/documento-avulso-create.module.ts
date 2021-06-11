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

import {DocumentoAvulsoCreateComponent} from './documento-avulso-create.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkDocumentoAvulsoFormModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-form/cdk-documento-avulso-form.module';
import {DocumentoAvulsoCreateStoreModule} from './store/store.module';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import * as fromGuards from './store/guards';
import {DocumentoService} from '@cdk/services/documento.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: DocumentoAvulsoCreateComponent,
        children: [
            {
                path       : 'pessoa',
                loadChildren: () => import('app/main/apps/pessoa/pessoa.module').then(m => m.PessoaModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/documento-avulso/documento-avulso-create';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoAvulsoCreateComponent
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

        CdkDocumentoAvulsoFormModule,

        DocumentoAvulsoCreateStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        DocumentoAvulsoService,
        DocumentoService,
        fromGuards.ResolveGuard
    ]
})
export class DocumentoAvulsoCreateModule {
}
