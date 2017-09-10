var arena = {
     
    engine: false,

    init: function(engine) {

        engine.obj = this
        for(char in engine.arena) {

            player = document.createElement("div")
            $(player).addClass('character')
                .addClass(char)
                .attr('id', char)

            board = document.createElement("div")
                
            $(board).addClass('name').html(char)
            $(player).append(board)

            hp = document.createElement("div");
            $(hp).addClass('hp').html(engine.arena[char].hp)
            $(player).append(hp)

            $('#arena #'+engine.arena[char].type).append(player);
        }

        this.engine = engine;
        
        this.select(engine.turn)
        


        
    },


    select: function(char) {
        $('#' + char).addClass('active')
        this.options(engine.turn)
        this.update()

        $('#console').animate({
            scrollTop: $('#console').get(0).scrollHeight}, 5000);
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
        
        this.engine.do(src, verb,dest);
        this.select(this.engine.turn);

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