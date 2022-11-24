import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';

import {
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';
import {RatingInputComponent} from './rating-input.component';

@NgModule({
    declarations: [
        RatingInputComponent
    ],
    imports: [
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        CdkSharedModule
    ],
    providers: [
    ],
    exports: [
        RatingInputComponent
    ]
})
export class RatingInputModule {
}