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
import {SigiloListComponent} from './sigilo-list.component';
import {SigiloService} from '@cdk/services/sigilo.service';
import {RouterModule, Routes} from '@angular/router';
import {SigiloListStoreModule} from 'app/main/apps/processo/processo-edit/sigilos/sigilo-list/store/store.module';
import {TipoSigiloService} from '@cdk/services/tipo-sigilo.service';
import * as fromGuards from 'app/main/apps/processo/processo-edit/sigilos/sigilo-list/store/guards';
import {CdkSigiloGridModule} from '@cdk/components/sigilo/cdk-sigilo-grid/cdk-sigilo-grid.module';

const routes: Routes = [
    {
        path: '',
        component: SigiloListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        SigiloListComponent
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

        CdkSigiloGridModule,

        SigiloListStoreModule,
    ],
    providers: [
        SigiloService,
        TipoSigiloService,
        fromGuards.ResolveGuard
    ],
    exports: [
        SigiloListComponent
    ]
})
export class SigiloListModule {
}
