import {NgModule} from '@angular/core';
import {WidgetsComponent} from './widgets.component';

import {CdkSharedModule} from '../@cdk/shared.module';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {DirectivesModule} from '../@cdk/directives/directives';
import {TourModule} from "../app/main/apps/tour/tour.module";

@NgModule({
    declarations: [
        WidgetsComponent
    ],
    imports: [
        CdkSharedModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatGridListModule,
        DirectivesModule,
        TourModule,

    ],
    exports: [
        WidgetsComponent
    ],
    providers: []
})
export class WidgetsModule {
}
