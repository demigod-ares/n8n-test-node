import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class VinturasQuery implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'VinturasQuery',
		name: 'vinturasQuery',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
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
		/**
		 * In the properties array we have two mandatory options objects required
		 *
		 * [Resource & Operation]
		 *
		 * https://docs.n8n.io/integrations/creating-nodes/code/create-first-node/#resources-and-operations
		 *
		 * In our example, the operations are separated into their own file (HTTPVerbDescription.ts)
		 * to keep this class easy to read.
		 *
		 */
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
					// request: {
					// 	method: 'GET',
					// 	url: '/vehicles/{{$parent}}', // this refers to Vinturas query
					// },
					send: {
						property: 'some random string',
						type: 'query',
					},
				},
			},
		],
	};
}
