function Clock() {
    let currentTime = new Date();

    // 24-hour standard
    let time24hr = currentTime.toLocaleTimeString("en-US", { hour12: false });

    let time12hr = currentTime.toLocaleTimeString("en-US");

    console.log(`24 hour format: ${time24hr}`);

    console.log(`12 hour format: ${time12hr}`);
}

setInterval(Clock, 1000);