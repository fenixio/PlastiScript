//INCLUDE:"params.jscad"
function parameters (args) {
    this.motorHeight     = 40;
    this.motorWidth      = 42;
    this.motorShaft      = 5;
    this.thickness       = 5;
    this.screwRadius     = 1.5;
	this.barDiameter     = 8;
    this.partColor       = [0.90,0.95,0.45];
    this.resolution      = 18;
	if(args)
	{
		this.motorHeight  = args.motorHeight    ;
		this.motorWidth   = args.motorWidth     ;
        this.motorShaft   = args.motorShaft     ;
		this.thickness    = args.thickness      ;
		this.screwRadius  = args.screwRadius    ;
		this.barDiameter  = args.barDiameter    ;
        this.resolution   = args.resolution     ;
	}
    this.screwHeadRadius  = this.screwRadius * 2;
    this.nutRadius        = this.screwRadius * 2.5;
    this.nutHeight        = this.screwRadius * 1.32;
    this.barRadius        = this.barDiameter / 2;
    this.motorShaftRadius = this.motorShaft /2; 
}
 
var glbl;
//END INCLUDE

//INCLUDE:"screw.jscad"

var M3diam = 25.4/ 8;
var M8diam = 25.4 * 5 / 16;
var i_8_diam   = 25.4/ 8;
var i5_16_diam = 25.4 * 5 / 16;

function screw(diam, length)
{
    var headHeight = diam *  0.8;
    var headDiam   = (diam * 1.9);
    var headRad    = headDiam / 2;
    var hole       = (diam * 0.20);
    
    var body =  cylinder({radius: diam/2, start:[0,0,-length], end:[0,0,0]});
    
    var head =  cylinder({radius: headRad, start:[0,0,0], end:[0,0,headHeight]})
                    .intersect(sphere({radius: headDiam * 0.75, center:[0, 0,-(headDiam * 0.75) + headHeight]}));

    head = head.subtract( cube({radius:[headRad + 0.2, hole, headHeight/2], center:[0,0,headHeight - (hole/2)]}));
    head = head.subtract( cube({radius:[hole, headRad + 0.2, headHeight/2], center:[0,0,headHeight - (hole/2)]}));

    return body.union(head).setColor([0.75,0.75,0.75]);
}

function nut(diam)
{
    var headHeight = diam * 0.80;
    var headDiam   = diam * 1.815   ;
    var headRad    = headDiam / 2;

    var body =  cylinder({radius: headRad, start:[0,0,0], end:[0,0,headHeight], resolution: 6})
        .subtract(cylinder({radius: diam/1.98, start:[0,0,-0.1], end:[0,0,headHeight+0.1]}));

    return body.setColor([0.75,0.75,0.75]);
}

function M3_screw(length)
{
    return screw( M3diam, length);
}

function M8_screw(length)
{
    
    return screw( M8diam, length);
}

function M3_nut()
{
    return nut(M3diam);
}

function M8_nut()
{
    return nut (M8diam);
}

//END INCLUDE

//INCLUDE:"carriage_end.jscad"

var x_axis_fishHoleOffset = 0;
var x_axis_barOffset = 30.5;
var y_axis_barOffset = 40;
var z_axis_barOffset = 56.5;
var finLength = 10;
var thickness = 10;

function tensor_nut()
{
    var finLength      = 7;
    var finLength2     = finLength/2;
    var fishLinehole = finLength * 2 / 3;
    
    var body = cube({radius: [finLength2, finLength2 * 1.5, finLength2], center:[0, finLength2/2, finLength2]});

    return body.subtract([
        cylinder({radius:glbl.screwRadius, start:[0,0,-0.1], end:[0,0,finLength+0.1]}),
        cylinder({radius:glbl.screwRadius * 2, start:[0,0,finLength-2.8], end:[0,0,finLength+0.1], resolution:6}),
        cylinder({radius:0.5, start:[0, fishLinehole,-0.1], end:[0,fishLinehole,finLength+0.1]})]
    );
}


function base_carriage_end( barOffset, thick, finLength, addTensor)
{
    var length     = (2 * barOffset) + (2 * finLength) + glbl.barDiameter;
    var width      = glbl.barDiameter + 8;
    var height     = thick;
    var screw_hole = barOffset + glbl.barRadius + finLength/2;
    var fix_groove = 1;   
    
        //main body
    var body = cube({radius:[length/2, width/2, height/2], center:[0,0,height/2]});

    body = body.subtract([
        // left bar hole
        cylinder( {  radius:glbl.barRadius, start:[-barOffset, 0, -1], end:[-barOffset, 0, height + 1]}),
        cube( {  corner1:[-barOffset, -fix_groove/2, -1], corner2:[-((length/2)+1), fix_groove/2, height + 1]}),

        // left screw hole
        cylinder( {  radius:glbl.screwRadius, start:[-screw_hole, -width/2-1, height/2], end:[-screw_hole, width/2+1, height/2] }),  
        cylinder( {  radius:glbl.nutRadius, start:[-screw_hole, -width/2+glbl.nutHeight, height/2], end:[-screw_hole, -width/2-1, height/2], resolution: 6 }),


        // right bar hole
        cylinder( {  radius:glbl.barRadius, start:[ barOffset, 0, -1], end:[ barOffset, 0, height + 1]}),
        cube( {  corner1:[barOffset, -fix_groove/2, -1], corner2:[ ((length/2)+1), fix_groove/2, height + 1]}),

        // right screw hole
        cylinder( {  radius:glbl.screwRadius, start:[screw_hole, -width/2-1, height/2], end:[screw_hole, width/2+1, height/2] }),  
        cylinder( {  radius:glbl.nutRadius, start:[screw_hole, -width/2+glbl.nutHeight, height/2], end:[screw_hole, -width/2-1, height/2], resolution:6 }),
    ]);

    if(addTensor)
    {
        var supportWidth  = (width - fix_groove) / 4;
        var supportX      = length/2 - finLength/2;
        var supportY      = -(fix_groove / 2) - supportWidth;
        var supportZ      = height + finLength/2 - 0.5;
        var tensorSupport = cube({radius:[finLength/2, supportWidth, finLength/2 + 1], center:[ supportX, supportY, supportZ]})
            .subtract(
                 cylinder( {  radius:glbl.screwRadius, start:[ supportX - finLength/2 - 1, supportY, supportZ], end:[supportX + finLength/2 + 1, supportY, supportZ]})
            );
        body = body.union(tensorSupport);
    }
    
    body.properties.width = width; 
     
    return body.setColor(glbl.partColor);
}

function plate_support(plateWidth, height, thick)
{
    var width  = 16;

    var shape = polygon(
                [ 
                    [0, 0],
                    [-2, 2],
                    [-plateWidth, 2],
                    [-plateWidth,height],
                    [width-height,height],
                    [width,0], 
                    [width, -1],
                    [0,-1] 
                ]);  
    var support = shape.extrude({offset: [0,0,thick]});
    return support;
}

function x_back_carriage_end()
{

    var body    = base_carriage_end(x_axis_barOffset, finLength, thickness, true);

    return body.subtract([
        // holes for fishing line
        cylinder({ radius:0.5, start:[ -glbl.motorShaftRadius + x_axis_fishHoleOffset, 0, -1], end:[ -glbl.motorShaftRadius + x_axis_fishHoleOffset, 0, thickness + 1] }),
        cylinder({ radius:0.5, start:[ glbl.motorShaftRadius + x_axis_fishHoleOffset, 0, -1], end:[ glbl.motorShaftRadius + x_axis_fishHoleOffset, 0, thickness + 1] })
    ]).setColor(glbl.partColor);
}

function x_front_carriage_end()
{
    var toolSupportWidth  = 45;
    var toolSupportHeight = 52;
    var toolHoleX         = 22.5;
    var toolHoleY         = 15;
    var r                 = glbl.screwRadius; 
    var t2                = thickness / 2;

    var body    = base_carriage_end(x_axis_barOffset, finLength, thickness, false);
    var baseWidth = body.properties.width;
    body = body.union(cube({radius:[toolSupportHeight/2, toolSupportWidth/2, thickness/2], center:[0,0,thickness/2]}));

    return body.subtract([
        
        cylinder({ radius:glbl.screwRadius, start:[ -toolHoleX,  toolHoleY, -1], end:[ -toolHoleX,  toolHoleY, thickness+1] }),
        cylinder({ radius:glbl.screwRadius, start:[ -toolHoleX, -toolHoleY, -1], end:[ -toolHoleX, -toolHoleY, thickness+1] }),
        cube({ radius:[ toolHoleX,r,t2 + 2], center:[ 0, -toolHoleY, t2] }),

        cylinder({ radius:glbl.screwRadius, start:[  toolHoleX,  toolHoleY, -1], end:[ toolHoleX,  toolHoleY, thickness+1] }),
        cylinder({ radius:glbl.screwRadius, start:[  toolHoleX, -toolHoleY, -1], end:[ toolHoleX, -toolHoleY, thickness+1] }),
        cube({ radius:[ toolHoleX,r,t2 + 2], center:[ 0, toolHoleY, t2] }),

        // holes for fishing line
        cylinder({ radius:0.5, start:[ -glbl.motorShaftRadius + x_axis_fishHoleOffset, 0, -1], end:[ -glbl.motorShaftRadius + x_axis_fishHoleOffset, 0, thickness + 1] }),
        cylinder({ radius:0.5, start:[ glbl.motorShaftRadius + x_axis_fishHoleOffset, 0, -1], end:[ glbl.motorShaftRadius + x_axis_fishHoleOffset, 0, thickness + 1] })
    ]).setColor(glbl.partColor);
}

