
const houses = [

    {
        id: 1,
        name: "Modern House in Kileleshwa",
        location: "Kileleshwa",
        type: "2 Bedroom",
        price: 60000,
        bedrooms: 2,
        bathrooms: 2,
        parking: true,
        image: "kileleshwa2bed.jpg"
    },

    {
        id: 2,
        name: "Elegant House in Muthaiga",
        location: "Muthaiga",
        type: "3 Bedroom",
        price: 95000,
        bedrooms: 3,
        bathrooms: 3,
        parking: true,
        image: "muthaiga3bed.jpg"
    },

    {
        id: 3,
        name: "Cozy House in South C",
        location: "South C",
        type: "2 Bedroom",
        price: 28000,
        bedrooms: 2,
        bathrooms: 2,
        parking: true,
        image: "southc2bed.jpg"
    },

    {
        id: 4,
        name: "Spacious House in Lavington",
        location: "Lavington",
        type: "3 Bedroom",
        price: 75000,
        bedrooms: 3,
        bathrooms: 3,
        parking: true,
        image: "lavington3bed.jpg"
    },

    {
        id: 5,
        name: "Modern House in Westlands",
        location: "Westlands",
        type: "2 Bedroom",
        price: 45000,
        bedrooms: 2,
        bathrooms: 2,
        parking: true,
        image: "westland2bed.jpg"
    },

    {
        id: 6,
        name: "Family House in Parklands",
        location: "Parklands",
        type: "3 Bedroom",
        price: 65000,
        bedrooms: 3,
        bathrooms: 3,
        parking: true,
        image: "parkland3bed.jpg"
    }

];




function formatPrice(price) {

    return `KSh ${price.toLocaleString()} / month`;

}



function createPropertyCard(property) {

    return `

        <div class="bg-white rounded-xl shadow-md overflow-hidden
                    hover:shadow-xl transition duration-300">

            <img
                src="${property.image}"
                alt="${property.name}"
                class="w-full h-56 object-cover"
            >

            <div class="p-5">

                <!-- PROPERTY NAME -->

                <h3 class="text-xl font-bold text-gray-800">
                    ${property.name}
                </h3>


                 <!-- location -->

                <p class="text-gray-500 mt-1">
                    📍 ${property.location}
                </p>


                <!-- HOUSE TYPE -->

                <div class="mt-4">

                    <span class="bg-blue-100 text-blue-700
                                 px-3 py-1 rounded-full text-sm">

                        ${property.type}

                    </span>

                </div>


                <!-- PRICE -->

                <p class="text-2xl font-bold text-blue-600 mt-4">

                    ${formatPrice(property.price)}

                </p>


                

                <div class="flex flex-wrap gap-4
                            text-sm text-gray-600 mt-4">

                    <span>
                        🛏️ ${property.bedrooms} Bedrooms
                    </span>

                    <span>
                        🚿 ${property.bathrooms} Bathrooms
                    </span>

                    <span>
                        🚗 ${property.parking ? "Parking" : "No Parking"}
                    </span>

                </div>


                <!-- BUTTON -->

                <button
                    onclick="viewProperty('${property.name}', '${property.location}')"
                    class="w-full mt-5 bg-blue-600
                           hover:bg-blue-700 text-white
                           font-semibold py-3 rounded-lg">

                    View Property

                </button>

            </div>

        </div>

    `;

}




function displayHouses(list = houses) {

    const container =
        document.getElementById("houseListings");

    const count =
        document.getElementById("houseCount");


    if (!container) {
        return;
    }


    

    if (list.length === 0) {

        container.innerHTML = `

            <div class="col-span-full bg-white
                        rounded-xl shadow p-10 text-center">

                <h3 class="text-2xl font-bold text-gray-800">
                    No houses found
                </h3>

                <p class="text-gray-600 mt-3">
                    Try another location, house type
                    or budget.
                </p>

            </div>

        `;

        if (count) {
            count.textContent = "0";
        }

        return;
    }


    

    container.innerHTML = list
        .map(createPropertyCard)
        .join("");



    if (count) {
        count.textContent = list.length;
    }

}




function filterHouses() {

    const searchInput =
        document.getElementById("houseSearch");

    const typeInput =
        document.getElementById("houseType");

    const budgetInput =
        document.getElementById("houseBudget");


    const search = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";


    const selectedType = typeInput
        ? typeInput.value
        : "";


    const selectedBudget = budgetInput
        ? Number(budgetInput.value)
        : 0;


    const filteredHouses = houses.filter(property => {

       

        const matchesLocation =
            !search ||
            property.location
                .toLowerCase()
                .includes(search) ||
            property.name
                .toLowerCase()
                .includes(search);


       

        const matchesType =
            !selectedType ||
            property.type === selectedType;


      

        const matchesBudget =
            !selectedBudget ||
            property.price <= selectedBudget;


        return (
            matchesLocation &&
            matchesType &&
            matchesBudget
        );

    });


    displayHouses(filteredHouses);

}



function searchFromHome() {

    const location =
        document.getElementById("homeLocation")?.value || "";

    const type =
        document.getElementById("homeType")?.value || "";

    const budget =
        document.getElementById("homeBudget")?.value || "";


    const params = new URLSearchParams();


    if (location) {

        params.set(
            "location",
            location
        );

    }


    if (type) {

        params.set(
            "type",
            type
        );

    }


    if (budget) {

        params.set(
            "budget",
            budget
        );

    }


    window.location.href =
        "houses.html?" + params.toString();

}



function applyURLFilters() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const location =
        params.get("location");

    const type =
        params.get("type");

    const budget =
        params.get("budget");


    const searchInput =
        document.getElementById("houseSearch");

    const typeInput =
        document.getElementById("houseType");

    const budgetInput =
        document.getElementById("houseBudget");


    

    if (searchInput && location) {

        searchInput.value =
            location;

    }


   

    if (typeInput && type) {

        typeInput.value =
            type;

    }


   

    if (budgetInput && budget) {

        budgetInput.value =
            budget;

    }


    

    if (
        location ||
        type ||
        budget
    ) {

        filterHouses();

    } else {

        displayHouses();

    }

}




function viewProperty(
    name,
    location
) {

    alert(
        `You selected ${name} in ${location}.\n\n` +
        `Property details will be available here.`
    );

}



document.addEventListener(
    "DOMContentLoaded",
    function () {


       

        const menuButton =
            document.getElementById(
                "menuButton"
            );

        const mobileMenu =
            document.getElementById(
                "mobileMenu"
            );


        if (
            menuButton &&
            mobileMenu
        ) {

            menuButton.addEventListener(
                "click",
                function () {

                    mobileMenu.classList.toggle(
                        "hidden"
                    );

                }
            );

        }


        

        if (
            document.getElementById(
                "houseListings"
            )
        ) {

            applyURLFilters();

        }



        const homeSearchForm =
            document.getElementById(
                "homeSearchForm"
            );


        if (homeSearchForm) {

            homeSearchForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    searchFromHome();

                }
            );

        }



        const contactForm =
            document.getElementById(
                "contactForm"
            );


        if (contactForm) {

            contactForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const formMessage =
                        document.getElementById(
                            "formMessage"
                        );


                    if (formMessage) {

                        formMessage.textContent =
                            "Thank you! Your message has been received.";

                        formMessage.className =
                            "mt-4 text-center text-green-600 font-semibold";

                    }


                    contactForm.reset();

                }
            );

        }

    }
);