import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EspeciesProcessoListComponent} from './especies-processo-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {LoginService} from '../../../../../../auth/login/login.service';
import {WorkflowEspecieProcessoStoreModule} from './store/store.module';
import {EspecieProcessoService} from '@cdk/services/especie-processo.service';
import {CdkEspecieProcessoGridModule} from '@cdk/components/especie-processo/cdk-especie-processo-grid/cdk-especie-processo-grid.module';
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
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: EspeciesProcessoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/workflow/especies-processo/especies-processo-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [EspeciesProcessoListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        WorkflowEspecieProcessoStoreModule,
        CdkEspecieProcessoGridModule,

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
        EspecieProcessoService
    ]
})
export class EspeciesProcessoListModule {
}
