var plastic = require('../../lang.js');
    
function main()
{
    return result = [
        plastic.cylinder({radiusStart:1, radisuEnd: 0.5, height:3}),

        plastic.cylinder({radiusStart:1, radisuEnd: 0.5, height:3})
            .translate([5,0,0]),
        plastic.cylinder({radiusStart:1, radisuEnd: 0.5, height:3})
            .rotate([90,90,90]).translate([0,5,0]),
        plastic.cylinder({radiusStart:1, radisuEnd: 0.5, height:3})
            .rotateX(90).translate([5,5,0]),
        plastic.cylinder({radiusStart:1, radisuEnd: 0.5, height:3})
            .rotateY(90).translate([10,5,0]),
        plastic.cylinder({radiusStart:1, radisuEnd: 0.5, height:3})
            .rotateZ(90).translate([15,5,0]),
        plastic.cylinder({radiusStart:1, radisuEnd: 0.5, height:3})
            .scale([0.5,0.8,1.5]).translate([0,10,0]),
        plastic.cylinder({radiusStart:1, radisuEnd: 0.5, height:3})
            .mirror([0,1,0]).translate([5,10,0]),

        plastic.cube({size:[2,2,2] })
            .union(plastic.sphere({radius:1.25}))
            .translate([0,15,0]),

        plastic.cube({size:[2,2,2] })
            .intersect(plastic.sphere({radius:1.25}))
            .translate([5,15,0]),

        plastic.cube({size:[2,2,2] })
            .subtract(plastic.sphere({radius:1.25}))
            .translate([10,15,0]),

        plastic.sphere({radius:1.25})
            .subtract(plastic.cube({size:[2,2,2] }))
            .translate([15,15,0]),
    ];
}

module.exports = {
    main: main,
}; 
