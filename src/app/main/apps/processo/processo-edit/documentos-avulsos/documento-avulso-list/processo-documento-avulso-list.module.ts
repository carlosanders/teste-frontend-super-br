import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {DocumentoAvulsoListComponent} from './documento-avulso-list.component';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {RouterModule, Routes} from '@angular/router';
import {DocumentoAvulsoListStoreModule} from 'app/main/apps/processo/processo-edit/documentos-avulsos/documento-avulso-list/store/store.module';
import {EspecieDocumentoAvulsoService} from '@cdk/services/especie-documento-avulso.service';
import * as fromGuards
    from 'app/main/apps/processo/processo-edit/documentos-avulsos/documento-avulso-list/store/guards';
import {CdkDocumentoAvulsoGridModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-grid/cdk-documento-avulso-grid.module';
import {modulesConfig} from 'modules/modules-config';
import {
    CdkComponenteDigitalCardListModule
} from "../../../../../../../@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module";

const routes: Routes = [
    {
        path: '',
        component: DocumentoAvulsoListComponent,
        children: [
            {
                path: 'documento',
                loadChildren: () => import('app/main/apps/documento/documento.module').then(m => m.DocumentoModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/documentos-avulsos/documento-avulso-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoAvulsoListComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        TranslateModule,

        CdkSharedModule,

        CdkDocumentoAvulsoGridModule,

        DocumentoAvulsoListStoreModule,
        CdkComponenteDigitalCardListModule,
    ],
    providers: [
        DocumentoAvulsoService,
        EspecieDocumentoAvulsoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        DocumentoAvulsoListComponent
    ]
})
export class ProcessoDocumentoAvulsoListModule {
}
