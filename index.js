const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 0.7

class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey
    }

    draw() {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    }, 
    velocity: {
        x: 0,
        y: 0,
    }
})


const ennemy = new Sprite({
    position: {
        x: 400,
        y: 100
    }, 
    velocity: {
        x: 0,
        y: 10,
    }
})

const keys = {
    q: {
        pressed: false
    },
    d: {
        pressed: false
    },
    z: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    ennemy.update()

    player.velocity.x = 0
    if (keys.q.pressed && player.lastKey == 'q') {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey == 'd') {
        player.velocity.x = 5
    }

    
    ennemy.velocity.x = 0
    if (keys.ArrowLeft.pressed && ennemy.lastKey == 'ArrowLeft') {
        ennemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && ennemy.lastKey == 'ArrowRight') {
        ennemy.velocity.x = 5
    }
}
animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true 
            player.lastKey = 'd'
        break
        case 'q':
            keys.q.pressed = true
            player.lastKey = 'q'
        break
        case 'z':
            player.velocity.y = -20
        break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true 
            ennemy.lastKey = 'ArrowRight'
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true 
            ennemy.lastKey = 'ArrowLeft'
        break
        case 'ArrowUp':
            ennemy.velocity.y = -20
        break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false 
        break
        case 'q':
            keys.q.pressed = false 
        break

        case 'ArrowRight':
            keys.ArrowRight.pressed = false 
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false 
        break
    }
})