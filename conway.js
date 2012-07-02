// Conway's Game of Life in javascript with graphics by d3js //
//
// triv


grid = {}
grid.__init__ = function(cell_list){ 
    grid.cells = cell_list }


grid.is_alive = function(x, y){
    var d = {true:1, false:0}
    return d[in_(grid.cells, [x,y])] }


grid.num_live_neighbors = function(x, y){
    res = 0
    for (var i=n+x-1; i<n+x+2; i++)
        for (var j=n+y-1; j<n+y+2; j++)
            res += grid.is_alive(i%n,j%n)
    return res - grid.is_alive(x%n,y%n)
}


grid.lives = function(x, y){
    var live_now = {
      0:false, 1:false, 2:true, 3:true, 4:false, 5:false, 6:false, 7:false, 8:false}
    var dead_now = {
      0:false, 1:false, 2:false, 3:true, 4:false, 5:false, 6:false, 7:false, 8:false}
    var survives = {0:dead_now, 1:live_now}
    return survives[grid.is_alive(x%n,y%n)][grid.num_live_neighbors(x,y)]
}


grid.tick = function(){
    var new_cells = []
    var x_list = []
    var y_list = []
//    console.log('new_cells: '+new_cells)
    for (var i in grid.cells){
        x_list.push(grid.cells[i][0])
        y_list.push(grid.cells[i][1])
    }
//    console.log('x_list: '+x_list)
    x_min = Math.min.apply(Math, x_list)-1
    x_max = Math.max.apply(Math, x_list)+2
    y_min = Math.min.apply(Math, y_list)-1
    y_max = Math.max.apply(Math, y_list)+2
//    console.log('y_max: '+y_max)

    for (var i=x_min; i<x_max; i++)
        for (var j=y_min; j<y_max; j++){
            if (grid.lives(i,j))
                new_cells.push([i%n,j%n])
            }
    grid.cells = dedupe(new_cells.map(normalize))
//    console.log('new_cells: '+new_cells)
    set_active_cells(grid.cells)
}

// That is all the Conway calculations.  Everything else is display.


function normalize(pair){
    // add the modulus until both x,y are positive.
//    return pair.map(positive_mod)  NO
    x=pair[0]
    y=pair[1]
    while (x<0) x+=n
    while (y<0) y+=n
    return [x,y]
}

function positive_mod(x, mod){
    // add the modulus until x is positive.
    while (x<0) x+=mod
    return x
}
// TODO
// positive_mod is now a general function for util and can get the effect
// on the pair by saying pair.map(positive_mod)
// NO. find out why.



function draw_grid(mat) {
    table = d3.select("svg")
    table.selectAll("rect").remove()

    table
    .selectAll("rect")
    .data(mat)
    .enter().append("rect")

    .on("click",  toggle_class) 
    .text(function(d){return '['+d+']'}) // save coords as text.
    .attr("x", function(d){return x(d[0])})
    .attr("y", function(d){return y(d[1])})
    .attr("height", 10)
    .attr("width", 10)
}

n = 10
n = 9
n = 8
n = 20
n = 30

// d3 range funcs.
var x = d3.scale.linear()
    .domain([0,n-1])
    .range([0,n*10])

var y = d3.scale.linear()
    .domain([0,n-1])
    .range([0,n*10])


function get_active_cells(){
    var coord_list = []

    // Extract coords as text.
    function ea_func(idx, elt){ 
        coord_list.push( eval(elt.childNodes[0].data ))
    }
    $('rect.active').each(ea_func)
    grid.__init__(coord_list)
    return coord_list
}


function set_active_cells(cells){
    // Updating d3 display.
    // Update data can be any length but it will be applied to the first
    // update.length items.
    // So in general we want the update data list to be same length as
    // original list.
    //
    var d = {true:'active', false:'inactive'}
    var new_data = mat.map(function(pair){ return d[in_(cells, pair)] })
    // new_data is a list of strings 'active'/'inactive'

    d3.select("svg")
    .selectAll("rect")
    .data(new_data)
    .attr("class", function(d){ return d })

}


go_func = function (){ go_stop = setInterval(grid.tick, 500) }
stop_func = function (){ clearInterval(go_stop)}

function buttons(){
    // Grid data is a list of coordinates.
   mat = []
    for (var i=0; i<n; i++)
        for (var j=0; j<n; j++)
            mat.push([i,j])
     

    draw_grid(mat)
    $('#go_button').click(function (){ get_active_cells(); go_func() })
    $('#stop_button').click( stop_func )
    $('#step_button').click(function (){ get_active_cells(); grid.tick() })
    $('#reset_button').click(function (){ stop_func(); draw_grid(mat) })
}



function other_test(){
    cell_list = [[0,1], [1,1], [2,1]]
    cell_list = [[0,0], [1,1], [2,2], [3,3], [2,3]]
    cell_list = [[4,5], [4,6], [4,7]]
    grid.__init__(cell_list)
}

