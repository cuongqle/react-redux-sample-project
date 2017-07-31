export const formatCurrency = (price, locale = 'en-US', symbol = '$') =>
    !!price
    && (price = parseFloat(price))
    && price != 0 ?
        [symbol, price.toLocaleString(locale, price % 1 != 0 ? {maximumFractionDigits: 2} : {})].join("")
        : "";