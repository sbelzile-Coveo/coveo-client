import { Client } from '../../Client';

export class SectionLimits {
    constructor(private client: Client, private sectionName: string) {}

    get() {
        return this.client
            .get(`/organizations/${this.client.organizationId}/limits/${this.sectionName}`)
            .then(response => JSON.parse(response.responseText));
    }

    getKey() {
        return this.client
            .get(`/organizations/${this.client.organizationId}/limits/${this.sectionName}`)
            .then(response => JSON.parse(response.responseText));
    }

    getKeyHistory() {
        return this.client
            .get(`/organizations/${this.client.organizationId}/limits/${this.sectionName}/history`)
            .then(response => JSON.parse(response.responseText));
    }
}