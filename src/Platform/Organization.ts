import { Client } from '../Client';

export interface ICreateOrganizationsRequestParams {
    name: string;
    owner?: string;
    licenseTemplate?: string;
    organizationTemplate?: string;
}

export class Organization {
    constructor(private client: Client) {}

    create(params: ICreateOrganizationsRequestParams): Promise<any> {
        return this.client
            .post(`/organizations`, undefined, params as any)
    }

    delete(organizationId: string) {
        return this.client
            .delete(`/organizations/${organizationId}`);
    }

    get(organizationId: string) {
        return this.client
            .get(`/organizations/${organizationId}`)
            .then(response => JSON.parse(response.responseText));
    }

    getCurrent() {
        return this.get(this.client.organizationId);
    }

    update(organizationId: string, organizationModel: any) {
        return this.client
            .put(`/organizations/${organizationId}`, organizationModel);
    }

    status(organizationId: string) {
        return this.client
            .get(`/organizations/${organizationId}/status`)
            .then(response => JSON.parse(response.responseText));
    }

    currentStatus() {
        return this.status(this.client.organizationId);
    }
}