function y_carriage_end()
{
    var barOffset     = y_axis_barOffset;
    var supportSize   = 40;
    var supportHeight = 8;
    
    var body    = base_carriage_end(barOffset, finLength, thickness, true);
    var width   = body.properties.width;
    var leftSup = plate_support( supportSize, supportHeight, thickness).translate([-barOffset+glbl.barRadius+5, width/2-1, 0]).subtract(
                        cylinder({radius:glbl.screwHeadRadius, start:[-barOffset-glbl.barRadius-finLength/2, width/2+1,thickness/2], end:[-barOffset-glbl.barRadius-finLength/2, width/2 + supportHeight +1,thickness/2] })
                    );
    var screw1   = barOffset - glbl.barRadius + supportSize - 10;  
    var screw0   = barOffset - glbl.barRadius - 3;
    var rightSup = plate_support( supportSize, supportHeight, thickness).rotateY(180).translate([barOffset-glbl.barRadius-5, width/2-1, thickness]).subtract(
                        cylinder({radius:glbl.screwHeadRadius, start:[+barOffset+glbl.barRadius+finLength/2, width/2+1,thickness/2], end:[barOffset+glbl.barRadius+finLength/2, width/2 + supportHeight +1,thickness/2] })
                    );

    body  = body.union([leftSup,rightSup]);
    
    return body.subtract([
        // holes for plate support screws
        cylinder({radius:glbl.screwRadius, start:[-screw0, -width, thickness/2], end:[-screw0, width + supportHeight, thickness/2] }),
        cylinder({radius:glbl.screwRadius, start:[ screw0, -width, thickness/2], end:[ screw0, width + supportHeight, thickness/2] }),
        cylinder({radius:glbl.screwRadius, start:[-screw1, -width, thickness/2], end:[-screw1, width + supportHeight, thickness/2] }),
        cylinder({radius:glbl.screwRadius, start:[ screw1, -width, thickness/2], end:[ screw1, width + supportHeight, thickness/2] }),
        // holes for fishing line
        cylinder({ radius:0.5, start:[ -glbl.motorShaftRadius, 0, -1], end:[ -glbl.motorShaftRadius, 0, thickness + 1] }),
        cylinder({ radius:0.5, start:[ glbl.motorShaftRadius, 0, -1], end:[ glbl.motorShaftRadius, 0, thickness + 1] })
    ]).setColor(glbl.partColor);


}        

function z_top_carriage_end()
{
    return base_carriage_end( z_axis_barOffset, finLength, thickness, false).setColor(glbl.partColor);;
}

//END INCLUDE

//INCLUDE:"linear_rod.jscad"

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
    var csg = p.rectangularExtrude( thickness, length, glbl.resolution, true);   // w, h, resolution, roundEnds

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
    var csg = p.rectangularExtrude( thickness, length, glbl.resolution, false);   // w, h, resolution, roundEnds

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


//END INCLUDE

//INCLUDE:"vitamins.jscad"

function LM(length, diam, innerMark)
{
    var ol       = (length - innerMark) / 2;
    var radius   = diam/2;
    var radius_d = radius - 0.35;

    var ring1 =cylinder({radius: radius + 1, start:[0,0,ol-0.55], end:[0,0,ol+0.55]})
                .subtract(cylinder({radius: radius_d, start:[0,0,ol-0.55], end:[0,0,ol+0.55]})).setColor([0.2,0.2,0.2]);     
    var ring2 =cylinder({radius: radius + 1, start:[0,0,length - ol-0.55], end:[0,0,length - ol+0.55]})
                .subtract(cylinder({radius: radius_d, start:[0,0,length - ol-0.55], end:[0,0,length - ol+0.55]})).setColor([0.2,0.2,0.2]);

    var lm = cylinder({radius: radius, start:[0,0,0], end:[0,0,length]}).subtract(
                cylinder({radius: glbl.barRadius, start:[0,0,-1], end:[0,0,length+1]})
            ).setColor([0.8,0.8,0.8]);

    lm = lm.subtract([ring1, ring2]);
    return lm;
}

// Linear bearing LM8UU
function LM8UU()
{
    return LM( 24, 15, 17.5);
}


// Linear bearing LM8LUU (long bearing)
function LM8LUU()
{
    return LM(45,15,35);
}


function bar(length, axis)
{
    var bar;
    if(axis=='x')
        bar = cylinder({radius:glbl.barRadius, start:[0,0,0], end:[length,0,0]});
    else if (axis=='y')
        bar = cylinder({radius:glbl.barRadius, start:[0,0,0], end:[0,length,0]});
    else
        bar = cylinder({radius:glbl.barRadius, start:[0,0,0], end:[0,0,length]});
    
    return bar.setColor([0.9,0.9,0.9]);
}

function screw_bar(length)
{
    return cylinder({radius:glbl.barRadius, start:[0,0,0], end:[0,0,length]}).setColor([0.4,0.4,0.4]);
}

function shaft_coupler(diam1, diam2)
{

    var bar_rad1  = diam1/2;
    var bar_rad2  = diam2/2;

    var shaft = cylinder({radius:9.5, start:[0,0,0], end:[0,0,25]}).setColor([0.9,0.9,0.9]).subtract([
        cylinder({radius:bar_rad1, start:[0,0,-1], end:[0,0,11]}).setColor([0.9,0.9,0.9]),
        cylinder({radius:bar_rad2, start:[0,0,15], end:[0,0,26]}).setColor([0.9,0.9,0.9]),
        cylinder({radius:2, start:[9,0,5], end:[10,0,5]}).setColor([0.1,0.1,0.1]),
        cylinder({radius:2, start:[9,0,20], end:[10,0,20]}).setColor([0.1,0.1,0.1])
    ]);
    return shaft;
}

function nema17()
{
    height = glbl.motorHeight;
    h2     = height /2; 
    width  = glbl.motorWidth;
    w2     = width / 2;
    hole_s = 15.5;
    hole_z = height - 10;

    var innerCube = cube({radius:[w2-1, w2-1, h2-1], center:[0, 0, h2]}).setColor([0.2,0.2,0.2]);
    var motor = innerCube.union([
        cube({radius:[w2, w2, height/8], center:[0, 0, height/8]}).setColor([0.8,0.8,0.8]),
        cube({radius:[w2, w2, height/8], center:[0, 0,  7 * height/8]}).setColor([0.8,0.8,0.8]),
        cylinder({radius:11, start:[0,0,height-1], end:[0,0,height+2]}).setColor([0.8,0.8,0.8]),
        cylinder({radius:glbl.motorShaftRadius, start:[0,0,height+1], end:[0,0,height+26]}).setColor([0.8,0.8,0.8]),
    ]).subtract([
        cylinder({radius:glbl.screwRadius, start:[ hole_s, hole_s,height+1], end:[ hole_s, hole_s,hole_z]}).setColor([0.2,0.2,0.2]),
        cylinder({radius:glbl.screwRadius, start:[-hole_s, hole_s,height+1], end:[-hole_s, hole_s,hole_z]}).setColor([0.2,0.2,0.2]),
        cylinder({radius:glbl.screwRadius, start:[ hole_s,-hole_s,height+1], end:[ hole_s,-hole_s,hole_z]}).setColor([0.2,0.2,0.2]),
        cylinder({radius:glbl.screwRadius, start:[-hole_s,-hole_s,height+1], end:[-hole_s,-hole_s,hole_z]}).setColor([0.2,0.2,0.2]),
    ]);
    return motor;
}

function extruder()
{
    var w2  =23;
    var h2 = 10;

    var extruder = cube({radius:[w2, w2, h2], center:[0, 0, h2]}).setColor([0.1,0.1,0.1])
                    .union(
                        cylinder({radius:6, start:[w2*2, w2/3, h2 ], end:[ -w2*2, w2/3, h2], resolution:6}).setColor([0.7,0.6,0.3])
                    ).subtract(
                        cube({radius:[15, 15, 6], center:[0, 0, h2 + 5]}).setColor([0.1,0.1,0.1])
                    );
    return extruder;
}

function plate_base(length)
{
    return cube({radius:[20, length/2, 5], center:[0,length/2,5]} )
            .union(cube({radius:[100,100,2], center:[0, length/2, 12]}));
}

//END INCLUDE

//INCLUDE:"cages.jscad"

function pylonbase(radius, thickness)
{
	var csg = cylinder({radius:radius, start:[0,0,0], end:[0,0,thickness] })
				.union(
					cube({corner1:[0,-radius,0], corner2:[radius +1,radius,thickness]})
				);
	return csg;
}

