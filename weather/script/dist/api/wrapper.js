var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Wrapper_api, _Wrapper_apiKey, _Wrapper_endpoints;
import { config } from "../config/config";
export class Wrapper {
    constructor() {
        _Wrapper_api.set(this, void 0);
        _Wrapper_apiKey.set(this, void 0);
        _Wrapper_endpoints.set(this, void 0);
        __classPrivateFieldSet(this, _Wrapper_api, config.WEATHER_API, "f");
        __classPrivateFieldSet(this, _Wrapper_apiKey, config.WEATHER_API_KEY, "f");
        __classPrivateFieldSet(this, _Wrapper_endpoints, {
            current: (options) => {
                const { cityName, shouldGetAirQualityData } = options;
                if (!cityName) {
                    return null;
                }
                return {
                    method: "GET",
                    resource: `${__classPrivateFieldGet(this, _Wrapper_api, "f")}/current.json?key=${__classPrivateFieldGet(this, _Wrapper_apiKey, "f")}&q=${cityName}&aqi=${shouldGetAirQualityData}
                    `,
                    params: {},
                    body: {},
                };
            },
        }, "f");
    }
    request(method, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpointCallback = __classPrivateFieldGet(this, _Wrapper_endpoints, "f")[method];
            if (!endpointCallback) {
                return null;
            }
            const endpoint = endpointCallback(options);
            if (!endpoint) {
                return null;
            }
            const response = yield fetch(endpoint.resource);
            return response.json();
        });
    }
}
_Wrapper_api = new WeakMap(), _Wrapper_apiKey = new WeakMap(), _Wrapper_endpoints = new WeakMap();
