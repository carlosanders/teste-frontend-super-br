import {NgModule} from '@angular/core';

import {CdkWidgetComponent} from './widget.component';
import {CdkWidgetToggleDirective} from './widget-toggle.directive';

@NgModule({
    declarations: [
        CdkWidgetComponent,
        CdkWidgetToggleDirective
    ],
    exports     : [
        CdkWidgetComponent,
        CdkWidgetToggleDirective
    ],
})
export class CdkWidgetModule
{
}
