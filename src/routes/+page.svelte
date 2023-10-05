

<script lang="ts">
    const one_letter = ['h', 'b', 'c', 'n', 'o', 'f', 'p', 's', 'k', 'v', 'y', 'i', 'w', 'u'];
    const two_letter = ['he', 'li', 'be', 'ne', 'na', 'mg', 'al', 'si', 'cl', 'ar', 'ca', 'sc', 'ti', 'cr', 'mn', 'fe', 'co',
        'ni', 'cu', 'zn', 'ga', 'ge', 'as', 'se', 'br', 'kr', 'rb', 'sr', 'zr', 'nb', 'mo', 'tc', 'ru', 'rh',
        'pd', 'ag', 'cd', 'in', 'sn', 'sb', 'te', 'xe', 'cs', 'ba', 'la', 'ce', 'pr', 'nd', 'pm', 'sm', 'eu',
        'gd', 'tb', 'dy', 'ho', 'er', 'tm', 'yb', 'lu', 'hf', 'ta', 're', 'os', 'ir', 'pt', 'au', 'hg', 'tl',
        'pb', 'bi', 'po', 'at', 'rn', 'fr', 'ra', 'ac', 'th', 'pa', 'np', 'pu', 'am', 'cm', 'bk', 'cf', 'es',
        'fm', 'md', 'no', 'lr', 'rf', 'db', 'sg', 'bh', 'hs', 'mt', 'ds', 'rg', 'cn', 'nh', 'fl', 'mc', 'lv',
        'ts', 'og'];

    const elements = {'h': 'Hydrogen', 'he': 'Helium', 'li': 'Lithium', 'be': 'Beryllium', 'b': 'Boron', 'c': 'Carbon', 'n': 'Nitrogen', 'o': 'Oxygen', 'f': 'Fluorine', 'ne': 'Neon', 'na': 'Sodium', 'mg': 'Magnesium', 'al': 'Aluminium', 'si': 'Silicon', 'p': 'Phosphorus', 's': 'Sulfur', 'cl': 'Chlorine', 'ar': 'Argon', 'k': 'Potassium', 'ca': 'Calcium', 'sc': 'Scandium', 'ti': 'Titanium', 'v': 'Vanadium', 'cr': 'Chromium', 'mn': 'Manganese', 'fe': 'Iron', 'co': 'Cobalt', 'ni': 'Nickel', 'cu': 'Copper', 'zn': 'Zinc', 'ga': 'Gallium', 'ge': 'Germanium', 'as': 'Arsenic', 'se': 'Selenium', 'br': 'Bromine', 'kr': 'Krypton', 'rb': 'Rubidium', 'sr': 'Strontium', 'y': 'Yttrium', 'zr': 'Zirconium', 'nb': 'Niobium', 'mo': 'Molybdenum', 'tc': 'Technetium', 'ru': 'Ruthenium', 'rh': 'Rhodium', 'pd': 'Palladium', 'ag': 'Silver', 'cd': 'Cadmium', 'in': 'Indium', 'sn': 'Tin', 'sb': 'Antimony', 'te': 'Tellurium', 'i': 'Iodine', 'xe': 'Xenon', 'cs': 'Cesium', 'ba': 'Barium', 'la': 'Lanthanum', 'ce': 'Cerium', 'pr': 'Praseodymium', 'nd': 'Neodymium', 'pm': 'Promethium', 'sm': 'Samarium', 'eu': 'Europium', 'gd': 'Gadolinium', 'tb': 'Terbium', 'dy': 'Dysprosium', 'ho': 'Holmium', 'er': 'Erbium', 'tm': 'Thulium', 'yb': 'Ytterbium', 'lu': 'Lutetium', 'hf': 'Hafnium', 'ta': 'Tantalum', 'w': 'Tungsten', 're': 'Rhenium', 'os': 'Osmium', 'ir': 'Iridium', 'pt': 'Platinum', 'au': 'Gold', 'hg': 'Mercury', 'tl': 'Thallium', 'pb': 'Lead', 'bi': 'Bismuth', 'po': 'Polonium', 'at': 'Astatine', 'rn': 'Radon', 'fr': 'Francium', 'ra': 'Radium', 'ac': 'Actinium', 'th': 'Thorium', 'pa': 'Protactinium', 'u': 'Uranium', 'np': 'Neptunium', 'pu': 'Plutonium', 'am': 'Americium', 'cm': 'Curium', 'bk': 'Berkelium', 'cf': 'Californium', 'es': 'Einsteinium', 'fm': 'Fermium', 'md': 'Mendelevium', 'no': 'Nobelium', 'lr': 'Lawrencium', 'rf': 'Rutherfordium', 'db': 'Dubnium', 'sg': 'Seaborgium', 'bh': 'Bohrium', 'hs': 'Hassium', 'mt': 'Meitnerium', 'ds': 'Darmstadtium', 'rg': 'Roentgenium', 'cn': 'Copernicium', 'nh': 'Nihonium', 'fl': 'Flerovium', 'mc': 'Moscovium', 'lv': 'Livermorium', 'ts': 'Tennessine', 'og': 'Oganesson'};

    let output: string[] = [];
    let input = "";
    let input_element;

    function make_element(event) {
        event.preventDefault();
        input_element.focus();

        output = [];
        let text = input.toLowerCase();
        let i = 0;

        while (i < text.length) {
            if (i+1 > text.length) {
                if (one_letter.indexOf(text[i]) == -1) {
                    output = ["error"];
                    return
                }
            }

            if (two_letter.indexOf(text.slice(i, i+2)) != -1){
                let out = text[i].toUpperCase() + text[i+1];
                output.push(out);
                i += 2;
                continue;
            }

            if (one_letter.indexOf(text[i]) != -1){
                output.push(text[i].toUpperCase());
                i += 1
                continue;
            }

            output = ["error"];
            return;
        }
    }
