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

import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {CdkEspecieAtividadeAutocompleteModule} from '@cdk/components/especie-atividade/cdk-especie-atividade-autocomplete/cdk-especie-atividade-autocomplete.module';
import {CdkAtividadeGridComponent} from './cdk-atividade-grid.component';
import {CdkAtividadeFilterModule} from '../sidebars/cdk-atividade-filter/cdk-atividade-filter.module';
import {CdkSidebarModule} from '@cdk/components/index';
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
        CdkAtividadeFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
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
