
const positions = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z",
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
    "!", "?", ",", "."
];
export default function getDenominationQuantity(word) {
    const letters = word.split('');
    const denominations = letters.map(letter => {
        return a1z26Cipher(letter);
    });

    // Fill with zeros until length is 9
    while (denominations.length < 9) {
        denominations.push(0);
    }

    // If longer than 9, trim to 9
    return denominations.slice(0, 9);
}

function a1z26Cipher(letter){
    const index = positions.indexOf(letter.toUpperCase());
    if (index === -1) {
        throw new Error(`Invalid letter: ${letter}`);
    }
    return index + 1;
}