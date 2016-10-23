function version() {
  return [0,5,1];
}


function color(colorName) {
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

   var c= [0.41,0.59,0.87,1];
   if(colorName && map[colorName])
   {
       c = map[colorName]
   }
   return c;
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
        return CSG.Path2D.arc({
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
   if(typeof getParameterDefinitions!=='undefined') {
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
   } else 
      return param;
}


if(typeof module !== 'undefined') {    // we are used as module in nodejs require()
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
