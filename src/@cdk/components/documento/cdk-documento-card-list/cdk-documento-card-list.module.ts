import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule, MatFormFieldModule, MatAutocompleteModule,
    MatCardModule, MatCheckboxModule, MatMenuModule,
} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import {CdkDocumentoCardListComponent} from './cdk-documento-card-list.component';
import {CdkDocumentoCardModule} from './cdk-documento-card/cdk-documento-card.module';
import {CdkTipoDocumentoAutocompleteModule} from '../../tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    declarations: [
        CdkDocumentoCardListComponent
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatCheckboxModule,
        MatMenuModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,

        CdkDocumentoCardModule,
        CdkSharedModule,
        CdkTipoDocumentoAutocompleteModule,
    ],
    providers: [
    ],
    exports: [
        CdkDocumentoCardListComponent
    ]
})
export class CdkDocumentoCardListModule {
}
