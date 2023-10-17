import { config } from "../config/config";
import { EndPoint, RequestMethod, RequestOption } from "../types/wrapper";

export class Wrapper {
    #api: string;
    #apiKey: string;
    #endpoints: {
        [K in RequestMethod]: (options: RequestOption) => EndPoint | null;
    };

    constructor() {
        this.#api = config.WEATHER_API;
        this.#apiKey = config.WEATHER_API_KEY;
        this.#endpoints = {
            current: (options: RequestOption) => {
                const { cityName, shouldGetAirQualityData } = options;

                if (!cityName) {
                    return null;
                }

                return {
                    method: "GET",
                    resource: `${this.#api}/current.json?key=${
                        this.#apiKey
                    }&q=${cityName}&aqi=${shouldGetAirQualityData}
                    `,
                    params: {},
                    body: {},
                };
            },
        };
    }

    public async request<T>(
        method: RequestMethod,
        options: RequestOption
    ): Promise<T | null> {
        const endpointCallback = this.#endpoints[method];

        if (!endpointCallback) {
            return null;
        }

        const endpoint = endpointCallback(options);
        if (!endpoint) {
            return null;
        }

        const response = await fetch(endpoint.resource);
        return response.json() as T;
    }
}
