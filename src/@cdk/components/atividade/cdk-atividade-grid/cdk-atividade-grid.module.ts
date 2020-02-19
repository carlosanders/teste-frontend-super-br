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

import {FuseSharedModule} from '@fuse/shared.module';
import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {CdkEspecieAtividadeAutocompleteModule} from '@cdk/components/especie-atividade/cdk-especie-atividade-autocomplete/cdk-especie-atividade-autocomplete.module';
import {CdkAtividadeGridComponent} from './cdk-atividade-grid.component';
import {CdkAtividadeGridFilterModule} from './cdk-atividade-grid-filter/cdk-atividade-grid-filter.module';
import {FuseSidebarModule} from '@fuse/components';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkAtividadeMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkAtividadeGridComponent,
        CdkAtividadeMainSidebarComponent

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

        CdkEspecieAtividadeAutocompleteModule,
        CdkAtividadeGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        EspecieAtividadeService,
    ],
    exports: [
        CdkAtividadeGridComponent
    ]
})
export class CdkAtividadeGridModule {
}
