
Age = {
    '10s': 1,
    '20s': 2,
    '30s': 4,
    '40s': 8,
    '50s': 16
}

Season = {
    'spring'    : 1,
    'summer'    : 2,
    'fall'      : 4,
    'winter'    : 8
}

Temp = {
    'spring'    : 10,
    'summer'    : 30,
    'fall'      : 20,
    'winter'    : 0
}

StyleList = [
    'minimal',
    'casual',
    'campus',
    'street',
    'rock chic',
    'amekaji',
    'city boy',
    'office',
    'sexy glam',
    'feminine',
    'lovely'
]
StyleCode = {
    'minimal'   : 1<<0,
    'casual'    : 1<<1,
    'campus'    : 1<<2,
    'street'    : 1<<3,
    'rock chic' : 1<<4,
    'amekaji'   : 1<<5,
    'city boy'  : 1<<6,
    'office'    : 1<<7,
    'sexy glam' : 1<<8,
    'feminine'  : 1<<9,
    'lovely'    : 1<<10
}

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

CoordinationFit = {
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

def AllStyle():
    result = 0
    for style in StyleCode:
        result += StyleCode[style]
    return result

def AllAge():
    result = 0
    for value in Age.values():
        result += value
    return result

def AllFit():
    result=0
    for value in CoordinationFit.values():
        result += value
    return result

AllStyle = AllStyle()
AllAge = AllAge()
AllFit = AllFit()