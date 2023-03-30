import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class VinturasApi implements ICredentialType {
	name = 'vinturasApi';
	displayName = 'Vinturas API';
	documentationUrl = 'https://vinturas-swagger-docs-url';
	properties: INodeProperties[] = [
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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.token}}',
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.domain}}',
			url: '/vehicles',
		},
	};
}
