fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=")
  .then((response) => response.json())
  .then((data) => {
    const players = data.player.slice(0, 6);

    function generatePlayerCards() {
      const playerCardsContainer = document.getElementById("player");

      players.forEach((player) => {
        let personImage;
        if (player.strThumb) {
          personImage = player.strThumb;
        } else {
          personImage =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixMxermFCnK_FYiJjBmIh0nCUEI1DZfE2xBtxEIQ49w&s";
        }
        const playerCard = `
          <div style="width: 18rem;">
              <div class="card m-2">
                  <img src="${personImage}" class="card-img-top" alt="" />
                  <div class="card-body text-center">
                    <h2 class="person_name" style="color:#0D6EFD">${
                      player.strPlayer
                    }</h2>
                    <h5 class="nation">Nationality: <span style="font-weight: 300">${
                      player.strNationality
                    }</span></h5>
                    <h5 class="birth">Birth Place: <span style="font-weight: 300">${
                      player.strBirthLocation
                    }</span></h5>
                    <h5 class="birth">Date Of Birth: <span style="font-weight: 300">${
                      player.dateBorn
                    }</span></h5>
                    <h5 class="team">Sports: <span style="font-weight: 300">${
                      player.strSport
                    }</span></h5>
                    <h5 class="gender">Gender: <span style="font-weight: 300">${
                      player.strGender
                    }</span></h5>
                    <h5 class="position">Team: <span style="font-weight: 300">${
                      player.strTeam
                    }</span></h5>
                    <div class="social-icons">
                      <a href="https://${
                        player.strInstagram
                      }"><i class="fa-brands f-s m-2 fa-instagram"></i></a>
                      <a href="https://${
                        player.strTwitter
                      }"><i class="fa-brands f-s m-2 fa-twitter"></i></a>
                    </div>
                  </div>
                  <p class="p_d" style="margin-left: 20px">
                    <span style="font-weight: 700">Description:</span><br /><br />
                    ${player.strDescriptionEN.slice(0, 100)}
                  </p>
                  <div class = "b-t" style="
                  margin-bottom: 15px;
              ">
                  <button class="btn btn-primary btn-sm btn_b" onclick="singleItem('${
                    player.idPlayer
                  }')" style="width-100px">View Details</button>
                  <button class="btn btn-primary btn-sm btn_b"  style="width-100px" onclick="addToCart('${
                    player.strPlayer
                  }', '${
          player.strTeam
        }', '${personImage}')">Add To Group</button>
              </div>
          </div>
                  </div>
                 
        `;
        playerCardsContainer.innerHTML += playerCard;
      });
    }

    generatePlayerCards();
  });

document.getElementById("button_s").addEventListener("click", () => {
  let inputValue = document.getElementById("inputName").value;

  fetch(
    `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${inputValue}`
  )
    .then((res) => res.json())
    .then((data) => {
      const player_d = document.getElementById("player");
      player_d.innerHTML = "";
      if (data.player == null) {
        document.getElementById("message").style.display = "block";
      } else {
        document.getElementById("message").style.display = "none";
        data.player.forEach((person_detail) => {
          let playerDiv = document.createElement("div");
          let personImage;
          if (person_detail.strThumb) {
            personImage = person_detail.strThumb;
          } else {
            personImage =
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixMxermFCnK_FYiJjBmIh0nCUEI1DZfE2xBtxEIQ49w&s";
          }
          let playerInfo = `
              <div class="card m-2" style="width: 18rem;">
                <img src="${personImage}" class="card-img-top" alt="Image of ${
            person_detail.strPlayer
          }" />
                <div class="card-body text-center">
                <div class="">
                <h2 class="person_name" style="color:#0D6EFD">${
                  person_detail.strPlayer
                }</h2>
                <h5 class="nation">Nationality: <span style="font-weight: 300">${
                  person_detail.strNationality
                }</span></h5>
                <h5 class="birth">Birth Place: <span style="font-weight: 300">${
                  person_detail.strBirthLocation
                }</span></h5>
                <h5 class="birth">Date Of Birth: <span style="font-weight: 300">${
                  person_detail.dateBorn
                }</span></h5>
                <h5 class="team">Sports: <span style="font-weight: 300">${
                  person_detail.strSport
                }</span></h5>
                <h5 class="gender">Gender: <span style="font-weight: 300">${
                  person_detail.strGender
                }</span></h5>
                <h5 class="position">Team: <span style="font-weight: 300">${
                  person_detail.strTeam
                }</span></h5>
                <div class="social-icons">
                  <a href="https://www.${
                    person_detail.strInstagram
                  }"><i class="fa-brands f-s m-2 fa-instagram"></i></a>
                  <a href="https://www.${
                    person_detail.strTwitter
                  }"><i class="fa-brands f-s m-2 fa-twitter"></i></a>
                </div>
              </div>
              <p class="p_d" style="margin-left: 20px">
                <span style="font-weight: 700">Description:</span><br /><br />
                ${person_detail.strDescriptionEN.slice(0, 100)}
              </p>
                  <button class="btn btn-primary btn-sm btn_b" onclick="singleItem('${
                    person_detail.idPlayer
                  }')">View Details</button>
                  <button class="btn btn-primary btn-sm btn_b"  onclick="addToCart('${
                    person_detail.strPlayer
                  }', '${
            person_detail.strTeam
          }', '${personImage}')">Add To Group</button>
                </div>
              </div>
            `;

          playerDiv.innerHTML = playerInfo;
          player_d.appendChild(playerDiv);
        });
      }
    });
});

