import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TipoRelatorioListComponent} from './tipo-relatorio-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {TipoRelatorioStoreModule} from './store/store.module';
import {TipoRelatorioService} from '@cdk/services/tipo-relatorio.service';
import {CdkTipoRelatorioGridModule} from '@cdk/components/tipo-relatorio/cdk-tipo-relatorio-grid/cdk-tipo-relatorio-grid.module';
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
        component: TipoRelatorioListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [TipoRelatorioListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TipoRelatorioStoreModule,
        CdkTipoRelatorioGridModule,

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
        TipoRelatorioService
    ]
})
export class TipoRelatorioListModule {
}
