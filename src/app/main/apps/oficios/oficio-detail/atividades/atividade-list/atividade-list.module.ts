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
import {AtividadeListComponent} from './atividade-list.component';
import {AtividadeService} from '@cdk/services/atividade.service';
import {RouterModule, Routes} from '@angular/router';
import {AtividadeListStoreModule} from 'app/main/apps/oficios/oficio-detail/atividades/atividade-list/store/store.module';
import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {CdkAtividadeGridModule} from '@cdk/components/atividade/cdk-atividade-grid/cdk-atividade-grid.module';
import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: '',
        component: AtividadeListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        AtividadeListComponent
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

        CdkAtividadeGridModule,

        AtividadeListStoreModule,
    ],
    providers: [
        AtividadeService,
        EspecieAtividadeService,
        fromGuards.ResolveGuard
    ],
    exports: [
        AtividadeListComponent
    ]
})
export class AtividadeListModule {
}
