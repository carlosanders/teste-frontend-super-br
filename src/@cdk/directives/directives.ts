import {NgModule} from '@angular/core';

import {CdkIfOnDomDirective} from '@cdk/directives/cdk-if-on-dom/cdk-if-on-dom.directive';
import {CdkInnerScrollDirective} from '@cdk/directives/cdk-inner-scroll/cdk-inner-scroll.directive';
import {CdkPerfectScrollbarDirective} from '@cdk/directives/cdk-perfect-scrollbar/cdk-perfect-scrollbar.directive';
import {
    CdkMatSidenavHelperDirective,
    CdkMatSidenavTogglerDirective
} from '@cdk/directives/cdk-mat-sidenav/cdk-mat-sidenav.directive';
import {ShowIfRoleDirective} from './show-if-role.directive';
import {ShowIfNotRoleDirective} from './show-if-not-role.directive';
import {CdkGridColsDirective} from './cdk-grid-cols/cdk-grid-cols.directive';
import {CdkInputAutoFocusDirective} from './cdk-input-auto-focus-drective/cdk-input-auto-focus-directive';
import {CdkScrollToDirective} from './cdk-scroll-to/cdk-scroll-to.directive';
import {CdkHoverClassDirective} from './cdk-hover-class/cdk-hover-class.directive';
import {CdkAutocompleteMultipleDirective} from './cdk-autocomplete-multiple/cdk-autocomplete-multiple.directive';
import {CdkTableColumnResizableDirective} from './cdk-header-cell-resizable/cdk-table-column-resizable.directive';

@NgModule({
    declarations: [
        CdkScrollToDirective,
        CdkIfOnDomDirective,
        CdkInnerScrollDirective,
        CdkMatSidenavHelperDirective,
        CdkMatSidenavTogglerDirective,
        CdkPerfectScrollbarDirective,
        ShowIfRoleDirective,
        ShowIfNotRoleDirective,
        CdkGridColsDirective,
        CdkInputAutoFocusDirective,
        CdkHoverClassDirective,
        CdkAutocompleteMultipleDirective,
        CdkTableColumnResizableDirective
    ],
    imports: [],
    exports: [
        CdkIfOnDomDirective,
        CdkScrollToDirective,
        CdkInnerScrollDirective,
        CdkMatSidenavHelperDirective,
        CdkMatSidenavTogglerDirective,
        CdkPerfectScrollbarDirective,
        ShowIfRoleDirective,
        ShowIfNotRoleDirective,
        CdkGridColsDirective,
        CdkInputAutoFocusDirective,
        CdkHoverClassDirective,
        CdkAutocompleteMultipleDirective,
        CdkTableColumnResizableDirective
    ]
})

export class DirectivesModule {
}
