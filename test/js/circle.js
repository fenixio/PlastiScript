var plastic = require('../../lang.js');
    
function main()
{
    return result = [
        plastic.circle({}),                                      // draw a sphere of radius 0.5 in [0,0]
        plastic.circle({radius:3.5}).translate([10,0]),          // draw a sphere of radius 5 in [0,0,0], moved to [10,0]
        plastic.circle({center:[20,0,]}),                        // draw a sphere of radius 0.5 in [20,10]
        plastic.circle({radius:3.5, center:[0,10]}),             // draw a sphere of radius 3.5 in [0,10]
        plastic.circle({diam:4, center:[10,10], resolution:36}), // draw a sphere of diam 4 in [10,10]
        plastic.circle({radius:[1.5,2.5], center:[0,20]}),       // draw a ellipsys of radiuses 1.5,2.5 in [0,20]
        plastic.circle({diam:[4,2], center:[10,20]}),            // draw a ellipsys of diameters 4,2 in [10,20] 
    ];
}

module.exports = {
    main: main,
}; 