function motor_cage( )
{
	var motor_w      = glbl.motorWidth;
    var motor_h      = glbl.motorHeight;
    var thick        = glbl.thickness;
    var pylon_d      = 8;
	var l2           = motor_w/2;
    var w2           = motor_w/2;
	var t2           = thick/2;
	var pylon_r      = pylon_d / 2; 
	var pylon_x      = l2 + pylon_r;
	var pylon_y      = w2 - pylon_r;
    var hole         = 15.5; 
	
	var scrwr        = glbl.screwRadius;
    
	var csg = cube({radius:[l2,w2,t2], center:[0,0,t2]})
				.union([
					pylonbase(pylon_r, thick).rotateZ(180).translate([pylon_x,pylon_y,0]),
                    cylinder({radius:pylon_r, start:[pylon_x,pylon_y,t2], end:[pylon_x,pylon_y,motor_h+thick]}),
                    pylonbase(pylon_r, thick).rotateZ(180).translate([pylon_x,-pylon_y,0]),
                    cylinder({radius:pylon_r, start:[pylon_x,-pylon_y,t2], end:[pylon_x,-pylon_y,motor_h+thick]}),
					pylonbase(pylon_r, thick).translate([-pylon_x,pylon_y,0]),
                    cylinder({radius:pylon_r, start:[-pylon_x,pylon_y,t2], end:[-pylon_x,pylon_y,motor_h+thick]}),
                    pylonbase(pylon_r, thick).translate([-pylon_x,-pylon_y,0]),
                    cylinder({radius:pylon_r, start:[-pylon_x,-pylon_y,t2], end:[-pylon_x,-pylon_y,motor_h+thick]}),
				]).subtract([
                    cylinder({radius:12, start:[ 0,0,-1], end:[ 0,0,thick+1]}),

                    cylinder({radius:glbl.screwRadius, start:[ hole, hole,-1], end:[ hole, hole,thick+1]}),
                    cylinder({radius:glbl.screwRadius, start:[ hole,-hole,-1], end:[ hole,-hole,thick+1]}),
                    cylinder({radius:glbl.screwRadius, start:[-hole, hole,-1], end:[-hole, hole,thick+1]}),
                    cylinder({radius:glbl.screwRadius, start:[-hole,-hole,-1], end:[-hole,-hole,thick+1]}),

                    cylinder({radius:glbl.screwRadius, start:[ pylon_x, pylon_y,-1], end:[ pylon_x, pylon_y,motor_h+thick+1]}),
                    cylinder({radius:glbl.screwRadius, start:[ pylon_x,-pylon_y,-1], end:[ pylon_x,-pylon_y,motor_h+thick+1]}),
                    cylinder({radius:glbl.screwRadius, start:[-pylon_x, pylon_y,-1], end:[-pylon_x, pylon_y,motor_h+thick+1]}),
                    cylinder({radius:glbl.screwRadius, start:[-pylon_x,-pylon_y,-1], end:[-pylon_x,-pylon_y,motor_h+thick+1]}),
                ]);

	return csg.setColor(glbl.partColor);
}

function y_motor_cage( )
{
	var motor_w      = glbl.motorWidth;
    var motor_h      = glbl.motorHeight;
    var thick        = glbl.thickness;
    var pylon_d      = 8;
	var length       = motor_w + 60;
	var l2           = length/2;
    var w2           = motor_w/2;
	var t2           = thick/2;
	var pylon_r      = pylon_d / 2; 
	var pylon_x      = l2 - pylon_r;
	var pylon_y      = w2 + pylon_r;
    var hole         = 15.5; 
	var hole_clamp   = w2 + 4;

	var scrwr        = glbl.screwRadius;
    
	var csg = cube({radius:[l2,w2,t2], center:[0,0,t2]})
				.union([
					pylonbase(pylon_r, thick).rotateZ(-90).translate([pylon_x,pylon_y,0]),
                    cylinder({radius:pylon_r, start:[pylon_x,pylon_y,t2], end:[pylon_x,pylon_y,motor_h+thick]}),
                    pylonbase(pylon_r, thick).rotateZ(90).translate([pylon_x,-pylon_y,0]),
                    cylinder({radius:pylon_r, start:[pylon_x,-pylon_y,t2], end:[pylon_x,-pylon_y,motor_h+thick]}),
					pylonbase(pylon_r, thick).rotateZ(-90).translate([-pylon_x,pylon_y,0]),
                    cylinder({radius:pylon_r, start:[-pylon_x,pylon_y,t2], end:[-pylon_x,pylon_y,motor_h+thick]}),
                    pylonbase(pylon_r, thick).rotateZ(90).translate([-pylon_x,-pylon_y,0]),
                    cylinder({radius:pylon_r, start:[-pylon_x,-pylon_y,t2], end:[-pylon_x,-pylon_y,motor_h+thick]}),
				]).subtract([
                    cylinder({radius:12, start:[ 0,0,-1], end:[ 0,0,thick+1]}),

                    cylinder({radius:glbl.screwRadius, start:[ hole, hole,-1], end:[ hole, hole,thick+1]}),
                    cylinder({radius:glbl.screwRadius, start:[ hole,-hole,-1], end:[ hole,-hole,thick+1]}),
                    cylinder({radius:glbl.screwRadius, start:[-hole, hole,-1], end:[-hole, hole,thick+1]}),
                    cylinder({radius:glbl.screwRadius, start:[-hole,-hole,-1], end:[-hole,-hole,thick+1]}),

                    cylinder({radius:glbl.screwRadius, start:[ hole_clamp, hole,-1], end:[ hole_clamp, hole,thick+1]}),
                    cylinder({radius:glbl.screwRadius, start:[ hole_clamp,-hole,-1], end:[ hole_clamp,-hole,thick+1]}),
                    cylinder({radius:glbl.screwRadius, start:[-hole_clamp, hole,-1], end:[-hole_clamp, hole,thick+1]}),
                    cylinder({radius:glbl.screwRadius, start:[-hole_clamp,-hole,-1], end:[-hole_clamp,-hole,thick+1]}),


                    cylinder({radius:glbl.screwRadius, start:[ pylon_x, pylon_y,-1], end:[ pylon_x, pylon_y,motor_h+thick+1]}),
                    cylinder({radius:glbl.screwRadius, start:[ pylon_x,-pylon_y,-1], end:[ pylon_x,-pylon_y,motor_h+thick+1]}),
                    cylinder({radius:glbl.screwRadius, start:[-pylon_x, pylon_y,-1], end:[-pylon_x, pylon_y,motor_h+thick+1]}),
                    cylinder({radius:glbl.screwRadius, start:[-pylon_x,-pylon_y,-1], end:[-pylon_x,-pylon_y,motor_h+thick+1]}),
                ]);

	return csg.setColor(glbl.partColor);
}

//END INCLUDE

//INCLUDE:"pylon.jscad"

    var pyl_e   = 3.5;
    var screw_a = 7.5;

function pylon_clamp()
{
    var screw_v = 20;
    var thick  = glbl.thickness; 
    var pyl_d  = glbl.barDiameter + pyl_e * 2;  
    var pyl_r  = glbl.barRadius + pyl_e;
    var pyl_w  = glbl.barDiameter + 2 * screw_a + 2 * pyl_e;
    var pw2    = pyl_w / 2;
    var height = pyl_d - thick - 0.5;
    var s2     = screw_a / 2;
    var hole_y = height - pyl_r;      
    var h2     = height / 2;
    

    var body   = cube({radius:[pw2, h2, screw_v / 2], center:[0, h2, screw_v / 2]}).subtract([
                    cylinder({radius: glbl.barRadius, start:[0, hole_y, -1], end:[0, hole_y, screw_v + 1]}),
                    cube({corner1:[-glbl.barRadius, -1, -1], corner2:[glbl.barRadius, hole_y, screw_v + 1]}),
                    cylinder({radius: glbl.screwRadius, start:[-pw2 + s2, -1, screw_v-s2], end:[-pw2 + s2, height+1, screw_v-s2]}),
                    cylinder({radius: glbl.screwRadius, start:[+pw2 - s2, -1, screw_v-s2], end:[+pw2 - s2, height+1, screw_v-s2]}),
                    cylinder({radius: glbl.screwRadius, start:[-pw2 + s2, -1, s2], end:[-pw2 + s2, height+1, s2]}),
                    cylinder({radius: glbl.screwRadius, start:[+pw2 - s2, -1, s2], end:[+pw2 - s2, height+1, s2]}),
                ]);
    return body.setColor(glbl.partColor);
}

function pylon()
{

    var thick   = glbl.thickness;
    var pyl_r   = glbl.barRadius + pyl_e; 
    var pyl_w   = glbl.barDiameter + 2 * screw_a + 2 * pyl_e;
    var pyl_h   = 72;
    var pw2     = pyl_w / 2;
    var ph2     = pyl_h / 2;
    var t2      = thick / 2;
    var suprt_h = 50 ;
    var suprt_l = 40 ;
    var s2      = screw_a / 2; 
    var suprt_o1= pw2 + suprt_l + s2;
    var suprt_o2= pyl_r*2 + suprt_l + s2;

    var support  = polygon([ [0,0], [suprt_l + s2 + 2, 0], [suprt_l + s2 + 2,thick], [suprt_l + 2,thick], [2,suprt_h], [0,suprt_h] ]).extrude({offset: [0,0,thick]});
    var sprtHole = polygon([ [0,5], [suprt_l - 5, 5], [0,suprt_h-5] ]).extrude({offset: [0,0,thick+2]});

    var body  = cube({radius:[pw2, t2, ph2], center:[0, t2, ph2]})
                    .union([
                        cylinder({radius:pyl_r, start:[0,pyl_r,0], end:[0,pyl_r,suprt_h]}),

                        support.rotateX(90).translate([pw2-2,thick,0]),
                        support.rotateX(90).rotateZ(180).translate([-pw2+2,0,0]),
                        support.rotateX(90).rotateZ(90).translate([-t2, pyl_r*2-2,0]),
                        
                        cylinder({radius:screw_a/2, start:[suprt_o1,s2,0], end:[suprt_o1,s2,thick]}),
                        cylinder({radius:screw_a/2, start:[-suprt_o1,s2,0], end:[-suprt_o1,s2,thick]}),
                        cylinder({radius:screw_a/2, start:[0,suprt_o2,0], end:[0,suprt_o2,thick]}),
                        
                    ]).subtract([
                        cylinder({radius:glbl.barRadius, start:[0,pyl_r,+30], end:[0,pyl_r,pyl_h+1]}),

                        cylinder({radius:glbl.screwRadius, start:[suprt_o1,s2,-1],  end:[suprt_o1,s2,thick+1]}),
                        cylinder({radius:glbl.screwRadius, start:[-suprt_o1,s2,-1], end:[-suprt_o1,s2,thick+1]}),
                        cylinder({radius:glbl.screwRadius, start:[0,suprt_o2,-1],   end:[0,suprt_o2,thick+1]}),

                        cylinder({radius: glbl.screwRadius, start:[-pw2 + s2, -1, pyl_h - s2], end:[-pw2 + s2, thick+1, pyl_h - s2]}),
                        cylinder({radius: glbl.screwRadius, start:[+pw2 - s2, -1, pyl_h - s2], end:[+pw2 - s2, thick+1, pyl_h - s2]}),
                        cylinder({radius: glbl.screwRadius, start:[-pw2 + s2, -1, pyl_h - 20 + s2], end:[-pw2 + s2, thick+1, pyl_h - 20 + s2]}),
                        cylinder({radius: glbl.screwRadius, start:[+pw2 - s2, -1, pyl_h - 20 + s2], end:[+pw2 - s2, thick+1, pyl_h - 20 + s2]}),

                        sprtHole.rotateX(90).translate([pw2-2,thick+1,0]),
                        sprtHole.rotateY(180).rotateX(90).translate([-pw2,-1, 0]),
                        sprtHole.rotateX(90).rotateZ(90).translate([-4,14.5,0]),
                        
                    ]);
    return body.setColor(glbl.partColor);
}

