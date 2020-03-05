import { NgModule } from '@angular/core';

import { CdkIfOnDomDirective } from '@cdk/directives/cdk-if-on-dom/cdk-if-on-dom.directive';
import { CdkInnerScrollDirective } from '@cdk/directives/cdk-inner-scroll/cdk-inner-scroll.directive';
import { CdkPerfectScrollbarDirective } from '@cdk/directives/cdk-perfect-scrollbar/cdk-perfect-scrollbar.directive';
import { CdkMatSidenavHelperDirective, CdkMatSidenavTogglerDirective } from '@cdk/directives/cdk-mat-sidenav/cdk-mat-sidenav.directive';
import { ShowIfRoleDirective } from './show-if-role.directive';

@NgModule({
    declarations: [
        CdkIfOnDomDirective,
        CdkInnerScrollDirective,
        CdkMatSidenavHelperDirective,
        CdkMatSidenavTogglerDirective,
        CdkPerfectScrollbarDirective,
        ShowIfRoleDirective
    ],
    imports     : [],
    exports     : [
        CdkIfOnDomDirective,
        CdkInnerScrollDirective,
        CdkMatSidenavHelperDirective,
        CdkMatSidenavTogglerDirective,
        CdkPerfectScrollbarDirective,
        ShowIfRoleDirective,
    ]
})
export class DirectivesModule
{
}
