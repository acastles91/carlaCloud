#version 150

//Perlin noise with only float inputs. Based on the C code in https://en.wikipedia.org/wiki/Perlin_noise
//Refactored to GLSL by ChatGPT 

// q: Does this implementation of Perlin noise seems to be correct?
// a: Yes, it seems to be correct. I've tested it with the following code:  
//    https://www.shadertoy.com/view/4dX3zN

// Function to linearly interpolate between a0 and a1
// Weight w should be in the range [0.0, 1.0]
float interpolate(float a0, float a1, float w) {
    return (a1 - a0) * w + a0;
}

// Create pseudorandom direction vector
vec2 randomGradient(float ix, float iy) {
    const float w = 32.0;
    const float s = w / 2.0;
    float a = ix, b = iy;
    a *= 3284157443.0; b = mod(b ^ (mod(a * pow(2.0, s), pow(2.0, w)) + mod(a, pow(2.0, w - s))), pow(2.0, w));
    b *= 1911520717.0; a = mod(a ^ (mod(b * pow(2.0, s), pow(2.0, w)) + mod(b, pow(2.0, w - s))), pow(2.0, w));
    a *= 2048419325.0;
    float random = a * (3.14159265 / float(uint(~0u) >> 1));
    vec2 v;
    v.x = cos(random); v.y = sin(random);
    return v;
}

// Computes the dot product of the distance and gradient vectors.
float dotGridGradient(float ix, float iy, float x, float y) {
    vec2 gradient = randomGradient(ix, iy);
    float dx = x - ix;
    float dy = y - iy;
    return (dx * gradient.x + dy * gradient.y);
}

// Compute Perlin noise at coordinates x, y
float perlin(float x, float y) {
    float x0 = floor(x);
    float x1 = x0 + 1.0;
    float y0 = floor(y);
    float y1 = y0 + 1.0;

    float sx = x - x0;
    float sy = y - y0;

    float n0, n1, ix0, ix1, value;

    n0 = dotGridGradient(x0, y0, x, y);
    n1 = dotGridGradient(x1, y0, x, y);
    ix0 = interpolate(n0, n1, sx);

    n0 = dotGridGradient(x0, y1, x, y);
    n1 = dotGridGradient(x1, y1, x, y);
    ix1 = interpolate(n0, n1, sx);

    value = interpolate(ix0, ix1, sy);
    return value;
}
