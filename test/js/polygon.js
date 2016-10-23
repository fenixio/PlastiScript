var plastic = require('../../lang.js');
    
function main()
{
    return result = [
        plastic.polygon(
            {      
                points: [ 
                    [10,10],
                    [10,-10],
                    [-10,-10],
                    [-10,10], 
                    [0,0]     
                ]
            }
        )
    ];
}

module.exports = {
    main: main,
}; 
