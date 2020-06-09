import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminPessoaListComponent} from './admin-pessoa-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
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
} from '../../../../../../@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '../../../../../../@cdk/shared.module';
import {MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {EspecieAtividadeStoreModule} from './store/store.module';
import {CdkEspecieAtividadeGridModule} from '../../../../../../@cdk/components/especie-atividade/cdk-especie-atividade-grid/cdk-especie-atividade-grid.module';
import {ResolveGuard} from './store/guards';
import {modulesConfig} from 'modules/modules-config';
import {CdkPessoaGridModule} from '../../../../../../@cdk/components/pessoa/cdk-pessoa-grid/cdk-pessoa-grid.module';

const routes: Routes = [
    {
        path: '',
        component: AdminPessoaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/admin-pessoa/admin-pessoa-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [AdminPessoaListComponent],
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
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatDatepickerModule,
        MatDialogModule,
        EspecieAtividadeStoreModule,
        CdkEspecieAtividadeGridModule,
        CdkPessoaGridModule
    ],
    providers: [
        ResolveGuard
    ]
})
export class AdminPessoaListModule {
}
