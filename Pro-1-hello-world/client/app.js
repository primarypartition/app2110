const GRAPHQL_URL = "http://localhost:9000/";


async function fetchGreeting() {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query {
                    greeting
                }
            `
        })
    });

    const resBody = await response.json();

    console.log(resBody);

    return resBody.data;
}

// fetchGreeting();

fetchGreeting().then(res => {

    const div = document.querySelector('div');

    div.innerText = res.greeting;

});


/** 
 * file:///C:/xampp/htdocs/app2110/Pro-1-hello-world/client/index.html
 *  
 * 
 * https://graphql.org/graphql-js/graphql-clients/
 *  
 */