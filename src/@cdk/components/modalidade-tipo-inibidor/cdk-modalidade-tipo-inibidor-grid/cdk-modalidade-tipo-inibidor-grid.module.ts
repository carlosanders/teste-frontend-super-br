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
import { ModalidadeTipoInibidorService } from '@cdk/services/modalidade-tipo-inibidor.service';
import { CdkModalidadeTipoInibidorGridComponent} from './cdk-modalidade-tipo-inibidor-grid.component';
import { CdkModalidadeTipoInibidorAutocompleteModule } from '@cdk/components/modalidade-tipo-inibidor/cdk-modalidade-tipo-inibidor-autocomplete/cdk-modalidade-tipo-inibidor-autocomplete.module';
import {CdkModalidadeTipoInibidorGridFilterModule} from './cdk-modalidade-tipo-inibidor-grid-filter/cdk-modalidade-tipo-inibidor-grid-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeTipoInibidorGridComponent
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

        CdkModalidadeTipoInibidorAutocompleteModule,
        CdkModalidadeTipoInibidorGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeTipoInibidorService,
    ],
    exports: [
        CdkModalidadeTipoInibidorGridComponent
    ]
})
export class CdkModalidadeTipoInibidorGridModule {
}
