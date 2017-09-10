var engine = {
    
    battlelog: [],

    party: {
        ness: {
            hp: 50,
            str: 10,
            type: 'player',
            skills: ['hit']
            
        },

        paula: {
            hp: 30,
            str: 8,
            type: 'player',
            skills: ['hit', 'heal']
        },

        1: {
            hp: 10,
            str: 3,
            type: 'enemy',
            skills: ['hit']
        },

        2: {
            hp: 10,
            str: 3,
            type: 'enemy',
            skills: ['hit']
        },

        3: {
            hp: 10,
            str: 3,   
            type: 'enemy',         
            skills: ['hit']

        }
    },

    

    init: function(name) {
        this.log('you step into battle.');
        this.log('')    
    },


    do: function(src, verb, dest) {
        
        if(!this.party[src]) {
            this.log(src + ' is not in this fight!')
            return;
        }

        skills = this.party[src]['skills'];

        if(!this.party[dest]) {
            this.log(dest + ' is not in this fight!')
            return; 
        }

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
        this.party[dest]['hp'] = this.party[dest]['hp'] - dmg;
        this.log(src + ' delievered ' + dmg + ' damage to ' + dest + "!");
    },

    heal: function(src, dest) {
        dmg = this.party[src].str;
        this.party[dest]['hp'] = this.party[dest]['hp'] + dmg;
        this.log(src + ' restored ' + dmg + ' hp to ' + dest + "!");
    },

    status: function() {
        party = 0
        enemies = 0
        for(char in this.party) {
            if(this.party[char].hp < 0) {
                delete this.party[char];
                this.log(char + ' has been killed!');
            }
        }

        for(char in this.party) {
            if(this.party[char].type == "player") player = 1;    
            if(this.party[char].type == "enemy") enemies = 1;            
        }


        if(player == 0) this.log('the party was defeated and the enemies robbed them and dragged them back to the checkpoint!')
        if(enemies == 0) this.log('the enemies were defeated!')

    },

    log: function(msg) {
        console.log(msg);
        this.battlelog.push(msg);
    }
};