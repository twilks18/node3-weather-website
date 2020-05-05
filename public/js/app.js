const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value //can't put a semi colon at the end of value
    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                return messageOne.textContent = data.error;
            };
            messageOne.textContent = 'Location: ' + data.location;
            messageTwo.textContent = 'Forecast: ' + data.forecast;
                });
    });

});
