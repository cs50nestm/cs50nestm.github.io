/*global $*/

$(document).ready(function() {
    
    // global variables
        var board = [];
        var tdboard = [];
        var empty_col, empty_row;
        
    // initialize board
    function init() {
        for (var i = 0; i < 4; i++)
        {
            board[i] = [];
        }
        
        var number = 15;
        for (var i = 0; i < 4; i++)
        {
            for (var j = 0; j < 4; j++)
            {
                board[i][j] = number;
                number --;
            }
            
            board[3][2] = 2;
            board[3][1] = 1;
            empty_col = 3;
            empty_row = 3;
        }
        
        // initialize array for selectors
        tdboard[0] = [$(".00"), $(".01"), $(".02"), $(".03")];
        tdboard[1] = [$(".10"), $(".11"), $(".12"), $(".13")];
        tdboard[2] = [$(".20"), $(".21"), $(".22"), $(".23")];
        tdboard[3] = [$(".30"), $(".31"), $(".32"), $(".33")];
    }
    
    // draw board
    function draw() {
        for (var i = 0; i < 4; i++)
        {
            for (var j = 0; j < 4; j++)
            {   
                if (board[i][j] == 0) {
                    tdboard[i][j].text(' ');
                    tdboard[i][j].addClass('empty');
                }
                else {
                   tdboard[i][j].text(board[i][j]);
                   tdboard[i][j].removeClass('empty');
                }
            }
        }
    }
    
    init();
    draw();
    
    // play the game!
    // find the row and col
    $('td').click(function() {
            var tile = $(this).html();
           
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (board[i][j] == parseInt(tile)) {
                        var tile_row = i;
                        var tile_col = j;
                        break;
                    }
                }
            } 
    
    // check if the tile if legal move
        if ((tile_row == empty_row) && ((tile_col + 1) == empty_col))
        {
            board[tile_row][tile_col + 1] = parseInt(tile);
            board[tile_row][tile_col] = 0;
            empty_col = tile_col;
            draw();
        } 
        
        else if ((tile_row == empty_row) && ((tile_col - 1) == empty_col))
        {
            board[tile_row][tile_col - 1] = parseInt(tile);
            board[tile_row][tile_col] = 0;
            empty_col = tile_col;
            draw();
        }
    
        else if ((tile_col == empty_col) && ((tile_row - 1) == empty_row))
        {
            board[tile_row - 1][tile_col] = parseInt(tile);
            board[tile_row][tile_col] = 0;
            empty_row = tile_row;
            draw();
        }
    
        else if ((tile_col == empty_col) && ((tile_row + 1) == empty_row))
        {
            board[tile_row + 1][tile_col] = parseInt(tile);
            board[tile_row][tile_col] = 0;
            empty_row = tile_row;
            draw();
        }
    
    
});

});