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
import {EspecieAtividadeListComponent} from './especie-atividade-list.component';
import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {RouterModule, Routes} from '@angular/router';
import {EspecieAtividadeListStoreModule} from 'app/main/apps/configuracoes/favoritos/especie-atividade-list/store/store.module';
import * as fromGuards from 'app/main/apps/configuracoes/favoritos/especie-atividade-list/store/guards';
import {CdkEspecieAtividadeGridModule} from '@cdk/components/especie-atividade/cdk-especie-atividade-grid/cdk-especie-atividade-grid.module';

const routes: Routes = [
    {
        path: '',
        component: EspecieAtividadeListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        EspecieAtividadeListComponent
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

        CdkEspecieAtividadeGridModule,

        EspecieAtividadeListStoreModule,
    ],
    providers: [
        EspecieAtividadeService,
        fromGuards.ResolveGuard
    ],
    exports: [
        EspecieAtividadeListComponent
    ]
})
export class EspecieAtividadeListModule {
}
