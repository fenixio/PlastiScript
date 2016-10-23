
global.time = new Date();
gMainParam  = {};
gFolder     = '';

var fs = require('fs');
var vm = require('vm');
var uts= [];

global.lib   = './';
var ut       = [];
var CSG      = require(lib+'./formats.js').CSG; // use the CSG with extended prototypes
var CAG      = require(lib+'./formats.js').CAG; // use the CAG with extended prototypes
var Blob     = require(lib+'./Blob.js').Blob;
var incList  = [];
var args     = process.argv.splice(2);
var plastic  = fs.readFileSync(lib+'./lang.js');
if(args.length==0)
{
    runTests();
}
else
{
    executePlastic(args[0]);
}
console.log('pitch finished');

function runTests()
{
    // arguments found
    var inf      = null;
    var outFormat, inFormat;
    var outf     = 'output.stl';
    var inc      = [];
    var srcInc   = '';
    /*
    var uts = ['cube','sphere','cylinder', 
                'polyhedron', 'manipulate', 
                'square', 'circle', 'polygon'];
                */
    var uts = ['extrusion'];
    var len = uts.length;
    for(var i=0; i<len; i++)
    {
        var modelName = uts[i];
        if(modelName)
        {
            var model = require(lib+'./test/js/' + modelName + '.js'); 
            runIndividulalTest(model, './test/out/' + modelName + '.stl');
        }
    }
}

function runIndividulalTest(model, outf)
{
    var csg = model.main();
    if(csg.length) {
        var o = csg[0];
        if(o instanceof CAG) {
            o = o.extrude({offset: [0,0,0.1]});
        }
        for(var i=1; i<csg.length; i++) {
            var c = csg[i];
            if(c instanceof CAG) {
            c = c.extrude({offset: [0,0,0.1]});
            }
            o = o.unionForNonIntersecting(c);
        }
        csg = o;
    }

    var out = csg.toStlString(); // CSG to STL ASCII

    console.log('Blob: type ['+out.type+'] size ['+out.size+']');
    fs.writeFile(outf,out.asBuffer(),0,
        function(err) {
            if(err) {
            console.log("Error writing the file: ", err);
            } else {
            var t1 = new Date();
            console.log('Output file ready');
            console.log("Time elapsed. " , (t1.getTime() - global.time.getTime())/1000);
            }
        }
    );
}


function executePlastic(inf)
{
    console.log("reading "+inf);
    var src  = fs.readFileSync(inf,inf.match(/\.stl$/i)?"binary":"UTF8");
    var pos  = inf.lastIndexOf('\\');
    if(pos>0)
    {
        gFolder = inf.substr(0, pos+1);
    }


    src            = expandIncludesAndEval('' + src);
    var main       = getMainFunction(gMainParam);
    var fullSource = "" + src + "\n" + plastic +  "\n" + main;
    var csg = null; 
    try
    {
        console.log("Compiling the CSG tree from plastic script. ");
        csg = eval(fullSource); // *.jscad + openscad.js + main()
        console.log("CSG tree built. Creating output file");
    }
    catch(ex)
    {
        console.log("Failed to compile plastic script. " , ex);
        fs.writeFileSync('output.err.js', fullSource, null,
        function(err) {
            if(err) {
                console.log("output err", err);
            } 
        });
        return;
    }
}
 

// -- helper functions ---------------------------------------------------------------------------------------
function isRead(fn)
{
    var i=0;
    if(incList)
    {
        for(i=0; i<incList.length; i++)
        {
            if(incList[i]==fn)
            {
                break;
            }
        }
        return i < incList.length;
    }
    return false;
}

function expandIncludesAndEval(src)
{
    var match = src.match(/^include\(\"([\w+|\.|_|-]*)\"\);?\s*$/m);
    if(match)
    {   
        var fn = RegExp.$1;
        if(!isRead(fn))
        {
            incList.push(fn);
            console.log('processing include:', fn);
            var read = readInclude(fn);
            src = src.replace(/^include\(\"([\w+|\.|_|-]*)\"\);?\s*$/m, read);
        }
        else
        {
            //console.log('skipping include:', fn);
            src = src.replace(/^include\(\"([\w+|\.|_|-]*)\"\);?\s*$/m, '');
        }
        src = expandIncludesAndEval(src);
    }
    else
    {
        //console.log('evaluating...');
        var source = '' + plastic.toString() + "\n" + src; 
        eval( source );
    }
    return src;
}


function readInclude(fn) {    
     var src = fs.readFileSync( gFolder + fn, {encoding: 'utf8'});
      return '//INCLUDE:"' + fn + '"\n' + expandIncludesAndEval(src) + '\n//END INCLUDE\n';
}

function getMainFunction(gMainParam) {    
    //var paramFunc = fs.readFileSync(lib+'./main_include.js');
    return "\nmain(_getParameterDefinitions(" + JSON.stringify(gMainParam) + "));\n";
};