document.getElementById('player-form').addEventListener('submit', function (event) {
    let isFilled = false;
    const formElements = this.elements;

    for (let i = 0; i < formElements.length && !isFilled; i++) {
        const element = formElements[i];
        if (element.value.trim() !== '') {
            isFilled = true;
        }
    }

    if (!isFilled) {
        alert('Por favor, preencha pelo menos um campo.');
        event.preventDefault(); 
    }

});