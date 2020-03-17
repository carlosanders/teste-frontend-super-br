import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkClassificacaoTreeComponent } from './cdk-classificacao-tree.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
    declarations: [CdkClassificacaoTreeComponent],
    exports: [
        CdkClassificacaoTreeComponent
    ],
    imports: [
        CommonModule,
        MatTreeModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class CdkClassificacaoTreeModule {
}
