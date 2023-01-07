import Particle from "./particle";

(function() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const particles = [];
    let hue = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    animate();

    canvas.addEventListener('mousemove', function(evt) {
        for (let i = 0; i < 10; i++) {
            particles.push(new Particle(evt.x, evt.y))
        }
    });

    function draw(particle) {
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    }

    function handleParticles() {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            draw(particles[i]);

            if (particles[i].size <= .3) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    function animate() {
        ctx.fillStyle = "rgba(0, 0, 0, .1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        handleParticles();
        requestAnimationFrame(animate);
        
        hue++;
    }
}());