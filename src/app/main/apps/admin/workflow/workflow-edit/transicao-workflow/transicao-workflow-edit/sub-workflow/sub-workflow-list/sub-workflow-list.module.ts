import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubWorkflowListComponent} from './sub-workflow-list.component';
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
import {VinculacaoTransicaoWorkflowStoreModule} from './store/store.module';
import {modulesConfig} from 'modules/modules-config';
import {CdkSharedModule} from '@cdk/shared.module';
import {PathModule} from '@cdk/components/path/path.module';
import {
    CdkVinculacaoTransicaoWorkflowGridModule
} from '@cdk/components/vinculacao-transicao-workflow/cdk-vinculacao-transicao-workflow-grid/cdk-vinculacao-transicao-workflow-grid.module';

const routes: Routes = [
    {
        path: '',
        component: SubWorkflowListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/workflow/workflow-edit/transicao-workflow/sub-workflow/sub-workflow-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [SubWorkflowListComponent],
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
        VinculacaoTransicaoWorkflowStoreModule,
        CdkVinculacaoTransicaoWorkflowGridModule,
        PathModule
    ],
    providers: [
        ResolveGuard
    ]
})
export class SubWorkflowListModule {
}
