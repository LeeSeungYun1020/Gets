
p = productFit = {
'regular'   : 1,
'over'      : 2,
'wide'      : 4,
'semi wide' : 8,
'straight'  : 16,
'slim'      : 32,
'tapered'   : 64,
'bootcut'   : 128
}

coordinationFit = {
    (p['slim'], p['slim'])        : 1<<0,
    (p['slim'], p['regular'])     : 1<<1,
    (p['slim'], p['straight'])    : 1<<2,
    (p['slim'], p['semi wide'])   : 1<<3,
    (p['slim'], p['wide'])        : 1<<4,
    (p['slim'], p['tapered'])     : 1<<5,
    (p['slim'], p['bootcut'])     : 1<<6,

    (p['regular'], p['slim'])        : 1<<7,
    (p['regular'], p['regular'])     : 1<<8,
    (p['regular'], p['straight'])    : 1<<9,
    (p['regular'], p['semi wide'])   : 1<<10,
    (p['regular'], p['wide'])        : 1<<11,
    (p['regular'], p['tapered'])     : 1<<12,
    (p['regular'], p['bootcut'])     : 1<<13,

    (p['over'], p['slim'])        : 1<<14,
    (p['over'], p['regular'])     : 1<<15,
    (p['over'], p['straight'])    : 1<<16,
    (p['over'], p['semi wide'])   : 1<<17,
    (p['over'], p['wide'])        : 1<<18,
    (p['over'], p['tapered'])     : 1<<19,
    (p['over'], p['bootcut'])     : 1<<20

}

topFitList = [
    p['slim'],
    p['regular'],
    p['over']
]

bottomFitList = [
    p['slim'],
    p['regular'],
    p['straight'],
    p['semi wide'],
    p['wide'],
    p['tapered'],
    p['bootcut']
]