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
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {RepositorioListComponent} from './repositorio-list.component';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {RouterModule, Routes} from '@angular/router';
import {RepositorioListStoreModule} from './store/store.module';
import {ModalidadeRepositorioService} from '@cdk/services/modalidade-repositorio.service';
import * as fromGuards from './store/guards';
import {CdkRepositorioGridModule} from '@cdk/components/repositorio/cdk-repositorio-grid/cdk-repositorio-grid.module';

const routes: Routes = [
    {
        path: '',
        component: RepositorioListComponent,
        children: [
            {
                path       : 'documento',
                loadChildren: 'app/main/apps/documento/documento.module#DocumentoModule',
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        RepositorioListComponent
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

        FuseSharedModule,

        CdkRepositorioGridModule,

        RepositorioListStoreModule,
    ],
    providers: [
        RepositorioService,
        ModalidadeRepositorioService,
        fromGuards.ResolveGuard
    ],
    exports: [
        RepositorioListComponent
    ]
})
export class RepositorioListModule {
}
