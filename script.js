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