function pylonWithClamp()
{
    return pylon().union( pylon_clamp().translate([0, 5.5, 52]));
}
//END INCLUDE

//INCLUDE:"x_carriage.jscad"

function z_nut_support(width, length, excess)
{
    var thick       = glbl.thickness;
    var width2      = width/2;
    var thick2      = thick/2;
    var length2     = length/2;
    var z_nut_h     = 4 * Math.sqrt(2);
    var scrwr       = glbl.screwRadius;
    var ori_y       = length/2 - 20;        

    var body = cube({radius:[width2, length2 + excess/2, thick2], center:[0, excess/2, thick2]})
        .subtract([
            cylinder({radius:4.25,  start:[0, ori_y, -1],       end:[0,  ori_y, thick+1]}),
            cylinder({radius:7.1,   start:[0, ori_y,  thick-3], end:[0,  ori_y, thick+1], resolution:6}),        
            cylinder({radius:scrwr, start:[  z_nut_h, ori_y+z_nut_h, -1], end:[  z_nut_h, ori_y+z_nut_h, thick+1 ]}),
            cylinder({radius:scrwr, start:[  z_nut_h, ori_y-z_nut_h, -1], end:[  z_nut_h, ori_y-z_nut_h, thick+1 ]}),
            cylinder({radius:scrwr, start:[ -z_nut_h, ori_y+z_nut_h, -1], end:[ -z_nut_h, ori_y+z_nut_h, thick+1 ]}),
            cylinder({radius:scrwr, start:[ -z_nut_h, ori_y-z_nut_h, -1], end:[ -z_nut_h, ori_y-z_nut_h, thick+1 ]}),
        ]);
    return body.setColor(glbl.partColor);
}


function x_carriage()
{
    var clamp_hole  = 26;
    var length      = 135;
    var width       = 31 + 2 * clamp_hole;
    var thick       = glbl.thickness;
    var scrwr       = glbl.screwRadius;
    var length2     = length/2;
    var width2      = width/2;
    var thick2      = thick/2;
    var x_motor_off = -15;
    var z_motor_off = 21;
    var motor_hole  = 15.5;
    var motor_hole  = 15.5;
    var clamp_off   = length2 - 26;
    var z_nut_w     = 12.5;
    var z_nut_h     = 4 * Math.sqrt(2);       

    var support = polygon([ [12.5,0], [12.5,2], [2.5,10], [-2.5,10], [-12.5,2], [-12.5,0] ]).extrude({offset: [0,0,thick]});

    var body = cube({radius:[length2, width2, thick2], center:[0, 0, thick2]}).subtract([
         
        cylinder({radius:12, start:[x_motor_off, 0, -1], end:[x_motor_off, 0, thick+1]}),

        cylinder({radius:scrwr, start:[ x_motor_off+motor_hole,  motor_hole, -1], end:[x_motor_off+motor_hole,  motor_hole, thick+1]}),
        cylinder({radius:scrwr, start:[ x_motor_off+motor_hole, -motor_hole, -1], end:[x_motor_off+motor_hole, -motor_hole, thick+1]}),
        cylinder({radius:scrwr, start:[ x_motor_off-motor_hole,  motor_hole, -1], end:[x_motor_off-motor_hole,  motor_hole, thick+1]}),
        cylinder({radius:scrwr, start:[ x_motor_off-motor_hole, -motor_hole, -1], end:[x_motor_off-motor_hole, -motor_hole, thick+1]}),

        cylinder({radius:scrwr, start:[-clamp_off,  motor_hole, -1], end:[-clamp_off,  motor_hole, thick+1]}),
        cylinder({radius:scrwr, start:[-clamp_off, -motor_hole, -1], end:[-clamp_off, -motor_hole, thick+1]}),
        cylinder({radius:scrwr, start:[ clamp_off,  motor_hole, -1], end:[ clamp_off,  motor_hole, thick+1]}),
        cylinder({radius:scrwr, start:[ clamp_off, -motor_hole, -1], end:[ clamp_off, -motor_hole, thick+1]}),

        cube({corner1:[-length2+28,-width2+20,-1], corner2:[-length2-1,-width2-1,thick+1]}),
        cube({corner1:[-length2+28, width2-20,-1], corner2:[-length2-1, width2+1,thick+1]}),
        cube({corner1:[ length2-60,-width2+20,-1], corner2:[ length2+1,-width2-1,thick+1]}),
        cube({corner1:[ length2-60, width2-20,-1], corner2:[ length2+1, width2+1,thick+1]}),
         
    ]).union([
        z_nut_support(25,30,2).rotateX(-90).rotateZ(180).translate([z_motor_off,thick,thick + 15]), //z_motor_off
        support.rotateY(-90).rotateX(90).translate([z_motor_off + 12.5,thick-2.5, thick-2]),
        support.rotateY(-90).rotateX(90).translate([z_motor_off - 12.5 + thick,thick-2.5, thick-2]),

    ]);


    return body.setColor(glbl.partColor);
}

function z_nut_cover()
{
    return z_nut_support(25,30,-10);
}
//END INCLUDE

//INCLUDE:"hotend.jscad"

function hotend_support(height )
{
    if(!height) height=15;
    var fin        = 7.5;
    var fin_r      = 7.5/2;
    var hole       = 15;
    var hotend_rad = 7
    var scrwr      = glbl.screwRadius;

    var body=cube({radius:[hole,2.5,height/2], center:[0,0,height/2]}).union([
        cylinder({radius:fin_r, start:[-hole,0,0], end:[-hole,0,height]}),
        cylinder({radius:fin_r, start:[ hole,0,0], end:[ hole,0,height]}),
    ]).subtract([
        cylinder({radius:scrwr, start:[-hole,0,-1], end:[-hole,0,height+1]}),
        cylinder({radius:scrwr, start:[ hole,0,-1], end:[ hole,0,height+1]}),
        cylinder({radius:hotend_rad,       start:[ 0,-10,height + 0.25], end:[ 0, 20, height  + 0.25]}),
    ]);

    return body;
}
//END INCLUDE

function getParameterDefinitions() {
    return [
      { name: 'motorHeight', type: 'float', initial:40.0, caption: "Stepper motor height :" },
      { name: 'motorWidth',  type: 'float', initial:42.0, caption: "Stepper motor width :" },
      { name: 'motorShaft',  type: 'float', initial: 5.0, caption: "Stepper motor shaft diameter :" },
      { name: 'thickness',   type: 'float', initial: 5.0, caption: "Thickness off all pieces :" },
      { name: 'screwRadius', type: 'float', initial: 1.5, caption: "Screw radius :" },
      { name: 'barDiameter', type: 'float', initial: 8.0, caption: "Bar diameter :" },
      { name: 'resolution',  type: 'int',   initial:  18, caption: "Resolution :" }
    ];
}

function z_axis()
{
    return pylon().rotateZ(-90).translate([49,0,0]).union([
        pylon().rotateZ(90).translate([-49,0,0]),
        bar(320, "z").translate([56.5,0,30]),
        bar(320, "z").translate([-56.5,0,30]),
        z_top_carriage_end().translate([0,0,340]),
        motor_cage().rotateZ(90).rotateX(180).translate([-21,9,45]),
        shaft_coupler(5,8).translate([-21,9,40+26-10]),
        screw_bar(270).translate([-21,9,40+26-10+5]),
    ]);

}

