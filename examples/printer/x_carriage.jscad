include("params.jscad");

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

function x_carriage_with_z_nut()
{
    return x_carriage().union(z_nut_cover().rotateX(-90).translate([21,-5.5,20]));
}