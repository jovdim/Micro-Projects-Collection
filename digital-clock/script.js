function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // 12-hour format

    updateWithAnimation('hours', hours);
    updateWithAnimation('minutes', minutes);
    updateWithAnimation('seconds', seconds);
    document.getElementById('ampm').textContent = ampm;

    // Update date display
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = `${dayName}, ${monthName} ${now.getDate()}, ${now.getFullYear()}`;
    document.getElementById('date').textContent = date;
}

function updateWithAnimation(id, value) {
    const element = document.getElementById(id);
    const newValue = String(value).padStart(2, '0');

    if (element.textContent !== newValue) {
        element.classList.add('animate');
        setTimeout(() => element.classList.remove('animate'), 300); // Match duration with CSS
        element.textContent = newValue;
    }
}

setInterval(updateClock, 1000);
updateClock();
