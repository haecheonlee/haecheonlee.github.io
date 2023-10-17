interface EndPoint {
    method: "GET";
    resource: string;
    params: {};
    body: {};
}

interface RequestOption {
    cityName: string;
    shouldGetAirQualityData: "yes" | "no";
}

type RequestMethod = "current";

export { EndPoint, RequestOption, RequestMethod };
