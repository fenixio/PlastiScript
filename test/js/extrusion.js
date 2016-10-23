var plastic = require('../../lang.js');
    
function main()
{
    var p = plastic.polyline([ [40,5],  [30,5],  [30,15] ], /* closed = */ false);

    p = p.concat(
            plastic.arc({
                center: [15,15,0],
                radius: 15,
                startangle: 0,
                endangle: 270,
                resolution: 32
            })
        );
    p    = p.concat( plastic.polyline([ [15,0], [40,0] ], /* closed = */ false));
    var csg = p.rectangularExtrude( {width:10, offset:[0,0,90]});   // w, h, resolution, roundEnds

    return result = [
        csg
    ];
}

module.exports = {
    main: main,
}; 
