var plastic = require('../../lang.js');
    
function main()
{
    return result = [
        plastic.cylinder({}),                                         // draw a cylinder of radius 0.5 in [0,0,0]
        plastic.cylinder({radius:3.5}).translate([10,0,0]),           // draw a cylinder of radius 5 in [10,0,0], moved to [10,0,0]
        plastic.cylinder({start:[20,0,0,]}),                          // draw a cylinder of radius 0.5 in [20,10,0]
        plastic.cylinder({radius:3.5, start:[30,0,0]}),               // draw a cylinder of radius 3.5 in [30,10,3.5]

        plastic.cylinder({diam:3, start:[0,10,0], end:[0,10,4], resolution:36}),         // draw a cylinder of diam 4 in [0,10,0] with 4 of height 
        plastic.cylinder({diam:4, start:[10,10,0,], resolution:36}),                     // draw a cylinder of diam 4 in [10,10,0]
        plastic.cylinder({radius:3, start:[20,10,0,], resolution:36}),                   // draw a cylinder of radius 3 in [20,10,0]
        plastic.cylinder({radiusStart:3, radisuEnd:1, start:[30,10,0,], end:[30,10,5]}), // draw a cone of radius 3/1 in [30,10,0] with 5 of height

        plastic.cylinder({diam:2, start:[0,20,0], end:[0,20,4], rounded:true, resolution:36}),     // draw a rounded cylinder of diam 2 in [0,20,0] with 4 of height 
        plastic.cylinder({diam:2, start:[10,20,0], end:[10,20,4], sectorAngle:90, resolution:36}), // draw a 90 deg sector of cylinder of diam 2 in [10,20,0] with 4 of height
        plastic.cylinder({diam:2, start:[20,20,0], end:[20,24,0]}),                                // draw a cylinder of diam 2 in [20,20,0] with 4 of height over y axis 
        plastic.cylinder({diam:2, start:[30,20,0], height:6}),                                     // draw a cylinder of diam 2 in [20,30,0] with 6 of height
    ];
}

module.exports = {
    main: main,
}; 
