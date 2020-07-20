import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CdkSharedModule} from '@cdk/shared.module';

import {ContentComponent} from './content.component';

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports: [
        RouterModule,
        CdkSharedModule
    ],
    exports: [
        ContentComponent
    ]
})
export class ContentModule {
}
