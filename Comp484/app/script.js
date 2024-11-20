$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.bath-button').click(clickedBathButton);
    $('.nap-button').click(clickedNapButton);
  

  
    
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name:"Pikachu", weight: 20, happiness: 10, energy: 100, cleanliness: 10};
  
    function clickedTreatButton() {
      // Increase pet happiness
      pet_info.happiness += 3;
      // Increase pet weight
      pet_info.weight += .25;
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      // Increase pet happiness
      pet_info.happiness += 5;
      // Decrease pet weight
      pet_info.weight -= .5;
      pet_info.cleanliness -= 2;
      pet_info.energy -= 15;
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      // Decrease pet happiness
      pet_info.happiness -= 3;
      // Decrease pet weight
      pet_info.weight -= .5;
      pet_info.cleanliness -= 1;
      pet_info.energy -= 10;
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedNapButton() {
      pet_info.happiness += 1;
      pet_info.energy += 20;
      checkAndUpdatePetInfoInHtml();
    }

    function clickedBathButton() {
      pet_info.happiness -= 2;
      pet_info.cleanliness += 1;
      pet_info.energy += 10;
      checkAndUpdatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero.
      if (pet_info.weight <= 0) {
        pet_info.weight = 0;
      }
      if (pet_info.happiness <= 0) {
        pet_info.happiness = 0;
      }
      if (pet_info.cleanliness <= 0) {
        pet_info.cleanliness = 0;
      } else if (pet_info.cleanliness >= 10) {
        pet_info.cleanliness = 10;
      }
      if (pet_info.energy <= 0) {
        pet_info.energy = 0;
      } else if (pet_info.energy >= 100) {
        pet_info.energy = 100;
      }
      
      // used .attr() to change the image of the pet depending on energy
      // used .addClass() and .removeClass() to change the class of the pet depending on the energy
      if (pet_info.energy <= 20) {
        $(".pet-image").attr("src", "https://cdn.glitch.global/1ca14cf8-01b0-4e26-8011-a3375974d479/ju-mays-6ee4bc5f-d60d-414e-bb05-cbfec20c2489-removebg-preview.png?v=1731618392756").attr("alt", "Sad Pet");
        $(".pet-image-container").removeClass("happy normal").addClass("sad");
      } else if (pet_info.energy >= 80) {
        $(".pet-image").attr("src", "https://cdn.glitch.global/1ca14cf8-01b0-4e26-8011-a3375974d479/excited-pikachu-pokemon-12jfn2vzqydpeztq.jpg.svg?v=1731618446897").attr("alt", "Happy Pet");
        $("pet-image-container").removeClass("sad normal").addClass("happy");
      } else { 
        $(".pet-image").attr("src", "https://cdn.glitch.global/1ca14cf8-01b0-4e26-8011-a3375974d479/__57-removebg-preview.png?v=1731618395447").attr("alt", "Normal Pet");
        $(".pet-image-container").removeClass("happy sad").addClass("normal");
      }
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.energy').text(pet_info['energy']);
      $('.cleanliness').text(pet_info['cleanliness']);
    }
    
    function showNotification(message) {
      const notificationArea = document.querySelector(".notification-area");

      notificationArea.textContent = message;
      notificationArea.classList.add("show");
      setTimeout(() => {
        notificationArea.classList.remove("show");       
      }, 3000);
    }
    
    document.querySelector(".treat-button").addEventListener("click", () => {
      showNotification("Your pet is enjoying the treat!");
    });

    document.querySelector(".play-button").addEventListener("click", () => {
      showNotification("Your pet is playing!");
    });

    document.querySelector(".exercise-button").addEventListener("click", () => {
      showNotification("Your pet is exercising!");
    });
    document.querySelector(".bath-button").addEventListener("click", () => {
      showNotification("Your pet is taking a bath!");
    });

    document.querySelector(".nap-button").addEventListener("click", () => {
      showNotification("Your pet is taking a nap!");
    });