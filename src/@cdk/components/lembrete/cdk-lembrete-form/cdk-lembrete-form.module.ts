import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkLembreteFormComponent} from './cdk-lembrete-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CdkSharedModule} from '@cdk/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@cdk/angular/material';
import {CdkLembreteGridModule} from '../cdk-lembrete-grid/cdk-lembrete-grid.module';
import {CdkLembreteHistoricoModule} from '../cdk-lembrete-historico/cdk-lembrete-historico.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkLembreteGridsearchModule} from '../cdk-lembrete-autocomplete/cdk-lembrete-gridsearch/cdk-lembrete-gridsearch.module';


@NgModule({
    declarations: [CdkLembreteFormComponent],
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule,

        CdkSharedModule,
        ReactiveFormsModule,
        CommonModule,
        CdkLembreteGridModule,
        CdkLembreteHistoricoModule,
        CdkLembreteGridsearchModule,
    ],
    exports: [
        CdkLembreteFormComponent
    ]
})
export class CdkLembreteFormModule { }
