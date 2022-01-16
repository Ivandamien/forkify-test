import { TIMEOUT_SEC } from './config.js'

const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};


//Shorter method of fetching promises using ternary operator
export const AJAX = async function(url, uploadData = undefined) {
    try {
        const fetchPro = uploadData ? fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadData),

        }) : fetch(url);

        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        //console.log(res, data);

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;

    } catch (err) {
        throw err

    }

}


/*
longer method of fetching and calling promises

export const getJSON = async function(url) {
    try {
        const fetchPro = fetch(url);
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        //console.log(res, data);

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;

    } catch (err) {
        throw err

    }

}

export const sendJSON = async function(url, uploadData) {
    try {
        const fetchPro = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadData),

        });
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        //console.log(res, data);

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;

    } catch (err) {
        throw err

    }
}
*/