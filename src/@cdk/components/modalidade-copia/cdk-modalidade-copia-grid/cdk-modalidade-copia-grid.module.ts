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
import {ModalidadeCopiaService} from '@cdk/services/modalidade-copia.service';
import {CdkModalidadeCopiaGridComponent} from './cdk-modalidade-copia-grid.component';
import {CdkModalidadeCopiaAutocompleteModule} from '@cdk/components/modalidade-copia/cdk-modalidade-copia-autocomplete/cdk-modalidade-copia-autocomplete.module';
import {CdkModalidadeCopiaFilterModule} from '../sidebars/cdk-modalidade-copia-filter/cdk-modalidade-copia-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeCopiaGridComponent,
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

        CdkModalidadeCopiaAutocompleteModule,
        CdkModalidadeCopiaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeCopiaService,
    ],
    exports: [
        CdkModalidadeCopiaGridComponent
    ]
})
export class CdkModalidadeCopiaGridModule {
}
