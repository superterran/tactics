var arena = {
     
    engine: false,

    init: function(engine) {

        engine.obj = this
        for(char in engine.arena) {

            player = document.createElement("div")
            $(player).addClass('character')
                .addClass(char)
                .addClass(engine.arena[char].type)
                .attr('id', char)

            board = document.createElement("div")
                
            $(board).addClass('name').html(char)
            $(player).append(board)

            hp = document.createElement("div");
            $(hp).addClass('hp').html(engine.arena[char].hp)
            $(player).append(hp)

            $('#arena').append(player);
        }
       

        this.engine = engine;

        this.positionCards();
        
        this.select(engine.turn)
        


        
    },

    positionCards: function() {

        offset = 220;
        party_count = 0;
        enemy_count = 0;
        for(char in this.engine.arena) {
            if(this.engine.arena[char].type == 'party') {
                $('#'+char).animate({bottom: '0px'});
                $('#'+char).animate({left: offset*party_count + 'px'});
                party_count++;
            } else {
                $('#'+char).animate({top: '0px'});
                $('#'+char).animate({left: offset*enemy_count + 'px'});
                enemy_count++;
            }
        }

    },

    select: function(char, cont) {
        $('#' + char).addClass('active')
        if(!cont) this.options(engine.turn)
        this.update()

        $('#console').animate({
            scrollTop: $('#console').get(0).scrollHeight}, 500);
    },

    update: function() {
        $('.not-dead').removeClass('not-dead')
        for(char in this.engine.arena) {
   
            $('#'+char+' .hp').html(this.engine.arena[char].hp)
            $('#'+char).addClass('not-dead')

        }

    },

    hit: function(src) {
        
        for(char in this.engine.arena) {
            if(this.engine.arena[char]['type'] == 'enemy') {
  
                modal = document.createElement("div")
                $(modal).addClass('modal').addClass('options')
                .attr('id', 'src').html('SELECT')
                .attr('onclick', 'arena.do("'+src+'", "hit", "'+char+'")')

               $('#'+char).append(modal);
                
            } 
        }

    },

    do: function(src, verb, dest) {

        $('.options').remove()
        $('.active').removeClass('active')
        
        do_not_continue = this.engine.do(src, verb, dest);
        this.animate(src, verb, dest);
        this.select(this.engine.turn, do_not_continue);    
 
    },

    animate: function(src, verb, dest) {


        original_y = $('#'+src).css('top')
        original_x = $('#'+src).css('left')

        if(verb == 'hit') {
            $('#'+src).css('z-index', 999);

            $('#'+src).animate(
                {
                    top: $('#'+dest).css('top'),
                    left: $('#'+dest).css('left'),
                    zIndex: 9999
                }
            )
            .delay(100)
            .animate(
                {
                    top: original_y,
                    left: original_x,
                    zIndex: 1
                }
            )
        }
        $('.options').remove()

    },

    options: function(src) {

        box = $('#'+src);

        modal = document.createElement("div")
        $(modal).addClass('modal').addClass('options')
        .attr('id', 'src')

        
        for(skill in this.engine.arena[src]['skills']) {
            skill_name = this.engine.arena[src]['skills'][skill]
            skill_box = document.createElement("div")

            $(skill_box).html(skill_name).addClass(skill_name).addClass('option').attr('onclick', 'arena.'+skill_name+'("'+src+'")');
            $(modal).append(skill_box)
        }

        box.append($(modal));

        }

};