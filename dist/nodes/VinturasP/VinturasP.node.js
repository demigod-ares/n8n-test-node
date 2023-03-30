"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VinturasP = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class VinturasP {
    constructor() {
        this.description = {
            displayName: 'VinturasP',
            icon: 'file:vinturas.png',
            name: 'vinturasP',
            subtitle: '={{$parameter["requestMethod"] + ": " + $parameter["url"]}}',
            group: ['development'],
            version: 1,
            description: 'Programmatic vinturas node',
            defaults: {
                name: 'VinturasP',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'vinturasApi',
                    required: false,
                },
            ],
            requestDefaults: {},
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
                    placeholder: 'Placeholder value',
                    description: 'The ID of the asset to be fetched',
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const credentials = await this.getCredentials('vinturasApi');
        const baseURL = 'https://api.completenetwork-develop-dccda4b0889a97994bafa4efbcab77ae-0000.eu-de.containers.appdomain.cloud/api/v1/';
        const assetType = this.getNodeParameter('assetType', 0, 'vehicles');
        const assetId = this.getNodeParameter('assetId', 0, '');
        const finalUrl = baseURL + assetType + '/' + assetId;
        console.log('Line 95 : ' + finalUrl);
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${credentials.token}`,
                'Content-Type': 'application/json',
            },
            uri: finalUrl,
        };
        try {
            const stringResponse = await this.helpers.request(options);
            items[0].json = JSON.parse(stringResponse);
        }
        catch (error) {
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Error calling API: ${error.message}`);
        }
        return this.prepareOutputData(items);
    }
}
exports.VinturasP = VinturasP;
//# sourceMappingURL=VinturasP.node.js.map