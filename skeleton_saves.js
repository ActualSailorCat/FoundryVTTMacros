// SAVES
// Function BEGIN
function valkskellysaves(skellymod, abilityName) {
    let confirmed = false;
    let confirmed2 = false;
    var rollArmy = "";
    var rollArmy2 = "";
    // Skeleton #
    new Dialog({
        title: "Mass Skeleton Roller",
        content: `
        <form>
        <div class="form-group">
        <label>Number of Skeletons:</label>
        <input id="rollnumber" name="rollnumber"></input>
        </div>
        </form>
        `,
        buttons: {
            one: {
                icon: '<i class="fas fa-check"></i>',
                label: "Roll!",
                callback: () => confirmed = true
            },
            two: {
                icon: '<i class="fas fa-times"></i>',
                label: "Cancel",
                callback: () => confirmed = false
            }
        },
        default: "Cancel",
        close: html => {
            if (confirmed) {
                rollArmy = rollArmy + '<b>Hrrrngh! Skeleton Saves!</b><br><br>';
                let rolltimes = parseInt(html.find('[name=rollnumber]')[0].value);
                for (let y = 0; y < rolltimes; y++) {
                    let roll1   = new Roll('1d20').roll();    
                    game.dice3d.showForRoll(roll1);
                    let roll2   = new Roll('1d20').roll();    
                    game.dice3d.showForRoll(roll2);
                    let rollTot1 = roll1.total;
                    let rollTot2 = roll2.total;
                    let rollStr1a = '<b>' + (rollTot1 + skellymod) + '</b>';
                    let rollStr1b = ' (' + rollTot1 + ' + ' + skellymod + ')';
                    let rollStr2a = '<b>' + (rollTot2 + skellymod) + '</b>';
                    let rollStr2b = ' (' + rollTot2 + ' + ' + skellymod + ')';
                    rollArmy = ( rollArmy + '<div class="row" style="display:flex; border-bottom:1px dotted black; padding: 2px"><div style="flex: 70%; text-align:left; ">' + abilityName + ' Save ' + (y + 1) + '. ' + rollStr1a + rollStr1b + ' ' + rollStr2a + rollStr2b + '</div></div>');
                }

                var chatData = {
                    user: game.user._id,
                    speaker: ChatMessage.getSpeaker(),
                    content: rollArmy
                };

                ChatMessage.create(chatData, {});
            }
        }
    }).render(true);
}
// Function END

// Queries Begin
let confirmed = false;
var rollArmy = "Hrrrrngh! Skellyton saves!<br><br>";
let dialogOptions = `
                    <option value="STR"> Strength </option>
                    <option value="DEX"> Dexterity </option>
                    <option value="CON"> Constitution </option>
                    <option value="INT"> Intelligence </option>
                    <option value="WIS"> Wisdom </option>
                    <option value="CHA"> Charisma </option>
                    `;

let dialogContent = `<div style="flex:1">Save Type:<select name="abilityName">${dialogOptions}</select></div>`

new Dialog({
    title: "Skeleton Saves",
    content: dialogContent,
    buttons: {
        done: {
            label: "Confirm",
            callback: (html) => {
                let abilityName = html.find("[name=abilityName]")[0].value;
                let skelly = game.data.actors.find(c => c.name === "Skeleton Generic");
                switch (abilityName) {
                    case "STR": {
                        let skellymod = skelly.data.abilities.str.mod;
                        valkskellysaves(skellymod, abilityName);
                    }
                    break;

                    case "DEX": {
                        let skellymod = skelly.data.abilities.dex.mod;
                        valkskellysaves(skellymod, abilityName);
                    }
                    break;

                    case "CON": {
                        let skellymod = skelly.data.abilities.con.mod;
                        valkskellysaves(skellymod, abilityName);
                    }
                    break;

                    case "INT": {
                        let skellymod = skelly.data.abilities.int.mod;
                        valkskellysaves(skellymod, abilityName);
                    }
                    break;

                    case "WIS": {
                        let skellymod = skelly.data.abilities.wis.mod;
                        valkskellysaves(skellymod, abilityName);
                    }
                    break;

                    case "CHA": {
                        let skellymod = skelly.data.abilities.cha.mod;
                        valkskellysaves(skellymod, abilityName);
                    }
                    break;
                }
            }
        }
    },
    default: "done"    
}).render(true)
