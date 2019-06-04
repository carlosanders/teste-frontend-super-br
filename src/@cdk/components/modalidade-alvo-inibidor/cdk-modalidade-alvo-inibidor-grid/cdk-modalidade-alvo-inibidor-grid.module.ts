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
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeAlvoInibidorService } from '@cdk/services/modalidade-alvo-inibidor.service';
import { CdkModalidadeAlvoInibidorGridComponent} from './cdk-modalidade-alvo-inibidor-grid.component';
import { CdkModalidadeAlvoInibidorGridFilterComponent } from './cdk-modalidade-alvo-inibidor-grid-filter/cdk-modalidade-alvo-inibidor-grid-filter.component';
import { CdkModalidadeAlvoInibidorAutocompleteModule } from '@cdk/components/modalidade-alvo-inibidor/cdk-modalidade-alvo-inibidor-autocomplete/cdk-modalidade-alvo-inibidor-autocomplete.module';

@NgModule({
    declarations: [
        CdkModalidadeAlvoInibidorGridComponent,
        CdkModalidadeAlvoInibidorGridFilterComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkModalidadeAlvoInibidorAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeAlvoInibidorService,
    ],
    exports: [
        CdkModalidadeAlvoInibidorGridComponent
    ]
})
export class CdkModalidadeAlvoInibidorGridModule {
}
