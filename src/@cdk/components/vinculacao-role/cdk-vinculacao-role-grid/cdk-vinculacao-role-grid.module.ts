import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {VinculacaoRoleService} from '@cdk/services/vinculacao-role.service';
import {CdkVinculacaoRoleGridComponent} from './cdk-vinculacao-role-grid.component';
import {CdkVinculacaoRoleAutocompleteModule} from '@cdk/components/vinculacao-role/cdk-vinculacao-role-autocomplete/cdk-vinculacao-role-autocomplete.module';
import {CdkVinculacaoRoleGridFilterModule} from '../sidebars/cdk-vinculacao-role-grid-filter/cdk-vinculacao-role-grid-filter.module';
import {CdkVinculacaoRoleMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkVinculacaoRoleGridComponent,
        CdkVinculacaoRoleMainSidebarComponent,
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
        CdkVinculacaoRoleGridFilterModule,

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
