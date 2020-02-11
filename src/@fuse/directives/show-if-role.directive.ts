import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {LoginService} from '../../app/main/auth/login/login.service';

/**
 * Add the template content to the DOM if the informed role is present on the
 * current user roles
 *
 * If the expression assigned to `showIfRole` evaluates to a truthy value
 * then the templated elements are added to the DOM, else
 * the templated elements are removed from the DOM.
 *
 * <div *showIfRole="'ROLE_COLABORADOR'">
 *   Congrats! Everything is great!
 * </div>
 *
 * ### Syntax
 *
 * - `<div *showIfRole="'ROLE_COLABORADOR'">...</div>`
 * - `<ng-template [showIfRole]="'ROLE_COLABORADOR'"><div>...</div></ng-template>`
 *
 */
@Directive({ selector: '[showIfRole]'})
export class ShowIfRoleDirective {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private _loginService: LoginService) {}

    @Input() set showIfRole(role: string) {
        const userProfile = this._loginService.getUserProfile();
        if (userProfile.roles && userProfile.roles.length > 0) {
            const hasRole = userProfile.roles.findIndex((papel: string) => {
                return papel === role;
            });
            if (hasRole !== -1) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                return;
            }
        }
        this.viewContainer.clear();
    }
}
