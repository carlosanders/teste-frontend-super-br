import {Injectable} from '@angular/core';
import {MatSidenav} from '@cdk/angular/material';

@Injectable({
    providedIn: 'root'
})
export class CdkMatSidenavHelperService
{
    sidenavInstances: MatSidenav[];

    /**
     * Constructor
     */
    constructor()
    {
        this.sidenavInstances = [];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set sidenav
     *
     * @param id
     * @param instance
     */
    setSidenav(id, instance): void
    {
        this.sidenavInstances[id] = instance;
    }

    /**
     * Get sidenav
     *
     * @param id
     * @returns
     */
    getSidenav(id): any
    {
        return this.sidenavInstances[id];
    }
}
