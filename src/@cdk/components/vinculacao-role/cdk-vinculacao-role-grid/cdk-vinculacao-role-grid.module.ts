import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {VinculacaoRoleService} from '@cdk/services/vinculacao-role.service';
import {CdkVinculacaoRoleGridComponent} from './cdk-vinculacao-role-grid.component';
import {CdkVinculacaoRoleAutocompleteModule} from '@cdk/components/vinculacao-role/cdk-vinculacao-role-autocomplete/cdk-vinculacao-role-autocomplete.module';
import {CdkVinculacaoRoleFilterModule} from '../sidebars/cdk-vinculacao-role-filter/cdk-vinculacao-role-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoRoleGridComponent,
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkVinculacaoRoleAutocompleteModule,
        CdkVinculacaoRoleFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        VinculacaoRoleService,
    ],
    exports: [
        CdkVinculacaoRoleGridComponent
    ]
})
export class CdkVinculacaoRoleGridModule {
}
