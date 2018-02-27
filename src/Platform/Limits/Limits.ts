import { Client } from '../../Client';
import { SectionLimits } from './SectionLimits';

export class Limits {
    private content: SectionLimits;
    private organization: SectionLimits;
    private searchApi: SectionLimits;
    private usageAnalytics: SectionLimits;

    constructor(private client: Client) {
        this.content = new SectionLimits(this.client, "content");
        this.organization = new SectionLimits(this.client, "organization");
        this.searchApi = new SectionLimits(this.client, "searchapi");
        this.usageAnalytics = new SectionLimits(this.client, "usageAnalytics");
    }

    get Content() {
        return this.content;
    }

    get Organization() {
        return this.organization;
    }

    get SearchApi() {
        return this.searchApi;
    }

    get UsageAnalytics() {
        return this.usageAnalytics;
    }

    get() {
        return this.client
            .get(`/organizations/${this.client.organizationId}/limits`)
            .then(response => JSON.parse(response.responseText));
    }
}