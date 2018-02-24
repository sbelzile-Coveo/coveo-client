import { HttpRequestBuilder, IHttpRequestBuilder } from "./HttpRequestBuilder";

export interface IRequestHandlerArgs {
    method?: string;
    baseUri?: string;
    uri?: string;
    headers?: {[key: string]: string};
    query?: {[key: string]: string};
    body?: {[key: string]: string};
}

export class RequestHandler {
    static newRequest(args: IRequestHandlerArgs) {
        return HttpRequestBuilder
            .request()
            .withHeaders(args.headers || {})
            .withHttpMethod(args.method)
            .withUrl(this.buildUrl(args))
            .withBody(args.body ? JSON.stringify(args.body) : undefined)
            .build()
    }

    private static buildUrl(args: IRequestHandlerArgs): string {
        return `${args.baseUri}${args.uri}${this.buildQueryString(args.query)}`
    }

    private static buildQueryString(query?: {[key: string]: string}) {
        if (!query) {
            return "";
        }
        const queryString = Object.keys(query)
            .map(key => `${key}=${query[key]}`)
            .join("&")
        return `?${queryString}`;
    }
}