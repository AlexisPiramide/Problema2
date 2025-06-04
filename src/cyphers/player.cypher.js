const players = ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona", "George", "Hannah"];
const img = ["img1", "img2", "img3", "img4", "img5", "img6", "img7", "img8"];

const positions = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z",
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
    "!", "?", ",", "."
];

function generatePlayers(word) {
    const letters = word.split('');
    const playersNeeded = players.slice(0, letters.length);
    const imagesNeeded = img.slice(0, letters.length);

    const paired = playersNeeded.map((player, index) => ({
        player,
        img: imagesNeeded[index]
    }));

    const randomPairs = setRandomOrder(paired);
    const money = assignMoney(letters.length, 28, 1043);
    const playerObjects = letters.map((letter, index) => {
        const { player, img } = randomPairs[index];

        const position = a1z26Cipher(letter);
        return {
            name: player,
            img: img,
            money: money[index],
            position: position
        };
    });

    const reshuffled = playerObjects.sort(() => Math.random() - 0.5);

    return reshuffled;
}

function a1z26Cipher(letter){
    const index = positions.indexOf(letter.toUpperCase());
    if (index === -1) {
        throw new Error(`Invalid letter: ${letter}`);
    }
    return index + 1;
}

function setRandomOrder(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}


function assignMoney(numPlayers, min, max) {

    const allNumbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);

    for (let i = allNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]];
    }

    const chosen = allNumbers.slice(0, numPlayers).sort((a, b) => b - a);

    return chosen;
}

function getUniqueRandomInt(minInt, maxInt, usedSet) {
    const candidates = [];
    for (let i = minInt; i <= maxInt; i++) {
        if (!usedSet.has(i)) candidates.push(i);
    }
    const val = candidates[Math.floor(Math.random() * candidates.length)];
    usedSet.add(val);
    return val;
}


export default generatePlayers;