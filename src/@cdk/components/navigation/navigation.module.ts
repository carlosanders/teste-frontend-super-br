import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatIconModule, MatRippleModule} from '@cdk/angular/material';

import {TranslateModule} from '@ngx-translate/core';

import {CdkNavigationComponent} from './navigation.component';
import {CdkNavVerticalItemComponent} from './vertical/item/item.component';
import {CdkNavVerticalCollapsableComponent} from './vertical/collapsable/collapsable.component';
import {CdkNavVerticalGroupComponent} from './vertical/group/group.component';
import {CdkNavHorizontalItemComponent} from './horizontal/item/item.component';
import {CdkNavHorizontalCollapsableComponent} from './horizontal/collapsable/collapsable.component';
import {LoginService} from 'app/main/auth/login/login.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,

        TranslateModule.forChild()
    ],
    exports: [
        CdkNavigationComponent
    ],
    declarations: [
        CdkNavigationComponent,
        CdkNavVerticalGroupComponent,
        CdkNavVerticalItemComponent,
        CdkNavVerticalCollapsableComponent,
        CdkNavHorizontalItemComponent,
        CdkNavHorizontalCollapsableComponent
    ],
    providers: [
        LoginService
    ]
})
export class CdkNavigationModule {
}
