export interface IHttpRequestBuilder {
    withBody(body: string): IHttpRequestBuilder;
    withHeaders(headers: {[key: string]: string}): IHttpRequestBuilder;
    withHttpMethod(method: string): IHttpRequestBuilder;
    withUrl(url: string): IHttpRequestBuilder;
    build(): Promise<XMLHttpRequest>;
}

export class HttpRequestBuilder implements IHttpRequestBuilder {
    private body: string;
    private headers: {[key: string]: string} = {};
    private method: string;
    private url: string;

    static request(): IHttpRequestBuilder {
        return new HttpRequestBuilder();
    }

    withBody(body: string): IHttpRequestBuilder {
        this.body = body;
        return this;
    }

    withHeaders(headers: {[key: string]: string}): IHttpRequestBuilder {
        this.headers = headers;
        return this;
    }

    withHttpMethod(method: string): IHttpRequestBuilder {
        this.method = method;
        return this;
    }

    withUrl(url: string): IHttpRequestBuilder {
        this.url = url;
        return this;
    }

    build(): Promise<XMLHttpRequest> {
        return new Promise<XMLHttpRequest>((resolve, reject) => {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.open(this.method,
                        this.url,
                        true);
            Object.keys(this.headers).forEach(key => xmlHttp.setRequestHeader(key, this.headers[key]));

            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState === XMLHttpRequest.DONE) {
                    if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
                        resolve(xmlHttp);
                    } else {
                        let errorText: string = xmlHttp.responseText;
                        const error = xmlHttp.responseText ? JSON.parse(xmlHttp.responseText) : null;
                        if (error && error.message) {
                            errorText = error.message;
                        }
                        reject(new Error(errorText || "HTTP request error."));
                    }
                }
            }

            xmlHttp.send(this.body);
        });
    }
}