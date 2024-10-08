let allPets = [];

document.addEventListener('DOMContentLoaded', () => {
  fetchPets();
  displayCategory();
});


async function fetchPets() {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    allPets = data.pets; 
    displayPets(allPets);
  } catch (error) {
    console.error('Error fetching pets:', error);
  }
}


function fetchPetsByCategory(category) {
  const filteredPets = allPets.filter(pet => pet.category.toLowerCase() === category.toLowerCase());

  const noPetsMessage = document.getElementById('no-pets-message');
  const petsGrid = document.getElementById('pets-grid');

  if (filteredPets.length > 0) {
    noPetsMessage.classList.add('hidden'); 
    petsGrid.classList.remove('hidden');
    displayPets(filteredPets);
  } else {
    noPetsMessage.classList.remove('hidden');
    petsGrid.classList.add('hidden'); 
  }
}


function sortByPrice() {
  const sortedPets = [...allPets].sort((a, b) => b.price - a.price);
  displayPets(sortedPets);
}

function displayPets(pets) {
  const petsGrid = document.getElementById('pets-grid');
  petsGrid.innerHTML = ''; 

  pets.forEach(pet => {
    const petCard = document.createElement('div');
    petCard.className = 'bg-white p-5 m-3 rounded-lg shadow-md h-max';
    petCard.innerHTML = `
      <img src="${pet.image}" alt="${pet.pet_name}" class="h-35 w-full object-cover p-1 rounded-lg">
      <h3 class="text-2xl font-bold mt-2 ml-4 mb-2">${pet.pet_name}</h3>
  
      <p><svg  class="size-5 inline m-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
</svg>
<strong>Breed</strong>: ${pet.breed || 'Not Available'}</p>
      <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 inline m-2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
     <strong> Birth</strong>: ${pet.date_of_birth || 'Not Available'}</p>
      <p><svg class="size-5 m-2 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M80 176a112 112 0 1 1 224 0A112 112 0 1 1 80 176zM224 349.1c81.9-15 144-86.8 144-173.1C368 78.8 289.2 0 192 0S16 78.8 16 176c0 86.3 62.1 158.1 144 173.1l0 34.9-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-34.9z"/></svg>
       <strong>Gender</strong>: ${pet.gender || 'Not Available'}</p>
      <p><svg class="size-5 inline  m-2" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
</svg><strong> Price</strong>: ${pet.price}$</p>
      <hr class="m-5">
      <div class="flex space-x-2 mt-4 justify-evenly">
        <button onclick="likePet('${pet.image}')" class="bg-white p-3  text-gray-500 border  rounded"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
</svg>
</button>
        <button onclick="showDetails(${pet.petId})" class="bg-white py-3 px-4 text-[#0E7A81] border font-bold text-md rounded">Details</button>
        <button onclick="openAdoptModal('${pet.pet_name}')" class="bg-white py-3 px-4 text-[#0E7A81] border font-bold text-md rounded">Adopt</button>
      </div>
    `;
    petsGrid.appendChild(petCard);
  });
}

async function displayCategory() {
  const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
  const data = await res.json();

  const categoryBtn = document.getElementById('Category-btn');
  categoryBtn.classList = "grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6 mt-4"; 
  
  data.categories.forEach(category => {
    const button = document.createElement('button');
    button.classList = "bg-white rounded-lg border w-full text-black px-4 py-2 flex justify-center items-center gap-2"; 
    button.onclick = () => fetchPetsByCategory(category.category);
  
    button.innerHTML = `
      <img class="w-8" src="${category.category_icon}" alt="${category.category} icon" />
      <h4 class="text-lg font-bold">${category.category}</h4>
    `;
  
    categoryBtn.append(button);
  });
}  

function likePet(imageUrl) {
  const likedPetsContainer = document.getElementById('liked-pets').querySelector('.grid');
  
  const likedPetCard = document.createElement('img');
  likedPetCard.src = imageUrl;
  likedPetCard.className = "object-cover rounded-lg m-2 col-span-2";

  likedPetsContainer.appendChild(likedPetCard);
}

function showDetails(petId) {
  const pet = allPets.find(p => p.petId === petId);
  if (pet) {
    document.getElementById('modal-pet-image').src = pet.image;
    document.getElementById('modal-pet_name').innerText = pet.pet_name;
    document.getElementById('modal-pet-details').innerHTML = `
      <p> <strong>Breed </strong>: ${pet.breed || 'Not Available'}</p>
      <p> <strong>Birth </strong>: ${pet.date_of_birth || 'Not Available'}</p>
      <p> <strong>Gender </strong>: ${pet.gender || 'Not Available'}</p>
      <p> <strong>Price </strong>: ${pet.price ? `$${pet.price}` : 'Not Available'}</p>
      <p> <strong>Details</strong> :${pet.pet_details || 'Not Available'} </p>
    `;
    document.getElementById('details-modal').checked = true; 
  }
}

function closeDetailsModal() {
  document.getElementById('details-modal').checked = false; 
}


function openAdoptModal(petName) {
  document.getElementById('adopt-message').innerText = `Adopting ${petName}`;
  document.getElementById('adopt-modal').checked = true; 

  let countdown = 3;
  document.getElementById('adopt-countdown').innerText = countdown;

  const interval = setInterval(() => {
    countdown--;
    document.getElementById('adopt-countdown').innerText = countdown;
    if (countdown === 0) {
      clearInterval(interval);
      document.getElementById('adopt-modal').checked = false; 
    }
  }, 1000);
}
