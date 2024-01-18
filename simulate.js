function simulate() {
    frame +=1;
    t = frame * timeStep;

    ball.pos.x += ball.vel.x * timeStep;
    ball.pos.y += ball.vel.y * timeStep;

    if (ball.pos.x < ball.radius) {
        ball.pos.x = ball.radius;
        ball.vel.x = -ball.vel.x;
    }
    if (ball.pos.x > width - ball.radius) {
        ball.pos.x = width - ball.radius;
        ball.vel.x = -ball.vel.x;
    }
    if (ball.pos.y < ball.radius) {
        ball.pos.y = ball.radius;
        ball.vel.y = -ball.vel.y;
    }
    if (ball.pos.y > height - ball.radius) {
        ball.pos.y = height - ball.radius;
        ball.vel.y = -ball.vel.y;
    }

    vectorController.pos.x = ball.pos.x + scaleVector * ball.vel.x;
    vectorController.pos.y = ball.pos.y + scaleVector * ball.vel.y;

    cinematicsData.push([frame, ball.pos.x, ball.pos.y])
    if(cinematicsData.length > cinematicsDataLength){
        cinematicsData.shift()
    };

};