function x_axis(x, z)
{
    return x_carriage().rotateZ(180).rotateX(-90).translate([0,-16,z]).union([
        LM8LUU_clamp().translate([-56.5,0,z-19]),
        LM8LUU_clamp().rotateY(180).translate([56.5,0,z+19]),
        LM8LUU_clamp().rotateZ(180).rotateY(-90).translate([34,-27,z+30.5]),
        LM8LUU_clamp().rotateZ(180).rotateY(90).translate([-4,-27,z-30.5]),
        LM8LUU().translate([-56.5,0,z-22.5]),
        LM8LUU().translate([ 56.5,0,z-22.5]),
        LM8LUU().rotateZ(180).rotateY(-90).translate([37.5,-27,z+30.5]),
        LM8LUU().rotateZ(180).rotateY(90).translate([-7.5,-27,z-30.5]),
        bar(360,"x").translate([x,-27,z+30.5]),
        bar(360,"x").translate([x,-27,z-30.5]),
        x_back_carriage_end().rotateZ(-90).rotateY(-90).rotateX(90).translate([x+10,-27, z]),
        x_front_carriage_end().rotateZ(-90).rotateY(90).rotateX(-90).translate([x+350,-27, z]),
        hotend_support(15).rotateZ(90).rotateY(90).translate([x+360,-27,z+4]),
        hotend_support(10).rotateZ(90).rotateY(-90).translate([x+385.5,-27,z+4]),
        cylinder({radius:7, start:[x+375,-27,z+12], end:[x+375,-27,z+12-62.3]}),
    ]);
}

function y_axis(x,y)
{
    return y_motor_cage().rotateX(180).translate([x,0,45]).union([
        LM8LUU_clamp().rotateX(90).translate([x-40, 19, 45 + 11]),
        LM8LUU_clamp().rotateX(90).rotateZ(180).translate([x+40, -19, 45 + 11]),
        LM8LUU().rotateX(90).translate([x-40, 22.5, 45 + 11]),
        LM8LUU().rotateX(90).translate([x+40, 22.5, 45 + 11]),
        bar(320,"y").translate([x-40,y,45 + 11]),
        bar(320,"y").translate([x+40,y,45 + 11]),
        y_carriage_end().rotateZ(180).rotateX(-90).translate([x, 310+y, 45+11]),
        y_carriage_end().rotateX(90).translate([x, y+10, 45+11]),
        plate_base(320).translate([x-45,y,45 + 11 + 15]),
        plate_base(320).translate([x+45,y,45 + 11 + 15]),
    ]);
}

function motors(x,y,z)
{
    return nema17().translate([-21,9,0]).union([
        nema17().rotateX(90).translate([15,30,z]),
        nema17().translate([x,0,0]),
        nema17().translate([15,-30,0]),
        motor_cage().rotateZ(90).rotateX(180).translate([15,-30,45]),
        extruder().translate([15,-30,45]),
    ]);
}


function main(params)
{
    params                 = params || {}
    glbl                   = new parameters(params);
    setDefault2DResolution( glbl.resolution);
    setDefault3DResolution( glbl.resolution);
    var x= -150;
    var y= -120;
    var z = 136;
    var result = [
        z_axis(),
        x_axis(x, z),
        y_axis(240,y),
        motors(240,0,z),
    ];
    return result;

}
function version() {
  return [0,5,1];
}

function color() {
   var map = {
   "black" : [ 0/255,0/255,0/255 ],
   "silver": [ 192/255,192/255,192/255 ],
   "gray"  : [ 128/255,128/255,128/255 ],
   "white" : [ 255/255,255/255,255/255 ],
   "maroon": [ 128/255,0/255,0/255 ],
   "red"   : [ 255/255,0/255,0/255 ],
   "purple": [ 128/255,0/255,128/255 ],
   "fuchsia": [ 255/255,0/255,255/255 ],
   "green" : [ 0/255,128/255,0/255 ],
   "lime"  : [ 0/255,255/255,0/255 ],
   "olive" : [ 128/255,128/255,0/255 ],
   "yellow": [ 255/255,255/255,0/255 ],
   "navy"  : [ 0/255,0/255,128/255 ],
   "blue"  : [ 0/255,0/255,255/255 ],
   "teal"  : [ 0/255,128/255,128/255 ],
   "aqua"  : [ 0/255,255/255,255/255 ],
   "aliceblue"   : [ 240/255,248/255,255/255 ],
   "antiquewhite"   : [ 250/255,235/255,215/255 ],
   "aqua"  : [ 0/255,255/255,255/255 ],
   "aquamarine"  : [ 127/255,255/255,212/255 ],
   "azure" : [ 240/255,255/255,255/255 ],
   "beige" : [ 245/255,245/255,220/255 ],
   "bisque"   : [ 255/255,228/255,196/255 ],
   "black" : [ 0/255,0/255,0/255 ],
   "blanchedalmond" : [ 255/255,235/255,205/255 ],
   "blue"  : [ 0/255,0/255,255/255 ],
   "blueviolet"  : [ 138/255,43/255,226/255 ],
   "brown" : [ 165/255,42/255,42/255 ],
   "burlywood"   : [ 222/255,184/255,135/255 ],
   "cadetblue"   : [ 95/255,158/255,160/255 ],
   "chartreuse"  : [ 127/255,255/255,0/255 ],
   "chocolate"   : [ 210/255,105/255,30/255 ],
   "coral" : [ 255/255,127/255,80/255 ],
   "cornflowerblue" : [ 100/255,149/255,237/255 ],
   "cornsilk" : [ 255/255,248/255,220/255 ],
   "crimson"  : [ 220/255,20/255,60/255 ],
   "cyan"  : [ 0/255,255/255,255/255 ],
   "darkblue" : [ 0/255,0/255,139/255 ],
   "darkcyan" : [ 0/255,139/255,139/255 ],
   "darkgoldenrod"  : [ 184/255,134/255,11/255 ],
   "darkgray" : [ 169/255,169/255,169/255 ],
   "darkgreen"   : [ 0/255,100/255,0/255 ],
   "darkgrey" : [ 169/255,169/255,169/255 ],
   "darkkhaki"   : [ 189/255,183/255,107/255 ],
   "darkmagenta" : [ 139/255,0/255,139/255 ],
   "darkolivegreen" : [ 85/255,107/255,47/255 ],
   "darkorange"  : [ 255/255,140/255,0/255 ],
   "darkorchid"  : [ 153/255,50/255,204/255 ],
   "darkred"  : [ 139/255,0/255,0/255 ],
   "darksalmon"  : [ 233/255,150/255,122/255 ],
   "darkseagreen"   : [ 143/255,188/255,143/255 ],
   "darkslateblue"  : [ 72/255,61/255,139/255 ],
   "darkslategray"  : [ 47/255,79/255,79/255 ],
   "darkslategrey"  : [ 47/255,79/255,79/255 ],
   "darkturquoise"  : [ 0/255,206/255,209/255 ],
   "darkviolet"  : [ 148/255,0/255,211/255 ],
   "deeppink" : [ 255/255,20/255,147/255 ],
   "deepskyblue" : [ 0/255,191/255,255/255 ],
   "dimgray"  : [ 105/255,105/255,105/255 ],
   "dimgrey"  : [ 105/255,105/255,105/255 ],
   "dodgerblue"  : [ 30/255,144/255,255/255 ],
   "firebrick"   : [ 178/255,34/255,34/255 ],
   "floralwhite" : [ 255/255,250/255,240/255 ],
   "forestgreen" : [ 34/255,139/255,34/255 ],
   "fuchsia"  : [ 255/255,0/255,255/255 ],
   "gainsboro"   : [ 220/255,220/255,220/255 ],
   "ghostwhite"  : [ 248/255,248/255,255/255 ],
   "gold"  : [ 255/255,215/255,0/255 ],
   "goldenrod"   : [ 218/255,165/255,32/255 ],
   "gray"  : [ 128/255,128/255,128/255 ],
   "green" : [ 0/255,128/255,0/255 ],
   "greenyellow" : [ 173/255,255/255,47/255 ],
   "grey"  : [ 128/255,128/255,128/255 ],
   "honeydew" : [ 240/255,255/255,240/255 ],
   "hotpink"  : [ 255/255,105/255,180/255 ],
   "indianred"   : [ 205/255,92/255,92/255 ],
   "indigo"   : [ 75/255,0/255,130/255 ],
   "ivory" : [ 255/255,255/255,240/255 ],
   "khaki" : [ 240/255,230/255,140/255 ],
   "lavender" : [ 230/255,230/255,250/255 ],
   "lavenderblush"  : [ 255/255,240/255,245/255 ],
   "lawngreen"   : [ 124/255,252/255,0/255 ],
   "lemonchiffon"   : [ 255/255,250/255,205/255 ],
   "lightblue"   : [ 173/255,216/255,230/255 ],
   "lightcoral"  : [ 240/255,128/255,128/255 ],
   "lightcyan"   : [ 224/255,255/255,255/255 ],
   "lightgoldenrodyellow" : [ 250/255,250/255,210/255 ],
   "lightgray"   : [ 211/255,211/255,211/255 ],
   "lightgreen"  : [ 144/255,238/255,144/255 ],
   "lightgrey"   : [ 211/255,211/255,211/255 ],
   "lightpink"   : [ 255/255,182/255,193/255 ],
   "lightsalmon" : [ 255/255,160/255,122/255 ],
   "lightseagreen"  : [ 32/255,178/255,170/255 ],
   "lightskyblue"   : [ 135/255,206/255,250/255 ],
   "lightslategray" : [ 119/255,136/255,153/255 ],
   "lightslategrey" : [ 119/255,136/255,153/255 ],
   "lightsteelblue" : [ 176/255,196/255,222/255 ],
   "lightyellow" : [ 255/255,255/255,224/255 ],
   "lime"  : [ 0/255,255/255,0/255 ],
   "limegreen"   : [ 50/255,205/255,50/255 ],
   "linen" : [ 250/255,240/255,230/255 ],
   "magenta"  : [ 255/255,0/255,255/255 ],
   "maroon"   : [ 128/255,0/255,0/255 ],
   "mediumaquamarine"  : [ 102/255,205/255,170/255 ],
   "mediumblue"  : [ 0/255,0/255,205/255 ],
   "mediumorchid"   : [ 186/255,85/255,211/255 ],
   "mediumpurple"   : [ 147/255,112/255,219/255 ],
   "mediumseagreen" : [ 60/255,179/255,113/255 ],
   "mediumslateblue"   : [ 123/255,104/255,238/255 ],
   "mediumspringgreen" : [ 0/255,250/255,154/255 ],
   "mediumturquoise"   : [ 72/255,209/255,204/255 ],
   "mediumvioletred"   : [ 199/255,21/255,133/255 ],
   "midnightblue"   : [ 25/255,25/255,112/255 ],
   "mintcream"   : [ 245/255,255/255,250/255 ],
   "mistyrose"   : [ 255/255,228/255,225/255 ],
   "moccasin" : [ 255/255,228/255,181/255 ],
   "navajowhite" : [ 255/255,222/255,173/255 ],
   "navy"  : [ 0/255,0/255,128/255 ],
   "oldlace"  : [ 253/255,245/255,230/255 ],
   "olive" : [ 128/255,128/255,0/255 ],
   "olivedrab"   : [ 107/255,142/255,35/255 ],
   "orange"   : [ 255/255,165/255,0/255 ],
   "orangered"   : [ 255/255,69/255,0/255 ],
   "orchid"   : [ 218/255,112/255,214/255 ],
   "palegoldenrod"  : [ 238/255,232/255,170/255 ],
   "palegreen"   : [ 152/255,251/255,152/255 ],
   "paleturquoise"  : [ 175/255,238/255,238/255 ],
   "palevioletred"  : [ 219/255,112/255,147/255 ],
   "papayawhip"  : [ 255/255,239/255,213/255 ],
   "peachpuff"   : [ 255/255,218/255,185/255 ],
   "peru"  : [ 205/255,133/255,63/255 ],
   "pink"  : [ 255/255,192/255,203/255 ],
   "plum"  : [ 221/255,160/255,221/255 ],
   "powderblue"  : [ 176/255,224/255,230/255 ],
   "purple"   : [ 128/255,0/255,128/255 ],
   "red"   : [ 255/255,0/255,0/255 ],
   "rosybrown"   : [ 188/255,143/255,143/255 ],
   "royalblue"   : [ 65/255,105/255,225/255 ],
   "saddlebrown" : [ 139/255,69/255,19/255 ],
   "salmon"   : [ 250/255,128/255,114/255 ],
   "sandybrown"  : [ 244/255,164/255,96/255 ],
   "seagreen" : [ 46/255,139/255,87/255 ],
   "seashell" : [ 255/255,245/255,238/255 ],
   "sienna"   : [ 160/255,82/255,45/255 ],
   "silver"   : [ 192/255,192/255,192/255 ],
   "skyblue"  : [ 135/255,206/255,235/255 ],
   "slateblue"   : [ 106/255,90/255,205/255 ],
   "slategray"   : [ 112/255,128/255,144/255 ],
   "slategrey"   : [ 112/255,128/255,144/255 ],
   "snow"  : [ 255/255,250/255,250/255 ],
   "springgreen" : [ 0/255,255/255,127/255 ],
   "steelblue"   : [ 70/255,130/255,180/255 ],
   "tan"   : [ 210/255,180/255,140/255 ],
   "teal"  : [ 0/255,128/255,128/255 ],
   "thistle"  : [ 216/255,191/255,216/255 ],
   "tomato"   : [ 255/255,99/255,71/255 ],
   "turquoise"   : [ 64/255,224/255,208/255 ],
   "violet"   : [ 238/255,130/255,238/255 ],
   "wheat" : [ 245/255,222/255,179/255 ],
   "white" : [ 255/255,255/255,255/255 ],
   "whitesmoke"  : [ 245/255,245/255,245/255 ],
   "yellow"   : [ 255/255,255/255,0/255 ],
   "yellowgreen" : [ 154/255,205/255,50/255 ] };

   var o, i = 1, a = arguments, c = a[0], alpha;

   if(a[0].length<4 && (a[i]*1-0)==a[i]) { alpha = a[i++]; }  // first argument rgb (no a), and next one is numeric?
   if(a[i].length) { a = a[i], i = 0; }                       // next arg an array, make it our main array to walk through
   if(typeof c == 'string')
      c = map[c.toLowerCase()];
   if(alpha!=undefined) 
      c = c.concat(alpha);
   for(o=a[i++]; i<a.length; i++) { 
      o = o.union(a[i]);
   } 
   return o.setColor(c);
}


