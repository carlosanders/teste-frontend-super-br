import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatRippleModule} from '@cdk/angular/material';
import {MatIconModule} from '@cdk/angular/material';

import {TranslateModule} from '@ngx-translate/core';

import {FuseNavigationComponent} from './navigation.component';
import {FuseNavVerticalItemComponent} from './vertical/item/item.component';
import {FuseNavVerticalCollapsableComponent} from './vertical/collapsable/collapsable.component';
import {FuseNavVerticalGroupComponent} from './vertical/group/group.component';
import {FuseNavHorizontalItemComponent} from './horizontal/item/item.component';
import {FuseNavHorizontalCollapsableComponent} from './horizontal/collapsable/collapsable.component';
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
        FuseNavigationComponent
    ],
    declarations: [
        FuseNavigationComponent,
        FuseNavVerticalGroupComponent,
        FuseNavVerticalItemComponent,
        FuseNavVerticalCollapsableComponent,
        FuseNavHorizontalItemComponent,
        FuseNavHorizontalCollapsableComponent
    ],
    providers: [
        LoginService
    ]
})
export class FuseNavigationModule {
}
