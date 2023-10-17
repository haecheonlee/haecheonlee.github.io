import { Wrapper } from "./api/wrapper";
import { ResponseCurrent, ResponseError } from "./types/weather";
import { Builder } from "./ui/builder";
import { Utils } from "./util/utils";

const toggleSpinner = (isSpinnerVisible: boolean) => {
    const spinner = document.getElementById("spinner");

    if (!spinner) {
        return;
    }

    if (isSpinnerVisible) {
        spinner.classList.remove("hidden");
    } else {
        spinner.classList.add("hidden");
    }
};

const bindOnInput = (id: string) => {
    const input = document.getElementById(id);

    if (!input) {
        console.info(`${bindOnInput.name}: ${id}`);
        return;
    }

    const setInputWidthByContentLength = <T extends HTMLInputElement>(
        currentInput: T
    ) => {
        const { length } = currentInput.value;

        if (length) {
            const validFontSize = (() => {
                const computedFontSizeInRem = Number(
                    window
                        .getComputedStyle(document.documentElement)
                        .getPropertyValue("--font-xl")
                );

                if (!!computedFontSizeInRem && !isNaN(computedFontSizeInRem)) {
                    return computedFontSizeInRem;
                }

                return 1;
            })();
            const calculatedWidth = length * validFontSize;
            currentInput.style.width = `${calculatedWidth}rem`;
        } else {
            currentInput.style.width = "";
        }
    };

    const requestCurrentWeatherByCityName = async (cityName: string) => {
        const wrapper = new Wrapper();

        return await wrapper.request<ResponseCurrent | ResponseError>(
            "current",
            {
                cityName,
                shouldGetAirQualityData: "no",
            }
        );
    };

    input.oninput = (ev: Event) => {
        const { target } = ev;
        if (target instanceof HTMLInputElement) {
            setInputWidthByContentLength(target);

            const { value } = target;
            Utils.debounce(
                async () => {
                    const response = await requestCurrentWeatherByCityName(
                        value
                    );

                    if (!response) {
                        response;
                    } else if ("error" in response) {
                        Builder.renderWeatherTextForInvalidCity();
                    } else {
                        Builder.renderCurrentWeatherInCity(
                            response.current.temp_c,
                            response.current.condition.text,
                            response.current.condition.icon,
                            response.current.wind_mph,
                            response.current.precip_mm
                        );
                    }
                },
                () => {
                    Builder.resetCurrentWeather();
                    toggleSpinner(true);
                },
                () => {
                    if (!value) {
                        Builder.resetCurrentWeather();
                    }
                    toggleSpinner(false);
                },
                2000
            );
        }
    };
};

const toggleElementFocus = (id: string, shouldFocus: boolean) => {
    const element = document.getElementById(id);

    if (!element) {
        console.info(`${bindOnInput.name}: ${id}`);
        return;
    }

    if (shouldFocus) {
        element.focus();
    } else {
        element.blur();
    }
};

document.body.onload = () => {
    bindOnInput("searchCityInputText");
    toggleElementFocus("searchCityInputText", true);
};
