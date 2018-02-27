import { Client } from '../Client';

export interface IGetOrganizationsRequestParams {
    additionalFields?: string;
    filter?: string;
    sortBy?: string;
    order?: string;
    page?: number;
    perPage?: number;
}

export class Organizations {
    constructor(private client: Client) {}

    get(params?: IGetOrganizationsRequestParams): Promise<any> {
        return this.client
            .get(`/organizations`, params as any)
            .then(response => JSON.parse(response.responseText));
    }
}
