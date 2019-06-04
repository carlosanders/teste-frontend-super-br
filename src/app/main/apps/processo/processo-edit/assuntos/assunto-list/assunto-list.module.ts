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
import {AssuntoListComponent} from './assunto-list.component';
import {AssuntoService} from '@cdk/services/assunto.service';
import {RouterModule, Routes} from '@angular/router';
import {AssuntoListStoreModule} from 'app/main/apps/processo/processo-edit/assuntos/assunto-list/store/store.module';
import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';
import * as fromGuards from 'app/main/apps/processo/processo-edit/assuntos/assunto-list/store/guards';
import {CdkAssuntoGridModule} from '@cdk/components/assunto/cdk-assunto-grid/cdk-assunto-grid.module';

const routes: Routes = [
    {
        path: '',
        component: AssuntoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        AssuntoListComponent
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

        CdkAssuntoGridModule,

        AssuntoListStoreModule,
    ],
    providers: [
        AssuntoService,
        AssuntoAdministrativoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        AssuntoListComponent
    ]
})
export class AssuntoListModule {
}
