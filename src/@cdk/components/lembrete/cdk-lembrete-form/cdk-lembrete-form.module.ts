import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkLembreteFormComponent} from './cdk-lembrete-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CdkSharedModule} from '@cdk/shared.module';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [CdkLembreteFormComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        CdkSharedModule,
        MatInputModule,
        MatButtonModule,
    ],
    exports: [
        CdkLembreteFormComponent
    ]
})
export class CdkLembreteFormModule { }
