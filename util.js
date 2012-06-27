
function bg_color(color){
    return function(){
    d3.select(this).style("fill", color)
}}


inactive_name = 'inactive'
active_name = 'active'

function toggle_class(){
    name = d3.select(this).attr("class")
    new_name = (name==active_name ? inactive_name:active_name)
    d3.select(this).attr("class", new_name)
//    msg = 'now: '+name+'  new: '+new_name
//    d3.select('text').text(msg)
}


function bg_of(sel, color){
    return function(){
    d3.select(sel).style("fill", color)
} }

function bg_all(sel, color){
    return function(){
    d3.selectAll(sel).style("fill", color)
} }


function bg_row(sel, color){
    d3.select(sel).style("fill", color)
}


// 2 util
function in_(list, thing){
    // Return true if thing is in list.
    // Inspired by python `thing in lst`.
    for (i in list) 
        if (JSON.stringify(list[i]) == JSON.stringify(thing))
        // What an ugly hack!  There seems no easy way to compare two
        // arrays for equality.
            return true
    return false
}



// 2 util
function props_of(ob){
    for (key in ob)
        if (ob.hasOwnProperty(key))
            console.log(prop)
}


// 2 util
show_array = function(arr){
    for (i in arr)
        console.log(arr[i])
}


// 2 util
function range(a, b){
    // if a,b passed return [a,b)
    // if a passed return [0,a)
    if (!b){var b=a; a=0 }
    res = []
    for (var i=a; i<b; i++) res.push(i)
    return res
}

// 2 util
function rep(thing, n){
    // Return a list of n reps of thing.
    res = []
    for (var i=0; i<n; i++) res.push(thing)
    return res
}

// 2 util
function dedupe(list){
    // list items are coordinate pairs.
    set = {}
    for (var i=0; i<list.length; i++)
        set[list[i]] = true;
    res = []
    for (var item in set)
        res.push(eval("["+item+"]")) // eval "[" etc 
    return res
}


