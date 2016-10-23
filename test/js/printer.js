var plastic = require('../../lang.js');

var glbl;
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
    
    var body =  plastic.cylinder({radius: diam/2, start:[0,0,-length], end:[0,0,0]});
    
    var head =  plastic.cylinder({radius: headRad, start:[0,0,0], end:[0,0,headHeight]})
                    .intersect(plastic.sphere({radius: headDiam * 0.75, center:[0, 0,-(headDiam * 0.75) + headHeight]}));

    head = head.subtract( plastic.cube({radius:[headRad + 0.2, hole, headHeight/2], center:[0,0,headHeight - (hole/2)]}));
    head = head.subtract( plastic.cube({radius:[hole, headRad + 0.2, headHeight/2], center:[0,0,headHeight - (hole/2)]}));

    return body.union(head).setColor([0.75,0.75,0.75]);
}

function nut(diam)
{
    var headHeight = diam * 0.80;
    var headDiam   = diam * 1.815   ;
    var headRad    = headDiam / 2;

    var body =  plastic.cylinder({radius: headRad, start:[0,0,0], end:[0,0,headHeight], resolution: 6})
        .subtract(plastic.cylinder({radius: diam/1.98, start:[0,0,-0.1], end:[0,0,headHeight+0.1]}));

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
    
    var body = plastic.cube({radius: [finLength2, finLength2 * 1.5, finLength2], center:[0, finLength2/2, finLength2]});

    return body.subtract([
        plastic.cylinder({radius:glbl.screwRadius, start:[0,0,-0.1], end:[0,0,finLength+0.1]}),
        plastic.cylinder({radius:glbl.screwRadius * 2, start:[0,0,finLength-2.8], end:[0,0,finLength+0.1], resolution:6}),
        plastic.cylinder({radius:0.5, start:[0, fishLinehole,-0.1], end:[0,fishLinehole,finLength+0.1]})]
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
    var body = plastic.cube({radius:[length/2, width/2, height/2], center:[0,0,height/2]});

    body = body.subtract([
        // left bar hole
        plastic.cylinder( {  radius:glbl.barRadius, start:[-barOffset, 0, -1], end:[-barOffset, 0, height + 1]}),
        plastic.cube( {  corner1:[-barOffset, -fix_groove/2, -1], corner2:[-((length/2)+1), fix_groove/2, height + 1]}),

        // left screw hole
        plastic.cylinder( {  radius:glbl.screwRadius, start:[-screw_hole, -width/2-1, height/2], end:[-screw_hole, width/2+1, height/2] }),  
        plastic.cylinder( {  radius:glbl.nutRadius, start:[-screw_hole, -width/2+glbl.nutHeight, height/2], end:[-screw_hole, -width/2-1, height/2], resolution: 6 }),


        // right bar hole
        plastic.cylinder( {  radius:glbl.barRadius, start:[ barOffset, 0, -1], end:[ barOffset, 0, height + 1]}),
        plastic.cube( {  corner1:[barOffset, -fix_groove/2, -1], corner2:[ ((length/2)+1), fix_groove/2, height + 1]}),

        // right screw hole
        plastic.cylinder( {  radius:glbl.screwRadius, start:[screw_hole, -width/2-1, height/2], end:[screw_hole, width/2+1, height/2] }),  
        plastic.cylinder( {  radius:glbl.nutRadius, start:[screw_hole, -width/2+glbl.nutHeight, height/2], end:[screw_hole, -width/2-1, height/2], resolution:6 }),
    ]);

    if(addTensor)
    {
        var supportWidth  = (width - fix_groove) / 4;
        var supportX      = length/2 - finLength/2;
        var supportY      = -(fix_groove / 2) - supportWidth;
        var supportZ      = height + finLength/2 - 0.5;
        var tensorSupport = plastic.cube({radius:[finLength/2, supportWidth, finLength/2 + 1], center:[ supportX, supportY, supportZ]})
            .subtract(
                 plastic.cylinder( {  radius:glbl.screwRadius, start:[ supportX - finLength/2 - 1, supportY, supportZ], end:[supportX + finLength/2 + 1, supportY, supportZ]})
            );
        body = body.union(tensorSupport);
    }
    
    body.properties.width = width; 
     
    return body.setColor(glbl.partColor);
}

function plate_support(plateWidth, height, thick)
{
    var width  = 16;

    var shape = plastic.polygon(
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
        plastic.cylinder({ radius:0.5, start:[ -glbl.motorShaftRadius + x_axis_fishHoleOffset, 0, -1], end:[ -glbl.motorShaftRadius + x_axis_fishHoleOffset, 0, thickness + 1] }),
        plastic.cylinder({ radius:0.5, start:[ glbl.motorShaftRadius + x_axis_fishHoleOffset, 0, -1], end:[ glbl.motorShaftRadius + x_axis_fishHoleOffset, 0, thickness + 1] })
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
    body = body.union(plastic.cube({radius:[toolSupportHeight/2, toolSupportWidth/2, thickness/2], center:[0,0,thickness/2]}));

    return body.subtract([
        
        plastic.cylinder({ radius:glbl.screwRadius, start:[ -toolHoleX,  toolHoleY, -1], end:[ -toolHoleX,  toolHoleY, thickness+1] }),
        plastic.cylinder({ radius:glbl.screwRadius, start:[ -toolHoleX, -toolHoleY, -1], end:[ -toolHoleX, -toolHoleY, thickness+1] }),
        plastic.cube({ radius:[ toolHoleX,r,t2 + 2], center:[ 0, -toolHoleY, t2] }),

        plastic.cylinder({ radius:glbl.screwRadius, start:[  toolHoleX,  toolHoleY, -1], end:[ toolHoleX,  toolHoleY, thickness+1] }),
        plastic.cylinder({ radius:glbl.screwRadius, start:[  toolHoleX, -toolHoleY, -1], end:[ toolHoleX, -toolHoleY, thickness+1] }),
        plastic.cube({ radius:[ toolHoleX,r,t2 + 2], center:[ 0, toolHoleY, t2] }),

        // holes for fishing line
        plastic.cylinder({ radius:0.5, start:[ -glbl.motorShaftRadius + x_axis_fishHoleOffset, 0, -1], end:[ -glbl.motorShaftRadius + x_axis_fishHoleOffset, 0, thickness + 1] }),
        plastic.cylinder({ radius:0.5, start:[ glbl.motorShaftRadius + x_axis_fishHoleOffset, 0, -1], end:[ glbl.motorShaftRadius + x_axis_fishHoleOffset, 0, thickness + 1] })
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
                        plastic.cylinder({radius:glbl.screwHeadRadius, start:[-barOffset-glbl.barRadius-finLength/2, width/2+1,thickness/2], end:[-barOffset-glbl.barRadius-finLength/2, width/2 + supportHeight +1,thickness/2] })
                    );
    var screw1   = barOffset - glbl.barRadius + supportSize - 10;  
    var screw0   = barOffset - glbl.barRadius - 3;
    var rightSup = plate_support( supportSize, supportHeight, thickness).rotateY(180).translate([barOffset-glbl.barRadius-5, width/2-1, thickness]).subtract(
                        plastic.cylinder({radius:glbl.screwHeadRadius, start:[+barOffset+glbl.barRadius+finLength/2, width/2+1,thickness/2], end:[barOffset+glbl.barRadius+finLength/2, width/2 + supportHeight +1,thickness/2] })
                    );

    body  = body.union([leftSup,rightSup]);
    
    return body.subtract([
        // holes for plate support screws
        plastic.cylinder({radius:glbl.screwRadius, start:[-screw0, -width, thickness/2], end:[-screw0, width + supportHeight, thickness/2] }),
        plastic.cylinder({radius:glbl.screwRadius, start:[ screw0, -width, thickness/2], end:[ screw0, width + supportHeight, thickness/2] }),
        plastic.cylinder({radius:glbl.screwRadius, start:[-screw1, -width, thickness/2], end:[-screw1, width + supportHeight, thickness/2] }),
        plastic.cylinder({radius:glbl.screwRadius, start:[ screw1, -width, thickness/2], end:[ screw1, width + supportHeight, thickness/2] }),
        // holes for fishing line
        plastic.cylinder({ radius:0.5, start:[ -glbl.motorShaftRadius, 0, -1], end:[ -glbl.motorShaftRadius, 0, thickness + 1] }),
        plastic.cylinder({ radius:0.5, start:[ glbl.motorShaftRadius, 0, -1], end:[ glbl.motorShaftRadius, 0, thickness + 1] })
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

    var p = plastic.polyline([ [X0,Y0],  [X1,Y1],  [X2,Y2] ], /* closed = */ false);

    p = p.concat(
            plastic.arc({
                center: [0,Y2,0],
                radius: radius + halfThickness,
                startangle: 0,
                endangle: 270,
                resolution: glbl.resolution
            })
        );
    p    = p.concat( plastic.polyline([ [X3,Y3], [X4,Y4] ], /* closed = */ false));
    var csg = p.rectangularExtrude( {width:thickness, offset:[0,0,length]});   // w, h, resolution, roundEnds

    var clamp = csg.subtract([
        plastic.cylinder({radius:glbl.screwRadius, start:[ holeX, -(radius + thickness + fin + 0.1), holeZ], end:[ holeX, 0, holeZ]}),
        plastic.cylinder({radius:glbl.screwRadius, start:[ holeX, -(radius + thickness + fin + 0.1), holeZ+31], end:[ holeX, 0, holeZ+31]}),
    ]);

    rt = -radius - thickness;
    rt2 = Math.sqrt(2) * rt/ 2; 
    var shape = plastic.polygon(
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

    var p = plastic.polyline([ [X0,Y0],  [X1,Y1],  [X2,Y2] ], /* closed = */ false);

    p = p.concat(
            plastic.arc({
                center: [0,Y2,0],
                radius: radius + halfThickness,
                startangle: 0,
                endangle: 180,
                resolution: glbl.resolution
            })
        );
    p    = p.concat( plastic.polyline([ [-X2,Y2], [-X1,Y1], [-X0,Y0] ], /* closed = */ false));
    var csg = p.rectangularExtrude( {width:thickness, offset:[0,0,length]});   // w, h, resolution, roundEnds

    var clamp = csg.subtract([
        plastic.cylinder({radius:glbl.screwRadius, start:[-holeX, -1, holeZ], end:[-holeX, thickness+1, holeZ]}),
        plastic.cylinder({radius:glbl.screwRadius, start:[ holeX, -1, holeZ], end:[ holeX, thickness+1, holeZ]}),
        plastic.cylinder({radius:glbl.screwRadius, start:[-holeX, -1, holeZ+31], end:[-holeX, thickness+1, holeZ+31]}),
        plastic.cylinder({radius:glbl.screwRadius, start:[ holeX, -1, holeZ+31], end:[ holeX, thickness+1, holeZ+31]}),
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

    var ring1 =plastic.cylinder({radius: radius + 1, start:[0,0,ol-0.55], end:[0,0,ol+0.55]})
                .subtract(plastic.cylinder({radius: radius_d, start:[0,0,ol-0.55], end:[0,0,ol+0.55]})).setColor([0.2,0.2,0.2]);     
    var ring2 =plastic.cylinder({radius: radius + 1, start:[0,0,length - ol-0.55], end:[0,0,length - ol+0.55]})
                .subtract(plastic.cylinder({radius: radius_d, start:[0,0,length - ol-0.55], end:[0,0,length - ol+0.55]})).setColor([0.2,0.2,0.2]);

    var lm = plastic.cylinder({radius: radius, start:[0,0,0], end:[0,0,length]}).subtract(
                plastic.cylinder({radius: glbl.barRadius, start:[0,0,-1], end:[0,0,length+1]})
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
        bar = plastic.cylinder({radius:glbl.barRadius, start:[0,0,0], end:[length,0,0]});
    else if (axis=='y')
        bar = plastic.cylinder({radius:glbl.barRadius, start:[0,0,0], end:[0,length,0]});
    else
        bar = plastic.cylinder({radius:glbl.barRadius, start:[0,0,0], end:[0,0,length]});
    
    return bar.setColor([0.9,0.9,0.9]);
}

function screw_bar(length)
{
    return plastic.cylinder({radius:glbl.barRadius, start:[0,0,0], end:[0,0,length]}).setColor([0.4,0.4,0.4]);
}

function shaft_coupler(diam1, diam2)
{

    var bar_rad1  = diam1/2;
    var bar_rad2  = diam2/2;

    var shaft = plastic.cylinder({radius:9.5, start:[0,0,0], end:[0,0,25]}).setColor([0.9,0.9,0.9]).subtract([
        plastic.cylinder({radius:bar_rad1, start:[0,0,-1], end:[0,0,11]}).setColor([0.9,0.9,0.9]),
        plastic.cylinder({radius:bar_rad2, start:[0,0,15], end:[0,0,26]}).setColor([0.9,0.9,0.9]),
        plastic.cylinder({radius:2, start:[9,0,5], end:[10,0,5]}).setColor([0.1,0.1,0.1]),
        plastic.cylinder({radius:2, start:[9,0,20], end:[10,0,20]}).setColor([0.1,0.1,0.1])
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

    var innerCube = plastic.cube({radius:[w2-1, w2-1, h2-1], center:[0, 0, h2]}).setColor([0.2,0.2,0.2]);
    var motor = innerCube.union([
        plastic.cube({radius:[w2, w2, height/8], center:[0, 0, height/8]}).setColor([0.8,0.8,0.8]),
        plastic.cube({radius:[w2, w2, height/8], center:[0, 0,  7 * height/8]}).setColor([0.8,0.8,0.8]),
        plastic.cylinder({radius:11, start:[0,0,height-1], end:[0,0,height+2]}).setColor([0.8,0.8,0.8]),
        plastic.cylinder({radius:glbl.motorShaftRadius, start:[0,0,height+1], end:[0,0,height+26]}).setColor([0.8,0.8,0.8]),
    ]).subtract([
        plastic.cylinder({radius:glbl.screwRadius, start:[ hole_s, hole_s,height+1], end:[ hole_s, hole_s,hole_z]}).setColor([0.2,0.2,0.2]),
        plastic.cylinder({radius:glbl.screwRadius, start:[-hole_s, hole_s,height+1], end:[-hole_s, hole_s,hole_z]}).setColor([0.2,0.2,0.2]),
        plastic.cylinder({radius:glbl.screwRadius, start:[ hole_s,-hole_s,height+1], end:[ hole_s,-hole_s,hole_z]}).setColor([0.2,0.2,0.2]),
        plastic.cylinder({radius:glbl.screwRadius, start:[-hole_s,-hole_s,height+1], end:[-hole_s,-hole_s,hole_z]}).setColor([0.2,0.2,0.2]),
    ]);
    return motor;
}

function extruder()
{
    var w2  =23;
    var h2 = 10;

    var extruder = plastic.cube({radius:[w2, w2, h2], center:[0, 0, h2]}).setColor([0.1,0.1,0.1])
                    .union(
                        plastic.cylinder({radius:6, start:[w2*2, w2/3, h2 ], end:[ -w2*2, w2/3, h2], resolution:6}).setColor([0.7,0.6,0.3])
                    ).subtract(
                        plastic.cube({radius:[15, 15, 6], center:[0, 0, h2 + 5]}).setColor([0.1,0.1,0.1])
                    );
    return extruder;
}

function plate_base(length)
{
    return plastic.cube({radius:[20, length/2, 5], center:[0,length/2,5]} )
            .union(plastic.cube({radius:[100,100,2], center:[0, length/2, 12]}));
}

//END INCLUDE

//INCLUDE:"cages.jscad"

function pylonbase(radius, thickness)
{
	var csg = plastic.cylinder({radius:radius, start:[0,0,0], end:[0,0,thickness] })
				.union(
					plastic.cube({corner1:[0,-radius,0], corner2:[radius +1,radius,thickness]})
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
    
	var csg = plastic.cube({radius:[l2,w2,t2], center:[0,0,t2]})
				.union([
					pylonbase(pylon_r, thick).rotateZ(180).translate([pylon_x,pylon_y,0]),
                    plastic.cylinder({radius:pylon_r, start:[pylon_x,pylon_y,t2], end:[pylon_x,pylon_y,motor_h+thick]}),
                    pylonbase(pylon_r, thick).rotateZ(180).translate([pylon_x,-pylon_y,0]),
                    plastic.cylinder({radius:pylon_r, start:[pylon_x,-pylon_y,t2], end:[pylon_x,-pylon_y,motor_h+thick]}),
					pylonbase(pylon_r, thick).translate([-pylon_x,pylon_y,0]),
                    plastic.cylinder({radius:pylon_r, start:[-pylon_x,pylon_y,t2], end:[-pylon_x,pylon_y,motor_h+thick]}),
                    pylonbase(pylon_r, thick).translate([-pylon_x,-pylon_y,0]),
                    plastic.cylinder({radius:pylon_r, start:[-pylon_x,-pylon_y,t2], end:[-pylon_x,-pylon_y,motor_h+thick]}),
				]).subtract([
                    plastic.cylinder({radius:12, start:[ 0,0,-1], end:[ 0,0,thick+1]}),

                    plastic.cylinder({radius:glbl.screwRadius, start:[ hole, hole,-1], end:[ hole, hole,thick+1]}),
                    plastic.cylinder({radius:glbl.screwRadius, start:[ hole,-hole,-1], end:[ hole,-hole,thick+1]}),
                    plastic.cylinder({radius:glbl.screwRadius, start:[-hole, hole,-1], end:[-hole, hole,thick+1]}),
                    plastic.cylinder({radius:glbl.screwRadius, start:[-hole,-hole,-1], end:[-hole,-hole,thick+1]}),

                    plastic.cylinder({radius:glbl.screwRadius, start:[ pylon_x, pylon_y,-1], end:[ pylon_x, pylon_y,motor_h+thick+1]}),
                    plastic.cylinder({radius:glbl.screwRadius, start:[ pylon_x,-pylon_y,-1], end:[ pylon_x,-pylon_y,motor_h+thick+1]}),
                    plastic.cylinder({radius:glbl.screwRadius, start:[-pylon_x, pylon_y,-1], end:[-pylon_x, pylon_y,motor_h+thick+1]}),
                    plastic.cylinder({radius:glbl.screwRadius, start:[-pylon_x,-pylon_y,-1], end:[-pylon_x,-pylon_y,motor_h+thick+1]}),
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
    
	var csg = plastic.cube({radius:[l2,w2,t2], center:[0,0,t2]})
				.union([
					pylonbase(pylon_r, thick).rotateZ(-90).translate([pylon_x,pylon_y,0]),
                    plastic.cylinder({radius:pylon_r, start:[pylon_x,pylon_y,t2], end:[pylon_x,pylon_y,motor_h+thick]}),
                    pylonbase(pylon_r, thick).rotateZ(90).translate([pylon_x,-pylon_y,0]),
                    plastic.cylinder({radius:pylon_r, start:[pylon_x,-pylon_y,t2], end:[pylon_x,-pylon_y,motor_h+thick]}),
					pylonbase(pylon_r, thick).rotateZ(-90).translate([-pylon_x,pylon_y,0]),
                    plastic.cylinder({radius:pylon_r, start:[-pylon_x,pylon_y,t2], end:[-pylon_x,pylon_y,motor_h+thick]}),
                    pylonbase(pylon_r, thick).rotateZ(90).translate([-pylon_x,-pylon_y,0]),
                    plastic.cylinder({radius:pylon_r, start:[-pylon_x,-pylon_y,t2], end:[-pylon_x,-pylon_y,motor_h+thick]}),
				]).subtract([
                    plastic.cylinder({radius:12, start:[ 0,0,-1], end:[ 0,0,thick+1]}),

                    plastic.cylinder({radius:glbl.screwRadius, start:[ hole, hole,-1], end:[ hole, hole,thick+1]}),
                    plastic.cylinder({radius:glbl.screwRadius, start:[ hole,-hole,-1], end:[ hole,-hole,thick+1]}),
                    plastic.cylinder({radius:glbl.screwRadius, start:[-hole, hole,-1], end:[-hole, hole,thick+1]}),
                    plastic.cylinder({radius:glbl.screwRadius, start:[-hole,-hole,-1], end:[-hole,-hole,thick+1]}),

                    plastic.cylinder({radius:glbl.screwRadius, start:[ hole_clamp, hole,-1], end:[ hole_clamp, hole,thick+1]}),
                    plastic.cylinder({radius:glbl.screwRadius, start:[ hole_clamp,-hole,-1], end:[ hole_clamp,-hole,thick+1]}),
                    plastic.cylinder({radius:glbl.screwRadius, start:[-hole_clamp, hole,-1], end:[-hole_clamp, hole,thick+1]}),
                    plastic.cylinder({radius:glbl.screwRadius, start:[-hole_clamp,-hole,-1], end:[-hole_clamp,-hole,thick+1]}),


                    plastic.cylinder({radius:glbl.screwRadius, start:[ pylon_x, pylon_y,-1], end:[ pylon_x, pylon_y,motor_h+thick+1]}),
                    plastic.cylinder({radius:glbl.screwRadius, start:[ pylon_x,-pylon_y,-1], end:[ pylon_x,-pylon_y,motor_h+thick+1]}),
                    plastic.cylinder({radius:glbl.screwRadius, start:[-pylon_x, pylon_y,-1], end:[-pylon_x, pylon_y,motor_h+thick+1]}),
                    plastic.cylinder({radius:glbl.screwRadius, start:[-pylon_x,-pylon_y,-1], end:[-pylon_x,-pylon_y,motor_h+thick+1]}),
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
    

    var body   = plastic.cube({radius:[pw2, h2, screw_v / 2], center:[0, h2, screw_v / 2]}).subtract([
                    plastic.cylinder({radius: glbl.barRadius, start:[0, hole_y, -1], end:[0, hole_y, screw_v + 1]}),
                    plastic.cube({corner1:[-glbl.barRadius, -1, -1], corner2:[glbl.barRadius, hole_y, screw_v + 1]}),
                    plastic.cylinder({radius: glbl.screwRadius, start:[-pw2 + s2, -1, screw_v-s2], end:[-pw2 + s2, height+1, screw_v-s2]}),
                    plastic.cylinder({radius: glbl.screwRadius, start:[+pw2 - s2, -1, screw_v-s2], end:[+pw2 - s2, height+1, screw_v-s2]}),
                    plastic.cylinder({radius: glbl.screwRadius, start:[-pw2 + s2, -1, s2], end:[-pw2 + s2, height+1, s2]}),
                    plastic.cylinder({radius: glbl.screwRadius, start:[+pw2 - s2, -1, s2], end:[+pw2 - s2, height+1, s2]}),
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

    var support  = plastic.polygon([ [0,0], [suprt_l + s2 + 2, 0], [suprt_l + s2 + 2,thick], [suprt_l + 2,thick], [2,suprt_h], [0,suprt_h] ]).extrude({offset: [0,0,thick]});
    var sprtHole = plastic.polygon([ [0,5], [suprt_l - 5, 5], [0,suprt_h-5] ]).extrude({offset: [0,0,thick+2]});

    var body  = plastic.cube({radius:[pw2, t2, ph2], center:[0, t2, ph2]})
                    .union([
                        plastic.cylinder({radius:pyl_r, start:[0,pyl_r,0], end:[0,pyl_r,suprt_h]}),

                        support.rotateX(90).translate([pw2-2,thick,0]),
                        support.rotateX(90).rotateZ(180).translate([-pw2+2,0,0]),
                        support.rotateX(90).rotateZ(90).translate([-t2, pyl_r*2-2,0]),
                        
                        plastic.cylinder({radius:screw_a/2, start:[suprt_o1,s2,0], end:[suprt_o1,s2,thick]}),
                        plastic.cylinder({radius:screw_a/2, start:[-suprt_o1,s2,0], end:[-suprt_o1,s2,thick]}),
                        plastic.cylinder({radius:screw_a/2, start:[0,suprt_o2,0], end:[0,suprt_o2,thick]}),
                        
                    ]).subtract([
                        plastic.cylinder({radius:glbl.barRadius, start:[0,pyl_r,+30], end:[0,pyl_r,pyl_h+1]}),

                        plastic.cylinder({radius:glbl.screwRadius, start:[suprt_o1,s2,-1],  end:[suprt_o1,s2,thick+1]}),
                        plastic.cylinder({radius:glbl.screwRadius, start:[-suprt_o1,s2,-1], end:[-suprt_o1,s2,thick+1]}),
                        plastic.cylinder({radius:glbl.screwRadius, start:[0,suprt_o2,-1],   end:[0,suprt_o2,thick+1]}),

                        plastic.cylinder({radius: glbl.screwRadius, start:[-pw2 + s2, -1, pyl_h - s2], end:[-pw2 + s2, thick+1, pyl_h - s2]}),
                        plastic.cylinder({radius: glbl.screwRadius, start:[+pw2 - s2, -1, pyl_h - s2], end:[+pw2 - s2, thick+1, pyl_h - s2]}),
                        plastic.cylinder({radius: glbl.screwRadius, start:[-pw2 + s2, -1, pyl_h - 20 + s2], end:[-pw2 + s2, thick+1, pyl_h - 20 + s2]}),
                        plastic.cylinder({radius: glbl.screwRadius, start:[+pw2 - s2, -1, pyl_h - 20 + s2], end:[+pw2 - s2, thick+1, pyl_h - 20 + s2]}),

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

    var body = plastic.cube({radius:[width2, length2 + excess/2, thick2], center:[0, excess/2, thick2]})
        .subtract([
            plastic.cylinder({radius:4.25,  start:[0, ori_y, -1],       end:[0,  ori_y, thick+1]}),
            plastic.cylinder({radius:7.1,   start:[0, ori_y,  thick-3], end:[0,  ori_y, thick+1], resolution:6}),        
            plastic.cylinder({radius:scrwr, start:[  z_nut_h, ori_y+z_nut_h, -1], end:[  z_nut_h, ori_y+z_nut_h, thick+1 ]}),
            plastic.cylinder({radius:scrwr, start:[  z_nut_h, ori_y-z_nut_h, -1], end:[  z_nut_h, ori_y-z_nut_h, thick+1 ]}),
            plastic.cylinder({radius:scrwr, start:[ -z_nut_h, ori_y+z_nut_h, -1], end:[ -z_nut_h, ori_y+z_nut_h, thick+1 ]}),
            plastic.cylinder({radius:scrwr, start:[ -z_nut_h, ori_y-z_nut_h, -1], end:[ -z_nut_h, ori_y-z_nut_h, thick+1 ]}),
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

    var support = plastic.polygon([ [12.5,0], [12.5,2], [2.5,10], [-2.5,10], [-12.5,2], [-12.5,0] ]).extrude({offset: [0,0,thick]});

    var body = plastic.cube({radius:[length2, width2, thick2], center:[0, 0, thick2]}).subtract([
         
        plastic.cylinder({radius:12, start:[x_motor_off, 0, -1], end:[x_motor_off, 0, thick+1]}),

        plastic.cylinder({radius:scrwr, start:[ x_motor_off+motor_hole,  motor_hole, -1], end:[x_motor_off+motor_hole,  motor_hole, thick+1]}),
        plastic.cylinder({radius:scrwr, start:[ x_motor_off+motor_hole, -motor_hole, -1], end:[x_motor_off+motor_hole, -motor_hole, thick+1]}),
        plastic.cylinder({radius:scrwr, start:[ x_motor_off-motor_hole,  motor_hole, -1], end:[x_motor_off-motor_hole,  motor_hole, thick+1]}),
        plastic.cylinder({radius:scrwr, start:[ x_motor_off-motor_hole, -motor_hole, -1], end:[x_motor_off-motor_hole, -motor_hole, thick+1]}),

        plastic.cylinder({radius:scrwr, start:[-clamp_off,  motor_hole, -1], end:[-clamp_off,  motor_hole, thick+1]}),
        plastic.cylinder({radius:scrwr, start:[-clamp_off, -motor_hole, -1], end:[-clamp_off, -motor_hole, thick+1]}),
        plastic.cylinder({radius:scrwr, start:[ clamp_off,  motor_hole, -1], end:[ clamp_off,  motor_hole, thick+1]}),
        plastic.cylinder({radius:scrwr, start:[ clamp_off, -motor_hole, -1], end:[ clamp_off, -motor_hole, thick+1]}),

        plastic.cube({corner1:[-length2+28,-width2+20,-1], corner2:[-length2-1,-width2-1,thick+1]}),
        plastic.cube({corner1:[-length2+28, width2-20,-1], corner2:[-length2-1, width2+1,thick+1]}),
        plastic.cube({corner1:[ length2-60,-width2+20,-1], corner2:[ length2+1,-width2-1,thick+1]}),
        plastic.cube({corner1:[ length2-60, width2-20,-1], corner2:[ length2+1, width2+1,thick+1]}),
         
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

    var body=plastic.cube({radius:[hole,2.5,height/2], center:[0,0,height/2]}).union([
        plastic.cylinder({radius:fin_r, start:[-hole,0,0], end:[-hole,0,height]}),
        plastic.cylinder({radius:fin_r, start:[ hole,0,0], end:[ hole,0,height]}),
    ]).subtract([
        plastic.cylinder({radius:scrwr, start:[-hole,0,-1], end:[-hole,0,height+1]}),
        plastic.cylinder({radius:scrwr, start:[ hole,0,-1], end:[ hole,0,height+1]}),
        plastic.cylinder({radius:hotend_rad,       start:[ 0,-10,height + 0.25], end:[ 0, 20, height  + 0.25]}),
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
        plastic.cylinder({radius:7, start:[x+375,-27,z+12], end:[x+375,-27,z+12-62.3]}),
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
    glbl                   = new parameters(params);
    plastic.setDefault2DResolution( glbl.resolution);
    plastic.setDefault3DResolution( glbl.resolution);
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

module.exports = {
    main: main,
}; 