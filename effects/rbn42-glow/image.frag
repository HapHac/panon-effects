#version 130

#define background_opacity $background_opacity
#define gate_x $gate_x 
#define gate_y $gate_y 

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    fragCoord=fragCoord/iResolution.xy;
    vec4 sample1=texture(iChannel1, vec2(fragCoord.x,0)) ;
    float h=fragCoord.y;

    fragColor.a=.5*(h>.5?sample1.r/(h-.5):sample1.g/(.5-h));

    fragColor.rgb=getRGB(fragCoord.x)*fragColor.a;

    float baseX = fragCoord.x>.5?2*fragCoord.x-1:1-2*fragCoord.x;
    float baseY = fragCoord.y>.5?2*fragCoord.y-1:1-2*fragCoord.y;
    fragColor.a+=(background_opacity*(baseX>gate_x?sin(1-baseX)/sin(1-gate_x):1)*(baseY>gate_y?1:sin(baseY)/sin(gate_y)));
}
