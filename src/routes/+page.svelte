

<script lang="ts">
    import Element from "./Element.svelte";

    const one_letter = ['h', 'b', 'c', 'n', 'o', 'f', 'p', 's', 'k', 'v', 'y', 'i', 'w', 'u'];
    const two_letter = ['he', 'li', 'be', 'ne', 'na', 'mg', 'al', 'si', 'cl', 'ar', 'ca', 'sc', 'ti', 'cr', 'mn', 'fe', 'co',
        'ni', 'cu', 'zn', 'ga', 'ge', 'as', 'se', 'br', 'kr', 'rb', 'sr', 'zr', 'nb', 'mo', 'tc', 'ru', 'rh',
        'pd', 'ag', 'cd', 'in', 'sn', 'sb', 'te', 'xe', 'cs', 'ba', 'la', 'ce', 'pr', 'nd', 'pm', 'sm', 'eu',
        'gd', 'tb', 'dy', 'ho', 'er', 'tm', 'yb', 'lu', 'hf', 'ta', 're', 'os', 'ir', 'pt', 'au', 'hg', 'tl',
        'pb', 'bi', 'po', 'at', 'rn', 'fr', 'ra', 'ac', 'th', 'pa', 'np', 'pu', 'am', 'cm', 'bk', 'cf', 'es',
        'fm', 'md', 'no', 'lr', 'rf', 'db', 'sg', 'bh', 'hs', 'mt', 'ds', 'rg', 'cn', 'nh', 'fl', 'mc', 'lv',
        'ts', 'og'];

    interface TextSnippet {
        content: String;
        is_element: boolean;
    }

    let output: TextSnippet[][] = [[]];
    let inputElement: HTMLElement;
    let currant_element = "";

    function format_text(event){

        event.preventDefault();
        if (window.innerWidth > 700){
            inputElement.focus();
        }

        if (inputElement.innerText.trim() == ""){
            output = [[]];
            return;
        }

        let text = inputElement.innerText.toLowerCase();
        let i = 0;
        let line = 0;
        output = [[]];

        while (i <= text.length-2) {
            console.log(i)
            if (text[i] == '\n') {
                output.push([]);
                i++;
                line++;
                continue;
            }

            if (two_letter.indexOf(text[i] + text[i + 1]) != -1) {
                let out = text[i].toUpperCase() + text[i + 1];
                output[line].push({content: out, is_element: true});
                i += 2;
                continue;
            }

            if (one_letter.indexOf(text[i]) != -1) {
                output[line].push({content: text[i].toUpperCase(), is_element: true});
                i++;
                continue;
            }

            output[line].push({content:text[i], is_element:false});
            i++;
        }

        if (one_letter.indexOf(text[text.length-1]) != -1){
            output[line].push({content:text[text.length-1].toUpperCase(), is_element:true})
        } else {
            const lastRow = output[output.length - 1];
            const lastElement = lastRow[lastRow.length - 1];

            if (lastElement != undefined) {
                if (!lastElement.is_element) {
                    output[output.length - 1][output[output.length - 1].length - 1].content += text[text.length - 1];
                }
            }
            else {
                output[line].push({content:text[text.length-1], is_element:false});
            }
        }
    }

    function keyDown(event){
        if (!(event.key == "Enter") || event.shiftKey){
            return;
        }
        format_text(event)
    }

    function change_currant_element(new_element:String){
        currant_element = new_element;
    }

</script>

<div id={output.length===1 && output[0].length===0 ? 'centre-container':'container'}>
    <form on:submit={format_text}>
        <div id="text-input" bind:this={inputElement} on:keydown={keyDown} contenteditable="true"></div>
        <input id="submit-button" type="submit" value="go">
    </form>


    <div id={output.length===1 && output[0].length===0 ? 'no-show':'output-container'}>
        <div id='output-text'>
            {#each output as line}
                <div class="line">
                    {#each line as text}
                        {#if text.is_element}
                            <Element element_symbol={text.content} currant_element_changer={change_currant_element}></Element>
                            {:else}
                            <span class="text">{text.content}</span>
                        {/if}
                    {/each}
                </div>
            {/each}
        </div>

        <div id="hover-element-viewer">{currant_element}</div>
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
        width: 300px;
        background: #2e3136;
        border: 1px solid #72767D;
        border-radius: 5px;
        padding: 8px;
        font-size: 20px;
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


    #hover-element-viewer {
        width: 300px;
        min-width: 300px;
        height: 22.5px;
        min-height: 22.5px;
        background: #242629;
        color: #FFFFFF;
        border-radius: 5px;
        padding: 8px;
        font-size: 20px;
        letter-spacing: 1px;
        margin-top: 10px;
        border: 1px solid #258288;
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