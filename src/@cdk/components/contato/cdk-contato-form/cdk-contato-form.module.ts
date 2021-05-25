import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkContatoFormComponent} from './cdk-contato-form.component';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkContatoGridsearchModule} from '../cdk-contato-autocomplete/cdk-contato-gridsearch/cdk-contato-gridsearch.module';
import {CdkTipoContatoGridsearchModule} from '../../tipo-contato/cdk-tipo-contato-autocomplete/cdk-tipo-contato-gridsearch/cdk-tipo-contato-gridsearch.module';
import {CdkUsuarioGridsearchModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {CdkTipoContatoAutocompleteModule} from '../../tipo-contato/cdk-tipo-contato-autocomplete/cdk-tipo-contato-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [CdkContatoFormComponent],
    exports: [
        CdkContatoFormComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        CdkSharedModule,
        MatFormFieldModule,
        MatInputModule,
        NgxUpperCaseDirectiveModule,
        MatCheckboxModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatIconModule,
        MatTooltipModule,
        CdkContatoGridsearchModule,
        CdkTipoContatoGridsearchModule,
        CdkUsuarioGridsearchModule,
        CdkSetorGridsearchModule,
        CdkTipoContatoAutocompleteModule,
        CdkUsuarioAutocompleteModule,
        CdkSetorAutocompleteModule
    ]
})
export class CdkContatoFormModule { }
