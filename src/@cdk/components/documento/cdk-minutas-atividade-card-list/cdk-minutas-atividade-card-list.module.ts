import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {DndModule} from 'ngx-drag-drop';
import {CdkMinutasAtividadeCardListComponent} from './cdk-minutas-atividade-card-list.component';
import {CdkMinutasAtividadeCardModule} from './cdk-minutas-atividade-card/cdk-minutas-atividade-card.module';
import {CdkTipoDocumentoAutocompleteModule} from '../../tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        CdkMinutasAtividadeCardListComponent
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

        CdkMinutasAtividadeCardModule,
        CdkSharedModule,
        CdkTipoDocumentoAutocompleteModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        DndModule
    ],
    providers: [
    ],
    exports: [
        CdkMinutasAtividadeCardListComponent
    ]
})
export class CdkMinutasAtividadeCardListModule {
}
