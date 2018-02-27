import { Sources } from "./Source/Sources";
import { RequestHandler, IRequestHandlerArgs } from "./http/RequestHandler";
import { Source } from "./Source/Source";
import { Organizations } from './Platform/Organizations';
import { Organization } from './Platform/Organization';
import { Limits } from './Platform/Limits/Limits';

export interface IClientOptions {
    token: string;
    organizationId?: string;
    platformUrl?: string;
}

export class Client {
    private limits: Limits;
    private organization: Organization;
    private organizations: Organizations;
    private source: Source;
    private sources: Sources;
    private defaultArgs: IRequestHandlerArgs;

    get organizationId() {
        return this.options.organizationId;
    }

    get Limits() {
        return this.limits;
    }

    get Organization() {
        return this.organization;
    }

    get Organizations() {
        return this.organizations;
    }

    get Source() {
        return this.source;
    }

    get Sources() {
        return this.sources;
    }

    constructor(private options: IClientOptions) {
        this.limits = new Limits(this);
        this.organization = new Organization(this);
        this.organizations = new Organizations(this);
        this.source = new Source(this);
        this.sources = new Sources(this);
        this.defaultArgs = {
            baseUri: options.platformUrl || "https://platform.cloud.coveo.com/rest",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${options.token}`
            }
        }
    }

    get(uri: string, query?: {[key: string]: string}): Promise<XMLHttpRequest> {
        return this.request({
            method: "GET",
            uri,
            query
        });
    }

    delete(uri: string, query?: {[key: string]: string}): Promise<XMLHttpRequest> {
        return this.request({
            method: "DELETE",
            uri,
            query
        });
    }

    post(uri: string, body?: {[key: string]: string}, query?: {[key: string]: string}): Promise<XMLHttpRequest> {
        return this.request({
            method: "POST",
            uri,
            body,
            query
        });
    }

    put(uri: string, body?: {[key: string]: string}, query?: {[key: string]: string}): Promise<XMLHttpRequest> {
        return this.request({
            method: "PUT",
            uri,
            body,
            query
        });
    }

    request(args: IRequestHandlerArgs) {
        const requestArgs = Object.assign({}, this.defaultArgs, args);
        return RequestHandler.newRequest(requestArgs);
    }
}