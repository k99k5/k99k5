export const formatLinks = (path: string, args: object) => {
    return path.replace(/:(\w+)/g, (_, key) => {
        return args[key] || '';
    });
};
