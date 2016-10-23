include("params.jscad")

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

function plate_support(length, width)
{
    return cube({size:[length, width, 10], center:[0,0,5]} ).setColor(color("burlywood"));
}

function plate_base(length)
{
    return cube({size:[220, length, 5], center:[0,length/2,12.5]} ).setColor(color("burlywood"));
}

function hot_bed(length)
{
    return cube({size:[220,220,4], center:[0, length/2, 17]}).setColor(color("red"))
        .subtract(
            cube({size:[200.25,200.25,0.25], center:[0, length/2, 19]}).setColor(color("white"))
                .subtract(
                        cube({size:[199.75,199.75,0.25], center:[0, length/2, 19]}).setColor(color("white"))
            )
        );
}
