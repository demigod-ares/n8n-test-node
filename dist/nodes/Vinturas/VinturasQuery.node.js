"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VinturasQuery = void 0;
class VinturasQuery {
    constructor() {
        this.description = {
            displayName: 'VinturasQuery',
            name: 'vinturasQuery',
            icon: 'file:vinturas.png',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["assetType"]}}',
            description: 'Interact with Vinturas Query API',
            defaults: {
                name: 'vinturasQuery',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'vinturasApi',
                    required: false,
                },
            ],
            requestDefaults: {
                baseURL: 'https://api.completenetwork-develop-dccda4b0889a97994bafa4efbcab77ae-0000.eu-de.containers.appdomain.cloud/api/v1/',
                url: '',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            properties: [
                {
                    displayName: 'AssetType',
                    name: 'assetType',
                    type: 'options',
                    options: [
                        {
                            name: 'Vehicles',
                            value: 'vehicles',
                        },
                        {
                            name: 'Assets',
                            value: 'assets',
                        },
                    ],
                    default: 'vehicles',
                    description: 'The type of asset to be fetched',
                    routing: {
                        request: {
                            method: 'GET',
                            url: '/vehicles/',
                        },
                    },
                },
                {
                    displayName: 'Send Query Parameters',
                    name: 'sendQuery',
                    type: 'boolean',
                    default: false,
                    noDataExpression: true,
                    description: 'Whether the request has query params or not',
                },
                {
                    displayName: 'Asset ID',
                    name: 'assetId',
                    type: 'string',
                    default: '',
                    displayOptions: {
                        show: {
                            sendQuery: [true],
                        },
                    },
                    description: 'The ID of the asset to be fetched',
                    routing: {
                        send: {
                            property: 'some random string',
                            type: 'query',
                        },
                    },
                },
            ],
        };
    }
}
exports.VinturasQuery = VinturasQuery;
//# sourceMappingURL=VinturasQuery.node.js.map