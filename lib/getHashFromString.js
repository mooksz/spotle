export const getHashFromString = url => {
    if (typeof url !== 'string') return url;
    return url.split('#')[1] ? url.split('#')[1] : false;
};