function setDefault3DResolution(resolution)
{
    CSG.defaultResolution3D = resolution;
}

function setDefault2DResolution(resolution)
{
    CSG.defaultResolution2D = resolution;
}

/*
    polyhedron 
    expect an object defined as
    {
        triangles/polygons: [],
        points: [],
        colors: [],
    }
*/
function polyhedron(options) { 
   var pgs = [];
   options = options || {};
   var ref = options.triangles || options.polygons;
   var colors = options.colors|| null;
   
   for(var i=0; i<ref.length; i++) {
      var pp = []; 
      for(var j=0; j<ref[i].length; j++) {
         pp[j] = options.points[ref[i][j]];
      }

      var v = [];
      for(j=ref[i].length-1; j>=0; j--) {       // --- we reverse order for examples of OpenSCAD work
         v.push(new CSG.Vertex(new CSG.Vector3D(pp[j][0],pp[j][1],pp[j][2])));
      }
      var s = CSG.Polygon.defaultShared;
      if (colors && colors[i]) {
         s = CSG.Polygon.Shared.fromColor(colors[i]);
      }
      pgs.push(new CSG.Polygon(v,s));
   }
   var r = CSG.fromPolygons(pgs);
   return r;   
}

function geodesicSphere(options) {
    var c        = [0,0,0];
    var r        = 1;
    var res      = 5;
    var geodesic = false;
    options = options || {};

    if('radius' in options){
        r = options['radius'];
    }
    if ('diam' in options)  {
        r = options['diam'] / 2;
    }
    if ('center' in options)  {
        c = options['center'];
    }

    if ('resolution' in options)  {
        res = options['resolution'];
    }

    var ci = [              // hard-coded data of icosahedron (20 faces, all triangles)
      [0.850651,0.000000,-0.525731],
      [0.850651,-0.000000,0.525731],
      [-0.850651,-0.000000,0.525731],
      [-0.850651,0.000000,-0.525731],
      [0.000000,-0.525731,0.850651],
      [0.000000,0.525731,0.850651],
      [0.000000,0.525731,-0.850651],
      [0.000000,-0.525731,-0.850651],
      [-0.525731,-0.850651,-0.000000],
      [0.525731,-0.850651,-0.000000],
      [0.525731,0.850651,0.000000],
      [-0.525731,0.850651,0.000000]];
   
   var ti = [ [0,9,1], [1,10,0], [6,7,0], [10,6,0], [7,9,0], [5,1,4], [4,1,9], [5,10,1], [2,8,3], [3,11,2], [2,5,4], 
      [4,8,2], [2,11,5], [3,7,6], [6,11,3], [8,7,3], [9,8,4], [11,10,5], [10,11,6], [8,9,7]];
   
   var geodesicSubDivide = function(p,fn,off) {
      var p1 = p[0], p2 = p[1], p3 = p[2];
      var n = off;
      var c = [];
      var f = [];
   
      //           p3
      //           /\
      //          /__\     fn = 3
      //      i  /\  /\
      //        /__\/__\       total triangles = 9 (fn*fn)
      //       /\  /\  /\         
      //     0/__\/__\/__\   
      //    p1 0   j      p2
   
      for(var i=0; i<fn; i++) {
         for(var j=0; j<fn-i; j++) {
            var t0 = i/fn;
            var t1 = (i+1)/fn;
            var s0 = j/(fn-i);
            var s1 = (j+1)/(fn-i);
            var s2 = fn-i-1?j/(fn-i-1):1;
            var q = [];
            
            q[0] = mix3(mix3(p1,p2,s0),p3,t0);
            q[1] = mix3(mix3(p1,p2,s1),p3,t0);
            q[2] = mix3(mix3(p1,p2,s2),p3,t1);
            
            // -- normalize
            for(var k=0; k<3; k++) {
               var r = Math.sqrt(q[k][0]*q[k][0]+q[k][1]*q[k][1]+q[k][2]*q[k][2]);
               for(var l=0; l<3; l++) {
                  q[k][l] /= r;
               }
            }
            c.push(q[0],q[1],q[2]);
            f.push([n,n+1,n+2]); n += 3;
            
            if(j<fn-i-1) {
               var s3 = fn-i-1?(j+1)/(fn-i-1):1;
               q[0] = mix3(mix3(p1,p2,s1),p3,t0);
               q[1] = mix3(mix3(p1,p2,s3),p3,t1);
               q[2] = mix3(mix3(p1,p2,s2),p3,t1);
   
               // -- normalize
               for(var k=0; k<3; k++) {
                  var r = Math.sqrt(q[k][0]*q[k][0]+q[k][1]*q[k][1]+q[k][2]*q[k][2]);
                  for(var l=0; l<3; l++) {
                     q[k][l] /= r;
                  }
               }
               c.push(q[0],q[1],q[2]);
               f.push([n,n+1,n+2]); n += 3;
            }
         }
      } 
      return { points: c, triangles: f, off: n };
   }
   
   var mix3 = function(a,b,f) {
      var _f = 1-f;
      var c = [];
      for(var i=0; i<3; i++) {
         c[i] = a[i]*_f+b[i]*f;
      }
      return c;
   }

   if(p) {
      if(p.fn) fn = Math.floor(p.fn/6);
      if(p.r) r = p.r;
   }

   if(fn<=0) fn = 1;
   
   var q = [];
   var c = [], f = [];
   var off = 0;

   for(var i=0; i<ti.length; i++) {
      var g = geodesicSubDivide([ ci[ti[i][0]], ci[ti[i][1]], ci[ti[i][2]] ],fn,off);
      c = c.concat(g.points);
      f = f.concat(g.triangles);
      off = g.off;
   }
   return polyhedron({points: c, triangles: f}).scale(r).translate(c);
}

