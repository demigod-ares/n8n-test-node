import type {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IExecuteFunctions,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { OptionsWithUri } from 'request-promise-native';
// import { OptionsWithUri } from 'request-promise-native';


export class VinturasP implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'VinturasP',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
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
		requestDefaults: {

		},
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
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

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData(); // this node don't get any input data as of now

		const credentials = await this.getCredentials('vinturasApi');
		const baseURL: string = 'https://api.completenetwork-develop-dccda4b0889a97994bafa4efbcab77ae-0000.eu-de.containers.appdomain.cloud/api/v1/';
		const assetType: string = this.getNodeParameter('assetType', 0, 'vehicles') as string;
		const assetId: string = this.getNodeParameter('assetId', 0, '') as string;
		const finalUrl: string = baseURL + assetType + '/' +assetId;
		console.log('Line 95 : ' + finalUrl);
		const options: OptionsWithUri = {
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
		} catch (error) {
			throw new NodeOperationError(this.getNode(), `Error calling API: ${error.message}`);
		}

		return this.prepareOutputData(items);
	}

}
