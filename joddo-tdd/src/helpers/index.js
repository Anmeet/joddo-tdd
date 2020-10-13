export function getLetterMatchCount (guessWord, secretWord) {
    const secretLetterSet = new Set(secretWord.split(''));
    const guessedLetterSet = new Set(guessWord.split(''));
    return [...secretLetterSet].filter(letter => guessedLetterSet.has(letter)).length
}