// constants
const ALPHABET_SIZE = 26; 
const DIGIT_SIZE = 10; 
const ASCII_START = 'A'.charCodeAt(0);
const ASCII_SPACE = 33; 
const encryptBtnMenu = document.getElementById('encryptBtnMenu');
const decryptBtnMenu = document.getElementById('decryptBtnMenu');
const encryptSection = document.getElementById('encryptSection');
const decryptSection = document.getElementById('decryptSection');
const outputDiv = document.getElementById('output');
const messageEncrypt = document.getElementById('messageEncrypt');
const encryptedText = document.getElementById('encryptedText');
const keyDecrypt = document.getElementById('keyDecrypt');

encryptBtnMenu.addEventListener('click', () => {
    encryptSection.classList.remove('hidden');
    decryptSection.classList.add('hidden');
    outputDiv.innerHTML = ''; // Clear previous output
});

decryptBtnMenu.addEventListener('click', () => {
    decryptSection.classList.remove('hidden');
    encryptSection.classList.add('hidden');
    outputDiv.innerHTML = ''; // Clear previous output
});

document.getElementById('encryptBtn').addEventListener('click', () => {
    const message = messageEncrypt.value;

    if (message.length > 300) {
        outputDiv.innerHTML = `<p style="color: red;">Error: The message exceeds the 300 character limit.</p>`;
        return;
    }

    const encryptedMessage = encryptMessage(message); 
    outputDiv.innerHTML = `<p>Encrypted Message: ${encryptedMessage.encrypted}</p><p>Key: ${encryptedMessage.key}</p>`;
});

document.getElementById('decryptBtn').addEventListener('click', () => {
    const encryptedMessage = encryptedText.value;
    const key = keyDecrypt.value;

    const decryptedMessage = decryptMessage(encryptedMessage, key); 
    outputDiv.innerHTML = `<p>Decrypted Message: ${decryptedMessage}</p>`;
});

function randomShift() {
    return Math.floor(Math.random() * ALPHABET_SIZE);
}
function encryptMessage(message) {
    let shifts = [];
    let key = "";
    let encryptedMessage = "";

    for (let i = 0; i < message.length; i++) {
        if (i % 5 === 0) {
            let shift = randomShift(); 
            shifts.push(shift);
            key += String.fromCharCode(shift + ASCII_START); 
        }

        encryptedMessage += encryptChar(message[i], shifts[Math.floor(i / 5)]);
    }

    return { encrypted: encryptedMessage, key: key };
}

function encryptChar(ch, shift) {
    if (ch >= 'a' && ch <= 'z') {
        return String.fromCharCode((ch.charCodeAt(0) - 'a'.charCodeAt(0) + shift) % ALPHABET_SIZE + 'a'.charCodeAt(0));
    } else if (ch >= 'A' && ch <= 'Z') {
        return String.fromCharCode((ch.charCodeAt(0) - 'A'.charCodeAt(0) + shift) % ALPHABET_SIZE + 'A'.charCodeAt(0));
    } else if (ch >= '0' && ch <= '9') {
        return String.fromCharCode((ch.charCodeAt(0) - '0'.charCodeAt(0) + shift) % DIGIT_SIZE + '0'.charCodeAt(0));
    } else if (ch === ' ') {
        return String.fromCharCode((shift % 10) + ASCII_SPACE); 
    } else {
        return ch; 
    }
}

// Decrypt function
function decryptMessage(encryptedMessage, key) {
    let shifts = key.split('').map(char => char.charCodeAt(0) - ASCII_START); 
    let decryptedMessage = "";

    for (let i = 0; i < encryptedMessage.length; i++) {
        let shiftIndex = Math.floor(i / 5); 
        decryptedMessage += decryptChar(encryptedMessage[i], shifts[shiftIndex]);
    }

    return decryptedMessage;
}

function decryptChar(ch, shift) {
    if (ch >= 'a' && ch <= 'z') {
        return String.fromCharCode((ch.charCodeAt(0) - 'a'.charCodeAt(0) - shift + ALPHABET_SIZE) % ALPHABET_SIZE + 'a'.charCodeAt(0));
    } else if (ch >= 'A' && ch <= 'Z') {
        return String.fromCharCode((ch.charCodeAt(0) - 'A'.charCodeAt(0) - shift + ALPHABET_SIZE) % ALPHABET_SIZE + 'A'.charCodeAt(0));
    } else if (ch >= '0' && ch <= '9') {
        return String.fromCharCode((ch.charCodeAt(0) - '0'.charCodeAt(0) - shift + DIGIT_SIZE) % DIGIT_SIZE + '0'.charCodeAt(0));
    } else if (ch.charCodeAt(0) >= 33 && ch.charCodeAt(0) <= 47) {
        return ' '; 
    } else {
        return ch; 
    }
}
