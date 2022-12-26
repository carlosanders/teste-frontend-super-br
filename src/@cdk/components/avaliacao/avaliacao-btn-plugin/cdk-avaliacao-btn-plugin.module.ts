import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkAvaliacaoBtnPluginComponent} from './cdk-avaliacao-btn-plugin.component';
import {MatButtonModule, MatInputModule} from '@cdk/angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CdkAvaliacaoDialogModule} from '../avaliacao-dialog-plugin/cdk-avaliacao-dialog-plugin.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RatingInputModule} from '../rating-input/rating-input.module';

@NgModule({
    declarations: [
        CdkAvaliacaoBtnPluginComponent
    ],
    imports: [
        MatButtonModule,
        MatInputModule,
        CdkSharedModule,
        MatIconModule,
        MatProgressSpinnerModule,
        CdkAvaliacaoDialogModule,
        MatTooltipModule,
        RatingInputModule
    ],
    exports: [
        CdkAvaliacaoBtnPluginComponent
    ]
})

export class CdkAvaliacaoBtnModule {

}
