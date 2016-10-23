var plastic = require('../../lang.js');
    
function main()
{
    return result = [
    
        plastic.cube({size: [4,3,2.5]}),
        plastic.cube({size: [4,3,2.5], center: [10,0,0]}),
        plastic.cube({size: [4,3,2.5], center: [20,0,0], roundRadius: 0.2, resolution: 8}),
        plastic.cube({radius: [2.5,2,3]}).translate([0,10,0]),
        plastic.cube({radius: [2.5,2,3], center: [10,10, 0] }),
        plastic.cube({radius: [2.5,2,3], center: [20,10, 0], roundRadius: 0.2, resolution: 8 }),
        plastic.cube({corner1: [0, 20, 0]}),
        plastic.cube({corner1: [10, 20, 0], radius: [2.5,2,3] }),
        plastic.cube({corner1: [20, 20, 0], size: [4,3,2.5] }),
        plastic.cube({corner1: [30, 0, 0], corner2: [32.5,3.9,1] }),
    ];
}

module.exports = {
    main: main,
}; 