function cube(options)
{
    var c   = [0,0,0];
    var r   = [0.5,0.5,0.5];
    var rr  = 0;
    var res = CSG.defaultResolution3D;
    options = options || {};

    if('corner2' in options)     {
        if(!('corner1' in options))        {
            throw new Error("cube: to use corner2 should give a corner1 parameter");
        }
        else if(('radius' in options) || ('size' in options))        {
            throw new Error("cube: should either give a radius/size and center/corner1 parameter, or a corner1 and corner2 parameter");
        }
        else        {
            c = [ (options['corner2'][0]+options['corner1'][0])/2, (options['corner2'][1]+options['corner1'][1])/2, (options['corner2'][2]+options['corner1'][2])/2];
            r = [ (options['corner2'][0]-options['corner1'][0])/2, (options['corner2'][1]-options['corner1'][1])/2, (options['corner2'][2]-options['corner1'][2])/2];
        }
    }
    else    {
        if(('corner1' in options) &&('center' in options))        {
            throw new Error("cube: should either give a center parameter, or a corner1 and corner2 parameter");
        }
        if(('radius' in options) && ('size' in options))        {
            throw new Error("cube: should either give a radius parameter, or a size parameter");
        }
    }

    if('radius' in options){
        r = options['radius'];
    }
    if('size' in options){
        r = [ options['size'][0]/2, options['size'][1]/2, options['size'][2]/2];
    }
    if ('center' in options)  {
        c = options['center'];
    }
    if ('corner1' in options)  {
        c = [options['corner1'][0]+r[0],  options['corner1'][1]+r[1],  options['corner1'][2]+r[2] ];
    }
    if ('roundRadius' in options)  {
        rr = options['roundRadius'];
    }
    if ('resolution' in options)  {
        res = options['resolution'];
    }

    if(rr===0)
    {
        return new CSG.cube({radius: r, center: c});
    }
    else
    {
        return new CSG.roundedCube({radius: r, center: c, roundradius:rr, resolution:res});
    }
    
}

function sphere(options)
{
    var c        = [0,0,0];
    var r        = 0.5;
    var res      = CSG.defaultResolution3D;
    var geodesic = false;
    options = options || {};

    if('radius' in options){
        r = options['radius'];
    }
    if ('diam' in options)  {
        r = options['diam'] / 2;
    }
    if ('center' in options)  {
        c = options['center'];
    }

    if ('resolution' in options)  {
        res = options['resolution'];
    }

    if ('geodesic' in options)  {
        goedesic = options['geodesic'];
    }

    if(geodesic){
        return geodesicSphere({radius:r, center:c, resolution:res})
    }
    else{
        return CSG.sphere({radius:r, center:c, resolution:res});
    }
}

function cylinder(options)
{
    var start    = [0,0,0];
    var end      = [0,0,1];
    var r1       = 0.5;
    var r2       = r1;
    var res      = CSG.defaultResolution3D;
    var rounded  = false;
    var alpha    = 360;
    options = options || {};

    if(('radius' in options) && ('diam' in options))   {
        throw new Error("cylinder: either diam or radius parameters should be provided, but not no both"); 
    }
    if(('end' in options) && ('height' in options))   {
        throw new Error("cylinder: either end or height parameters should be provided, but not no both"); 
    }
    if((('radius' in options) || ('diam' in options)) 
        && (('radiusStart' in options) || ('radiusEnd' in options)))   {
        throw new Error("cylinder: cone parameters could not be used with radius or diam"); 
    }
    if(('rounded' in options)  
        && (('radiusStart' in options) || ('radiusEnd' in options)))   {
        throw new Error("cylinder: cone parameters could not be used with rrounded"); 
    }

    if('radius' in options){
        r1 = options['radius'];
        r2 = r1;
    }

    if ('diam' in options)  {
        r1 = options['diam'] / 2;
        r2 = r1;
    }

    if('radiusStart' in options){
        r1 = options['radiusStart'];
    }

    if('radiusEnd' in options){
        r2 = options['radiusEnd'];
    }

    if ('start' in options)  {
        start = options['start'];
        end = [ options['start'][0], options['start'][1], options['start'][2] + 1];
    }

    if ('end' in options)  {
        end = options['end'];
    }

    if('height' in options){
        var h= options['height'];
        end  = [start[0], start[1], start[2] + h];
    }

    if ('rounded' in options)  {
        rounded = options['rounded'];
    }

    if ('resolution' in options)  {
        res = options['resolution'];
    }

    if ('sectorAngle' in options)  {
        alpha = options['sectorAngle'];
    }

    if(!rounded){
        if(r2===r1){
            return CSG.cylinder({start:start, end:end, radius:r1, sectorAngle:alpha});
        }else{
            return CSG.cylinder({start:start, end:end, radiusStart:r1, radiusEnd: r2, sectorAngle:alpha});
        }
    }
    else{
        return CSG.roundedCylinder({start:start, end:end, radius:r1});
    }

}

function getTMatrix(options)
{
    options = options || {};
    if(
        !('translate' in options)
        && !('scale' in options)
        && !('rotate' in options)
        && !('mirror' in options)
    ){
        throw new Error("buildTMatrix: Either translate, scale, rotate or mirror parameters should be provided");
    }
    var m = new CSG.Matrix4x4();
    if('rotate' in options)
    {
        if(options[0] && options[0]!=0)
            m = m.multiply(CSG.Matrix4x4.rotationX(options['rotate'][0]));
        if(options[1] && options[1]!=0)
            m = m.multiply(CSG.Matrix4x4.rotationX(options['rotate'][1]));
        if(options[2] && options[2]!=0)
            m = m.multiply(CSG.Matrix4x4.rotationX(options['rotate'][2]));
    }
    if('translate' in options)
    {
        m = m.multiply(CSG.Matrix4x4.translation(options['translate']));
    }
    if('scale' in options)
    {
        m = m.multiply(CSG.Matrix4x4.scaling(options['scale']));
    }
    if('mirror' in options)
    {
        var plane = new CSG.Plane(
                            CSG.Vector3D.Create(
                                options['mirror'][0], options['mirror'][1], options['mirror'][2]
                            ), 
                            0
                        );
        m = m.multiply(CSG.Matrix4x4.mirroring(plane));
    }
    return m;
} 

function circle(options)
{
    var center = [0, 0];
    var radius = 0.5;
    var elliptycal = false;
    var resolution = CSG.defaultResolution2D;
    options = options || {};
    if(options['center']){
        center = options['center'];
    }
    if(options['radius']){
        radius = options['radius'];
        if(radius.length){
            elliptycal = true;
        }
    }
    if(options['diam']){
        var diam = options['diam'];
        if(diam.length){
            radius = [ diam[0]/2, diam[1]/2];
            elliptycal = true;
        }
        else{
            radius = diam/2;
        }
    }
    if(options['resolution']){
        resolution = options['resolution'];
    }
    if(!elliptycal){
        return CAG.circle({center: center, radius: radius, resolution: resolution});
    }else{
        return CAG.ellipse({center: center, radius: radius, resolution: resolution}); 
    }
}

function square(options)
{
    var c   = [0,0];
    var r   = [0.5,0.5];
    var rr  = 0;
    var res = CSG.defaultResolution2D;
    options = options || {};

    if('corner2' in options)     {
        if(!('corner1' in options))        {
            throw new Error("rectangle: to use corner2 should give a corner1 parameter");
        }
        else if(('radius' in options) || ('size' in options))        {
            throw new Error("rectangle: should either give a radius/size and center/corner1 parameter, or a corner1 and corner2 parameter");
        }
        else        {
            c = [ (options['corner2'][0]+options['corner1'][0])/2, (options['corner2'][1]+options['corner1'][1])/2];
            r = [ (options['corner2'][0]-options['corner1'][0])/2, (options['corner2'][1]-options['corner1'][1])/2];
        }
    }
    else    {
        if(('corner1' in options) &&('center' in options))        {
            throw new Error("rectangle: should either give a center parameter, or a corner1 and corner2 parameter");
        }
        if(('radius' in options) && ('size' in options))        {
            throw new Error("rectangle: should either give a radius parameter, or a size parameter");
        }
    }

    if('radius' in options){
        r = options['radius'];
    }
    if('size' in options){
        r = [ options['size'][0]/2, options['size'][1]/2];
    }
    if ('center' in options)  {
        c = options['center'];
    }
    if ('corner1' in options)  {
        c = [options['corner1'][0]+r[0],  options['corner1'][1]+r[1] ];
    }
    if ('roundRadius' in options)  {
        rr = options['roundRadius'];
    }
    if ('resolution' in options)  {
        res = options['resolution'];
    }

    if(rr===0)
    {
        return CAG.rectangle({center: c, radius: r});
    }
    else
    {
        return CAG.roundedRectangle({center: c, radius: r, roundradius: rr, resolution: res});
    }
}

