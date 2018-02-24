import { Client } from "../Client";

export class Source {
    constructor(private client: Client) {}

    get(sourceId: string): Promise<any> {
        return this.client
            .get(`/organizations/${this.client.organizationId}/sources/${sourceId}`)
            .then(response => JSON.parse(response.responseText));
    }

    delete(sourceId: string): Promise<any> {
        return this.client
            .delete(`/organizations/${this.client.organizationId}/sources/${sourceId}`);
    }

    create(model: {[key: string]: any}): Promise<any> {
        return this.client.post(`/organizations/${this.client.organizationId}/sources`, model);
    }

    createRaw(model: {[key: string]: any}): Promise<any> {
        return this.client.post(`/organizations/${this.client.organizationId}/sources/raw`, model);
    }

    rebuild(sourceId: string): Promise<any> {
        return this.client.post(`/organizations/${this.client.organizationId}/sources/${sourceId}/rebuild`);
    }

    refresh(sourceId: string): Promise<any> {
        return this.client.post(`/organizations/${this.client.organizationId}/sources/${sourceId}/fullRefresh`);
    }

    incrementalRefresh(sourceId: string): Promise<any> {
        return this.client.post(`/organizations/${this.client.organizationId}/sources/${sourceId}/incrementalRefresh`);
    }
}