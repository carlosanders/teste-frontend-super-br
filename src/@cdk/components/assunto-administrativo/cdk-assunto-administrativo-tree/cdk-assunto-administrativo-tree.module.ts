import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkAssuntoAdministrativoTreeComponent} from './cdk-assunto-administrativo-tree.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@cdk/angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkAssuntoAdministrativoTreeService} from './services/cdk-assunto-administrativo-tree.service';
import {CdkAssuntoAdministrativoFormModule} from '../cdk-assunto-administrativo-form/cdk-assunto-administrativo-form.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkAssuntoAdministrativoAutocompleteModule} from '../cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-autocomplete.module';


@NgModule({
    declarations: [CdkAssuntoAdministrativoTreeComponent],
    exports: [
        CdkAssuntoAdministrativoTreeComponent
    ],
    imports: [
        CommonModule,
        MatTreeModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        CdkSharedModule,
        MatFormFieldModule,
        MatInputModule,
        NgxUpperCaseDirectiveModule,
        MatTooltipModule,
        MatTreeModule,
        CdkAssuntoAdministrativoFormModule,
        MatAutocompleteModule,
        CdkAssuntoAdministrativoAutocompleteModule
    ],
    providers: [
        CdkAssuntoAdministrativoTreeService
    ]
})
export class CdkAssuntoAdministrativoTreeModule {
}
