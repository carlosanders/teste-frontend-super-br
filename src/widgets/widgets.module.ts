import {NgModule} from '@angular/core';
import {WidgetsComponent} from './widgets.component';

import {CdkSharedModule} from '@cdk/shared.module';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {DirectivesModule} from '@cdk/directives/directives';
import {TourModule} from '../ajuda/tour/tour.module';
import {DndModule} from 'ngx-drag-drop';

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
        DndModule,
    ],
    exports: [
        WidgetsComponent
    ],
    providers: []
})
export class WidgetsModule {
}
