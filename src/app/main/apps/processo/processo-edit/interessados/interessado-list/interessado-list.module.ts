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
import {InteressadoListComponent} from './interessado-list.component';
import {InteressadoService} from '@cdk/services/interessado.service';
import {RouterModule, Routes} from '@angular/router';
import {InteressadoListStoreModule} from 'app/main/apps/processo/processo-edit/interessados/interessado-list/store/store.module';
import {ModalidadeInteressadoService} from '@cdk/services/modalidade-interessado.service';
import * as fromGuards from 'app/main/apps/processo/processo-edit/interessados/interessado-list/store/guards';
import {CdkInteressadoGridModule} from '@cdk/components/interessado/cdk-interessado-grid/cdk-interessado-grid.module';

const routes: Routes = [
    {
        path: '',
        component: InteressadoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        InteressadoListComponent
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

        CdkInteressadoGridModule,

        InteressadoListStoreModule,
    ],
    providers: [
        InteressadoService,
        ModalidadeInteressadoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        InteressadoListComponent
    ]
})
export class InteressadoListModule {
}
