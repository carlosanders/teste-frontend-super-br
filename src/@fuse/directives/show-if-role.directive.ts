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
    private hasView = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private _loginService: LoginService) {}

    @Input() set showIfRole(role: string) {
        const userProfile = this._loginService.getUserProfile();
        if (userProfile.usuario.vinculacoesRoles && userProfile.usuario.vinculacoesRoles.length > 0) {
            const hasRole = userProfile.usuario.vinculacoesRoles.findIndex((papel: any) => {
                return papel.role.name === role;
            });
            if (hasRole !== -1 && !this.hasView) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.hasView = true;
            } else if (!hasRole && this.hasView) {
                this.viewContainer.clear();
                this.hasView = false;
            }
        }
    }
}
