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
import {DocumentoIdentificadorListComponent} from './documento-identificador-list.component';
import {DocumentoIdentificadorService} from '@cdk/services/documento-identificador.service';
import {RouterModule, Routes} from '@angular/router';
import {DocumentoIdentificadorListStoreModule} from 'app/main/apps/pessoa/pessoa-edit/documento-identificador/documento-identificador-list/store/store.module';
import * as fromGuards
    from 'app/main/apps/pessoa/pessoa-edit/documento-identificador/documento-identificador-list/store/guards';
import {CdkDocumentoIdentificadorGridModule} from '@cdk/components/documento-identificador/cdk-documento-identificador-grid/cdk-documento-identificador-grid.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: DocumentoIdentificadorListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/pessoa/pessoa-edit/documento-identificador/documento-identificador-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoIdentificadorListComponent
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

        CdkDocumentoIdentificadorGridModule,

        DocumentoIdentificadorListStoreModule,
    ],
    providers: [
        DocumentoIdentificadorService,
        fromGuards.ResolveGuard
    ],
    exports: [
        DocumentoIdentificadorListComponent
    ]
})
export class DocumentoIdentificadorListModule {
}
