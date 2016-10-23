var plastic = require('../../lang.js');
    
function main()
{
    return result = [
        plastic.sphere({}),                                        // draw a sphere of radius 0.5 in [0,0,0]
        plastic.sphere({radius:3.5}).translate([10,0,0]),          // draw a sphere of radius 5 in [0,0,0], moved to [10,0,0]
        plastic.sphere({center:[20,0,0,]}),                        // draw a sphere of radius 0.5 in [20,10,0]
        plastic.sphere({radius:3.5, center:[0,10,3.5,]}),          // draw a sphere of radius 3.5 in [0,10,3.5]
        plastic.sphere({diam:4, center:[10,10,2,], resolution:36}),               // draw a sphere of diam 4 in [10,10,2]
        plastic.sphere({radius:3, center:[20,10,5,], resolution:36, geodesic:true}),// draw a sphere of radius 3 in [20,10,5,] using a geodesic approach
    ];
}

module.exports = {
    main: main,
}; 
