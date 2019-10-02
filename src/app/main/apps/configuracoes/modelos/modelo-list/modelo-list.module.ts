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
import {ModeloListComponent} from './modelo-list.component';
import {ModeloService} from '@cdk/services/modelo.service';
import {RouterModule, Routes} from '@angular/router';
import {ModeloListStoreModule} from './store/store.module';
import {TemplateService} from '@cdk/services/template.service';
import * as fromGuards from './store/guards';
import {CdkModeloGridModule} from '@cdk/components/modelo/cdk-modelo-grid/cdk-modelo-grid.module';

const routes: Routes = [
    {
        path: '',
        component: ModeloListComponent,
        children: [
            {
                path       : 'documento',
                loadChildren: () => import('app/main/apps/documento/documento.module').then(m => m.DocumentoModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        ModeloListComponent
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

        CdkModeloGridModule,

        ModeloListStoreModule,
    ],
    providers: [
        ModeloService,
        TemplateService,
        fromGuards.ResolveGuard
    ],
    exports: [
        ModeloListComponent
    ]
})
export class ModeloListModule {
}
