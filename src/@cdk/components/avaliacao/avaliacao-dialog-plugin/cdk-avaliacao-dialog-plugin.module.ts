import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkAvaliacaoDialogPluginComponent} from './cdk-avaliacao-dialog-plugin.component';
import {MatButtonModule, MatDialogModule, MatInputModule} from '@cdk/angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RatingInputModule} from "../rating-input/rating-input.module";

@NgModule({
    declarations: [
        CdkAvaliacaoDialogPluginComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        CdkSharedModule,
        MatIconModule,
        MatProgressSpinnerModule,
        RatingInputModule
    ],
    exports: [
        CdkAvaliacaoDialogPluginComponent
    ]
})

export class CdkAvaliacaoDialogModule {

}
