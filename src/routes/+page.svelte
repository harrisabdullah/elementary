<script lang="ts">
    import Element from "./Element.svelte";

    const one_letter = new Set(['h', 'b', 'c', 'n', 'o', 'f', 'p', 's', 'k', 'v', 'y', 'i', 'w', 'u']);
    const two_letter = new Set(['he', 'li', 'be', 'ne', 'na', 'mg', 'al', 'si', 'cl', 'ar', 'ca', 'sc', 'ti', 'cr', 'mn', 'fe', 'co',
        'ni', 'cu', 'zn', 'ga', 'ge', 'as', 'se', 'br', 'kr', 'rb', 'sr', 'zr', 'nb', 'mo', 'tc', 'ru', 'rh',
        'pd', 'ag', 'cd', 'in', 'sn', 'sb', 'te', 'xe', 'cs', 'ba', 'la', 'ce', 'pr', 'nd', 'pm', 'sm', 'eu',
        'gd', 'tb', 'dy', 'ho', 'er', 'tm', 'yb', 'lu', 'hf', 'ta', 're', 'os', 'ir', 'pt', 'au', 'hg', 'tl',
        'pb', 'bi', 'po', 'at', 'rn', 'fr', 'ra', 'ac', 'th', 'pa', 'np', 'pu', 'am', 'cm', 'bk', 'cf', 'es',
        'fm', 'md', 'no', 'lr', 'rf', 'db', 'sg', 'bh', 'hs', 'mt', 'ds', 'rg', 'cn', 'nh', 'fl', 'mc', 'lv',
        'ts', 'og']);

    interface TextSnippet {
        content: String;
        is_element: boolean;
    }

    let output: TextSnippet[][] = [[]];
    let inputText: String;
    let textareaEl: HTMLElement;
    let currant_element = "hover over element";
    let has_hovered = false;

    function format_text(event: Event){
        event.preventDefault();

        let text = inputText.toLowerCase(); // GPT: how ot get the text from the textarea??
        output = [[]];

        if (text.trim() == ""){
            return;
        }

        type OutputElement = { content: string; is_element: boolean };
        let currantString = "";
        let currantOuptut;
        let pendingOutput: OutputElement[][] = [[]]; 
        let pendingStrings = [text];
        while (pendingStrings.length != 0){
            currantString = pendingStrings.shift()!;
            if (!currantString){
                continue;
            }
            currantOuptut = pendingOutput.shift()!;
            if (!(one_letter.has(currantString[0].toLowerCase())) && 
                !(currantString.length >= 2 && two_letter.has((currantString[0] + currantString[1]).toLowerCase()))) {
                pendingOutput.push(currantOuptut.concat({content: currantString[0], is_element: false}));
                pendingStrings.push(currantString.slice(1));
            } else if (one_letter.has(currantString[0].toLowerCase())){
                pendingOutput.push(currantOuptut.concat({content: currantString[0].toUpperCase(), is_element: true}));
                pendingStrings.push(currantString.slice(1));
            } else {
                pendingOutput.push(currantOuptut.concat({content: currantString[0].toUpperCase() + currantString[1].toLocaleLowerCase(), is_element: true}));
                pendingStrings.push(currantString.slice(2));
            }
        }
        // find the best out of the potential results.
        let bestOutput = pendingOutput.reduce((best, current) => {
            const falsesCountCurrent = current.filter(obj => !obj.is_element).length;
            const falsesCountBest = best.filter(obj => !obj.is_element).length;
            return falsesCountCurrent < falsesCountBest ? current : best;
        });
        // split 1d arr into lines.
        output = [];
        let current = [];

        for (const obj of bestOutput) {
            if (obj.content === '\n') {
                if (current.length) output.push(current);
                    current = [];
            } else {
                current.push(obj);
            }
        }
        if (current.length) output.push(current);
    }

    function keyDown(event: KeyboardEvent){
        if (!(event.key == "Enter") || event.shiftKey){
            return;
        }
        format_text(event)
    }

    function change_currant_element(new_element:String){
        has_hovered = true;
        currant_element = new_element.toString();
    }

    function autoResize() {
        textareaEl.style.height = 'auto';
        textareaEl.style.height = textareaEl.scrollHeight + 'px';
    }

</script>

<div id={output.length===1 && output[0].length===0 ? 'centre-container':'container'}>
    <form on:submit={format_text}>
        <textarea
            id="text-input"
            bind:value={inputText}
            bind:this={textareaEl}
            on:keydown={keyDown}
            on:input={autoResize}
            contenteditable="true"
            aria-multiline="true"
            tabindex="0"
        ></textarea>
        <input id="submit-button" type="submit" value="go">
    </form>

    <div id={output.length===1 && output[0].length===0 ? 'no-show':'output-container'}>
        <div id='output-text'>
            {#each output as line}
                <div class="line">
                    {#if line.length === 0}
                            <span><br></span>
                    {:else}
                        {#each line as text}
                            {#if text.is_element}
                                <Element element_symbol={text.content.toString()} currant_element_changer={change_currant_element}></Element>
                                {:else}
                                <span class="text">{text.content}</span>
                            {/if}
                        {/each}
                    {/if}
                </div>
            {/each}
        </div>

        <div id="hover-element-viewer" class={has_hovered? "after_hover": "before_hover"}>
            {currant_element}</div>
    </div>
</div>


<style>
    #container {
        display: flex;
        flex-direction: row;
        align-items: start;
        justify-content: space-around;
        padding: 20px;
        margin-left: 23%;
        margin-right: 23%;
    }

    #centre-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
    }

    #text-input {
        resize: none;
        overflow-y: hidden;
        width: 300px;
        background: #2e3136;
        border: 1px solid #72767D;
        border-radius: 5px;
        padding: 8px;
        font-size: 20px;
        color: white;
    }

    #text-input:focus {
        outline: none;
        box-shadow: none;
    }

    #submit-button {
        margin-top: 10px;
        height: 41px;
        padding: 8px;
        width: 318px;
        border: none;
        border-radius: 5px;
        background-color: #488258;
        color: #FFFFFF;
        cursor: pointer;
    }
    #submit-button:hover {
        background-color:  #3E6F45;
    }

    #no-show {
        display: none;
    }

    #output-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
    }

    #output-text {
        resize: none;
        width: 300px;
        min-width: 300px;
        background: #242629;
        color: #FFFFFF;
        border: 1px solid #446a44;
        border-radius: 5px;
        padding: 8px;
        letter-spacing: 1px;
        font-size: 20px;
    }

    .line {
        max-width: inherit;
        word-wrap: break-word;
    }

    #hover-element-viewer {
        width: 300px;
        min-width: 300px;
        height: 22.5px;
        min-height: 22.5px;
        background: #242629;
        border-radius: 5px;
        padding: 8px;
        font-size: 20px;
        letter-spacing: 1px;
        margin-top: 10px;
        border: 1px solid #258288;
    }

    .before_hover {
        color: #72767D;
    }

    .after_hover {
        color: #FFFFFF;
    }


    @media (max-width: 700px) {
        #container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        #output-container {
            margin-left: unset;
        }

        form {
            margin-right: unset;
        }

        #output-text {
            margin-left: 0;
            margin-top: 10px;
        }
        #hover-element-viewer {
            display: none;
        }
    }
</style>
