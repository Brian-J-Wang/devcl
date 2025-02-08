export function sanitize(data: { [key: string]: any}) {
    const stack = [];
    stack.push(data);
    
    while (stack.length != 0) {
        const current = stack.shift();

        for (let key in current) {
            if (key === "_id") { 
                if (current[key].$oid) {
                    current[key] = current[key].$oid;
                }
            }
            if (current[key] instanceof Object) {
                stack.push(current[key]);
            }
        }
    }

    return data as any;
}