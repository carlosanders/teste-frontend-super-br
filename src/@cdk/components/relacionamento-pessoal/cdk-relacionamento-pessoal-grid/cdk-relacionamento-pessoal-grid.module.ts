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
} from '@angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {CdkRelacionamentoPessoalGridComponent} from './cdk-relacionamento-pessoal-grid.component';
import {CdkRelacionamentoPessoalAutocompleteModule} from '@cdk/components/relacionamento-pessoal/cdk-relacionamento-pessoal-autocomplete/cdk-relacionamento-pessoal-autocomplete.module';
import {CdkRelacionamentoPessoalGridFilterModule} from './cdk-relacionamento-pessoal-grid-filter/cdk-relacionamento-pessoal-grid-filter.module';
import {CdkRelacionamentoPessoalMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkRelacionamentoPessoalGridComponent,
        CdkRelacionamentoPessoalMainSidebarComponent,
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

        CdkRelacionamentoPessoalAutocompleteModule,
        CdkRelacionamentoPessoalGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        RelacionamentoPessoalService,
    ],
    exports: [
        CdkRelacionamentoPessoalGridComponent
    ]
})
export class CdkRelacionamentoPessoalGridModule {
}
