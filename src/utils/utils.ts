export const formatNumber = (value: any, decimalPlaces: number): number => {
    return parseFloat(value.toFixed(decimalPlaces));
}