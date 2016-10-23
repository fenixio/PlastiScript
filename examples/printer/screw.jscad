include("params.jscad");
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
