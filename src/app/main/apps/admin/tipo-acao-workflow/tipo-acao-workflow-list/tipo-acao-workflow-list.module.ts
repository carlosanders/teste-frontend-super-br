import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TipoAcaoWorkflowListComponent} from './tipo-acao-workflow-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {TipoAcaoWorkflowStoreModule} from './store/store.module';

//Criar CDK
import {TipoAcaoWorkflowService} from '@cdk/services/tipo-acao-workflow.service';
import {CdkTipoAcaoWorkflowGridModule} from '@cdk/components/tipo-acao-workflow/cdk-tipo-acao-workflow-grid/cdk-tipo-acao-workflow-grid.module';
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
        component: TipoAcaoWorkflowListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/tipo-acao-workflow/tipo-acao-workflow-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [TipoAcaoWorkflowListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TipoAcaoWorkflowStoreModule,
        CdkTipoAcaoWorkflowGridModule,

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
        TipoAcaoWorkflowService
    ]
})
export class TipoAcaoWorkflowListModule {
}
