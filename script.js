document.getElementById("fetch()").addEventListener("click", function() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => 
        {
            if (!response.ok) {
                throw new Error('Network response was not ok ');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
})

function displayData(data) {
    const displayDiv = document.getElementById('display_text');
    displayDiv.innerHTML = `<h2>${data.title}</h2><p>${data.body}</p>`;
}

document.getElementById("XHR").addEventListener("click", function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) { // self note 4 means the request is done
            if (xhr.status === 200) { // and 200 means the request was successful
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                displayData(data);
            } else {
                console.error('Error fetching data:', xhr.statusText);
            }
        }
    };
    xhr.send();
})