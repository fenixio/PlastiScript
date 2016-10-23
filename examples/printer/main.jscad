include("params.jscad");
include("screw.jscad");
include("carriage_end.jscad");
include("linear_rod.jscad");
include("vitamins.jscad");
include("cages.jscad");
include("pylon.jscad");
include("x_carriage.jscad");
include("hotend.jscad");


function getParameterDefinitions() {
    return [
      { name: 'motorHeight', type: 'float', initial:40.0, caption: "Stepper motor height :" },
      { name: 'motorWidth',  type: 'float', initial:42.0, caption: "Stepper motor width :" },
      { name: 'motorShaft',  type: 'float', initial: 5.0, caption: "Stepper motor shaft diameter :" },
      { name: 'thickness',   type: 'float', initial: 5.0, caption: "Thickness off all pieces :" },
      { name: 'screwRadius', type: 'float', initial: 1.5, caption: "Screw radius :" },
      { name: 'barDiameter', type: 'float', initial: 8.0, caption: "Bar diameter :" },
      { name: 'resolution',  type: 'int',   initial:  18, caption: "Resolution :" },
      { name: 'X',           type: 'float', initial: 0.0, caption: "X :" },
      { name: 'Y',           type: 'float', initial: 0.0, caption: "Y :" },
      { name: 'Z',           type: 'float', initial: 0.0, caption: "Z :" }
    ];
}

function z_axis()
{
    return pylonWithClamp().rotateZ(-90).translate([49,0,0]).union([
        pylonWithClamp().rotateZ(90).translate([-49,0,0]),
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
    return x_carriage_with_z_nut().rotateZ(180).rotateX(-90).translate([0,-16,z]).union([
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
        cylinder({radius:7, start:[x+375,-27,z+12], end:[x+375,-27,z+12-57.3]}),
        cylinder({radiusStart:2.5, radiusEnd:0, start:[x+375,-27,z+12-57.3], end:[x+375,-27,z+12-62.3]}),
    ]);
}

function y_axis(orig_x,orig_y,y)
{
    return y_motor_cage().rotateX(180).translate([orig_x,orig_y,45]).union([
        LM8LUU_clamp().rotateX(90).translate([orig_x-40, orig_y+19, 45 + 11]),
        LM8LUU_clamp().rotateX(90).rotateZ(180).translate([orig_x+40, orig_y-19, 45 + 11]),
        LM8LUU().rotateX(90).translate([orig_x-40, orig_y+22.5, 45 + 11]),
        LM8LUU().rotateX(90).translate([orig_x+40, orig_y+22.5, 45 + 11]),

        bar(320,"y").translate([orig_x-40, orig_y + y,45 + 11]),
        bar(320,"y").translate([orig_x+40, orig_y + y,45 + 11]),
        y_carriage_end().rotateX(90).translate([orig_x, orig_y + y + 20, 45+11]),
        y_carriage_end().rotateZ(180).rotateX(-90).translate([orig_x, orig_y + 300 +y, 45+11]),
        plate_support(120,30).translate([orig_x, orig_y + y + 15, 45 + 11 + 8]),
        plate_support(120,30).translate([orig_x, orig_y + y + 305,45 + 11 + 8]),
        plate_base(320).translate([orig_x, orig_y + y, 45 + 11 + 8]),
        hot_bed(320).translate([orig_x, orig_y + y, 45 + 11 + 8]),
    ]);
}

function motors(orig_x,orig_y,z)
{
    return nema17().translate([-21,9,0]).union([
        motor_cage().rotateZ(90).rotateX(180).translate([-21,9,45]),
        nema17().rotateX(90).translate([15,30,z]),
        nema17().translate([orig_x,orig_y,0]),
        
        nema17().translate([23,-46,0]),
        motor_cage().rotate([180,0,90]).translate([23,-46,45]),
        extruder().rotateZ(-90).translate([23,-46,45]),
    ]);
}


function main(params)
{
    glbl                   = new parameters(params);
    setDefault2DResolution( glbl.resolution);
    setDefault3DResolution( glbl.resolution);
    var orig_X =  195;
    var orig_y =  -32; 
    var x      =  -80 - glbl.X;
    var y      = -255 + glbl.Y;
    var z      =  133 + glbl.Z;
    var result = [
        cube({size:[380,200,5], center:[60,0,-5.1]}).setColor(color("burlywood")),
        z_axis(),
        x_axis(x, z),
        y_axis(orig_X,orig_y,y),
        motors(orig_X,orig_y,z),
    ];
    return result;

}