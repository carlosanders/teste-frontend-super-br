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
import {FavoritoEspecieTarefaListComponent} from './favorito-especie-tarefa-list.component';
import {FavoritoService} from '@cdk/services/favorito.service';
import {RouterModule, Routes} from '@angular/router';
import {FavoritoListEspecieTarefaStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkFavoritoGridModule} from '@cdk/components/favorito/cdk-favorito-grid/cdk-favorito-grid.module';
import {CdkFavoritoFormModule} from '@cdk/components/favorito/cdk-favorito-form/cdk-favorito-form.module';

const routes: Routes = [
    {
        path: '',
        component: FavoritoEspecieTarefaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        FavoritoEspecieTarefaListComponent
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
        CdkFavoritoFormModule,
        TranslateModule,

        FuseSharedModule,

        CdkFavoritoGridModule,

        FavoritoListEspecieTarefaStoreModule,
    ],
    providers: [
        FavoritoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        FavoritoEspecieTarefaListComponent
    ]
})
export class FavoritoEspecieTarefaListModule {
}
