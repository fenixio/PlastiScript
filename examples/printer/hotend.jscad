include("params.jscad");

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