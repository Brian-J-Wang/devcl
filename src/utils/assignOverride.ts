function assignOverride<T extends object>(target: T, source: Partial<T>) {
	return Object.assign(target, source);
}

export default assignOverride;
