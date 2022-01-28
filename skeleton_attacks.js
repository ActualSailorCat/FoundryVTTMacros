// Function BEGIN
async function sc_massshockingskellies(rollType) {
    let confirmed = false;
    var rollArmy = "<b>Skeletons.</b><br><span style=\"font-size:0.9em\">Aaah! Real skeletons attack!</span><br><br>";
    new Dialog({
        title: "Mass Skeleton Attack",
        content: `
        <form>
        <div class="form-group">
        <label>Number of Attacks:</label>
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
        close: async html => {
            if (confirmed) {
                let valk = game.data.actors.find(c => c.name === "Valkrana Miraquinal");
                let valkprof = valk.data.attributes.prof;
                let rolltimes = parseInt(html.find('[name=rollnumber]')[0].value);
                switch (rollType) {
                    case "NOR":
                        for (let y = 0; y < rolltimes; y++) {
                            let roll1   = await new Roll('1d20').roll();    
                            game.dice3d.showForRoll(roll1);
                            let rollTot1 = roll1.total;
                            let rollStr1a = '<b>' + (rollTot1 + 4) + '</b>';
                            let rollStr1b = ' (' + rollTot1 + ' + 4)';
                            let dMG = '1d6';
                            if (rollTot1 === 20) {
                                dMG = '2d6';
                                if (rollTot1 === 20) { rollStr1a = '<span style=\"color: green\">' + rollStr1a + '</span>' }
                            }
                            rollArmy = ( rollArmy + '<div class="row" style="display:flex; border-bottom:1px dotted black; padding: 2px"><div style="flex: 70%; text-align:left; ">' + (y + 1) + '. ATK ' + rollStr1a + rollStr1b + '</div><div style="flex: 30%; text-align:left; border-left:1px solid black; padding-left:2px">  DMG [[' + dMG + '+ 2 + ' + valkprof + ']]</span></div></div>');
                        }
                        break;
                    case "ADV":
                         for (let y = 0; y < rolltimes; y++) {
                            let roll1       = await new Roll('1d20').roll();  // Rolls die mechanically.
                            game.dice3d.showForRoll(roll1);             // Rolls die visually.
                            let roll2       = await new Roll('1d20').roll();    
                            game.dice3d.showForRoll(roll2);
                            let rollTot1    = roll1.total;
                            let rollTot2    = roll2.total;   
                            let color1      = 'black';
                            let color2      = 'black';
                            let rollOrder   = 1;
                            let rollOut     = '';
                            let dMG = '1d6';
                            // Critical Hit
                            if (rollTot1 === 20 || rollTot2 === 20) {
                                dMG = '2d6';
                                if (rollTot1 === 20) {
                                    color1 = 'green';
                                }
                                if (rollTot2 === 20) {
                                    color2 = 'green';
                                    rollOrder = 2;
                                }
                            }
                            // Roll 1 Higher
                            else if (rollTot1 > rollTot2) {
                                color1 = 'blue';
                            }
                            // Roll 2 Higher
                            else if (rollTot2 > rollTot1) {
                                color2 = 'blue';
                                rollOrder = 2;
                            }
                            // Equal Rolls
                            else if (rollTot1 === rollTot2) { 
                                if (rollTot1 === 1) {
                                    color1 = 'red';
                                    color2 = 'red';
                                }
                                else {
                                    color1 = 'blue';
                                    color2 = 'blue';
                                }
                            }
                            let rollStr1a   = '<span style="color:' + color1 + '"><b>' + (rollTot1 + 4) + '</b></span>';    // Roll Total 1
                            let rollStr1b   = ' (' + rollTot1 + ' + 4)';                                                    // Roll Formula 1
                            let rollStr2a   = '<span style="color:' + color2 + '"><b>' + (rollTot2 + 4) + '</b></span>';    // Roll Total 2
                            let rollStr2b   = ' (' + rollTot2 + ' + 4)';                                                    // Roll Formula 2
                            if (rollOrder === 1) { rollOut = rollStr1a + rollStr1b + ' ' + rollStr2a + rollStr2b; }
                            else { rollOut = rollStr2a + rollStr2b + ' ' + rollStr1a + rollStr1b; }
                            rollArmy = ( rollArmy + '<div class="row" style="display:flex; border-bottom:1px dotted black; padding: 2px"><div style="flex: 70%; text-align:left; ">' + (y + 1) + '. ATK ' + rollOut + '</div><div style="flex: 30%; text-align:left; border-left:1px solid black; padding-left:2px">  DMG [[' + dMG + '+ 2 + ' + valkprof + ']]</span></div></div>');
                        }
                        break;
                    case "DIS":
                         for (let y = 0; y < rolltimes; y++) {
                            let roll1       = await new Roll('1d20').roll();  // Rolls die mechanically.
                            game.dice3d.showForRoll(roll1);             // Rolls die visually.
                            let roll2       = await new Roll('1d20').roll();    
                            game.dice3d.showForRoll(roll2);
                            let rollTot1    = roll1.total;
                            let rollTot2    = roll2.total;   
                            let color1      = 'black';
                            let color2      = 'black';
                            let rollOrder   = 1;
                            let rollOut     = '';
                            let dMG = '1d6';
                            // Critical Hit
                            if (rollTot1 === 20 && rollTot2 === 20) {
                                dMG = '2d6';
                                color1 = 'green';
                                color2 = 'green';
                            }
                            // Critical Miss
                            if (rollTot1 === 1 || rollTot2 === 1) {
                                if (rollTot2 === 1) {
                                    color2 = 'red';
                                    rollOrder = 2;
                                }
                                if (rollTot1 === 1) {
                                    color1 = 'red';
                                }
                            }
                            // Roll 1 Lower
                            else if (rollTot1 < rollTot2) {
                                color1 = 'purple';
                            }
                            // Roll 2 Higher
                            else if (rollTot2 < rollTot1) {
                                color2 = 'purple';
                                rollOrder = 2;
                            }
                            // Equal Rolls
                            else if (rollTot1 === rollTot2) { 
                                color1 = 'purple';
                                color2 = 'purple';
                            }
                            let rollStr1a   = '<span style="color:' + color1 + '"><b>' + (rollTot1 + 4) + '</b></span>';    // Roll Total 1
                            let rollStr1b   = ' (' + rollTot1 + ' + 4)';                                                    // Roll Formula 1
                            let rollStr2a   = '<span style="color:' + color2 + '"><b>' + (rollTot2 + 4) + '</b></span>';    // Roll Total 2
                            let rollStr2b   = ' (' + rollTot2 + ' + 4)';                                                    // Roll Formula 2
                            if (rollOrder === 1) { rollOut = rollStr1a + rollStr1b + ' ' + rollStr2a + rollStr2b; }
                            else { rollOut = rollStr2a + rollStr2b + ' ' + rollStr1a + rollStr1b; }
                            rollArmy = ( rollArmy + '<div class="row" style="display:flex; border-bottom:1px dotted black; padding: 2px"><div style="flex: 70%; text-align:left; ">' + (y + 1) + '. ATK ' + rollOut + '</div><div style="flex: 30%; text-align:left; border-left:1px solid black; padding-left:2px">  DMG [[' + dMG + '+ 2 + ' + valkprof + ']]</span></div></div>');
                        }
                        break;
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
new Dialog({
    title: "Mass Skeleton Attack",
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Normal",
            callback: () => {
                let rollType = 'NOR';
                sc_massshockingskellies(rollType);
            }
        },
        two: {
            icon: '<i class="fas fa-check"></i>',
            label: "Advantage",
            callback: () => {
                let rollType = 'ADV';
                sc_massshockingskellies(rollType);
            }
        },
        three: {
            icon: '<i class="fas fa-check"></i>',
            label: "Disadvantage",
            callback: () => {
                let rollType = 'DIS';
                sc_massshockingskellies(rollType);
            }
        }
    },
    default: "Cancel"    
}).render(true)
