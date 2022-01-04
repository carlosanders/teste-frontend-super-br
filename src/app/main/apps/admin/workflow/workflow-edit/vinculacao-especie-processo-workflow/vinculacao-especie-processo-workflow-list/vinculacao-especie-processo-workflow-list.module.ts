import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VinculacaoEspecieProcessoWorkflowListComponent} from './vinculacao-especie-processo-workflow-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {VinculacaoEspecieProcessoWorkflowStoreModule} from './store/store.module';
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
import {
    VinculacaoEspecieProcessoWorkflowService
} from '@cdk/services/vinculacao-especie-processo-workflow.service';
import {
    CdkVinculacaoEspecieProcessoWorkflowGridModule
} from "@cdk/components/vinculacao-especie-processo-workflow/cdk-vinculacao-especie-processo-workflow-grid/cdk-vinculacao-especie-processo-workflow-grid.module";

const routes: Routes = [
    {
        path: '',
        component: VinculacaoEspecieProcessoWorkflowListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/workflow/vinculacao-especie-processo-workflow/vinculacao-especie-processo-workflow-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [VinculacaoEspecieProcessoWorkflowListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        VinculacaoEspecieProcessoWorkflowStoreModule,

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
        PathModule,
        CdkVinculacaoEspecieProcessoWorkflowGridModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        VinculacaoEspecieProcessoWorkflowService
    ]
})
export class VinculacaoEspecieProcessoWorkflowListModule {
}
