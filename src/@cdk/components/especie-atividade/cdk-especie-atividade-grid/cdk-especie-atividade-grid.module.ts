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
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {CdkEspecieAtividadeGridComponent} from './cdk-especie-atividade-grid.component';
import {CdkEspecieAtividadeAutocompleteModule} from '@cdk/components/especie-atividade/cdk-especie-atividade-autocomplete/cdk-especie-atividade-autocomplete.module';
import {CdkEspecieAtividadeFilterModule} from '@cdk/components/especie-atividade/sidebars/cdk-especie-atividade-filter/cdk-especie-atividade-filter.module';
import {CdkEspecieAtividadeMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkEspecieAtividadeGridComponent,
        CdkEspecieAtividadeMainSidebarComponent,
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
        MatTooltipModule,

        CdkEspecieAtividadeFilterModule,
        CdkEspecieAtividadeAutocompleteModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        EspecieAtividadeService,
    ],
    exports: [
        CdkEspecieAtividadeGridComponent
    ]
})
export class CdkEspecieAtividadeGridModule {
}
