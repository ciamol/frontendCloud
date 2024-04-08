const baseUrl = 'http://192.168.233.134:4500'
// const baseUrl = 'http://127.0.0.1:4500'
const fetchNoToken = ( endpoint, data, method = 'GET' ) => {
    const url = `${ baseUrl }/${ endpoint }`;    
    if ( method === 'GET' ) {
        return fetch ( url )
    } else {        
        return fetch ( url , {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}
const fetchToken = ( endpoint, data, method = 'GET' ) => {
    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || ''
    if ( method === 'GET' ) {
        return fetch ( url, {
            method,
            headers: {
                'x-token': token
            }
        } )
    } else {
        return fetch ( url , {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        });
    }
}
export {
    fetchNoToken,
    fetchToken
}