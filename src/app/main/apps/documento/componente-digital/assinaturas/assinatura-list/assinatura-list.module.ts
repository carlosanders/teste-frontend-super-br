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
import {AssinaturaListComponent} from './assinatura-list.component';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {RouterModule, Routes} from '@angular/router';
import {AssinaturaListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkAssinaturaGridModule} from '@cdk/components/assinatura/cdk-assinatura-grid/cdk-assinatura-grid.module';

const routes: Routes = [
    {
        path: '',
        component: AssinaturaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        AssinaturaListComponent
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

        CdkAssinaturaGridModule,

        AssinaturaListStoreModule,
    ],
    providers: [
        AssinaturaService,
        fromGuards.ResolveGuard
    ],
    exports: [
        AssinaturaListComponent
    ]
})
export class AssinaturaListModule {
}
