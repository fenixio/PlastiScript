include("params.jscad");


// The carry will enclose the linear bearing 
function LinearRod_clamp(length, lm_diam, fin, hole_offset)
{
    var thickness     = 3.5;
    var halfThickness = thickness / 2;
    var radius        = lm_diam / 2;
    
    var X0 = radius + thickness + fin ;
    var Y0 = - radius + 0.5 + halfThickness;

    var X1 = radius + halfThickness;
    var Y1 = - radius + 0.5 + halfThickness;

    var X2 = radius + halfThickness;
    var Y2 = 0;

    var X3 = 0;
    var Y3 = -radius - halfThickness;

    var X4 = radius + thickness + fin ;
    var Y4 = -radius - halfThickness;
    
    var holeX = radius + thickness + fin/2;
    var holeZ = (length  - 31) / 2; 

    var p = polyline([ [X0,Y0],  [X1,Y1],  [X2,Y2] ], /* closed = */ false);

    p = p.concat(
            arc({
                center: [0,Y2,0],
                radius: radius + halfThickness,
                startangle: 0,
                endangle: 270,
                resolution: glbl.resolution
            })
        );
    p    = p.concat( polyline([ [X3,Y3], [X4,Y4] ], /* closed = */ false));
    var csg = p.rectangularExtrude( {width:thickness, offset:[0,0,length]});   // w, h, resolution, roundEnds

    var clamp = csg.subtract([
        cylinder({radius:glbl.screwRadius, start:[ holeX, -(radius + thickness + fin + 0.1), holeZ], end:[ holeX, 0, holeZ]}),
        cylinder({radius:glbl.screwRadius, start:[ holeX, -(radius + thickness + fin + 0.1), holeZ+31], end:[ holeX, 0, holeZ+31]}),
    ]);

    rt = -radius - thickness;
    rt2 = Math.sqrt(2) * rt/ 2; 
    var shape = polygon(
                [ 
                    [0, rt],
                    [rt, rt],
                    [rt, 0],
                    [rt2 , rt2]
                ]);  
    var support = shape.extrude({offset: [0,0,length]});

    return clamp.union(support).setColor(glbl.partColor);
}

// The carry will enclose the linear bearing 
function LinearRod_clamp0(length, lm_diam, fin, hole_offset)
{
    var thickness     = 3.5;
    var halfThickness = thickness / 2;
    var radius        = lm_diam / 2;
    
    var X0 = radius + fin + halfThickness;
    var Y0 = halfThickness;

    var X1 = radius + halfThickness;
    var Y1 = halfThickness;

    var X2 = radius + halfThickness;
    var Y2 = radius - 0.5;
    
    var holeX = hole_offset;
    var holeZ = (length  - 31) / 2; 

    var p = polyline([ [X0,Y0],  [X1,Y1],  [X2,Y2] ], /* closed = */ false);

    p = p.concat(
            arc({
                center: [0,Y2,0],
                radius: radius + halfThickness,
                startangle: 0,
                endangle: 180,
                resolution: glbl.resolution
            })
        );
    p    = p.concat( polyline([ [-X2,Y2], [-X1,Y1], [-X0,Y0] ], /* closed = */ false));
    
    var csg = p.rectangularExtrude( {width:thickness, offset:[0,0,length]});   // w, h, resolution, roundEnds

    var clamp = csg.subtract([
        cylinder({radius:glbl.screwRadius, start:[-holeX, -1, holeZ], end:[-holeX, thickness+1, holeZ]}),
        cylinder({radius:glbl.screwRadius, start:[ holeX, -1, holeZ], end:[ holeX, thickness+1, holeZ]}),
        cylinder({radius:glbl.screwRadius, start:[-holeX, -1, holeZ+31], end:[-holeX, thickness+1, holeZ+31]}),
        cylinder({radius:glbl.screwRadius, start:[ holeX, -1, holeZ+31], end:[ holeX, thickness+1, holeZ+31]}),
    ]);

    return clamp.setColor(glbl.partColor);
}


// The carry will enclose a LM8LUU (long) linear bearing 
function LM8LUU_clamp()
{
   // with this dimensions the holes are 14.75 mm from the center
   return LinearRod_clamp(38,15, 8, 15);
}

// The carry will enclose a LM8LUU linear bearing
function LM8UU_clamp()
{
   return LinearRod_clamp(38,15, 8, 15);
}

