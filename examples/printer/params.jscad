var glbl;

function parameters (args) {
    this.motorHeight     = 40;
    this.motorWidth      = 42;
    this.motorShaft      = 5;
    this.thickness       = 5;
    this.screwRadius     = 1.5;
	this.barDiameter     = 8;
    this.partColor       = [0.90,0.95,0.45];
    this.resolution      = 18;
    this.X               = 0;
    this.Y               = 0;
    this.Z               = 0;
	if(args)
	{
		this.motorHeight  = args.motorHeight    ;
		this.motorWidth   = args.motorWidth     ;
        this.motorShaft   = args.motorShaft     ;
		this.thickness    = args.thickness      ;
		this.screwRadius  = args.screwRadius    ;
		this.barDiameter  = args.barDiameter    ;
        this.resolution   = args.resolution     ;
        this.X            = args.X;
        this.Y            = args.Y;
        this.Z            = args.Z;
	}
    this.screwHeadRadius  = this.screwRadius * 2;
    this.nutRadius        = this.screwRadius * 2.5;
    this.nutHeight        = this.screwRadius * 1.32;
    this.barRadius        = this.barDiameter / 2;
    this.motorShaftRadius = this.motorShaft /2; 
}
