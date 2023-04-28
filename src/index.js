const operationMap = {
    'DATA': '',
    'TAKE': '1',
    'ADD': '2',
    'SUB': '3',
    'SAVE': '4',
    'JMP': '5',
    'TST': '6',
    'INC': '7',
    'DEC': '8',
    'NULL': '9',
    'HLT': '10'
}
const placeholderText = `000 TAKE 004 any comment
001 ADD 005 (will be)
002 SAVE 006 //deleted
003 HLT 000
004 DATA 002
005 DATA 003
006 DATA 005
007
008
`
const input = document.querySelector('.input')
const output = document.querySelector('.output')
const button = document.querySelector('.translate')
const clear = document.querySelector('.clear')
const copy = document.querySelector('.copy')
const generate = document.querySelector('.generate')

input.setAttribute('placeholder', 'Copy your program here')

button.addEventListener('click', () => {
    const lines = input.value.split('\n')
    const assembled = lines.map(line => {
        const lineElements = line.split(' ')
        console.log(lineElements)
        if (!lineElements[1]) return '000\n'

        return operationMap[lineElements[1].toUpperCase()] + lineElements[2] + '\n'
    })
    output.value = assembled.join('') + '000\n'.repeat(1000 - lines.length)
})

clear.addEventListener('click', () => {
    input.value = '';
    output.value = '';
})

output.addEventListener('click', () => {
    if (!output.value) return;
    // Select the text field
    output.select();
    output.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(output.value);
})

copy.addEventListener('click', () => {
    navigator.clipboard.writeText(output.value);
})

generate.addEventListener('click', () => {
    numbers = Array(100).fill(0).map((_, i) => {
        if (i < 10) return '00'+i+' \n';
        if(i < 100) return '0' +i+' \n';
    })
    input.value = numbers.join('');
})

function validate(line) {

}