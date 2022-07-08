import {Injectable, Optional} from '@angular/core';
import {NavigationHistory} from "./navigation.history";

@Injectable()
export class NavigationMark {
    register: number;

    constructor(
        private navigationHistory: NavigationHistory,
        @Optional() private component: string
    ) {
        this.register = this.navigationHistory.register();
    }

    goBack() {
        this.navigationHistory.go(this.register, this.component);
    }
}

