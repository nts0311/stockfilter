const https = require('https');

exports.getRequest = async (url: string): Promise<any> => {
    return new Promise<any>(function (resolve, reject) {
        https.get(url, (resp: any) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk: any) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(JSON.parse(data))
            });
        }).on("error", (err: Error) => {
            console.log("Error: " + err.message);
            reject(err)
        });
    })
}