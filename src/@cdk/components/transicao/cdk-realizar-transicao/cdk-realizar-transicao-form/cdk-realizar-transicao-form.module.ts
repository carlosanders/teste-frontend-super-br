import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkRealizarTransicaoFormComponent} from './cdk-realizar-transicao-form.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkProcessoAutocompleteModule} from '../../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';
import {CdkModalidadeTransicaoAutocompleteModule} from '../../../modalidade-transicao/cdk-modalidade-transicao-autocomplete/cdk-modalidade-transicao-autocomplete.module';
import {CdkModalidadeTransicaoGridsearchModule} from '../../../modalidade-transicao/cdk-modalidade-transicao-autocomplete/cdk-modalidade-transicao-gridsearch/cdk-modalidade-transicao-gridsearch.module';
import {FuseSharedModule} from '../../../../../@fuse/shared.module';
import {ProcessoService} from '../../../../services/processo.service';


@NgModule({
    declarations: [CdkRealizarTransicaoFormComponent],
    imports: [
        CommonModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        NgxUpperCaseDirectiveModule,

        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
        CdkModalidadeTransicaoAutocompleteModule,
        CdkModalidadeTransicaoGridsearchModule,

        FuseSharedModule,
    ],
    providers: [
        ProcessoService,
    ],
    exports: [CdkRealizarTransicaoFormComponent]
})
export class CdkRealizarTransicaoFormModule {
}
