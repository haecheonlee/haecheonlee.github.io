var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Wrapper } from "./api/wrapper";
import { Builder } from "./ui/builder";
import { Utils } from "./util/utils";
const toggleSpinner = (isSpinnerVisible) => {
    const spinner = document.getElementById("spinner");
    if (!spinner) {
        return;
    }
    if (isSpinnerVisible) {
        spinner.classList.remove("hidden");
    }
    else {
        spinner.classList.add("hidden");
    }
};
const bindOnInput = (id) => {
    const input = document.getElementById(id);
    if (!input) {
        console.info(`${bindOnInput.name}: ${id}`);
        return;
    }
    const setInputWidthByContentLength = (currentInput) => {
        const { length } = currentInput.value;
        if (length) {
            const validFontSize = (() => {
                const computedFontSizeInRem = Number(window
                    .getComputedStyle(document.documentElement)
                    .getPropertyValue("--font-xl"));
                if (!!computedFontSizeInRem && !isNaN(computedFontSizeInRem)) {
                    return computedFontSizeInRem;
                }
                return 1;
            })();
            const calculatedWidth = length * validFontSize;
            currentInput.style.width = `${calculatedWidth}rem`;
        }
        else {
            currentInput.style.width = "";
        }
    };
    const requestCurrentWeatherByCityName = (cityName) => __awaiter(void 0, void 0, void 0, function* () {
        const wrapper = new Wrapper();
        return yield wrapper.request("current", {
            cityName,
            shouldGetAirQualityData: "no",
        });
    });
    input.oninput = (ev) => {
        const { target } = ev;
        if (target instanceof HTMLInputElement) {
            setInputWidthByContentLength(target);
            const { value } = target;
            Utils.debounce(() => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield requestCurrentWeatherByCityName(value);
                if (!response) {
                    response;
                }
                else if ("error" in response) {
                    Builder.renderWeatherTextForInvalidCity();
                }
                else {
                    Builder.renderCurrentWeatherInCity(response.current.temp_c, response.current.condition.text, response.current.condition.icon, response.current.wind_mph, response.current.precip_mm);
                }
            }), () => {
                Builder.resetCurrentWeather();
                toggleSpinner(true);
            }, () => {
                if (!value) {
                    Builder.resetCurrentWeather();
                }
                toggleSpinner(false);
            }, 2000);
        }
    };
};
const toggleElementFocus = (id, shouldFocus) => {
    const element = document.getElementById(id);
    if (!element) {
        console.info(`${bindOnInput.name}: ${id}`);
        return;
    }
    if (shouldFocus) {
        element.focus();
    }
    else {
        element.blur();
    }
};
document.body.onload = () => {
    bindOnInput("searchCityInputText");
    toggleElementFocus("searchCityInputText", true);
};
