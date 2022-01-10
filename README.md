## FoundryVTT DnD5e Macros
### Necromancer Minion Macros
 ![Skeleton Attack Roll](https://i.imgur.com/oGZ0a5G.png)  
These macros were made with several things in mind: choice of save modifier, choice of attack type, number of rolls, and a compact and readable roll output. Critical hits will be green, critical misses will be red, advantage rolls will be blue, disadvantage rolls will be purple. All properly color-coded and organized in chat. Includes skeleton_saves, skeleton_attacks, voidclaw_saves, voidclaw_attacks.

In order to tailor these to your character, you will need to change at least the following:  
<ul>
<li>Attacks: Change "Valkrana Vil Galath Faeri Miraquinal" to the name of your character. This adds the damage from the Undead Thralls class feature to your minions' attacks.</li>
<li>Attacks: Note that the attacks macros are tailored to skeletons. The '4' in the rollStr1a, rollStr1b, rollStr2a, rollStr2b variables represent a skeleton's proficiency bonus + DEX modifier, and will need to be changed. If your minion's damage roll isn't a 1d6, that will also need to be changed in both instances of the dMG variable.</li>
</ul>  
