var engine = {
    
    battlelog: [],

    turn: 'ness',

    arena: {
        ness: {
            hp: 50,
            str: 10,
            type: 'party',
            skills: ['hit'],
          
        },

        paula: {
            hp: 30,
            str: 8,
            type: 'party',
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
        this.log('Tactics!')
        this.log('========')   
        this.log('usage exampe:')  
        this.log('    engine.status() // shows stats of those in the arena ');   
        this.log('    engine.do("ness", "hit", "1") // engine.do(src, verb, dest) ');   
        this.log('______________________')   
        this.log('you and your party step into battle.');
        this.status();
        this.log('')   
        this.check(false); 
    },


    do: function(src, verb, dest) {
        
        if(src != this.turn) {
            this.log("it's not " + src + "'s turn!")
            return;
        }

        if(!this.arena[src]) {
            this.log(src + ' is not in this fight!')
            return;
        }

        skills = this.arena[src]['skills'];

        if(!this.arena[dest]) {
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
                this.check()
                return;
            }
        }

        if(!match) msg += ' and misses!';

        this.log(msg);
    },
    hit: function(src, dest) {
        dmg = this.arena[src].str;
        this.arena[dest]['hp'] = this.arena[dest]['hp'] - dmg;
        this.log(src + ' delievered ' + dmg + ' damage to ' + dest + "!");
    },

    heal: function(src, dest) {
        dmg = this.arena[src].str;
        this.arena[dest]['hp'] = this.arena[dest]['hp'] + dmg;
        this.log(src + ' restored ' + dmg + ' hp to ' + dest + "!");
    },

    check: function(next = true) {
        party = 0
        enemies = 0
        for(char in this.arena) {
            if(this.arena[char].hp < 0) {
                delete this.arena[char];
                this.log(char + ' has been killed!');
                this.log('')  
            }
        }

        for(char in this.arena) {
            if(this.arena[char].type == "party") party = 1;    
            if(this.arena[char].type == "enemy") enemies = 1;            
        }


        if(party == 0) this.log('the party was defeated and the enemies robbed them and dragged them back to the checkpoint!')
        if(enemies == 0) {
            this.log('the enemies were defeated!')
            return false;
        }

        if(next) this.next();

        this.log('')  
        this.log("it's " + this.turn + "'s turn.")
        this.ai()

    },

    status: function() {
        for(char in this.arena) {
            msg = "";
            if(this.arena[char].type == "party") msg += "* ";
            msg += char + ": " + this.arena[char].hp + ' hp';
           
           this.log(msg);
        }

    },

    next: function() {
        next = 0;
        first = false;
        for(char in this.arena) {
            if(first === false) first = char;
            if(next == 1) {
                this.turn = char;

                return;
            }
            if(this.turn == char) next = 1;
        }
        this.turn = first;

    },

    ai: function(log = true)
    {

        // let's determine if the computer should take this turn
        if(this.arena[this.turn].type == 'enemy')
        {
            this.do(this.turn, 'hit', this.getRandom('party'))
        }
    },

    getRandom: function(type = 'party') {
        for(char in this.arena) {
            if(this.arena[char].type == type) {
                return char
            }
            return 'ness'
        }
    },

    log: function(msg) {
        console.log(msg);
        this.battlelog.push(msg);
    }
};