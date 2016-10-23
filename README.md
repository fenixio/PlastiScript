# **PlastiScript**
## 3D Modeling Language
*Version 0.0.1*

## **Language attempt**
This language is intended as a way of create parametric 3D models using a dialect of javascript.
It is based on OpenJSCad and OpenSCad projects. 
It has similar approach to OpenJSCad, but with small sintax differences, aimed to get a clear code.   

## Table of content
<!-- TOC -->

- [**PlastiScript**](#plastiscript)
    - [3D Modeling Language](#3d-modeling-language)
    - [**Language attempt**](#language-attempt)
    - [Table of content](#table-of-content)
    - [**Getting started**](#getting-started)
        - [**Installation**](#installation)
        - [**Configuration**](#configuration)
        - [**Creating the first model**](#creating-the-first-model)
        - [**The main function**](#the-main-function)
        - [**main function argument**](#main-function-argument)
        - [**Support to include files**](#support-to-include-files)
    - [**3D Primitives**](#3d-primitives)
        - [**Cube**](#cube)
            - [*Examples*](#examples)
        - [**Sphere**](#sphere)
            - [*Examples*](#examples)
        - [**Cylinder**](#cylinder)
                - [**Cylinder**](#cylinder)
                - [**Cone**](#cone)
            - [*Examples*](#examples)
        - [**torus**](#torus)
        - [**polyhedron**](#polyhedron)
            - [*Examples*](#examples)
        - [**Text**](#text)
    - [3D Object Manipulation](#3d-object-manipulation)
        - [**translate**](#translate)
        - [**rotate, rotateX, rotateY, rotateZ**](#rotate-rotatex-rotatey-rotatez)
        - [**scale**](#scale)
        - [**mirror, mirrorX, mirrorY, mirrorZ**](#mirror-mirrorx-mirrory-mirrorz)
        - [**matrix transform**](#matrix-transform)
        - [**union**](#union)
        - [**subtract**](#subtract)
        - [**intersect**](#intersect)
        - [*Examples of 3D object manipulations*](#examples-of-3d-object-manipulations)
    - [**2D Primitives**](#2d-primitives)
        - [**circle/ellipsis**](#circleellipsis)
            - [*Example*](#example)
        - [**square/rectangle**](#squarerectangle)
            - [*Example*](#example)
        - [**polygon**](#polygon)
            - [*Example*](#example)
        - [**paths**](#paths)
        - [**polyline**](#polyline)
        - [**arc**](#arc)
        - [**bezier**](#bezier)
    - [**2D Object Manipulation**](#2d-object-manipulation)
        - [**concat**](#concat)
        - [**close**](#close)
        - [**toPolygon**](#topolygon)
        - [**expandToPolygon**](#expandtopolygon)
    - [**Going from 2D -> 3D: extruding**](#going-from-2d-3d-extruding)
            - [**linear extruding ( linear_extrude)**](#linear-extruding-linearextrude)
            - [**rotational extruding (rotateExtrude)**](#rotational-extruding-rotateextrude)
            - [**path extruding (rectangularExtrude)**](#path-extruding-rectangularextrude)
    - [**Missing subjects**](#missing-subjects)

<!-- /TOC -->

## **Getting started**

### **Installation**

### **Configuration**

### **Creating the first model**

### **The main function**

### **main function argument**

### **Support to include files**

## **3D Primitives**
The 3D primitives are the building blocks of the design. It includes cubes( prisms), cylinders( cones), spheres and polyhedrons.    

### **Cube**
Draw a solid prismatical object.  
Syntax:
``` 
var o = cube(options);
```
where options could contain
| parameter/type      | description |
|--------------------|------------|
|`radius: [w,l,h]`   |optional, default to [0.5,0.5,0.5]. Defines the radius of the cube, based in its center|
|`size: [w,l,h]`|optional, default to [1,1,1], Defines the size of each cube side.|
|`center: [x,y,z]`|optional, default to [0,0,0]. Defines the centre of the cube.|
|`corner1: [x,y,z]`|optional without default. Defines a base corner for the cube.|
|`corner2: [x,y,z]`|optional without default. Defines the oposite corner for the cube.|
|`roundRadius: number`|optional, default 0 not rounded. When is set to a positive value the cube is rounded.|
|`resolution: integer`|optional, only has meaning if roundRadius is defined. Defines the number of facets in rounded part.|  

**Note** Not all combinations of radius, size, center and corners the parameters could be used togheter. The following is the list of valid parameter combinations

* radius (center is defaulted to [0,0,0]).
* radius and center.
* radius and corner1.
* size (center is defaulted to [0,0,0]).
* size and center.
* size and corner1.
* corner1 and corner2.
* center (size is defaulted to [1,1,1]).
* corner1 (size is defaulted to [1,1,1]).

#### *Examples*
```
cube({size: [1,2,3]});
cube({size: [1,2,3], center: [0, 0, 0]});
cube({size: [1,2,3], center: [0, 0, 0], roundRadius: 0.2, resolution: 8});
cube({radius: [1, 1, 1]});
cube({radius: [1, 1, 1], center: [0, 0, 0] });
cube({radius: [1, 1, 1], center: [0, 0, 0], roundRadius: 0.2, resolution: 8 });
cube({corner1: [0, 0, 0]});
cube({corner1: [0, 0, 0], radius: [1, 1, 1] });
cube({corner1: [0, 0, 0], size: [1, 1, 1] });
cube({corner1: [0, 0, 0], corner2: [1, 1, 1] });
```

### **Sphere**
Draw a solid spherical object.  
Syntax:  
```
var o = sphere(options);
```
where options could contain
|parameter/type      | description|
|--------------------|------------|
|`radius: number`|optional (default to 0.5).| 
|`diam:   number`|optional (default to 1).|
|`center: [x,y,z]`|optional (default to [0,0,0]).|
|`resolution: integer`|optional, number of facets to solve the sphere.|
|`geodesic: boolean`|optional (default to false) uses a geodesic approach (icosahedron further triangliated).|

#### *Examples*
```
sphere();                                          // draw a sphere of radius 0.5 in [0,0,0]
sphere({radius:5});                                // draw a sphere of radius 5 in [0,0,0]
sphere({center:[10,10,10,]});                      // draw a sphere of radius 1 in [10,10,10]
sphere({radius:5, center:[10,10,10,]});            // draw a sphere of radius 5 in [10,10,10]
sphere({radius:3, resolution: 100, geodesic:true});// draw a sphere of radius 3 in [0,0,0] using a geodesic approach
```
**Note:** Creating spheres with high resolution and then operating with them, e.g. union(), intersection(), etc, slows down rendering / construction procedure due the large amount of polygons.

### **Cylinder**
Draw a cylindrical or conical object.  
Syntax: 
```
var o = cylinder(options);
```
where options could contain
|parameter/type      | description|
|--------------------|------------|
|`radius: number` |optional (default to 0.5). Cylinder radius.|
|`diam: number` |optional. Cylinder diameter.|
|`radiusStart: number` |optional (default to 1). Cone base radius.|
|`radiusEnd: number` |optional (default to 1). Cone end radius.|
|`start: [x,y,z]`|optional (default to [0,0,0]). Cylinder axis start point.|
|`end: [x,y,z]`|optional (default to [0,0,1]). Cylinder axis end point.|
|`height: number` |optional. Cylinder's height. The heigth is take as a delta Z over the start.|
|`sectorAngle: number` |optional. Angle of sector for area sector cylinders. Angle is measured in degrees since X axis.|
|`rounded: boolean` |optional (default to false). Create a rounded cylinder, it could not draw a rounded cone.|
|`resolution: integer` |optional. Number of facets to solve the cylinder.|

**Note** Not all combinations of radius, diameter, radiusStart, radiusEnd parameters could be used togheter. Basically each dimension only could be defined once, so this are the rules. 

##### **Cylinder**
* radius and diam(eter) are mutually exclusive. 
* end and height are mutually exclusive.
* Don't use radiusStart, radiusEnd.
##### **Cone**
* Don't use rounded.
* end and height are mutually exclusive.
* Don't use >radius or diam(eter).

#### *Examples*
```
cylinder({});                                         // draw a cylinder of radius 0.5 in [0,0,0]
cylinder({radius:3.5}).translate([10,0,0]);           // draw a cylinder of radius 5 in [10,0,0], moved to [10,0,0]
cylinder({start:[20,0,0,]});                          // draw a cylinder of radius 0.5 in [20,10,0]
cylinder({radius:3.5, start:[30,0,0]});               // draw a cylinder of radius 3.5 in [30,10,3.5]

cylinder({diam:3, start:[0,10,0], end:[0,10,4], resolution:36});         // draw a cylinder of diam 4 in [0,10,0] with 4 of height 
cylinder({diam:4, start:[10,10,0,], resolution:36});                     // draw a cylinder of diam 4 in [10,10,0]
cylinder({radius:3, start:[20,10,0,], resolution:36});                   // draw a cylinder of radius 3 in [20,10,0]
cylinder({radiusStart:3, radisuEnd:1, start:[30,10,0,], end:[30,10,5]}); // draw a cone of radius 3/1 in [30,10,0] with 5 of height

cylinder({diam:2, start:[0,20,0], end:[0,20,4], rounded:true, resolution:36});     // draw a rounded cylinder of diam 2 in [0,20,0] with 4 of height 
cylinder({diam:2, start:[10,20,0], end:[10,20,4], sectorAngle:90, resolution:36}); // draw a 90 deg sector of cylinder of diam 2 in [10,20,0] with 4 of height
cylinder({diam:2, start:[20,20,0], end:[20,24,0]});                                // draw a cylinder of diam 2 in [20,20,0] with 4 of height over y axis 
cylinder({diam:2, start:[30,20,0], height:6});                                     // draw a cylinder of diam 2 in [20,30,0] with 6 of height
```
 
### **torus**

### **polyhedron**
It draws a polyhedron from a list of points and a list of triangles or polygons.  
* The point property is an array vertexes of the shape.
* the triangle property is an array of arrays with the index of the points that compose the surfaces of the polyhedron.
* Optionally a list of color define the colors of each facet. 
```
var o = polyhedron(options);
```
where options must contain
|parameter/type      | description|
|--------------------|------------|
|`points: [[x,y,z],...]`|Array of vertexes.|
|`triangles: [ [0,1,2],...]`|Array of indexes to the vertexes.|
|`polygons: [ [0,1,2],...]`|Array of indexes to the vertexes.|
|`colors: [ [r,g,b],...]`|optional. Array of colors of the facets.| 
#### *Examples*
```
polyhedron(
    {      
        points: [ 
            [10,10,0],
            [10,-10,0],
            [-10,-10,0],
            [-10,10,0], // the four points at base
            [0,0,10]    // the apex point 
        ],  
        triangles: [
            [0,1,4],
            [1,2,4],
            [2,3,4],
            [3,0,4],    // each triangle side

            [1,0,3],
            [2,1,3]     // two triangles for square base
        ],
        colors: [
            [1,0.25,0.25],
            [1,0.25,0.25],// 2 faces red
            [0.25,1,0.25],
            [0.25,1,0.25],// 2 faces green
            [0.25,0.25,1],
            [0.25,0.25,1] // 2 faces blue
        ]                         
    });
```
### **Text**

## 3D Object Manipulation
Primitive objects could be manipulated and modified in many ways. 
They can be moved, roated, scaled, mirrored, or combined throght boolean operations like union, subtraction or intersection.
The result of this actions is a new object, which met the parameters of the operations, and it can be manipulated again.    
Each primitive expose interfaces for this tasks between other. The following is a detailed description of this interfaces.  

### **translate**
Move a object to other position. The translation is applied to all the vertexes or monument points of the primitive.
Syntax: 
```
var result = object.translate([dx,dy,dz]);
```
where options dx, dy and dz defines the amount of movement over each axis.


### **rotate, rotateX, rotateY, rotateZ**
Rotate an object over the the axis. The center of the rotation is always the origin [0,0,0].
The amount of rotation is defined in degrees. Positive rotations are defined as counter clockwise from the positive arrow of each axis.     
The rotation could be applied all at the same time or by axis. Taking one axis at time is easier to understand but more verbose than "all togheter" approach.  
Syntax: 
```
var result = object.rotate([ax,ay,az]);
var result = object.rotateX(ax);
var result = object.rotateY(ay);
var result = object.rotateZ(az);
```
where options ax, ay and az defines the amount of rotation over each axis.


### **scale**
Scales the object using the specified vector, which identifies the new size. One value of 1 in the components will keep this dimension unchanged. A value different than one will change the size proportionally. 
Syntax: 
```
var result = object.scale([sx,sy,sz]);
```
where options sx, sy and sz defines the amount of change in each axis.

### **mirror, mirrorX, mirrorY, mirrorZ**
Mirrors the primitive on a plane through the origin. The argument to mirror() is the normal vector of a plane intersecting the origin through which to mirror the object.  
Additionally, exists methods to mirror the primitive over one axis at time. 
Syntax: 
```
var result = object.mirror([x,y,z]);
var result = object.mirrorX();
var result = object.mirrorY();
var result = object.mirrorZ();
```
where options x, y and z defines the axis of mirroring.

### **matrix transform**
A matrix transformation could apply rotation, translation, mirroring and scale simultaneously.
The argument of the transform method is a transform matrix that must be created previously. 
However it could be useful to create this matrix if you need to apply the same transformations to more than one object.
The matrix can be obtained using the helper function getTMatrix or it could be cretaed by hand. 
Syntax: 
```
var matrix = getTMatrix({
    translate:[dx,dy,dz],
    rotate:[ax,ay,az],
    scale:[sx,sy,sz],
    mirror:[x,y,z]
}); 
var result = object.transform(matrix);
```
where options can contain
|parameter/type      | description|
|--------------------|------------|
|`matrix: CSG.Matrix4x4()`|optional. 4x4 transform matrix defines the amount of movement over each axis.|
getTMatrix function option can contain
|parameter/type      | description|
|--------------------|------------|
|`translate: [dx,dy,dz]`|optional (default to [0,0,0]). dx, dy and dz defines the amount of movement over each axis.|
|`rotate: [ax,ay,az]`|optional (default to [0,0,0]). ax, ay and az defines the amount of rotation over each axis.|
|`scale: [sx,sy,sz]`|optional (default to [0,0,0]). sx, sy and sz defines the amount of change in each axis.|
|`mirror: [x,y,z]`|optional (default to [0,0,0]). Normal of the mirror plane, x, y and z defines the axis of mirroring.|

### **union**
Creates a union of objects. This is the sum of all objects (logical ```or```).
May be used with either 2D or 3D objects, but don't mix them.   
Function could receive a single object or an array of object to be unioned.   
Syntax: 
```
var ue = object.union(otherObject); 
var ul = object.union([object_2, object_3]);
```
The result object has all the properties and features as a primitive, and it could be used in any function that receives an object. 

### **subtract**
Subtract a object/s from the other. This function correspond to a logical ```and not```.
May be used with either 2D or 3D objects, but don't mix them.   
Function could receive a single object or an array of object to be subtracted of the first one.   
Syntax: 
```
var ue = object.subtract(otherObject); 
var ul = object.subtract([object_2, object_3]);
```
The result object has all the properties and features as a primitive, and it could be used in any function that receives an object. 

### **intersect**
Intersect objects with each other. This function correspond to a logical ```and```.
May be used with either 2D or 3D objects, but don't mix them.   
Function could receive a single object or an array of object to be subtracted of the first one.   
Syntax: 
```
var ue = object.intersect(otherObject); 
var ul = object.intersect([object_2, object_3]);
```
The result object has all the properties and features as a primitive, and it could be used in any function that receives an object. 

### *Examples of 3D object manipulations*
```
// base object
cylinder({radiusStart:1, radisuEnd: 0.5, height:3}),
// translations
cylinder({radiusStart:1, radisuEnd: 0.5, height:3})
    .translate([5,0,0]),
// rotations
cylinder({radiusStart:1, radisuEnd: 0.5, height:3})
    .rotate([90,90,90]).translate([0,5,0]),
cylinder({radiusStart:1, radisuEnd: 0.5, height:3})
    .rotateX(90).translate([5,5,0]),
cylinder({radiusStart:1, radisuEnd: 0.5, height:3})
    .rotateY(90).translate([10,5,0]),
cylinder({radiusStart:1, radisuEnd: 0.5, height:3})
    .rotateZ(90).translate([15,5,0]),
// scale
cylinder({radiusStart:1, radisuEnd: 0.5, height:3})
    .scale([0.5,0.8,1.5]).translate([0,10,0]),
// voolena combinations
cylinder({radiusStart:1, radisuEnd: 0.5, height:3})
    .mirror([0,1,0]).translate([5,10,0]),
// mirrors
cube({size:[2,2,2] })
    .union(plastic.sphere({radius:1.25}))
    .translate([0,15,0]),
cube({size:[2,2,2] })
    .intersect(plastic.sphere({radius:1.25}))
    .translate([5,15,0]),
cube({size:[2,2,2] })
    .subtract(plastic.sphere({radius:1.25}))
    .translate([10,15,0]),
sphere({radius:1.25})
    .subtract(plastic.cube({size:[2,2,2] }))
    .translate([15,15,0]),
```

## **2D Primitives**
The 2D primitives are intended to be used to build 3D objects after them by extruding their surfaces in differenta ways.
It includes circle( ellipsis), square( rectangles), polygons, and paths.
The paths represent a sequence of lines which could be used after to create special 2D forms to be extruded.    

### **circle/ellipsis**
Draw a circle if a radius/diam(eter) is provided. 
Draws an ellipsis if an array of 2 radius/diam(eters) are provided.  
Syntax:  
```
var o2d = circle(options);
```
where options could contain
|parameter/type      | description|
|--------------------|------------|
|`radius: number`|optional (default to 0.5). Radius of circle.| 
|`radius: [x,y]`|optional (default to 0.5). Radiuses of ellipsis.| 
|`diam:   number`|optional (default to 1). Diameter of circle.|
|`diam:   [x,y]`|optional (default to 1). Diameters of ellipsis.|
|`resolution: integer`|optional, number of sides on the polygon calculated.|
#### *Example*
```
circle({}),                                      // draw a sphere of radius 0.5 in [0,0]
circle({radius:3.5}).translate([10,0]),          // draw a sphere of radius 5 in [0,0,0], moved to [10,0]
circle({center:[20,0,]}),                        // draw a sphere of radius 0.5 in [20,10]
circle({radius:3.5, center:[0,10]}),             // draw a sphere of radius 3.5 in [0,10]
circle({diam:4, center:[10,10], resolution:36}), // draw a sphere of diam 4 in [10,10]
circle({radius:[1.5,2.5], center:[0,20]}),       // draw a ellipsys of radiuses 1.5,2.5 in [0,20]
circle({diam:[4,2], center:[10,20]}),            // draw a ellipsys of diameters 4,2 in [10,20] 
```

### **square/rectangle**
Draw a circle if a radius/diam(eter) is provided. 
Draws an ellipsis if an array of 2 radius/diam(eters) are provided.  
Syntax:  
```
var o2d = square(options);
```
where options could contain
|parameter/type      | description|
|--------------------|------------|
|`radius: [x,y]`|optional (default to 0.5). Radiuses of ellipsis.| 
|`size:   [x,y]`|optional (default to 1). Diameters of ellipsis.|
|`roundRadius:  number`|optional (default to 1). Radius to rounded the rectangle.|
|`resolution: integer`|optional, number of sides on the polygon calculated.|
#### *Example*
```
square({size: [4,3]})
square({size: [4,3], center: [10,0]})
square({size: [4,3], center: [20,0], roundRadius: 0.2, resolution: 8})
square({radius: [2.5,2]}).translate([0,10])
square({radius: [2.5,2], center: [10,10] })
square({radius: [2.5,2], center: [20,10], roundRadius: 0.2, resolution: 8 })
square({corner1: [0, 20]})
square({corner1: [10, 20], radius: [2.5,2] })
square({corner1: [20, 20], size: [4,3] })
square({corner1: [30, 0], corner2: [32.5,3.9] })
```

### **polygon**
Draw a polygon from its points. 
Syntax:  
```
var o2d = polygon(options);
```
where options could contain
|parameter/type      | description|
|--------------------|------------|
|`points: [[x,y],...]`|Array of 2d vertexes.|

#### *Example*
```
var o2d = polygon({      
        points: [ 
            [10,10],
            [10,-10],
            [-10,-10],
            [-10,10], 
            [0,0]     
        ]
    })
```
### **paths**
A path is a series of points, connected by lines.  
A path can be open or closed (an additional line is drawn between the first and last point).  
The difference between a path and other 2D primitives is that a path is a 'thin' line, whereas other primitives always encloses an area.  
Paths can be constructed either by giving the constructor an array of 2D coordinates, or through the various functions ad is detailed next

### **polyline**
Creates a path that is composed by line segments.  
Syntax:  
```
var path = polyline(options);
```
where options could contain
|parameter/type      | description|
|--------------------|------------|
|`points: [[x,y],...]`|Array of 2d vertexes.|
```
var path = polyline({      
        points: [ 
            [10,10],
            [10,-10],
            [-10,-10],
            [-10,10] 
        ],
        closed: true 
    })
```

### **arc**
Creates a path that is composed by a circular arc.  
Syntax:  
```
var path = arc(options);
```
where options could contain
|parameter/type      | description|
|--------------------|------------|
|`radius:      number`|optional (default to 0.5). Radius of circle.| 
|`radius:      [x,y]`|optional (default to 0.5). Radiuses of ellipsis.| 
|`diam:        number`|optional (default to 1). Diameter of circle.|
|`diam:        [x,y]`|optional (default to 1). Diameters of ellipsis.|
|`startangle:  number`|optional (default to 0). Arc start.|
|`endangle:    number`|optional (default to 360). Arc end.|
|`maketangent: boolean`|optional (default to false). Build little tangent line segments at each end of the arc.|
|`resolution:  integer`|optional, number of sides on the polygon calculated.|

### **bezier**
Creates a path that is composed by a bezier curve 
containing the callee's points followed by a Bezier curve ending at the last point given all but the last point given are the control points of the Bezier; a null initial control point means use the last two points of the callee as control points for the new Bezier curve  
Syntax:  
```
var path = bezier(options);
```
where options could contain
|parameter/type      | description|
|--------------------|------------|
|`points: [[x,y],...]`|Array of 2D vertexes.|
|`resolution: integer`|Number of segments over the arc.|

## **2D Object Manipulation**
2D objects could be translated, scaled, mirrored and rotated in 2 or 3 dimensions suing the same methods mentiones previously.  
2D objects could be logically combinated with other 2D objects, but it couldn't be combintaed with 3D objects. 

### **concat**
Paths can be concatenated the result is a new path which include all points.
Syntax:  
```
var path = path.concat( anotherPath);
```
where options could contain
|parameter/type      | description|
|--------------------|------------|
|`anotherPath: CSG.Path`|2D path object.|

### **close**
Paths can be closed. The result is a new path which include a last line to the start point.
Syntax:  
```
var path = path.close();
```

### **toPolygon**
Builds a polygon bounded by the path. The path should be a closed path, but if not, it will be closed at the time.
Syntax:  
```
var o2d = path.toPolygon();
```

### **expandToPolygon**
Builds a polygon which encloses the path, by building a offset to the path in the defined width.
The path could be a closed or open.

Syntax:  
```
var o2d = path.expandToPolygon( options);
```
where options could contain
|parameter/type      | description|
|--------------------|------------|
|`width: number`|default to 0.5. width of the wall that will enclose the path.|
|`resolution: integer`|Number of facets to solve the extrusion.|

## **Going from 2D -> 3D: extruding** 
As was previuos mentioned, the main goal of 2D items is generate new 3D forms based on a process called extrusion.
There are diferent ways to make a extrusion, but the principle is to build a solid from the movement of a surface.   

#### **linear extruding ( linear_extrude)**
Linear Extrusion is a modeling operation that takes a 2D polygon as input and extends it in the third dimension. 
This way a 3D shape is created. Keep in mind that extrusion is always performed from XY plane to the point indicated, so if you rotate or apply other transformations before extrusion, the extrusion is applied to the projection of the 2D polygon to the XY plane.  
Syntax:  
```
var o3d = o2d.extrude(options)
```
|parameter/type      | description|
|--------------------|------------|
|`offset: [x,y,z]`|End point of the extrusion. Plane on this point will be parallel to XY plane.|
|`twistangle: number`|default to 0. The generator could be rotated during the extrusion. Twsitangle defines how many degrees the generator is rotated.|
|`twiststeps: integer`|If twistangle is defined, it defines how many steps the rotaion produces ( how many layers of polygons).|

#### **rotational extruding (rotateExtrude)**
Rotational extrusion spins a 2D object around the Y-axis to form a solid which has rotational symmetry.
Keep in mind that extrusion is always performed from XY plane to the point indicated, so if you rotate or apply other transformations before extrusion, the extrusion is applied to the projection of the 2D polygon to the XY plane.  
Syntax:  
```
var o3d = o2d.rotateExtrude(options)
```
|parameter/type      | description|
|--------------------|------------|
|`angle: number`|default to 360. Amount of revolution, expected.|
|`resolution: integer`|Number of facets to solve the extrusion.|

#### **path extruding (rectangularExtrude)**
Linear extrude of a path by expanding it to a thin polygon, and executing a linear extrusion.    
Syntax:  
```
var o3d = path.rectangularExtrude(options)
```
|parameter/type      | description|
|--------------------|------------|
|`width: number`|default to 0.5. width of the wall that will enclose the path.|
|`offset: [x,y,z]`|End point of the extrusion. Plane on this point will be parallel to XY plane.|
|`twistangle: number`|default to 0. The generator could be rotated during the extrusion. Twsitangle defines how many degrees the generator is rotated.|
|`twiststeps: integer`|If twistangle is defined, it defines how many steps the rotaion produces ( how many layers of polygons).|
|`resolution: integer`|Number of facets to solve the extrusion.|

## **Missing subjects**
* [x] torus primitive
* [ ] properties (Full analysis)
* [ ] contact points (Full analysis)
* [ ] create elliptical arcs
* [ ] hulls (Full analysis) 
* [ ] Getting started
* [ ] Installation
* [ ] Configuration
* [ ] Creating the first model
* [ ] he main function
* [ ] main function argument
* [ ] Support to include files
