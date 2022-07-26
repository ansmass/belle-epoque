let nav = 0;
let cliked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInupt = document.getElementById('eventTitleInupt');
const weekdays = ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'];

function openModal(date){
    cliked = date;
    
    const eventForDay = events.find(e => e.date === cliked);
    
    if(eventForDay){
        document.getElementById('eventText').innerHTML = eventForDay.title;
        deleteEventModal.style.display = 'block';
    }else{
        newEventModal.style.display = 'block';
    }
    
    backDrop.style.display = 'block';
}

function load(){
    const dt = new Date();
    
    if(nav !== 0){
        dt.setMonth(new Date().getMonth() + nav);
    }
    
    const day = dt.getDay();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDay();
    
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekdays: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    
    document.getElementById('monthDisplay').innerHTML = `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`;
    
    calendar.innerHTML = '';
    
    for(let i = 1; i <= paddingDays + daysInMonth; i++){
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');
        
        const dayString = `${month + 1} / ${i - paddingDays} / ${year}`;
        
        if(i > paddingDays){
            daySquare.innerText = i - paddingDays;
            const eventForDay = events.find(e => e.date === dayString);
            
            if(i - paddingDays === day && nav === 0){
                daySquare.id = 'currentDay';
            }
            
            if(eventForDay){
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }
            
            daySquare.addEventListener('click', () => openModal(dayString));
        }else{
            daySquare.classList.add('padding')
        }
    }
}