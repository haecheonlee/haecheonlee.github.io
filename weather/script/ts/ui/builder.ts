export class Builder {
    public static renderCurrentWeatherInCity(
        temperatureInC: number,
        currentWeatherText: string,
        iconCdnSource: string,
        windInMph: number,
        precipitationInMm: number
    ): void {
        Builder.setWeatherInfo(
            iconCdnSource,
            temperatureInC,
            windInMph,
            precipitationInMm
        );
        Builder.setWeatherText(currentWeatherText);
        Builder.toggleElementOpacityById("weatherInfoContainer", "1");
        Builder.toggleElementOpacityById("weatherTextContainer", "1");
    }

    public static resetCurrentWeather() {
        Builder.hideWeatherInfo();
        Builder.hideWeatherText();
    }

    public static renderWeatherTextForInvalidCity() {
        Builder.clearWeatherInfo();
        Builder.setWeatherTextForInvalidCity();
        Builder.toggleElementOpacityById("weatherInfoContainer", "1");
    }

    private static setWeatherTextForInvalidCity() {
        const weatherInfoContainerId = "weatherInfoContainer";
        const weatherInfo = document.getElementById(weatherInfoContainerId);

        if (!weatherInfo) {
            console.info(
                `${Builder.setWeatherTextForInvalidCity.name}: ${weatherInfoContainerId}`
            );
            return;
        }

        const span = document.createElement("span");
        span.classList.add("invalid-city-weather");
        span.textContent =
            "The following city does not have the weather information.";

        weatherInfo.appendChild(span);
    }

    private static hideWeatherText() {
        Builder.toggleElementOpacityById("weatherTextContainer", "0");
    }

    private static hideWeatherInfo() {
        const weatherInfoContainerId = "weatherInfoContainer";
        const weatherInfo = document.getElementById(weatherInfoContainerId);

        if (!weatherInfo) {
            console.info(
                `${Builder.hideWeatherInfo.name}: ${weatherInfoContainerId}`
            );
            return;
        }

        Builder.toggleElementOpacityById(weatherInfoContainerId, "0");
    }

    private static clearWeatherInfo() {
        const weatherInfoContainerId = "weatherInfoContainer";
        const weatherInfo = document.getElementById(weatherInfoContainerId);

        if (!weatherInfo) {
            console.info(
                `${Builder.hideWeatherInfo.name}: ${weatherInfoContainerId}`
            );
            return;
        }

        while (weatherInfo.lastElementChild) {
            weatherInfo.removeChild(weatherInfo.lastElementChild);
        }
    }

    private static setWeatherInfo(
        iconCdnSource: string,
        temperatureInC: number,
        windInMph: number,
        precipitationInMm: number
    ) {
        const weatherInfoContainerId = "weatherInfoContainer";
        const container = document.getElementById(weatherInfoContainerId);

        if (!container) {
            console.info(
                `${Builder.setWeatherInfo.name}: ${weatherInfoContainerId}`
            );
            return;
        }

        while (container.lastElementChild) {
            container.removeChild(container.lastElementChild);
        }

        const wrapElementsByContainer = (
            classList: Array<string>,
            elements: Array<Element>
        ) => {
            const div = document.createElement("div");

            if (classList.length > 0) {
                div.classList.add(...classList);
            }

            div.append(...elements);

            return div;
        };

        const weatherIconImg = wrapElementsByContainer(
            [],
            [Builder.buildImg(iconCdnSource)]
        );
        const temperatureText = wrapElementsByContainer(
            ["weather-temperature-text-container"],
            [
                Builder.buildTemperatureText(temperatureInC),
                Builder.buildTemperatureTextUnit("c"),
            ]
        );
        const weatherInfo = wrapElementsByContainer(
            ["weather-extra-info-container"],
            [
                Builder.buildWeatherExtraInfo(
                    ["weather-wind-container"],
                    "./images/wind.png",
                    windInMph,
                    "mph"
                ),
                Builder.buildWeatherExtraInfo(
                    ["weather-precipitation-container"],
                    "./images/umbrella.png",
                    precipitationInMm,
                    "mm"
                ),
            ]
        );

        container.append(weatherIconImg, temperatureText, weatherInfo);
    }

    private static buildImg(iconCdnSource: string) {
        const img = document.createElement("img");
        img.src = iconCdnSource;

        return img;
    }

    private static buildTemperatureText(temperature: number) {
        const span = document.createElement("span");

        span.classList.add("weather-temperature-text");
        span.textContent = String(temperature);

        return span;
    }

    private static buildTemperatureTextUnit(unit: "c" | "f") {
        const sup = document.createElement("sup");

        if (unit === "c") {
            sup.textContent = String.fromCharCode(8451);
        } else if (unit === "f") {
            sup.textContent = String.fromCharCode(8457);
        }

        sup.classList.add("weather-temperature-text-unit");

        return sup;
    }

    private static buildWeatherExtraInfo(
        classList: string[],
        iconSource: string,
        info: number,
        unitText: string
    ) {
        const icon = (() => {
            const img = document.createElement("img");
            img.src = iconSource;
            img.classList.add("weather-extra-info-img");

            return img;
        })();

        const text = (() => {
            const span = document.createElement("span");
            span.textContent = String(info);

            const unit = (() => {
                const sub = document.createElement("sub");
                sub.textContent = unitText;

                return sub;
            })();

            span.appendChild(unit);

            return span;
        })();

        const container = document.createElement("div");
        container.classList.add(...classList);

        container.appendChild(icon);
        container.appendChild(text);

        return container;
    }

    private static setWeatherText(weatherText: string) {
        const spanId = "weatherText";
        const span = document.getElementById(spanId);

        if (!span) {
            console.info(`${Builder.setWeatherText.name}: ${spanId}`);
            return;
        }

        span.textContent = weatherText;
    }

    private static toggleElementOpacityById(
        id: string,
        shouldBeVisible: "0" | "1"
    ) {
        const container = document.getElementById(id);
        if (!container) {
            console.info(`${Builder.toggleElementOpacityById.name}: ${id}`);
            return;
        }
        container.style.opacity = shouldBeVisible;
    }
}