function singleItem(id) {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then((response) => response.json())
    .then((detail) => {
      let person_detail = detail.players[0];
      let details = document.getElementById("details");
      details.innerHTML = "";
      let detailDiv = document.createElement("div");

      let personImage;
      if (person_detail.strThumb) {
        personImage = person_detail.strThumb;
      } else {
        personImage =
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixMxermFCnK_FYiJjBmIh0nCUEI1DZfE2xBtxEIQ49w&s";
      }

      let detailInfo = `
      <button
      type="button"
      class="btn person-close-btn"
      id="person-close-btn"
    >
      <i class="fas fa-times"></i>
    </button>
        <img src="${personImage}" class="card-img-top" style="margin-top: 40px; border-radius: 10px" alt="Image of ${
        person_detail.strPlayer
      }" />
        <div class="text-center">
          <h2 class="person_name">${person_detail.strPlayer}</h2>
          <h5 class="nation">Nationality: <span style="font-weight: 300">${
            person_detail.strNationality
          }</span></h5>
          <h5 class="birth">Birth Place: <span style="font-weight: 300">${
            person_detail.strBirthLocation
          }</span></h5>
          <h5 class="birth">Date Of Birth: <span style="font-weight: 300">${
            person_detail.dateBorn
          }</span></h5>
          <h5 class="team">Sports: <span style="font-weight: 300">${
            person_detail.strSport
          }</span></h5>
          <h5 class="gender">Gender: <span style="font-weight: 300">${
            person_detail.strGender
          }</span></h5>
          <h5 class="position">Team: <span style="font-weight: 300">${
            person_detail.strTeam
          }</span></h5>
          <div class="social-icons">
            <a href="https://www.${
              person_detail.strInstagram
            }"><i class="fa-brands f-s m-2 fa-instagram"></i></a>
            <a href="https://www.${
              person_detail.strTwitter
            }"><i class="fa-brands f-s m-2 fa-twitter"></i></a>
          </div>
        </div>
        <p class="p_d" style="margin-left: 20px">
          <span style="font-weight: 700">Description:</span><br /><br />
          ${person_detail.strDescriptionEN.slice(0, 100)}
        </p>
      `;
      detailDiv.innerHTML = detailInfo;
      details.appendChild(detailDiv);

      document
        .getElementById("person-close-btn")
        .addEventListener("click", () => {
          details.style.display = "none";
        });

      details.style.display = "block";
    });
}

const addToCart = (name, team, image) => {
  const cartCountElement = document.getElementById("cart-count");
  let convertedCount = parseInt(cartCountElement.innerText, 10);

  if (convertedCount >= 11) {
    const modal = new bootstrap.Modal(
      document.getElementById("cartLimitModal")
    );
    modal.show();
    return;
  }

  convertedCount += 1;
  cartCountElement.innerText = convertedCount;

  const container = document.getElementById("cart-items");

  const div = document.createElement("div");
  div.classList.add("cart-item");

  div.innerHTML = `
    <img src="${image}" alt="Player Image" style="width: 100px" />
    <div class="player-info">
      <h6>Name: <span style="font-weight: 300">${name}</span></h6>
      <h6>Team: <span style="font-weight: 300">${team}</span></h6>
    </div>
    <button class="rem">
      <i class="fas fa-times"></i>
    </button>
    <hr>
  `;

  container.appendChild(div);

  div.querySelector(".rem").addEventListener("click", () => {
    removeFromCart(div);
  });
};

const removeFromCart = (item) => {
  item.remove(); // Remove the item from the DOM
  // Adjust cart count
  const cartCountElement = document.getElementById("cart-count");
  let convertedCount = parseInt(cartCountElement.innerText, 10);
  convertedCount -= 1;
  cartCountElement.innerText = convertedCount;
};
