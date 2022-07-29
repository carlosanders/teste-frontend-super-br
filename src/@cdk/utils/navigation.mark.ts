import {Injectable, Optional} from '@angular/core';
import {NavigationHistory} from "./navigation.history";

@Injectable()
export class NavigationMark {
    register: number;

    constructor(
        private _navigationHistory: NavigationHistory,
        @Optional() private component: string
    ) {
        this.register = this._navigationHistory.register();
    }

    public goBack() {
        this._navigationHistory.go(this.register, this.component);
    }
}

export function navigationMarkFactory(c:string) { return (n: NavigationHistory): NavigationMark => new NavigationMark(n, c) }
