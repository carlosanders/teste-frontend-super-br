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
import {ProcessoService} from '@cdk/services/processo.service';
import {RouterModule, Routes} from '@angular/router';
import {CdkProcessoGridModule} from '@cdk/components/processo/cdk-processo-grid/cdk-processo-grid.module';
import {ProcessosComponent} from './processos.component';
import {ProcessosStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: ProcessosComponent
    }
];

@NgModule({
    declarations: [
        ProcessosComponent
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

        ProcessosStoreModule,

        TranslateModule,
        FuseSharedModule,

        CdkProcessoGridModule
    ],
    providers: [
        ProcessoService
    ],
    exports: [
        ProcessosComponent
    ]
})
export class PesquisaProcessosModule {
}
