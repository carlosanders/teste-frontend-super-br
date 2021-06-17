import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {LoginService} from '../../app/main/auth/login/login.service';

/**
 * Add the template content to the DOM if the informed role is present on the
 * current user roles
 *
 * If the expression assigned to `showIfNotRole` evaluates to a truthy value
 * then the templated elements are added to the DOM, else
 * the templated elements are removed from the DOM.
 *
 * <div *showIfNotRole="'ROLE_COLABORADOR'">
 *   Congrats! Everything is great!
 * </div>
 *
 * ### Syntax
 *
 * - `<div *showIfNotRole="'ROLE_COLABORADOR'">...</div>`
 * - `<ng-template [showIfNotRole]="'ROLE_COLABORADOR'"><div>...</div></ng-template>`
 *
 */
@Directive({ selector: '[showIfNotRole]'})
export class ShowIfNotRoleDirective {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        public _loginService: LoginService) {}

    @Input() set showIfNotRole(role: string) {
        const userProfile = this._loginService.getUserProfile();
        if (userProfile && userProfile.roles && userProfile.roles.length > 0) {
            const hasRole = userProfile.roles.findIndex((papel: string) => papel.includes(role));
            if (hasRole === -1) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                return;
            }
        }
        this.viewContainer.clear();
    }
}
