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
const translate = document.querySelector('.translate')
const clear = document.querySelector('.clear')
const copy = document.querySelector('.copy')
const generate = document.querySelector('.generate')

input.setAttribute('placeholder', 'Copy your program here')

const leadingNumbers = Array(100).fill(0).map((_, i) => {
    if (i < 10) return '00' + i;
    if (i < 100) return '0' + i;
})

translate.addEventListener('click', () => {
    const lines = input.value.split('\n')
    let buildError = false;

    const assembled = lines.map((line, index) => {
        const lineElements = line.split(' ')

        if (!buildError && !validate(lineElements, index)) {
            buildError = true;
        }

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

generate.addEventListener('click', toggleAddresses)

function toggleAddresses() {
    const lines = input.value.split('\n')
    let areNumbersShown = false;

    const toggledAddresses = lines.map((line, index) => {

        const lineElements = line.split(' ')

        areNumbersShown = /^\d{3}$/.test(lineElements[0]) ? true : false

        if (areNumbersShown) {
            console.log('shown', lineElements)
            lineElements.shift()
            return lineElements.join(' ') + '\n'
        }
        else {
            console.log('not shown', lineElements)
            if (leadingNumbers[index]) {
                lineElements.unshift(leadingNumbers[index])
                return lineElements.join(' ') + '\n'
            }
            return
        }
    })

    let rest = '';
    for (let i = toggledAddresses.length; i < 100; i++) {
        if (areNumbersShown) {
            rest += '\n'
        }
        else {
            rest += leadingNumbers[i] + ' \n'
        }
    }

    input.value = (toggledAddresses.join('') + rest).trimEnd();
}

function validate(line, index) {

    if ( /^\d{3}$/.test(line[0]) === false) {
        displayError(leadingNumbers[index], line, "A line must start with an address between 000 and 999")
        return false;
    }
    if (! line[1]) return true

    if (Object.keys(operationMap).includes(line[1].toUpperCase()) === false ) {
        displayError(leadingNumbers[index], line, `Instruction "${line[1]}" does not exist`)
        return false;
    }

    if ( /^\d{3}$/.test(line[2]) === false) {
        displayError(leadingNumbers[index], line, "Instruction name must be followed by value or an address")
        return false;
    }
    return true;
}

function displayError(address, line, message) {
    alert(`Build failed
You have an error in your syntax at line ${address} 
> "${line.join(' ')}"
${message}`)
}