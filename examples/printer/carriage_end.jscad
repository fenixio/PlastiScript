include("params.jscad");

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
    var length        = (2 * barOffset) + (2 * finLength) + glbl.barDiameter;
    var supportSize   = 40;
    var supportHeight = 8;
    
    var body    = base_carriage_end(barOffset, finLength, thickness, true).setColor(glbl.partColor);
    /*
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
    */

    return body;

}        

function z_top_carriage_end()
{
    return base_carriage_end( z_axis_barOffset, finLength, thickness, false).setColor(glbl.partColor);;
}
