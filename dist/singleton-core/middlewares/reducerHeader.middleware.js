"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducerHeader = () => (req, res, next) => {
    const fields = req.headers['payload-reducer']
        ? JSON.parse(req.headers['payload-reducer'])
        : false;
    if (fields) {
        if (res.result.data.length === 0 && res.result.data.length) {
            next();
        }
        else if (res.result.data.length === undefined) {
            res.result.data = [res.result.data];
            mapper(res.result.data, fields);
            res.result.data = res.result.data.shift();
            next();
        }
        else {
            mapper(res.result.data, fields);
        }
    }
    next();
};
const mapper = (objectNodes, fields, count = 0) => {
    let jsonReduced;
    const countRecall = count + 1;
    const checkObject = (object) => typeof object === 'object';
    for (const node in objectNodes) {
        const check = checkObject(node);
        if (!check) {
            for (const field of fields) {
                const index = field.split('.');
                if (index.length >= 2 && objectNodes[index[0]] && node === index[0]) {
                    jsonReduced = Object.assign({}, jsonReduced, { [index[1]]: objectNodes[node][index[1]] });
                }
                else if (countRecall <= 1) {
                    jsonReduced = Object.assign({}, jsonReduced, { [index[0]]: objectNodes[node][index[0]] });
                }
            }
            if (jsonReduced && objectNodes[node]) {
                objectNodes[node] = jsonReduced;
            }
        }
        if (checkObject(jsonReduced)) {
            mapper(jsonReduced, fields, countRecall);
        }
    }
};
//# sourceMappingURL=reducerHeader.middleware.js.map