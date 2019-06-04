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
import {CompartilhamentoListComponent} from './compartilhamento-list.component';
import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {RouterModule, Routes} from '@angular/router';
import {CompartilhamentoListStoreModule} from 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-list/store/store.module';
import {CdkCompartilhamentoGridModule} from '@cdk/components/compartilhamento/cdk-compartilhamento-grid/cdk-compartilhamento-grid.module';
import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: '',
        component: CompartilhamentoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        CompartilhamentoListComponent
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

        CdkCompartilhamentoGridModule,

        CompartilhamentoListStoreModule,
    ],
    providers: [
        CompartilhamentoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        CompartilhamentoListComponent
    ]
})
export class CompartilhamentoListModule {
}
