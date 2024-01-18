function drawArrow(svg, {point, direction, color = '#fc0'}) {
    const directionModule = Math.sqrt(direction.x**2 + direction.y**2);
    const unitaryVector = {x: direction.x/directionModule, y: direction.y/directionModule};
    
    const arrowLength = 15; 
    const arrowAngleTangent = .2;

    const points = [
        [
            point.x - arrowLength * arrowAngleTangent * unitaryVector.y, 
            point.y + arrowLength * arrowAngleTangent * unitaryVector.x
        ],
        [
            point.x + arrowLength * unitaryVector.x, 
            point.y + arrowLength * unitaryVector.y
        ],
        [
            point.x + arrowLength * arrowAngleTangent * unitaryVector.y, 
            point.y - arrowLength * arrowAngleTangent * unitaryVector.x
        ]
    ];
   
    svg.append("polygon")
        .attr("points", points.join(" "))
        .attr("fill", color );
}