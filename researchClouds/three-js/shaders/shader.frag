#version 150

out vec4 outColor;

uniform float u_red;

void main(){
    float red = u_red;
    float green = 0.0;
    float blue = 0.0;
    float alpha = 1.0;
    outColor = vec4(abs(sin(u_red)), green, blue, alpha);
}