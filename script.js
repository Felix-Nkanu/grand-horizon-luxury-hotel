/*=====================================================
            GRAND HORIZON LUXURY HOTEL
                    SCRIPT.JS
=====================================================*/


/*=====================================================
                GLOBAL FEATURES
=====================================================*/


/*=========================
        Sticky Navbar
==========================*/

const navbar = document.querySelector(".hotel-navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });

}


/*=========================
     Active Navigation
==========================*/

const navLinks = document.querySelectorAll(".nav-link");

const bookingBtn = document.getElementById("bookingBtn");

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

// Highlight navigation links
navLinks.forEach(link => {

    if (link.getAttribute("href") === currentPage) {

        link.classList.add("active");

    }

});

// Highlight booking button
if (bookingBtn && currentPage === "booking.html") {

    bookingBtn.classList.add("active");

}


/*=========================
    Scroll Reveal
==========================*/

const reveals = document.querySelectorAll(".reveal");

function revealSections() {

    reveals.forEach(section => {

        const windowHeight = window.innerHeight;

        const revealTop = section.getBoundingClientRect().top;

        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealSections);

revealSections();


/*=========================
    Animated Counter
==========================*/

const counters = document.querySelectorAll(".counter");

if (counters.length > 0) {

    const counterObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = +counter.dataset.target;

            let count = 0;

            const speed = target / 100;

            const updateCounter = () => {

                count += speed;

                if (count < target) {

                    counter.textContent = Math.ceil(count);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target + "+";

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}


/*=========================
    Back To Top Button
==========================*/

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}



/*=====================================================
                GALLERY PAGE
=====================================================*/

const lightbox = document.getElementById("lightbox");

if (lightbox) {

    const galleryImages = document.querySelectorAll(".gallery-img");

    const lightboxImage = document.getElementById("lightboxImage");

    const closeLightbox = document.querySelector(".close-lightbox");

    const prevLightbox = document.querySelector(".prev-lightbox");

    const nextLightbox = document.querySelector(".next-lightbox");

    let currentImageIndex = 0;

    galleryImages.forEach((image, index) => {

        image.addEventListener("click", () => {

            currentImageIndex = index;

            lightbox.classList.add("show");

            lightboxImage.src = image.src;

            lightboxImage.alt = image.alt;

        });

    });

    closeLightbox.addEventListener("click", () => {

        lightbox.classList.remove("show");

    });

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            lightbox.classList.remove("show");

        }

    });

    prevLightbox.addEventListener("click", () => {

        currentImageIndex--;

        if (currentImageIndex < 0) {

            currentImageIndex = galleryImages.length - 1;

        }

        lightboxImage.src = galleryImages[currentImageIndex].src;

        lightboxImage.alt = galleryImages[currentImageIndex].alt;

    });

    nextLightbox.addEventListener("click", () => {

        currentImageIndex++;

        if (currentImageIndex >= galleryImages.length) {

            currentImageIndex = 0;

        }

        lightboxImage.src = galleryImages[currentImageIndex].src;

        lightboxImage.alt = galleryImages[currentImageIndex].alt;

    });

    document.addEventListener("keydown", (event) => {

        if (!lightbox.classList.contains("show")) return;

        if (event.key === "Escape") {

            lightbox.classList.remove("show");

        }

        if (event.key === "ArrowRight") {

            currentImageIndex++;

            if (currentImageIndex >= galleryImages.length) {

                currentImageIndex = 0;

            }

            lightboxImage.src = galleryImages[currentImageIndex].src;

            lightboxImage.alt = galleryImages[currentImageIndex].alt;

        }

        if (event.key === "ArrowLeft") {

            currentImageIndex--;

            if (currentImageIndex < 0) {

                currentImageIndex = galleryImages.length - 1;

            }

            lightboxImage.src = galleryImages[currentImageIndex].src;

            lightboxImage.alt = galleryImages[currentImageIndex].alt;

        }

    });

}



/*=====================================================
                 ROOMS PAGE
=====================================================*/

const roomModal = document.getElementById("roomModal");

