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
import {VinculacaoAvisoService} from '../../../services/vinculacao-aviso.service';
import {CdkVinculacaoAvisoGridComponent} from './cdk-vinculacao-aviso-grid.component';
import {CdkVinculacaoAvisoAutocompleteModule} from '@cdk/components/vinculacao-aviso/cdk-vinculacao-aviso-autocomplete/cdk-vinculacao-aviso-autocomplete.module';
import {CdkVinculacaoAvisoFilterModule} from '../sidebars/cdk-vinculacao-aviso-filter/cdk-vinculacao-aviso-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoAvisoGridComponent,
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

        CdkVinculacaoAvisoAutocompleteModule,
        CdkVinculacaoAvisoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        VinculacaoAvisoService,
    ],
    exports: [
        CdkVinculacaoAvisoGridComponent
    ]
})
export class CdkVinculacaoAvisoGridModule {
}
