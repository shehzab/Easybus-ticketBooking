// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const fromSelect = document.getElementById('from-destination');
    const toSelect = document.getElementById('to-destination');
    const submitButton = document.querySelector('button[type="submit"]');
    const fareDisplay = document.getElementById('fare-display');

    // More comprehensive distance data (in km) between cities
    const distances = {
        'Kasaragod-Kannur': 90,
        'Kasaragod-Kozhikode': 200,
        'Kasaragod-Kochi': 380,
        'Kasaragod-Thiruvananthapuram': 570,
        'Kannur-Kozhikode': 110,
        'Kannur-Kochi': 290,
        'Kannur-Thiruvananthapuram': 480,
        'Kozhikode-Kochi': 180,
        'Kozhikode-Thiruvananthapuram': 370,
        'Kochi-Thiruvananthapuram': 200,
        'Kochi-Mysore': 460,
        'Kochi-Bengaluru': 550,
        'Kochi-Chennai': 690,
        'Thiruvananthapuram-Mysore': 630,
        'Thiruvananthapuram-Bengaluru': 730,
        'Thiruvananthapuram-Chennai': 780,
        'Mysore-Bengaluru': 150,
        'Mysore-Chennai': 480,
        'Bengaluru-Chennai': 350,
        'Bengaluru-Hyderabad': 570,
        'Bengaluru-Pune': 840,
        'Bengaluru-Mumbai': 980,
        'Chennai-Hyderabad': 630,
        'Chennai-Pune': 1170,
        'Chennai-Mumbai': 1330,
        'Hyderabad-Pune': 560,
        'Hyderabad-Mumbai': 700,
        'Hyderabad-Delhi': 1580,
        'Pune-Mumbai': 150,
        'Pune-Delhi': 1420,
        'Mumbai-Delhi': 1400,
        'Delhi-Agra': 230,
        'Delhi-Jaipur': 270,
        'Agra-Jaipur': 240
    };

    // Function to calculate fare based on distance
    function calculateFare(from, to) {
        const route = `${from}-${to}`;
        const reverseRoute = `${to}-${from}`;
        let distance = distances[route] || distances[reverseRoute];
        
        if (!distance) {
            return "Fare information not available for this route.";
        }
        
        // More realistic fare calculation
        let baseFare = 50; // Base fare in rupees
        let ratePerKm;

        if (distance <= 100) {
            ratePerKm = 2;
        } else if (distance <= 300) {
            ratePerKm = 1.8;
        } else if (distance <= 700) {
            ratePerKm = 1.5;
        } else {
            ratePerKm = 1.2;
        }

        const distanceFare = distance * ratePerKm;
        const serviceTax = (baseFare + distanceFare) * 0.05; // 5% service tax
        const totalFare = baseFare + distanceFare + serviceTax;
        
        return `Estimated fare: ₹${totalFare.toFixed(2)} (${distance} km)`;
    }

    // Function to update fare display
    function updateFareDisplay() {
        const from = fromSelect.value;
        const to = toSelect.value;
        
        if (from !== 'select' && to !== 'select' && from !== to) {
            const fare = calculateFare(from, to);
            fareDisplay.textContent = fare;
        } else {
            fareDisplay.textContent = '';
        }
    }

    // Function to validate the form
    function validateForm() {
        const fromValue = fromSelect.value;
        const toValue = toSelect.value;
        const passengerName = document.querySelector('input[placeholder="Passenger Name"]').value;
        const age = document.querySelector('input[placeholder="Age"]').value;
        const contactNumber = document.querySelector('input[placeholder="Contact Number"]').value;
        const travelDate = document.querySelector('input[placeholder="Travel Date"]').value;
        const numberOfTickets = document.querySelector('input[placeholder="Number of Tickets"]').value;

        if (fromValue === 'select' || toValue === 'select') {
            alert('Please select both departure and destination locations.');
            return false;
        }

        if (fromValue === toValue) {
            alert('Departure and destination cannot be the same.');
            return false;
        }

        if (!passengerName || !age || !contactNumber || !travelDate || !numberOfTickets) {
            alert('Please fill in all passenger information fields.');
            return false;
        }

        if (isNaN(age) || age < 1 || age > 120) {
            alert('Please enter a valid age.');
            return false;
        }

        if (isNaN(numberOfTickets) || numberOfTickets < 1) {
            alert('Please enter a valid number of tickets.');
            return false;
        }

        const today = new Date();
        const selectedDate = new Date(travelDate);
        if (selectedDate < today) {
            alert('Please select a future date for travel.');
            return false;
        }

        return true;
    }

    // Add event listener to the submit button
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        if (validateForm()) {
            alert('Booking submitted successfully!');
            // Here you would typically send the data to a server
        }
    });

    // Function to update available destinations based on departure
    function updateDestinations() {
        const selectedFrom = fromSelect.value;
        Array.from(toSelect.options).forEach(option => {
            option.disabled = option.value === selectedFrom;
        });
        updateFareDisplay();
    }

    // Add event listeners to update fare when selections change
    fromSelect.addEventListener('change', updateFareDisplay);
    toSelect.addEventListener('change', updateFareDisplay);

    // Add event listener to update destinations when 'from' is changed
    fromSelect.addEventListener('change', updateDestinations);

    // Initial call to set up correct destinations
    updateDestinations();
});