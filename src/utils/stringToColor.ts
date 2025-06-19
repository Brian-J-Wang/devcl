
export const stringToColour = (str: string, opacity: number) => {
    let hash = 0;
    str.split('').forEach(char => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })
    let colour = [0, 0, 0, 0.5];
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        colour[i] = value;
    }
    return colour.join(",");
}