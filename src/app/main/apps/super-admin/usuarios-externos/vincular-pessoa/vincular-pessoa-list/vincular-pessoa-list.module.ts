import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VincularPessoaListComponent} from './vincular-pessoa-list.component';
import {RouterModule, Routes} from '@angular/router';
import {UsuariosExternosListComponent} from '../../usuarios-externos-list/usuarios-externos-list.component';
import * as fromGuards from '../../usuarios-externos-list/store/guards';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '../../../../../../../@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '../../../../../../../@cdk/shared.module';

const routes: Routes = [
    {
        path: '',
        component: VincularPessoaListComponent,
        // canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [VincularPessoaListComponent],
    imports: [
        CommonModule,
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
    ]
})
export class VincularPessoaListModule {
}
