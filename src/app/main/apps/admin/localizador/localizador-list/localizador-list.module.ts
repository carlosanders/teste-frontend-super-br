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
import {LocalizadorListComponent} from './localizador-list.component';
import {LocalizadorService} from '@cdk/services/localizador.service';
import {RouterModule, Routes} from '@angular/router';
import {LocalizadorListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkLocalizadorGridModule} from '@cdk/components/localizador/cdk-localizador-grid/cdk-localizador-grid.module';
import {LoginService} from '../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: LocalizadorListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        LocalizadorListComponent
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
        CdkLocalizadorGridModule,
        LocalizadorListStoreModule,
    ],
    providers: [
        LocalizadorService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        LocalizadorListComponent
    ]
})
export class LocalizadorListModule {
}