if (roomModal) {

    const roomButtons = document.querySelectorAll(".room-details-btn");

    const closeRoomModal = document.querySelector(".close-room-modal");

    const modalRoomImage = document.getElementById("modalRoomImage");

    const modalRoomTitle = document.getElementById("modalRoomTitle");

    const modalRoomDescription = document.getElementById("modalRoomDescription");

    const modalRoomFeatures = document.getElementById("modalRoomFeatures");

    const modalRoomPrice = document.getElementById("modalRoomPrice");

    const rooms = {

        deluxe: {

            title: "Deluxe Room",

            image: "images/deluxe-room.jpg",

            description: "Elegant accommodation with a king-size bed, luxury bathroom, complimentary Wi-Fi, and breathtaking city views.",

            features: [

                "King Size Bed",

                "2 Guests",

                "35 m²",

                "Free Wi-Fi",

                "Smart TV",

                "Complimentary Breakfast"

            ],

            price: "$180 / Night"

        },

        executive: {

            title: "Executive Room",

            image: "images/executive-suite.jpg",

            description: "Spacious accommodation designed for business travellers seeking comfort, productivity, and premium services.",

            features: [

                "King Size Bed",

                "2 Guests",

                "45 m²",

                "Business Lounge",

                "Free Wi-Fi",

                "Complimentary Breakfast"

            ],

            price: "$250 / Night"

        },

        presidential: {

            title: "Presidential Suite",

            image: "images/presidential-suite.jpg",

            description: "The ultimate luxury experience featuring a private lounge, premium amenities, breathtaking views, and personalized services.",

            features: [

                "King Size Bed",

                "4 Guests",

                "90 m²",

                "Private Lounge",

                "Jacuzzi",

                "Butler Service"

            ],

            price: "$450 / Night"

        }

    };

    roomButtons.forEach(button => {

        button.addEventListener("click", () => {

            const room = rooms[button.dataset.room];

            modalRoomImage.src = room.image;

            modalRoomTitle.textContent = room.title;

            modalRoomDescription.textContent = room.description;

            modalRoomPrice.textContent = room.price;

            modalRoomFeatures.innerHTML = "";

            room.features.forEach(feature => {

                modalRoomFeatures.innerHTML += `

                    <li>

                        <i class="fas fa-check-circle"></i>

                        ${feature}

                    </li>

                `;

            });

            roomModal.classList.add("show");

        });

    });

    closeRoomModal.addEventListener("click", () => {

        roomModal.classList.remove("show");

    });

    roomModal.addEventListener("click", (event) => {

        if (event.target === roomModal) {

            roomModal.classList.remove("show");

        }

    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            roomModal.classList.remove("show");

        }

    });

}



/*=====================================================
                CONTACT PAGE
=====================================================*/

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const fullName = document.getElementById("fullName");

    const email = document.getElementById("email");

    const phone = document.getElementById("phone");

    const inquiryType = document.getElementById("inquiryType");

    const subject = document.getElementById("subject");

    const message = document.getElementById("message");

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        document.querySelectorAll(".error-message").forEach(error => error.remove());

        document.querySelectorAll(".form-control, .form-select").forEach(field => {

            field.classList.remove("error", "success");

        });

        let isValid = true;

        if (fullName.value.trim() === "") {

            showError(fullName, "Full Name is required.");

            isValid = false;

        } else {

            fullName.classList.add("success");

        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.value.trim() === "") {

            showError(email, "Email Address is required.");

            isValid = false;

        } else if (!emailPattern.test(email.value.trim())) {

            showError(email, "Please enter a valid email address.");

            isValid = false;

        } else {

            email.classList.add("success");

        }

        if (subject.value.trim() === "") {

            showError(subject, "Subject is required.");

            isValid = false;

        } else {

            subject.classList.add("success");

        }

        if (message.value.trim().length < 10) {

            showError(message, "Message must be at least 10 characters.");

            isValid = false;

        } else {

            message.classList.add("success");

        }

        if (isValid) {

            const sendBtn = document.getElementById("sendBtn");

            sendBtn.disabled = true;

            sendBtn.textContent = "Sending...";

            setTimeout(() => {

                    contactForm.reset();

                    document.querySelectorAll(".form-control, .form-select").forEach(field => {

                        field.classList.remove("success");

                    });

                    successMessage.classList.add("show");

                    sendBtn.disabled = false;

                    sendBtn.textContent = "Send Message";

                    setTimeout(() => {

                        successMessage.classList.remove("show");

                    }, 5000);

                }, 1500);

        }

    });

}

function showError(input, message) {

    input.classList.add("error");

    const error = document.createElement("small");

    error.className = "error-message";

    error.textContent = message;

    input.parentElement.appendChild(error);

}