</script>


<div id="container">
    <form id="input" on:submit={make_element}>
        <label>
            <input bind:value={input} bind:this={input_element} type="text">
        </label>
        <button on:click={make_element}>go</button>
    </form>
    <div id="output">
        {#if output.includes("error")}
            <span id="error">404: elements not found</span>
        {:else}
            {#each output as ele}
                <span id="element">{ele}</span>
            {/each}
        {/if}
    </div>

    {#if !output.includes("error") && output.length > 0}
        <div id="more-info">
            {#each output as ele}
                <p>- {elements[ele.toLowerCase()]}</p>
            {/each}
        </div>
    {/if}
</div>

<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #36393F;
        color: #FFFFFF;
    }

    #container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }

    #input {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        width: 50%;

    }

    #input label {
        margin-right: 5px;
        width: 50%;
    }

    #input input {
        height: 37px;
        width: 95%;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #72767D;
        outline: none;
        background-color: #2E3136;
        color: #FFFFFF;
        font-size: large;
    }

    #input input:focus {
        outline: none;
        border: 1px solid #7289da;
    }

    #input button {
        height: 49px;
        width: 49px;
        border: none;
        border-radius: 5px;
        background-color: #7289DA;
        color: #FFFFFF;
        cursor: pointer;
    }

    #input button:hover {
        background-color: #677BC4;
    }

    #output {
        display: flex;
    }

    #element{
        user-select: none;
        padding: 5px;
        margin-right: 5px;
        border-radius: 5px;
        background-color: #7289DA;
        color: #FFFFFF;
        width: 30px;
        height: 30px;
        font-size: large;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #error{
        user-select: none;
        padding: 5px;
        margin-right: 5px;
        border-radius: 5px;
        background-color: #d9534f;
        color: #FFFFFF;
    }

    #output span:last-child {
        margin-right: 0;
    }

    #more-info {
        margin: 10px;
        padding: 10px;
        background: #4E5E9A;
        border-radius: 10px;
    }
    p {
        font-size: small;
        margin: unset;
    }
</style>