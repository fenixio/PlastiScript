var plastic = require('../../lang.js');
    
function main()
{
    return result = [
    
        plastic.square({size: [4,3]}),
        plastic.square({size: [4,3], center: [10,0]}),
        plastic.square({size: [4,3], center: [20,0], roundRadius: 0.2, resolution: 8}),
        plastic.square({radius: [2.5,2]}).translate([0,10]),
        plastic.square({radius: [2.5,2], center: [10,10] }),
        plastic.square({radius: [2.5,2], center: [20,10], roundRadius: 0.2, resolution: 8 }),
        plastic.square({corner1: [0, 20]}),
        plastic.square({corner1: [10, 20], radius: [2.5,2] }),
        plastic.square({corner1: [20, 20], size: [4,3] }),
        plastic.square({corner1: [30, 0], corner2: [32.5,3.9] }),
    ];
}

module.exports = {
    main: main,
}; 

