

function updateCounter() {
    let textarea = document.getElementById("tzeet-input");
    let counter = document.getElementById("char-counter");
    let button = document.getElementById("send-button");
    let maxChars = 140;
    let remaining = maxChars - textarea.value.length;
    
    if (textarea.value.length === 0) {
        counter.textContent = 0;
        button.disabled = true;
        counter.style.color = "";
    } else {
        counter.style.display = "inline";
        counter.textContent = remaining;
        button.disabled = remaining < 0;
        
        if (remaining < 40 && remaining >= 0) {
            counter.style.color = "rgb(255, 200, 0  )";
        } else if (remaining < 0) {
            counter.style.color = "rgb(255, 0, 0)";
        } else {
            counter.style.color = "";
        }
    }
}
