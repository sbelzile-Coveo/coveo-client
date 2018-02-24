import { Client } from "../Client";

export class Sources {
    constructor(private client: Client) {}

    get(): Promise<any> {
        return this.client
            .get(`/organizations/${this.client.organizationId}/sources`, {})
            .then(response => JSON.parse(response.responseText));
    }
}