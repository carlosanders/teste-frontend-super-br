import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkClassificacaoTreeComponent } from './cdk-classificacao-tree.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
    declarations: [CdkClassificacaoTreeComponent],
    exports: [
        CdkClassificacaoTreeComponent
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
        MatInputModule
    ]
})
export class CdkClassificacaoTreeModule {
}
