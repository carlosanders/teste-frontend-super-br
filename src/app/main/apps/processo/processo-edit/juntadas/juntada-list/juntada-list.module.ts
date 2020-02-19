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

import {FuseSharedModule} from '@fuse/shared.module';
import {JuntadaListComponent} from './juntada-list.component';
import {JuntadaService} from '@cdk/services/juntada.service';
import {RouterModule, Routes} from '@angular/router';
import {JuntadaListStoreModule} from 'app/main/apps/processo/processo-edit/juntadas/juntada-list/store/store.module';
import * as fromGuards from 'app/main/apps/processo/processo-edit/juntadas/juntada-list/store/guards';
import {CdkJuntadaGridModule} from '@cdk/components/juntada/cdk-juntada-grid/cdk-juntada-grid.module';

const routes: Routes = [
    {
        path: '',
        component: JuntadaListComponent,
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
        JuntadaListComponent
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

        CdkJuntadaGridModule,

        JuntadaListStoreModule,
    ],
    providers: [
        JuntadaService,
        fromGuards.ResolveGuard
    ],
    exports: [
        JuntadaListComponent
    ]
})
export class JuntadaListModule {
}