function polygon(options)
{
    var pts = [];
    if(options.length)
    {
        pts = options;
    }
    else
    {
        options = options || {};
        if(options.points)
        {
            pts = options.points;
        }
    }
    if(pts.length && pts.length>=3 )
    {
        return CAG.fromPoints(pts); 
    }
    throw new Error("polygon: an arry of 3 or more 2D points should be provided");  
}

function polyline(options){
    var pts = [];
    var closed = false;
    if(options.length) {
        pts = options;
    }
    else{
        options = options || {};
        if(options.points){
            pts = options.points;
        }
        if(options['closed']){
            closed = options['closed'];
        }
    }
    if(pts.length && pts.length>=2 ){
        return new CSG.Path2D(pts, closed);
    }
    throw new Error("polyline: an array of 2 or more 2D points should be provided");  
}

function arc(options)
{
    var center      = [0, 0];
    var radius      = 0.5;
    var startangle  = 0;
    var endangle    = 360;
    var maketangent = false;
    var elliptycal  = false;
    var resolution  = CSG.defaultResolution2D;
    options         = options || {};
    if(options['center']){
        center = options['center'];
    }
    if(options['radius']){
        radius = options['radius'];
        if(radius.length){
            elliptycal = true;
        }
    }
    if(options['diam']){
        var diam = options['diam'];
        if(diam.length){
            radius = [ diam[0]/2, diam[1]/2];
            elliptycal = true;
        }
        else{
            radius = diam/2;
        }
    }
    if(options['startangle']){
        startangle = options['startangle'];
    }
    if(options['endangle']){
        endangle = options['endangle'];
    }
    if(options['maketangent']){
        maketangent = options['maketangent'];
    }
    if(options['resolution']){
        resolution = options['resolution'];
    }
    if(!elliptycal){
        return CAG.arc({
                center: center, 
                radius: radius,
                startangle: startangle,
                endangle: endangle,
                maketangent: maketangent, 
                resolution: resolution
            });
    }
    /*else{
        return CAG.ellipse({center: center, radius: radius, resolution: resolution}); 
    }*/

}

function bezier(options)
{
    var pts        = [];
    var resolution = CSG.defaultResolution2D;
    if(options.length) {
        pts = options;
    }
    else{
        options = options || {};
        if(options.points){
            pts = options.points;
        }
        if(options['resolution']){
            closed = options['closed'];
        }
    }
    if(pts.length && pts.length>=5 ){
        var bpts = [];
        for(i=1; i<pts.length; i++)
        {
            bpts.push(pts[i]);
        }
        var path= new CSG.Path2D(pts[i], /*closed=*/false);
        return path.appendBezier(bpts, {resolution: resolution});
    }
    throw new Error("bezier: an array of 5 or more 2D points should be provided as control points");  
}

function torus(options) {
   var ri = 1, ro = 4, fni = 16, fno = 32, roti = 0;
   if(options) {
      if(options.ri) ri = options.ri;
      if(options.fni) fni = options.fni;
      if(options.roti) roti = options.roti;
      if(options.ro) ro = options.ro;
      if(options.fno) fno = options.fno;
   }
   if(fni<3) fni = 3;
   if(fno<3) fno = 3;
   var c = circle({ r:ri, resolution:fni});
   if(roti) c = c.rotateZ(roti);
   
   return c.translate([ro,0,0]).rotateExtrude( {resolution:fno});
}

function polyhedron(p) { 
   var pgs = [];
   var ref = p.triangles||p.polygons;
   var colors = p.colors||null;
   
   for(var i=0; i<ref.length; i++) {
      var pp = []; 
      for(var j=0; j<ref[i].length; j++) {
         pp[j] = p.points[ref[i][j]];
      }

      var v = [];
      for(j=ref[i].length-1; j>=0; j--) {       // --- we reverse order for examples of OpenSCAD work
         v.push(new CSG.Vertex(new CSG.Vector3D(pp[j][0],pp[j][1],pp[j][2])));
      }
      var s = CSG.Polygon.defaultShared;
      if (colors && colors[i]) {
         s = CSG.Polygon.Shared.fromColor(colors[i]);
      }
      pgs.push(new CSG.Polygon(v,s));
   }
   var r = CSG.fromPolygons(pgs);
   return r;   
}

// -- Math functions (360 deg based vs 2pi)

function sin(a) {
   return Math.sin(a/360*Math.PI*2);
}
function cos(a) {
   return Math.cos(a/360*Math.PI*2);
}
function asin(a) {
   return Math.asin(a)/(Math.PI*2)*360;
}
function acos(a) {
   return Math.acos(a)/(Math.PI*2)*360;
}
function tan(a) {
   return Math.tan(a/360*Math.PI*2);
}
function atan(a) {
   return Math.atan(a)/(Math.PI*2)*360;
}
function atan2(a,b) {
   return Math.atan2(a,b)/(Math.PI*2)*360;
}
function ceil(a) {
   return Math.ceil(a);
}
function floor(a) {
   return Math.floor(a);
}
function abs(a) {
   return Math.abs(a);
}
function min(a,b) {
   return a<b?a:b;
}
function max(a,b) {
   return a>b?a:b;
}
function rands(min,max,vn,seed) {
   // -- seed is ignored for now, FIX IT (requires reimplementation of random())
   //    see http://stackoverflow.com/questions/424292/how-to-create-my-own-javascript-random-number-generator-that-i-can-also-set-the
   var v = new Array(vn);
   for(var i=0; i<vn; i++) {
      v[i] = Math.random()*(max-min)+min;
   }
}
function log(a) {
   return Math.log(a);
}
function lookup(ix,v) {
   var r = 0;
   for(var i=0; i<v.length; i++) {
      var a0 = v[i];
      if(a0[0]>=ix) {
         i--;
         a0 = v[i];
         var a1 = v[i+1];
         var m = 0;
         if(a0[0]!=a1[0]) {
            m = abs((ix-a0[0])/(a1[0]-a0[0]));
         }
         //echo(">>",i,ix,a0[0],a1[0],";",m,a0[1],a1[1]);
         if(m>0) {
            r = a0[1]*(1-m)+a1[1]*m;
         } else {
            r = a0[1];
         }
         return r;
      } 
   }
   return r;
}
function pow(a,b) {
   return Math.pow(a,b);
}
function sign(a) {
   return a<0?-1:(a>1?1:0);
}
function sqrt(a) {
   return Math.sqrt(a);
}
function round(a) {
   return floor(a+0.5);
}

// End of Math functions
function echo() {
   var s = "", a = arguments;
   for(var i=0; i<a.length; i++) {
      if(i) s += ", ";
      s += a[i];
   }
   //var t = (new Date()-global.time)/1000;
   //console.log(t,s);
   console.log(s);
}

_getParameterDefinitions = function(param) {         // used for openjscad CLI only
   //if(typeof getParameterDefinitions!=undefined) {
      var p = {};
      var pa = getParameterDefinitions();
      for(var a in pa) {               // defaults, given by getParameterDefinitions()
         var x = pa[a];
         if ('default' in x) {
           p[pa[a].name] = pa[a].default;
         } else
         if ('initial' in x) {
           p[pa[a].name] = pa[a].initial;
         } else
         if ('checked' in x) {
           p[pa[a].name] = pa[a].checked;
         }
      }
      for(var a in param) {            // given by command-line
         p[a] = param[a];
      }
      if(0) {
         for(var a in p) {
            echo("param=",a,p[a]);
         }
      }
      return p;
   //} else 
   //   return param;
}


if(typeof module != undefined) {    // we are used as module in nodejs require()
   var CSG = require(global.lib+'./csg.js').CSG;
   //console.log("lib="+global.lib);

  module.exports = { 
    // -- list all functions we export
    /*
    parseSTL: parseSTL,
    parseOBJ: parseOBJ,
    parseGCode: parseGCode,
    color:color, group:group, union:union, 
    difference:difference, 
    intersection:intersection,
    simplexFont: simplexFont,
    vector_text: vector_text, 
    vector_char: vector_char,
    hsv2rgb: hsv2rgb, rgb2hsv: rgb2hsv,
    hsl2rgb: hsl2rgb, rgb2hsl: rgb2hsl,
    html2rgb: html2rgb, rgb2html: rgb2html,
    triangle:triangle, 
    rectangular_extrude:rectangular_extrude,
    rotate_extrude: rotate_extrude,
    linear_extrude:linear_extrude,
    chain_hull:chain_hull,
    hull:hull, minkowski:minkowski,
    multmatrix:multmatrix,
    expand:expand, contract:contract, 
     
    */
    // 3d
    cylinder:cylinder,
    polyhedron:polyhedron, 
    geodesicSphere: geodesicSphere, 
    sphere: sphere,
    cube:cube,
    torus:torus,
    // helpers
    getTMatrix: getTMatrix,
    setDefault3DResolution: setDefault3DResolution,
    setDefault2DResolution: setDefault2DResolution,
    color:color, 
    version: version,
    //2d
    polygon:polygon, 
    circle:circle,
    square:square,
    //2d paths 
    polyline: polyline,
    arc:arc,
    bezier:bezier,
    // MATH
    pow: pow,
    sign: sign,
    sqrt: sqrt,
    round:round,
    log:log,
    echo:echo,
    lookup: lookup,
    rands: rands,
    atan: atan,
    atan2: atan2,
    ceil:ceil,
    floor:floor,
    abs:abs,
    min:min,
    max:max,
    tan:tan,
    acos:acos,
    cos:cos,
    asin:asin,
    sin:sin,

  };
}


main(_getParameterDefinitions({}));
