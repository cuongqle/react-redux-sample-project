import { addLocaleData } from "react-intl";

export function loadLocaleData(locale) {
    return new Promise(resolve => {
        switch(locale) {
            case "es":
                addLocaleData(require("react-intl/locale-data/es"));
                resolve();
                break;
            default:
                addLocaleData(require("react-intl/locale-data/en"));
                resolve();
            }
    });
}