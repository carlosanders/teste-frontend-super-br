import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassificacaoListComponent} from './classificacao-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {ClassificacaoStoreModule} from './store/store.module';
import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {CdkClassificacaoGridModule} from '@cdk/components/classificacao/cdk-classificacao-grid/cdk-classificacao-grid.module';
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
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: ClassificacaoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [ClassificacaoListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ClassificacaoStoreModule,
        CdkClassificacaoGridModule,

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
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatDatepickerModule,
        MatDialogModule,
        PathModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        ClassificacaoService
    ]
})
export class ClassificacaoListModule {
}
