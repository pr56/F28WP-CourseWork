var sprite_ani = {
    flip: function (fullWidth, coordinates) {
        return {
            x: fullWidth - coordinates.x - coordinates.w,
            y: coordinates.y,
            w: coordinates.w,
            h: coordinates.h,
            lpd: coordinates.rpd,
            rpd: coordinates.lpd,
            tpd: coordinates.tpd,
            bpd: coordinates.bpd
        };
    },
    pink: {
        stand2: {x: 69,  y: 379, w: 66, h: 92, lpd: 10, rpd: 10, tpd: 17, bpd: 0},
        stand:  {x: 70,  y: 92,  w: 66, h: 92, lpd: 10, rpd: 10, tpd: 17, bpd: 0},
        jump:   {x: 69,  y: 286, w: 67, h: 93, lpd: 10, rpd: 10, tpd: 17, bpd: 0},
        walk1:  {x: 69,  y: 193, w: 68, h: 93, lpd: 12, rpd: 10, tpd: 17, bpd: 1},
        walk2:  {x: 0,   y: 0,   w: 70, h: 96, lpd: 13, rpd: 11, tpd: 18, bpd: 3},
    }

}
