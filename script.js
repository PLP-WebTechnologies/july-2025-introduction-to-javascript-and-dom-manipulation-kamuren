// Part 1: Variables and Data Types
const destinations = [
    {
        name: 'Masai Mara',
        description: 'Home to the Great Migration and incredible wildlife',
        image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53',
        price: 250
    },
    {
        name: 'Diani Beach',
        description: 'Pristine white sand beaches and crystal clear waters',
        image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd',
        price: 150
    },
    {
        name: 'Mount Kenya',
        description: 'Second highest peak in Africa with breathtaking views',
        image: 'https://images.unsplash.com/photo-1589308157476-55226cc2c05e?auto=format&fit=crop&w=800',
        price: 180
    },
    {
        name: 'Lamu',
        description: 'Historic coastal town with rich Swahili culture',
        image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=800',
        price: 200
    }
];

let currentDestinationIndex = 0;
let isSubscribed = false;

// Part 2: Functions
function createDestinationCard(destination) {
    return `
        <div class="destination-card">
            <img src="${destination.image}" alt="${destination.name}">
            <div class="destination-info">
                <h3>${destination.name}</h3>
                <p>${destination.description}</p>
                <p class="price">From $${destination.price} per day</p>
                <button onclick="bookDestination('${destination.name}')">Book Now</button>
            </div>
        </div>
    `;
}

function calculateTotalPrice(days, price) {
    // Apply discount for longer stays
    if (days >= 7) {
        return days * price * 0.9; // 10% discount
    }
    return days * price;
}

// Part 3: Loops
function loadDestinations() {
    const container = document.getElementById('destination-container');
    container.innerHTML = ''; // Clear existing content

    
    for (const destination of destinations) {
        container.innerHTML += createDestinationCard(destination);
    }
}

function createGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    let galleryHTML = '';
    
    // Using traditional for loop to create gallery items
    for (let i = 0; i < destinations.length; i++) {
        galleryHTML += `
            <div class="gallery-item">
                <img src="${destinations[i].image}" alt="${destinations[i].name}">
            </div>
        `;
    }
    
    galleryContainer.innerHTML = galleryHTML;
}

// Part 4: DOM Manipulation
document.addEventListener('DOMContentLoaded', () => {
    // Load initial content
    loadDestinations();
    createGallery();

    // Event listener for the subscribe form
    document.getElementById('subscribe-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const favorite = document.getElementById('favorite-destination').value;

        if (name && email) {
            isSubscribed = true;
            alert(`Thank you ${name} for subscribing! We'll send updates about ${favorite || 'all destinations'} to ${email}`);
            e.target.reset();
        }
    });

    // Event listener for load more button
    document.getElementById('load-more').addEventListener('click', () => {
        
        destinations.push(...destinations.slice(0, 2));
        loadDestinations();
    });
});

// Booking function
function bookDestination(destinationName) {
    const days = prompt(`How many days would you like to stay in ${destinationName}?`);
    
    if (days && !isNaN(days)) {
        const destination = destinations.find(d => d.name === destinationName);
        if (destination) {
            const totalPrice = calculateTotalPrice(parseInt(days), destination.price);
            alert(`Booking summary for ${destinationName}:\nDuration: ${days} days\nTotal Price: $${totalPrice}`);
        }
    }
}
