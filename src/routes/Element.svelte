<script lang="ts">
      export let element_symbol: string;
      export let currant_element_changer: (name: string) => void;

      const element_names_hashmap: Record<string, string> = {
            h: 'Hydrogen', he: 'Helium', li: 'Lithium', be: 'Beryllium',
          b: 'Boron', c: 'Carbon', n: 'Nitrogen', o: 'Oxygen',
          f: 'Fluorine', ne: 'Neon', na: 'Sodium', mg: 'Magnesium',
          al: 'Aluminium', si: 'Silicon', p: 'Phosphorus', s: 'Sulfur',
          cl: 'Chlorine', ar: 'Argon', k: 'Potassium', ca: 'Calcium',
          sc: 'Scandium', ti: 'Titanium', v: 'Vanadium', cr: 'Chromium',
          mn: 'Manganese', fe: 'Iron', co: 'Cobalt', ni: 'Nickel',
          cu: 'Copper', zn: 'Zinc', ga: 'Gallium', ge: 'Germanium',
          as: 'Arsenic', se: 'Selenium', br: 'Bromine', kr: 'Krypton',
          rb: 'Rubidium', sr: 'Strontium', y: 'Yttrium', zr: 'Zirconium',
          nb: 'Niobium', mo: 'Molybdenum', tc: 'Technetium', ru: 'Ruthenium',
          rh: 'Rhodium', pd: 'Palladium', ag: 'Silver', cd: 'Cadmium',
          in: 'Indium', sn: 'Tin', sb: 'Antimony', te: 'Tellurium',
          i: 'Iodine', xe: 'Xenon', cs: 'Cesium', ba: 'Barium',
          la: 'Lanthanum', ce: 'Cerium', pr: 'Praseodymium', nd: 'Neodymium',
          pm: 'Promethium', sm: 'Samarium', eu: 'Europium', gd: 'Gadolinium',
          tb: 'Terbium', dy: 'Dysprosium', ho: 'Holmium', er: 'Erbium',
          tm: 'Thulium', yb: 'Ytterbium', lu: 'Lutetium', hf: 'Hafnium',
          ta: 'Tantalum', w: 'Tungsten', re: 'Rhenium', os: 'Osmium',
          ir: 'Iridium', pt: 'Platinum', au: 'Gold', hg: 'Mercury',
          tl: 'Thallium', pb: 'Lead', bi: 'Bismuth', po: 'Polonium',
          at: 'Astatine', rn: 'Radon', fr: 'Francium', ra: 'Radium',
          ac: 'Actinium', th: 'Thorium', pa: 'Protactinium', u: 'Uranium',
          np: 'Neptunium', pu: 'Plutonium', am: 'Americium', cm: 'Curium',
          bk: 'Berkelium', cf: 'Californium', es: 'Einsteinium', fm: 'Fermium',
          md: 'Mendelevium', no: 'Nobelium', lr: 'Lawrencium', rf: 'Rutherfordium',
          db: 'Dubnium', sg: 'Seaborgium', bh: 'Bohrium', hs: 'Hassium',
          mt: 'Meitnerium', ds: 'Darmstadtium', rg: 'Roentgenium', cn: 'Copernicium',
          nh: 'Nihonium', fl: 'Flerovium', mc: 'Moscovium', lv: 'Livermorium',
          ts: 'Tennessine', og: 'Oganesson'
      };
    
      function getElementName(sym: string) {
        const name = element_names_hashmap[sym.toLowerCase()];
        return name ?? "";
      }
    </script>
    
    <span
      role="button"
      tabindex="0"
      on:mouseover={() => currant_element_changer(getElementName(element_symbol))}
      on:mouseleave={() => currant_element_changer("")}
      on:focus={() => currant_element_changer(getElementName(element_symbol))}
      on:blur={() => currant_element_changer("")}
    >
      {element_symbol}
    </span>

<style>
      span {
            font-weight: bold;
            color: #519c65;
            user-select: none;
      }

      span:hover {
            background-color: #2f3b52;
      }
</style>