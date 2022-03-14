export interface CdkNavigationItem
{
    id: string;
    title: string;
    type: 'item' | 'group' | 'collapsable';
    translate?: string;
    icon?: string;
    hidden?: boolean;
    url?: string;
    classes?: string;
    exactMatch?: boolean;
    externalUrl?: boolean;
    openInNewTab?: boolean;
    startExpanded?: boolean;
    function?: any;
    badge?: {
        title?: string;
        translate?: string;
        bg?: string;
        fg?: string;
    };
    children?: CdkNavigationItem[];
    role?: string|string[];
    isCoordenador?: boolean;
}

export interface CdkNavigation extends CdkNavigationItem
{
    children?: CdkNavigationItem[];
}
