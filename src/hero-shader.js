import { createShader } from 'shaders/js';

// This module is only requested when motion and WebGPU are available.
export async function mountHero(canvas, onReady, onError) {
  return createShader(canvas, {
    components: [{
      type: 'Aurora',
      id: 'bilbo-aurora',
      props: {
        colorA: '#ff5c6c', colorB: '#ff886b', colorC: '#ad3256',
        intensity: 65, curtainCount: 2, speed: 0.65,
        waviness: 35, rayDensity: 16, height: 110,
        center: { x: 0.65, y: 0.2 }, seed: 8,
      },
    }],
  }, { disableTelemetry: true, observeElement: false, onReady, onError });
}
