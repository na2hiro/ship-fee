export function stringifyWeight(weight: number) {
    if(weight>=1000) return `${weight/1000}kg`;
    return `${weight}g`
}
