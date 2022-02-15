const protocol = location.protocol; // https:
const basename = location.hostname.split('.')[0]; // supp, supp-int, supp-homol ou supp-treina...
const basenameNamespaceSafe = basename.lastIndexOf('-') > 0 ? basename.substring(0, basename.lastIndexOf('-')) : basename; //supp
const url = location.hostname.replace(basenameNamespaceSafe, ''); // .agu.gov.br, -int.subdomin.agu.gov.br, -homol.subdomin.agu.gov.br, -treina.subdomin.agu.gov.br

export const environment = {
    test: false,
    production: true,
    base_url: protocol + '//' + basenameNamespaceSafe + 'backend' + url + '/',
    api_url: protocol + '//' + basenameNamespaceSafe + 'backend' + url + '/v1/',
    mercure_hub: protocol + '//' + basenameNamespaceSafe + 'mercure' + url + '/.well-known/mercure',
    xdebug: '',
    barramento: false
};
