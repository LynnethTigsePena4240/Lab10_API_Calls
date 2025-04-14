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

document.getElementById("Submit").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: document.getElementById("title").value,
            body: document.getElementById("body").value
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data submitted successfully:', data);
        alert(`Data submitted successfully! \n title: ${data.title} \n body: ${data.body}`);
        document.getElementById("form").reset();
    })
    .catch(error => 
    {
        console.error('Error submitting data:', error)
    })

})

document.getElementById("Update").addEventListener("click", function(event) {
    event.preventDefault();
    const id = document.getElementById("id").value; // Get the ID from the input field
    if (!id) {
        alert('Please enter an ID to update.');
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                console.log('Data updated successfully:', data);
                alert(`Data updated successfully! \n title: ${data.title} \n body: ${data.body}`);
                displayData(data);
                document.getElementById("form").reset();
            } 
            else {
                console.error('Error updating data:', xhr.statusText);
                alert('Error updating data ' + xhr.statusText);
            }
        }
    };
    const updatedData = {
        title: document.getElementById("title").value,
        body: document.getElementById("body").value
    };
    xhr.send(JSON.stringify(updatedData));
})