/*=========================
      BOOKING PAGE
==========================*/

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    /*=========================
            Room Prices
    ==========================*/

    const roomPrices = {

        deluxe: 180,
        executive: 250,
        presidential: 450

    };


    /*=========================
            Form Fields
    ==========================*/

    const checkIn = document.getElementById("checkIn");
    const checkOut = document.getElementById("checkOut");
    const guests = document.getElementById("guests");
    const roomType = document.getElementById("roomType");

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const specialRequest = document.getElementById("specialRequest");
    const bookBtn = document.getElementById("bookBtn");


    /*=========================
        Booking Summary
    ==========================*/

    const summaryRoom = document.getElementById("summaryRoom");
    const summaryGuests = document.getElementById("summaryGuests");
    const summaryCheckIn = document.getElementById("summaryCheckIn");
    const summaryCheckOut = document.getElementById("summaryCheckOut");
    const summaryNights = document.getElementById("summaryNights");
    const summaryPrice = document.getElementById("summaryPrice");
    const summaryTotal = document.getElementById("summaryTotal");


    /*=========================
        Messages
    ==========================*/

    const bookingError = document.getElementById("bookingError");
    const bookingSuccess = document.getElementById("bookingSuccess");


    /*=========================
      Update Booking Summary
    ==========================*/

    function updateBookingSummary() {

        const room = roomType.value;
        const guest = guests.value;

        summaryRoom.textContent = room
            ? room.charAt(0).toUpperCase() + room.slice(1)
            : "-";

        summaryGuests.textContent = guest || "-";

        summaryCheckIn.textContent = checkIn.value || "-";

        summaryCheckOut.textContent = checkOut.value || "-";

        let nights = 0;
        let price = 0;
        let total = 0;

        if (room && roomPrices[room]) {

            price = roomPrices[room];

        }

        if (checkIn.value && checkOut.value) {

            const start = new Date(checkIn.value);

            const end = new Date(checkOut.value);

            const difference = end - start;

            nights = difference / (1000 * 60 * 60 * 24);

            if (nights < 0) {

                nights = 0;

            }

        }

        total = price * nights;

        summaryNights.textContent = nights;

        summaryPrice.textContent = "$" + price;

        summaryTotal.textContent = "$" + total;

    }


    /*=========================
        Event Listeners
    ==========================*/

    roomType.addEventListener("change", updateBookingSummary);

    guests.addEventListener("change", updateBookingSummary);

    checkIn.addEventListener("change", updateBookingSummary);

    checkOut.addEventListener("change", updateBookingSummary);

    checkIn.addEventListener("change", () => {

        checkOut.min = checkIn.value;

    });


    /*=========================
        Form Submission
    ==========================*/

    bookingForm.addEventListener("submit", function (e) {

        e.preventDefault();

        bookingError.classList.remove("show");

        bookingSuccess.classList.remove("show");

        if (

            !fullName.value.trim() ||

            !email.value.trim() ||

            !phone.value.trim() ||

            !checkIn.value ||

            !checkOut.value ||

            !roomType.value ||

            !guests.value

        ) {

            bookingError.classList.add("show");

            setTimeout(() => {

                bookingError.classList.remove("show");

            }, 4000);

            return;

        }

        bookBtn.disabled = true;

bookBtn.textContent = "Processing...";

setTimeout(() => {

    bookingSuccess.classList.add("show");

    bookBtn.textContent = "Reservation Sent ✓";

    setTimeout(() => {

        bookingSuccess.classList.remove("show");

        bookingForm.reset();

        summaryRoom.textContent = "-";

        summaryGuests.textContent = "-";

        summaryCheckIn.textContent = "-";

        summaryCheckOut.textContent = "-";

        summaryNights.textContent = "0";

        summaryPrice.textContent = "$0";

        summaryTotal.textContent = "$0";

        bookBtn.disabled = false;

        bookBtn.textContent = "Reserve Now";

    }, 3000);

}, 2000);

    });

}






/*=========================
      NEWSLETTER
==========================*/

/*=========================
      NEWSLETTER
==========================*/

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

    const newsletterEmail = document.getElementById("newsletterEmail");
    const newsletterBtn = document.getElementById("newsletterBtn");

    const newsletterError = document.getElementById("newsletterError");
    const newsletterSuccess = document.getElementById("newsletterSuccess");

    newsletterForm.addEventListener("submit", function (e) {

        e.preventDefault();

        newsletterError.classList.remove("show");
        newsletterSuccess.classList.remove("show");

        if (!newsletterEmail.checkValidity()) {

            newsletterError.classList.add("show");

            setTimeout(() => {

                newsletterError.classList.remove("show");

            }, 3000);

            return;

        }

        newsletterBtn.disabled = true;

        newsletterBtn.textContent = "Subscribing...";

        setTimeout(() => {

            newsletterSuccess.classList.add("show");

            newsletterBtn.textContent = "Subscribed ✓";

            newsletterForm.reset();

            setTimeout(() => {

                newsletterSuccess.classList.remove("show");

                newsletterBtn.disabled = false;

                newsletterBtn.textContent = "Subscribe";

            }, 3000);

        }, 1500);

    });

}