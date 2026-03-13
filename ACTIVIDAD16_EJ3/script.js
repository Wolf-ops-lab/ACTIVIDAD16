const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const currencySelect = document.getElementById("currency-one");
const coin = document.getElementById("coin");
const cargando = document.getElementById("cargando");

let currency = "USD";

let ticketPrice = +movieSelect.value;

populateUI();

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
//update selected count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    //Copy selected seats into array
    //Map through array
    //Return a new array of indexes
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

}

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    // Get selected movie data from localstorage
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');

    if (selectedMovieIndex !== null && selectedMoviePrice !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
        ticketPrice = +selectedMoviePrice;
    }
}

//Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click event

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});
//initial count and total 
updateSelectedCount();

currencySelect.addEventListener("change", () => {

    currency = currencySelect.value;

    cargando.style.display = "block";

    fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
    .then(res => res.json())
    .then(data => {

        const rate = data.rates[currency];

        ticketPrice = (+movieSelect.value * rate).toFixed(2);

        coin.innerText = currency;

        updateSelectedCount();

        cargando.style.display = "none";

    })
    .catch(error => {

        cargando.innerText = "Error loading API";

    });

});