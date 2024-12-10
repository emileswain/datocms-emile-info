
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
const float threshold = 0.3;

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // https://github.com/jlfwong/gpu-boids

    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord / u_resolution.xy;

    // Time-based variables for smooth animation
    float t = u_time * 1.5;
    float t1 = sin(t) * 0.5 + 0.5;
    float t2 = cos(t) * 0.5 + 0.5;

    // Color components
    float r = sin(2.0 * uv.x + t1) * 0.5 + 0.5;
    float g = cos(3.0 * uv.y + t2) * 0.5 + 0.5;
    float b = sin(4.0 * (uv.x + uv.y) + t1 + t2) * 0.5 + 0.5;

    // Output the final color

    float aRadius = 10.0;
    vec4 aColor = vec4(r, g, b, 1.0);

    vec2 mapped = fragCoord.xy - mod(fragCoord.xy, 40.0) + vec2(20.0,20.0);

    float md = distance( u_mouse.xy, mapped);
    if ( md < 40.0)
    {
        vec2 direction = normalize(mapped - u_mouse.xy);
        mapped = mapped + direction * (40.0-md);
    }

    float dist = distance(mapped.xy, fragCoord.xy);
    if (dist > aRadius)
        discard;

    float d = dist / aRadius;
    vec4 color = mix(vec4(aColor.rgb, 1.0), vec4(aColor.rgb, 0.2), step(1.0-threshold, d));

    fragColor = color;
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}