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

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeRepositorioService} from '@cdk/services/modalidade-repositorio.service';
import {CdkModalidadeRepositorioGridComponent} from './cdk-modalidade-repositorio-grid.component';
import {CdkModalidadeRepositorioAutocompleteModule} from '@cdk/components/modalidade-repositorio/cdk-modalidade-repositorio-autocomplete/cdk-modalidade-repositorio-autocomplete.module';
import {CdkModalidadeRepositorioGridFilterModule} from './cdk-modalidade-repositorio-grid-filter/cdk-modalidade-repositorio-grid-filter.module';
import {CdkModalidadeRepositorioMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeRepositorioGridComponent,
        CdkModalidadeRepositorioMainSidebarComponent,
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
        CdkModalidadeRepositorioGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
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
