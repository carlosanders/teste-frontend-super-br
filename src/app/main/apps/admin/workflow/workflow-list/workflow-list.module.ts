import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkflowListComponent} from './workflow-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {ResolveGuard} from './store/guards';
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
import {MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {WorkflowStoreModule} from './store/store.module';
import {CdkWorkflowGridModule} from '@cdk/components/workflow/cdk-workflow-grid/cdk-workflow-grid.module';
import {modulesConfig} from 'modules/modules-config';
import {CdkSharedModule} from '@cdk/shared.module';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: WorkflowListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/workflow/workflow-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [WorkflowListComponent],
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
        WorkflowStoreModule,
        CdkWorkflowGridModule,
        PathModule
    ],
    providers: [
        ResolveGuard
    ]
})
export class WorkflowListModule {
}
