var engine = {
    
    battlelog: [],

    party: {
        ness: {
            hp: 50,
            str: 10,
            skills: ['hit']
            
        },

        paula: {
            hp: 30,
            str: 8,

            skills: ['hit', 'heal']
        }
    },

    enemies: {
        1: {
            hp: 10,
            str: 3,
            skills: ['hit']
        },

        2: {
            hp: 10,
            str: 3,
            skills: ['hit']
        },

        3: {
            hp: 10,
            str: 3,            
            skills: ['hit']

        }
    },

    

    init: function(name) {
        this.log('you step into battle.');
        this.log('')    
    },


    do: function(src, verb, dest) {

        skills = this.party[src]['skills'];

        msg = src + ' attempts to ' + verb + ' ' + dest + '... '
        match = 0;
        for(skill in skills) {
            if(skills[skill] == verb) {
                match = 1;
                msg += ' and succceeds!';
                this.log(msg)
                this[verb](src, dest);

                return this.status();
            }
        }

        if(!match) msg += ' and misses!';

        this.log(msg);
    },
    hit: function(src, dest) {
        dmg = this.party[src].str;
        this.enemies[dest]['hp'] = this.enemies[dest]['hp'] - dmg;
        this.log(src + ' delievered ' + dmg + ' damage to ' + dest + "!");
    },

    heal: function(src, dest) {
        dmg = this.party[src].str;
        this.party[dest]['hp'] = this.party[dest]['hp'] + dmg;
        this.log(src + ' restored ' + dmg + ' hp to ' + dest + "!");
    },

    status: function() {
        party = 0
        for(char in this.party) {
            if(this.party[char].hp < 0) {
                this.log(char + ' has been killed!');
            }
            party++;
        }
        enemies = 0;
        for(char in this.enemies) {
            if(this.enemies[char].hp < 0) {
                delete this.enemies[char];
                this.log(char + ' has been killed!');
            }
            enemies++;
        }
        if(party == 0) this.log('the party was defeated and the enemies robbed them and dragged them back to the checkpoint!')
        if(enemies == 0) this.log('the enemies were defeated!')

    },

    log: function(msg) {
        console.log(msg);
        this.battlelog.push(msg);
    }
};