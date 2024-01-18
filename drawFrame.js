function drawFrame() {
    svgSimulation.select('#drawFrameGroup').remove();   

    const drawFrameGroup = svgSimulation.append('g').attr('id', 'drawFrameGroup');

    //Field Dynamics
    const waveSpeed = 50;
    const spacing = 15;
    const horizontalNum = Math.floor(width/spacing + 1);
    const verticalNum = Math.floor(height/spacing + 1);

    for(let i = 0; i < horizontalNum; i++){
        for(let j = 0; j < verticalNum; j++){

            const point = {x: spacing*i, y: spacing*j};
            
            const distanceBallPoint = Math.sqrt(
                (ball.pos.x - point.x)**2 + (ball.pos.y - point.y)**2 
            )

            const frameDelay = Math.floor(distanceBallPoint / (waveSpeed*timeStep));

            const index = Math.max(0,
                cinematicsDataLength - frameDelay - 1
                );

            const direction = {
                x: point.x - cinematicsData[index][1],
                y: point.y - cinematicsData[index][2]
            };

            if(direction.x != 0 | direction.y != 0){
                drawArrow(drawFrameGroup, {point, direction});
            };            
        };    
    };

    drawFrameGroup.append('circle')
        .attr('cx', ball.pos.x)
        .attr('cy', ball.pos.y)
        .attr('r', ball.radius)
        .attr('fill', '#0af');            
    
    const vector = drawFrameGroup.append('g');

    vector.append("defs")
        .append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 5)
        .attr("refY", 5)
        .attr("markerWidth", .5*vectorController.radius)
        .attr("markerHeight", .5*vectorController.radius)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr('fill', '#0af');

    vector.append('line')
        .attr("x1", ball.pos.x)
        .attr("y1", ball.pos.y )
        .attr("x2", vectorController.pos.x)
        .attr("y2", vectorController.pos.y)
        .attr("stroke", '#0af')
        .attr("stroke-width", 3)         
        .attr("marker-end", "url(#arrow)");

    drawFrameGroup.append('circle')
        .attr('cx', vectorController.pos.x)
        .attr('cy', vectorController.pos.y)
        .attr('r', vectorController.radius)
        .attr('fill', 'red')
        .attr('opacity', 0);    
}; 

//Handle simulation start, pause and reset

function update() {
    if(isSimulating){
        setTimeout(function () {
            simulate();
            drawFrame();
            update();
        }, 1000 / fps);
    }
};

function startSimulation(){ 
    startButtonCount += 1;
    isSimulating = true; 
    if(startButtonCount==1){
        update();
    }                    
};

function pauseSimulation(){
    startButtonCount = 0;
    isSimulating = false;       
};

function resetSimulation(){
    frame = 0;
    t = 0;
    startButtonCount = 0;
    isSimulating = false; 
    
    ball.pos.x = initialConditions.pos.x; 
    ball.pos.y = initialConditions.pos.y;

    ball.vel.x = initialConditions.vel.x; 
    ball.vel.y = initialConditions.vel.y;

    ball.isDragging = false;     
    
    vectorController.pos.x = initialConditions.pos.x + scaleVector * initialConditions.vel.x; 
    vectorController.pos.y = initialConditions.pos.y + scaleVector * initialConditions.vel.y;

    drawFrame();
};