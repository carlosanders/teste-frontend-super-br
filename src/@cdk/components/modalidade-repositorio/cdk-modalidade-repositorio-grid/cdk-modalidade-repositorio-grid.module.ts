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
import {ModalidadeRepositorioService} from '@cdk/services/modalidade-repositorio.service';
import {CdkModalidadeRepositorioGridComponent} from './cdk-modalidade-repositorio-grid.component';
import {CdkModalidadeRepositorioAutocompleteModule} from '@cdk/components/modalidade-repositorio/cdk-modalidade-repositorio-autocomplete/cdk-modalidade-repositorio-autocomplete.module';
import {CdkModalidadeRepositorioFilterModule} from '../sidebars/cdk-modalidade-repositorio-filter/cdk-modalidade-repositorio-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeRepositorioGridComponent,
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

        CdkModalidadeRepositorioAutocompleteModule,
        CdkModalidadeRepositorioFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeRepositorioService,
    ],
    exports: [
        CdkModalidadeRepositorioGridComponent
    ]
})
export class CdkModalidadeRepositorioGridModule {
}
