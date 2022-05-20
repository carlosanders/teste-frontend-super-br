import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkVinculacaoProcessoTreeListComponent} from './cdk-vinculacao-processo-tree-list.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule, MatIconModule} from '@cdk/angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
    declarations: [CdkVinculacaoProcessoTreeListComponent],
    exports: [
        CdkVinculacaoProcessoTreeListComponent
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
        MatExpansionModule,
        MatMenuModule
    ],
    providers: [
    ]
})
export class CdkVinculacaoProcessoTreeListModule {
}
