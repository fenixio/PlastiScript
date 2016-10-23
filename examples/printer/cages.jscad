include("params.jscad");

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
	var l2           = motor_w/2 + 2.5;
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
