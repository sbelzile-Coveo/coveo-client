import { Sources } from "./Source/Sources";
import { RequestHandler, IRequestHandlerArgs } from "./http/RequestHandler";
import { Source } from "./Source/Source";

export interface IClientOptions {
    token: string;
    organizationId?: string;
    platformUrl?: string;
}

export class Client {
    private sources: Sources;
    private source: Source;
    private defaultArgs: IRequestHandlerArgs;

    get organizationId() {
        return this.options.organizationId;
    }

    get Sources() {
        return this.sources;
    }

    get Source() {
        return this.source;
    }

    constructor(private options: IClientOptions) {
        this.sources = new Sources(this);
        this.source = new Source(this);
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

    post(uri: string, body?: {[key: string]: string}): Promise<XMLHttpRequest> {
        return this.request({
            method: "POST",
            uri,
            body
        });
    }

    request(args: IRequestHandlerArgs) {
        const requestArgs = Object.assign({}, this.defaultArgs, args);
        return RequestHandler.newRequest(requestArgs);
    }
}