export interface ResponseError {
    error: {
        code: number;
        message: string;
    };
}
export interface ResponseCurrent {
    current: Current;
    location: Location;
}

interface Current {
    cloud: number;
    condition: {
        code: number;
        icon: string;
        text: string;
    };
    gust_kph: number;
    gust_mph: number;
    uv: number;
    vis_miles: number;
    vis_km: number;
    feelslike_f: number;
    feelslike_c: number;
    humidity: number;
    precip_in: number;
    precip_mm: number;
    pressure_in: number;
    pressure_mb: number;
    wind_dir: string;
    wind_degree: number;
    wind_kph: number;
    wind_mph: number;
    is_day: number;
    temp_f: number;
    temp_c: number;
    last_updated: string;
    last_updated_epoch: number;
}

interface Location {
    country: string;
    lat: number;
    localtime: Date;
    localtime_epoch: number;
    lon: number;
    name: string;
    region: string;
    tz_id: string;
}
