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
import {ModalidadeCategoriaSigiloService} from '@cdk/services/modalidade-categoria-sigilo.service';
import {CdkModalidadeCategoriaSigiloGridComponent} from './cdk-modalidade-categoria-sigilo-grid.component';
import {CdkModalidadeCategoriaSigiloAutocompleteModule} from '@cdk/components/modalidade-categoria-sigilo/cdk-modalidade-categoria-sigilo-autocomplete/cdk-modalidade-categoria-sigilo-autocomplete.module';
import {CdkModalidadeCategoriaSigiloFilterModule} from '../sidebars/cdk-modalidade-categoria-sigilo-filter/cdk-modalidade-categoria-sigilo-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeCategoriaSigiloGridComponent,
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

        CdkModalidadeCategoriaSigiloAutocompleteModule,
        CdkModalidadeCategoriaSigiloFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeCategoriaSigiloService,
    ],
    exports: [
        CdkModalidadeCategoriaSigiloGridComponent
    ]
})
export class CdkModalidadeCategoriaSigiloGridModule {
}
