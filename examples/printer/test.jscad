
function getParameterDefinitions() {
    return [
      { name: 'motorHeight', type: 'float', initial:40.0, caption: "Stepper motor height :" },
      { name: 'motorWidth',  type: 'float', initial:42.0, caption: "Stepper motor width :" },
      { name: 'motorShaft',  type: 'float', initial: 5.0, caption: "Stepper motor shaft diameter :" },
      { name: 'thickness',   type: 'float', initial: 5.0, caption: "Thickness off all pieces :" },
      { name: 'screwRadius', type: 'float', initial: 1.5, caption: "Screw radius :" },
      { name: 'barDiameter', type: 'float', initial: 8.0, caption: "Bar diameter :" },
      { name: 'resolution',  type: 'int',   initial:  18, caption: "Resolution :" }
    ];
}


function main(params)
{
    setDefault2DResolution = params.resolution;
    setDefault3DResolution = params.resolution;

    var result = [];

    result.push(
        cube({})
    );

    result.push(cube({size: [1,2,3]}));
    result.push(cube({size: [1,2,3], center: [0, 0, 0]}).translate([5,0,0]) );
    result.push(cube({size: [1,2,3], center: [0, 0, 0], roundRadius: 0.2, resolution: 8}).translate([10,0,0]) );
/*
    result.push(cube({radius: [1, 1, 1]}));
    result.push(cube({radius: [1, 1, 1], center: [0, 0, 0] }));
    result.push(cube({radius: [1, 1, 1], center: [0, 0, 0], roundRadius: 0.2, resolution: 8 }));
    result.push(cube({corner1: [0, 0, 0]}));
    result.push(cube({corner1: [0, 0, 0], radius: [1, 1, 1] }));
    result.push(cube({corner1: [0, 0, 0], size: [1, 1, 1] }));
    result.push(cube({corner1: [0, 0, 0], corner2: [1, 1, 1] }));
*/
    return result;

}