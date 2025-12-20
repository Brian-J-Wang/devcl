export const hexToRGB: (hex: string, opacity?: number) => number[] = (hex: string, opacity = 1.0) => {
	hex = hex.slice(hex.startsWith("#") ? 1 : 0);
	const arr =
		hex.length == 3 ? [...hex].map((c) => c + c) : [hex.substring(0, 2), hex.substring(2, 4), hex.substring(4, 6)];

	const result = arr.map((value) => parseInt(value, 16));
	result.push(opacity);
	return result;
};
