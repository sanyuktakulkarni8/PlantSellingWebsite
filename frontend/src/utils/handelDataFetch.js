const handelDataFetch = async (path, method, body) => {
    return new Promise(
        async (resolve, rejected) => {
            // attaching the backend api url to frontend
            const apiUrl =  "http://localhost:8000" + path;

            const res = await fetch(apiUrl, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                credentials: 'include',
                body: body === null ? null : JSON.stringify(body)
            });

            const data = await res.json();
            if (data.status) {
                resolve({ data })
            } else {
                const error = new Error(data.message);
                rejected(error)
            }
        }
    )
}

export default handelDataFetch;