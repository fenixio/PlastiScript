include("params.jscad");
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