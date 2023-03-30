"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VinturasApi = void 0;
class VinturasApi {
    constructor() {
        this.name = 'vinturasApi';
        this.displayName = 'Vinturas API';
        this.documentationUrl = 'https://vinturas-swagger-docs-url';
        this.properties = [
            {
                displayName: 'Token',
                name: 'token',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Domain',
                name: 'domain',
                type: 'string',
                default: 'https://api.completenetwork-develop-dccda4b0889a97994bafa4efbcab77ae-0000.eu-de.containers.appdomain.cloud/api/v1/',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '={{"Bearer " + $credentials.token}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials?.domain}}',
                url: '/vehicles',
            },
        };
    }
}
exports.VinturasApi = VinturasApi;
//# sourceMappingURL=VinturasApi.credentials.js.map