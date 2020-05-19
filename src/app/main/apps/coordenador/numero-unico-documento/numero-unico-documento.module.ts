import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';

import * as fromGuards from './store/guards';
import {NumeroUnicoDocumentoComponent} from './numero-unico-documento.component';
import {RouterModule, Routes} from '@angular/router';
import {SetorService} from '@cdk/services/setor.service';
import {NumeroUnicoDocumentoService} from '@cdk/services/numero-unico-documento.service';
import {NumeroUnicoDocumentoStoreModule} from "./store/store.module";

const routes: Routes = [
    {
        path: '',
        component: NumeroUnicoDocumentoComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./numero-unico-documento-list/numero-unico-documento-list.module').then(m => m.NumeroUnicoDocumentoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./numero-unico-documento-edit/numero-unico-documento-edit.module').then(m => m.NumeroUnicoDocumentoEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }

];

@NgModule({
    declarations: [
        NumeroUnicoDocumentoComponent
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

        NumeroUnicoDocumentoStoreModule
    ],
    providers: [
        NumeroUnicoDocumentoService,
        SetorService,
        fromGuards.ResolveGuard
    ],
    exports: [
        NumeroUnicoDocumentoComponent
    ]
})
export class NumeroUnicoDocumentoModule {
}
