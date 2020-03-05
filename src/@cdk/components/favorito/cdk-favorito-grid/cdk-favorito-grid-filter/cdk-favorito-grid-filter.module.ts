import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {FavoritoService} from '@cdk/services/favorito.service';
import {CdkFavoritoGridFilterComponent} from './cdk-favorito-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkEspecieAtividadeAutocompleteModule} from '@cdk/components/especie-atividade/cdk-especie-atividade-autocomplete/cdk-especie-atividade-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkEspecieTarefaAutocompleteModule} from '@cdk/components/especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {CdkSetorAutocompleteModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';

@NgModule({
    declarations: [
        CdkFavoritoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatCheckboxModule,

        CdkSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkEspecieAtividadeAutocompleteModule,
        CdkSetorAutocompleteModule,
        CdkUsuarioAutocompleteModule,
        CdkEspecieTarefaAutocompleteModule,
    ],
    providers: [
        FavoritoService,
    ],
    exports: [
        CdkFavoritoGridFilterComponent
    ]
})
export class CdkFavoritoGridFilterModule {
}
