#version 150

uniform mat4 modelViewProjectionMatrix;

in vec4 position;
in vec2 texcoord;

out vec2 vTexCoord;

void main() {
    // Pass through the vertex positions to clip space
    gl_Position = modelViewProjectionMatrix * position;

    // Pass through the texture coordinates (UV coordinates) to the fragment shader
    vTexCoord = texcoord;
}
