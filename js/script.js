const cards = Array.from(document.querySelectorAll('.card'));
const mainCard = document.querySelector('.main-card');

async function LoadApp(){
  const response = await fetch('./js/data.json');
  const data = await response.json();

  // loading main card data
  mainCard.innerHTML = `
    <div class="personal-info-container">
      <img src="./images/image-jeremy.png" alt="Profile pic">
      <div class="info">
        <h3>Report for</h3>
        <h1>Jeremy Robson</h1>
      </div>
    </div>
    <div class="time-interval-container">
      <h2 class="interval">Daily</h2>
      <h2 class="interval active-interval">Weekly</h2>
      <h2 class="interval">Monthly</h2>
    </div>
  `

  // loading cards
  for(let i = 0; i < cards.length; i++){
    cards[i].innerHTML = `
      <div class="card-background background-img background_${[i]}"></div>
      <div class="card-info">
        <div class="card-header flex">
          <h2>${data[i].title}</h2>
          <i class="fas fa-ellipsis-h"></i>
        </div>
        <div class="card-main">
          <p class="current-hours">${data[i].timeframes.weekly.current}hrs</p>
          <h3 class="previous-hours">Last week - ${data[i].timeframes.weekly.previous}hrs</h3>
        </div>
      </div>
    `
  };

  const intervalBtns = Array.from(document.querySelectorAll('.interval'));
  let interval = 1;

  // interval logic
  intervalBtns.map((btn, i) => {
    btn.addEventListener('click', () => {
      const currentHours = Array.from(document.querySelectorAll('.current-hours'));
      const previousHours = Array.from(document.querySelectorAll('.previous-hours'));
      intervalBtns.forEach(btn => {
        btn.classList.remove('active-interval');
      });
      btn.classList.add('active-interval');

      interval = i + 1

      if(interval == 1){
        for(let i = 0; i < currentHours.length; i++){
          currentHours[i].innerHTML = `${data[i].timeframes.daily.current}hrs`;
          previousHours[i].innerHTML = `Yesterday - ${data[i].timeframes.daily.previous}hrs`;
        }
      } else if (interval == 2){
        for(let i = 0; i < currentHours.length; i++){
          currentHours[i].innerHTML = `${data[i].timeframes.weekly.current}hrs`;
          previousHours[i].innerHTML = `Last week - ${data[i].timeframes.weekly.previous}hrs`;
        }
      } else {
        for(let i = 0; i < currentHours.length; i++){
          currentHours[i].innerHTML = `${data[i].timeframes.monthly.current}hrs`;
          previousHours[i].innerHTML = `Last month - ${data[i].timeframes.monthly.previous}hrs`;
        }
      }
    });
  });    
}

LoadApp();